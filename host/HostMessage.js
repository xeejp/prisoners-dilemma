import React, { Component } from 'react'
import { connect } from 'react-redux'

import LinearProgress from 'material-ui/LinearProgress'

const mapStateToProps = ({page, join_experiment, finish_description}) => ({
  page,
  join_experiment, 
  finish_description,
})

class HostMessage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const {page, join_experiment, finish_description} = this.props
    switch (page) {
      case "waiting":
        return (
          <div>
            <p>現在{join_experiment}人が実験に参加しています。</p>
          </div>
        )

      case "description":
        return (
          <div>
            <p>{join_experiment}人中{finish_description}人が説明を読み終わりました。</p>
            <LinearProgress mode="determinate" value={finish_description} max={join_experiment} />
          </div>
        )
      default:
        return null
    }
  }
}

export default connect(mapStateToProps)(HostMessage)
