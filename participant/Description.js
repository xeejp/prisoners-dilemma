import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import { finishDescription } from './actions'

const mapStateToProps = ({message, config, own_data}) => ({
  message,
  config,
  own_data,
})

const GainCell = ({ gain_table, index, role }) => (
  <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
    {
      role != "User2"
      ? gain_table[index][0] + ", " + gain_table[index][1]
      : gain_table[index][1] + ", " + gain_table[index][0]
    }
  </td>
)

const GainTable = ({gain_table, role}) => (
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
                <GainCell gain_table={gain_table} index={0} role={role} />
                <GainCell gain_table={gain_table} index={1} role={role} />
              </tr>
              <tr>
                <td>自白しない</td>
                <GainCell gain_table={gain_table} index={2} role={role} />
                <GainCell gain_table={gain_table} index={3} role={role} />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
)

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
    const { message, config, own_data } = this.props
    if (this.state.slideIndex > this.props.message.description.length) {
      const { dispatch } = this.props
      dispatch(finishDescription())
    }
    let descList = [
      <div>
        <CardHeader
          title="囚人のジレンマ"
          subtitle={"ルールの説明 " + (message.description.length+1)+"/"+(message.description.length+2)}
        />
        <CardText expandable={false}>
          <GainTable gain_table={config.gain_table} role={own_data.role} />
        </CardText>
      </div>,
      <div>
        <CardHeader
          title="囚人のジレンマ"
          subtitle={"ルールの説明 " + (message.description.length+2)+"/"+(message.description.length+2)}
        />
        <CardText expandable={false}>
          <p>実験が開始されるまでお待ちください</p>
          <div style={{textAlign: "center"}}>
            <CircularProgress size={140} thickness={5.0}/>
          </div>
        </CardText>
      </div>
    ]
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
                    title="囚人のジレンマ"
                    subtitle={"ルールの説明 " + (index+1) + "/" + (message.description.length+2)}
                  />
                  <CardText expandable={false}>
                    {description.text.split('\n').map( line => <p key={line}>{line}</p>)}
                  </CardText>
                </div>
              )).concat(descList)
            }
          </SwipeableViews>
        </Card>
        <RaisedButton 
          label="戻る" 
          style={{float: "left"}} 
          onClick={this.handleBack.bind(this)}
          disabled={this.state.slideIndex == 0}
        />
        <RaisedButton
          label="進む" 
          style={{float: "right"}} 
          onClick={this.handleNext.bind(this)}
          primary={true} 
          disabled={this.state.slideIndex > message.description.length}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Description)
