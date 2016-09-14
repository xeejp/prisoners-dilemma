import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import { finishDescription } from './actions'

const mapStateToProps = ({message, config}) => ({
  message,
  config,
})

class Description extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      slideIndex: 0,
    }
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value,
    })
  }

  handleNext() {
    this.setState({
      slideIndex: this.state.slideIndex + 1,
    })
  }

  handleBack() {
    this.setState({
      slideIndex: this.state.slideIndex - 1,
    })
  }

  componentWillMount() {
  }

  render() {
    const { message, config } = this.props
    if (this.state.slideIndex > this.props.message.description.length) {
      const { dispatch } = this.props
      dispatch(finishDescription())
    }
    return (
      <div>
        <Card style={{marginBottom: "5%"}}>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            {
              message.description.map((description, index) => (
                <div key={index}>
                  <CardHeader
                    title="説明"
                    subtitle={(index+1) + "/" + (message.description.length+2)}
                  />
                  <CardText expandable={false}>
                    {description.text.split('\n').map( line => <p key={line}>{line}</p>)}
                  </CardText>
                </div>
              ))
            }
            <div>
              <CardHeader
                title="説明"
                subtitle={(message.description.length+1)+"/"+(message.description.length+2)}
              />
              <CardText expandable={false}>
                <table>
                  <tbody>
                    <tr><td></td><td style={{textAlign: "center"}}>相手</td></tr>
                    <tr>
                      <td>自分</td>
                      <td style={{width: '100%'}}>
                        <table>
                          <tbody>
                            <tr>
                              <td></td>
                              <td style={{textAlign: "center"}}>自白する</td>
                              <td style={{textAlign: "center"}}>自白しない</td>
                            </tr>
                            <tr>
                              <td style={{width: '20%'}}>自白する</td>
                              <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
                                {config.gain_table[0][0] + ", " + config.gain_table[0][1]}
                              </td>
                              <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
                                {config.gain_table[1][0] + ", " + config.gain_table[1][1]}
                              </td>
                            </tr>
                            <tr>
                              <td>自白しない</td>
                              <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
                                {config.gain_table[2][0] + ", " + config.gain_table[2][1]}
                              </td>
                              <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
                                {config.gain_table[3][0] + ", " + config.gain_table[3][1]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardText>
            </div>
            <div>
              <CardHeader
                title="説明"
                subtitle={(message.description.length+2)+"/"+(message.description.length+2)}
              />
              <CardText expandable={false}>
                <p>実験が開始されるまでお待ちください</p>
                <div style={{textAlign: "center"}}>
                  <CircularProgress />
                </div>
              </CardText>
            </div>
          </SwipeableViews>
        </Card>
        <RaisedButton 
          label="戻る" 
          style={{float: "left"}} 
          onTouchTap={this.handleBack.bind(this)}
          disabled={this.state.slideIndex == 0}
        />
        <RaisedButton
          label="進む" 
          style={{float: "right"}} 
          onTouchTap={this.handleNext.bind(this)}
          primary={true} 
          disabled={this.state.slideIndex > message.description.length}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Description)
