import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import ImageAdd from 'material-ui/svg-icons/content/add'
import ImageDelete from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
import {Card} from 'material-ui/Card'
import SwipeableViews from 'react-swipeable-views'

import { fetchContents, updateMessage } from './actions'

const mapStateToProps = ({page, message}) => ({
  page,
  message,
})

class MessageEditor extends Component {
  constructor(props, context) {
    super(props, context)
    const { message } = this.props
    this.state = {
      isOpen: false,
      slideIndex: 0,
      message: message,
      defaultMessage: {
        waiting: "",
        description: [
          "あいうえお",
          "かきくけこ",
          "さしすせそ",
        ],
      },

    }
  }

  WaitingTab() {
    return (
      <div>
        <p>待機画面に表示するメッセージ</p>
        <TextField
          hintText={"メッセージ"}
          defaultValue={this.state.message.waiting}
          onBlur={this.handleChange.bind(this, ["waiting"])}
          multiLine={true}
          fullWidth={true}
        />
      </div>
    )
  }

  DescriptionTab() {
    return (
      <div>
        <table>
          <tbody>
            {
              this.state.message.description.map((message, index) => (
                <tr>
                  <td>
                    <FloatingActionButton 
                      mini={true}
                      secondary={true}
                      onTouchTap={this.deleteDescription.bind(this, index)}
                    >
                      <ImageDelete />
                    </FloatingActionButton>
                  </td>
                  <td>
                    <TextField
                      hintText={"問題の説明"}
                      defaultValue={message}
                      onBlur={this.handleChange.bind(this, ["description", index])}
                      multiLine={false}
                      fullWidth={true}
                    />
                  </td>
                </tr>
              ))
            }
            <tr>
              <td>
                <FloatingActionButton 
                  mini={true}
                  onTouchTap={this.addDescription.bind(this)}
                >
              <ImageAdd />
            </FloatingActionButton>
          </td>
        </tr>
          </tbody>
        </table>
      </div>
    )
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    this.setState({ isOpen: false })
  }

  handleChange(value, event) {
    var message = Object.assign({}, this.state.message)
    var temp = message
    for (var i = 0; i < value.length - 1; i++) {
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ message: message })
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value,
    })
  }

  deleteDescription(index) {
    this.state.message.description.splice(index, 1)
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.message))
  }

  addDescription() {
    this.state.message.description.push("")
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.message))
  }

  submit() {
    console.log("hello")
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.message))
    this.setState({ isOpen: false })
  }

  reset() {
    this.setState({
      message: this.state.defaultMessage,
    })
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.message))
  }
  render() {
    const { page } = this.props
    const actions = [
      <RaisedButton
        label="適用"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <RaisedButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
      <RaisedButton
        label="初期化"
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (
      <div>
        <FloatingActionButton 
          onClick={this.handleOpen.bind(this)}
          disabled={page != "waiting"}
        >
          <ImageEdit />
        </FloatingActionButton>
        <Dialog
          title="Message編集"
          actions={actions}
          model={false}
          open={this.state.isOpen}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <Tabs
            onChange={this.handleSlideIndex.bind(this)}
            value={this.state.slideIndex}
          >
            <Tab label="待機" value={0} />
            <Tab label="説明" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            {this.WaitingTab()}
            {this.DescriptionTab()}
          </SwipeableViews>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(MessageEditor)