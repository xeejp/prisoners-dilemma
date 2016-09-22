import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import { fetchContents } from './actions'

import PageStepper from './PageStepper'
import Users from './Users'
import Pairs from './Pairs'
import GainTableCard from './GainTableCard'
import MessageEditor from './MessageEditor'
import ConfigEditor from './ConfigEditor'


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
        <Divider
          style={{
            marginTop: '5%',
            marginBottom: '5%',
          }}
        />
        <Users />
        <Pairs />
        <GainTableCard />
        <MessageEditor />
        <ConfigEditor />
      </div>
    )
  }
}

export default connect()(App)
