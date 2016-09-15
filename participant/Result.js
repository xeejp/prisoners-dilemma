import React, { Component } from 'react'
import { connect } from 'react-redux'

import Ranking from './Ranking'
import Log from './Log'

const mapStateToProps = ({}) => ({
})

class Result extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Ranking />
        <Log />
      </div>
    )
  }
}

export default connect()(Result)
