import React, { Component } from 'react'
import { connect } from 'react-redux'

import Ranking from './Ranking'
import Log from './Log'

const mapStateToProps = ({own_data}) => ({
  own_data
})

class Result extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const {own_data} = this.props
    return (
      <div>
        <Ranking />
        {own_data.role != "visitor" ? <Log /> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Result)
