import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import Log from './Log'

import { submitAnswer } from './actions'

const mapStateToProps = ({ message }) => ({
  message,
})

class Experiment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  submitAnswer(answer) {
  }

  render() {
    return (
      <div>
        <p>下のような利得表になる時、次の選択肢から選んでください</p>
        <RaisedButton 
          onClick={this.submitAnswer.bind(this, true)}
          style={{float: "left", width: '40%', position: 'relative', margin: '%5'}}
        >
          aaaa
        </RaisedButton>
        <RaisedButton 
          onClick={this.submitAnswer.bind(this, false)}
          style={{float: "right", width: '40%', position: 'relative', margin: '%5'}}
        >
          aaaa
        </RaisedButton>
        <br />
        <Log />
      </div>
    )
  }
}

export default connect()(Experiment)
