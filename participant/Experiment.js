import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import Log from './Log'

import { submitAnswer } from './actions'

const mapStateToProps = ({ message, own_data }) => ({
  message,
  own_data,
})

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
    const { own_data } = this.props
    return (
      <div>
        {
          own_data.role != "visitor"
          ? <div>
            {
              !own_data.finished
              ? <div>
                <p>下のような利得表になる時、次の選択肢から選んでください</p>
                <RaisedButton 
                  onClick={this.submitAnswer.bind(this, "yes")}
                  disabled={own_data.answer != null}
                  style={{float: "left", width: '40%', position: 'relative', margin: '%5'}}
                >
                  yes
                </RaisedButton>
                <RaisedButton 
                  onClick={this.submitAnswer.bind(this, "no")}
                  disabled={own_data.answer != null}
                  style={{float: "right", width: '40%', position: 'relative', margin: '%5'}}
                >
                  no
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
