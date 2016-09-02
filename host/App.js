import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import PageStepper from './PageStepper'
import HostMessage from './HostMessage'
import Users from './Users'
import MessageEditor from './MessageEditor'


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
        <HostMessage />
        <Users />
        <MessageEditor />
      </div>
    )
  }
}

export default connect()(App)
