import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

const mapStateToProps = ({}) => ({
})

class Pairs extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect()(Pairs)
