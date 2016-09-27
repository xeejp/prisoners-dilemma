import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'

import InputSnum from './InputSnum'
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
      role != "妻"
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
          {
            role=="夫"
            ? <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td style={{textAlign: "center"}}>家事をする</td>
                    <td style={{textAlign: "center"}}>家事をしない</td>
                  </tr>
                  <tr>
                    <td style={{width: '20%'}}>家事をする</td>
                    <GainCell gain_table={gain_table} index={0} role={role} />
                    <GainCell gain_table={gain_table} index={1} role={role} />
                  </tr>
                  <tr>
                    <td>家事をしない</td>
                    <GainCell gain_table={gain_table} index={2} role={role} />
                    <GainCell gain_table={gain_table} index={3} role={role} />
                  </tr>
                </tbody>
              </table>
            : <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td style={{textAlign: "center"}}>家事をする</td>
                    <td style={{textAlign: "center"}}>家事をしない</td>
                  </tr>
                  <tr>
                    <td style={{width: '20%'}}>家事をする</td>
                    <GainCell gain_table={gain_table} index={0} role={role} />
                    <GainCell gain_table={gain_table} index={2} role={role} />
                  </tr>
                  <tr>
                    <td>家事をしない</td>
                    <GainCell gain_table={gain_table} index={1} role={role} />
                    <GainCell gain_table={gain_table} index={3} role={role} />
                  </tr>
                </tbody>
              </table>
          }
        </td>
      </tr>
    </tbody>
  </table>
)

class Experiment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpenSendMessage: false,
    }
  }

  submitAnswer(answer) {
    const { dispatch } = this.props
    dispatch(submitAnswer(answer))
    this.setState({
      isOpenSendMessage: true,
    })
  }

  onRequestClose() {
    this.setState({
      isOpenSendMessage: false,
    })
  }

  render() {
    const { own_data, config } = this.props
    return (
      (config.askSnum && own_data.snum == "")?
      <Card><CardText><div style={{textAlign: "center"}}><InputSnum /></div></CardText></Card>
      :
      <div>
        {
          own_data.role != "visitor"
          ? <div>
            <Card><CardText>{
              !own_data.finished
              ? <div style={{overflow: 'hidden'}}>
                <p>下のような利得表になる時、次の選択肢から選んでください</p>
                <Card style={{marginLeft: "2%", marginRight: "2%"}}>
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
                  style={{float: "left", width: '40%', position: 'relative', margin: '5%'}}
                >
                  家事をする
                </RaisedButton>
                <RaisedButton 
                  onClick={this.submitAnswer.bind(this, "no")}
                  disabled={own_data.answer != null}
                  style={{float: "right", width: '40%', position: 'relative', margin: '5%'}}
                >
                  家事をしない
                </RaisedButton>
              </div>
              : <p>実験終了までお待ちください</p>
            }</CardText></Card>
            <br />
            <Log />
          </div>
          : <p>ペアが見つかりませんでした</p>
        }
        <Snackbar
          open={this.state.isOpenSendMessage}
          message="送信しました"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      )
  }
}

export default connect(mapStateToProps)(Experiment)
