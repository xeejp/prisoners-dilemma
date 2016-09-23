import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionCached from 'material-ui/svg-icons/action/cached'

import { rematch } from './actions'

const mapStateToProps = ({}) => ({
})

class MatchingButton extends Component {
  handleClick() {
    const { dispatch } = this.props
    dispatch(rematch())
  }

  render() {
    return (
      <FloatingActionButton
        style={{marginLeft: "2%"}}
        onClick={this.handleClick.bind(this)}
      ><ActionCached /></FloatingActionButton>
    )
  }
}

export default connect(mapStateToProps)(MatchingButton)  
