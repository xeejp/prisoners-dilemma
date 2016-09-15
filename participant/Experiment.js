import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import Log from './Log'

import { submitAnswer } from './actions'

const mapStateToProps = ({ config, message, own_data }) => ({
  config,
    message,
    own_data,
})

const GainCell = ({ gain_table, index, role }) => (
  <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
    {
      role != "User2"
      ? gain_table[index][0] + ", " + gain_table[index][1]
      : gain_table[index][1] + ", " + gain_table[index][0]
    }
  </td>
)

const GainTable = ({gain_table, role}) => (
  <table>
    <tbody>
      <tr><td></td><td style={{textAlign: "center"}}>相手</td></tr>
      <tr>
        <td>自分</td>
        <td style={{width: '100%'}}>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td style={{textAlign: "center"}}>自白する</td>
                <td style={{textAlign: "center"}}>自白しない</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>自白する</td>
                <GainCell gain_table={gain_table} index={0} role={role} />
                <GainCell gain_table={gain_table} index={1} role={role} />
              </tr>
              <tr>
                <td>自白しない</td>
                <GainCell gain_table={gain_table} index={2} role={role} />
                <GainCell gain_table={gain_table} index={3} role={role} />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
)

class Experiment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  submitAnswer(answer) {
    const { dispatch } = this.props
    dispatch(submitAnswer(answer))
  }

  render() {
    const { own_data, config } = this.props
    return (
      <div>
        {
          own_data.role != "visitor"
          ? <div>
            {
              !own_data.finished
              ? <div>
                <p>下のような利得表になる時、次の選択肢から選んでください</p>
                <Card>
                  <CardHeader
                    title="利得表"
                  />
                  <CardText>
                    <GainTable gain_table={config.gain_table} role={own_data.role} />
                  </CardText>
                </Card>
                <br />
                <RaisedButton 
                  onClick={this.submitAnswer.bind(this, "yes")}
                  disabled={own_data.answer != null}
                  style={{float: "left", width: '40%', position: 'relative', margin: '%5'}}
                >
                  自白する
                </RaisedButton>
                <RaisedButton 
                  onClick={this.submitAnswer.bind(this, "no")}
                  disabled={own_data.answer != null}
                  style={{float: "right", width: '40%', position: 'relative', margin: '%5'}}
                >
                  自白しない
                </RaisedButton>
              </div>
              : <p>実験終了までお待ちください</p>
            }
            <br />
            <Log />
          </div>
          : <p>ペアが見つかりませんでした</p>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Experiment)
