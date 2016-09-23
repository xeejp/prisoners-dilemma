import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Step, Stepper, StepButton} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

import { changePage } from './actions'

import { getPage } from 'util/index'

const pages = ["waiting", "description", "experiment", "result"]

const mapStateToProps = ({page, active_pair}) => ({
  page,
  active_pair,
})

class PageStepper extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  nextPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("description")
        break
      case "description":
        this.changePage("experiment")
        break
      case "experiment":
        this.changePage("result")
        break
      case "result":
        this.changePage("waiting")
        break
    }
  }

  backPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("result")
        break
      case "description":
        this.changePage("waiting")
        break
      case "experiment":
        this.changePage("description")
        break
      case "result":
        this.changePage("experiment")
        break
    }
  }

  changePage(page) {
    const { dispatch } = this.props
    dispatch(changePage(page))
  }

  render() {
    const { page, active_pair } = this.props
    if (page == "experiment" && active_pair <= 0){
    const { dispatch } = this.props
    dispatch(changePage("result"))
    }
    const steps = []
    for (let i = 0; i < pages.length; i++) {
      steps[i] = (
        <Step key={i}>
          <StepButton onTouchTap={this.changePage.bind(this, pages[i])}>
            {getPage(pages[i])}
          </StepButton>
        </Step>
      )
    }
    return (
      <div style={{marginBottom: "5%"}}>
        <Stepper activeStep={pages.indexOf(page)} linear={false}>
          {steps}
        </Stepper>
        <div>
          <RaisedButton
            label="戻る" 
            onClick={this.backPage.bind(this)}
          />
          <RaisedButton 
            label="次へ" 
            style={{marginLeft: '5%'}}
            primary={true}
            onClick={this.nextPage.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PageStepper)
