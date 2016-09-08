import React, { Component } from 'react'
import { connect } from 'react-redux'

import LinearProgress from 'material-ui/LinearProgress'

const mapStateToProps = ({page, joined, finish_description}) => ({
  page,
  joined, 
  finish_description,
})

class HostMessage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const {page, joined, finish_description} = this.props
    switch (page) {
      case "waiting":
        return (
          <div>
            <p>現在{joined}人が実験に参加しています。</p>
          </div>
        )

      case "description":
        return (
          <div>
            <p>{joined}人中{finish_description}人が説明を読み終わりました。</p>
            <LinearProgress mode="determinate" value={finish_description} max={joined} />
          </div>
        )
      default:
        return null
    }
  }
}

export default connect(mapStateToProps)(HostMessage)
