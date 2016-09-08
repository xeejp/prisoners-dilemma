import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({joined, message}) => ({
  joined,
  message,
})

class Waiting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { joined, message } = this.props
    return (
      <div>
        <p>参加者の登録を待っています。(現在の参加者:{joined}人)</p>
        <p>この画面のままお待ちください。</p>
        {message.waiting.split('\n').map( line => <p key={line}>{line}</p>)}
        <div style={{textAlign: "center"}}>
          <CircularProgress />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Waiting)
