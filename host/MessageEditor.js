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
import Snackbar from 'material-ui/Snackbar'

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
      isOpenDialog: false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      slideIndex: 0,
      message: message,
      defaultMessage: {
        description: [
           {id: 0, text: "大小2匹の豚が檻に入れられている。"},
           {id: 1, text: "檻の片隅にあるレバーを押すと檻の反対側の隅に餌が投与される。\nレバーを押した豚は反対側の隅まで走らなければならず、やっとたどり着いた時には、もう一匹の豚がほとんどの餌を食べてしまってわずかにしか残っていない。\n2匹の豚が同時に餌にたどり着いた場合、大きい方の豚は小さい方の豚を完全に餌から追い払うことができる。"},
           {id: 2, text: "豚がゲーム理論家のように推論できると仮定するならば、どちらの豚がレバーを押しに行くだろうか。"},
        ],
        experiment: "",
      },
    }
  }

  ExperimentTab() {
    return (
      <div>
        <p>実験画面に表示するメッセージ</p>
        <TextField
          hintText={"メッセージ"}
          defaultValue={this.state.message.experiment}
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
                <tr key={message.id}>
                  <td>
                    <FloatingActionButton 
                      mini={true}
                      secondary={true}
                      onTouchTap={this.deleteDescription.bind(this, index)}
                      disabled={this.state.message.description.length <= 1}
                    >
                      <ImageDelete />
                    </FloatingActionButton>
                  </td>
                  <td>
                    <TextField
                      hintText={"問題の説明"}
                      defaultValue={message.text}
                      onBlur={this.handleChange.bind(this, ["description", index, "text"])}
                      multiLine={true}
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
                  secondary={true}
                  disabled={true}
                >
                  <ImageDelete />
                </FloatingActionButton>
              </td>
              <td>
                利得表
              </td>
            </tr>
            <tr>
              <td>
                <FloatingActionButton 
                  mini={true}
                  secondary={true}
                  disabled={true}
                >
                  <ImageDelete />
                </FloatingActionButton>
              </td>
              <td>
                待機画面
              </td>
            </tr>

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
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({ 
      message: this.props.message,
      isOpenDialog: true,
      slideIndex: 0,
    })
  }

  handleClose() {
    this.setState({ 
      message: this.props.message,
      isOpenDialog: false 
    })
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

  handleRequestClose() {
    this.setState({
      isOpenSnackbar: false,
    })
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value,
    })
  }

  deleteDescription(index) {
    var { message } = this.state
    message.description.splice(index, 1)
    this.setState({
      message: message,
    })
  }

  addDescription() {
    var { message } = this.state
    var id = 0
    var flag = false
    while (!flag) {
      for (var i = 0; i < message.description.length; i++) {
        if (message.description[i].id == id) {
          id++
          break
        } else if (i >= message.description.length-1) {
          flag = true
        }
      }
    }
        
    message.description.push({id: id, text: ""})
    this.setState({
      message: message,
    })
  }

  submit() {
    this.setState({ 
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: "メッセージを送信しました",
    })
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.message))
  }

  reset() {
    this.setState({
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: "メッセージを初期化しました",
    })
    const { dispatch } = this.props
    dispatch(updateMessage(this.state.defaultMessage))
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
      <span>
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
          open={this.state.isOpenDialog}
          autoScrollBodyContent={true}
        >
          <Tabs
            onChange={this.handleSlideIndex.bind(this)}
            value={this.state.slideIndex}
          >
            <Tab label="説明" value={0} />
            <Tab label="実験" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            {this.DescriptionTab()}
            {this.ExperimentTab()}
          </SwipeableViews>
        </Dialog>
        <Snackbar
          open={this.state.isOpenSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
          
      </span>
    )
  }
}

export default connect(mapStateToProps)(MessageEditor)
