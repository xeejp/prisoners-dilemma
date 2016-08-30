import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import PageStepper from './PageStepper'
import Users from './Users'


const mapStateToProps = ({}) => ({
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    return (
      <div>
        <PageStepper />
        <Users />
      </div>
    )
  }
}

export default connect()(App)
