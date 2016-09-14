import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
import {Card} from 'material-ui/Card'
import SwipeableViews from 'react-swipeable-views'
import Snackbar from 'material-ui/Snackbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


import { fetchContents, updateConfig } from './actions'

const mapStateToProps = ({page, config}) => ({
  page,
  config,
})

class ConfigEditor extends Component {
  constructor(props, context) {
    super(props, context)
    const { config } = this.props
    this.state = {
      isOpenDialog: false,
      isOpenSnackbar: false,
      disabled: false,
      snackbarMessage: "",
      slideIndex: 0,
      config: config,
      defaultConfig: {
        max_round: 10,
        gain_table: [[-8, -8], [0, -15], [-15, 0], [-1, -1]]
      },

    }
  }

  createInputCell(gain_table, user, index) {
    return (
      <th style={{borderStyle: "solid"}}>
        <TextField
          hintText={"実数"}
          defaultValue={config.gain_table[user][index]}
          onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", user, index])}
          multiLine={false}
          fullWidth={true}
        />
      </th>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({ 
      config: this.props.config,
      isOpenDialog: true,
      slideIndex: 0,
    })
  }

  handleClose() {
    this.setState({ 
      config: this.props.config,
      isOpenDialog: false 
    })
  }

  handleChangeOnlyNum(value, event){
    if(!event.target.value || isNaN(event.target.value)) {
      this.setState({ disabled: true })
      return
    }
    var config = Object.assign({}, this.state.config)
    var temp1 = config
    for(var i = 0; i < value.length - 1; i++){
      temp1 = temp1[value[i]]
    }
    temp1[value[value.length - 1]] = parseFloat(event.target.value)
    this.setState({ config: config, disabled: false })
  }
  
  handleChangeOnlyNaturalNum(value, event){
    if(!event.target.value || isNaN(event.target.value) || event.target.value.indexOf('.') != -1) {
      this.setState({ disabled: true })
      return
    }
    var config = Object.assign({}, this.state.config)
    var temp1 = config
    for(var i = 0; i < value.length - 1; i++){
      temp1 = temp1[value[i]]
    }
    temp1[value[value.length - 1]] = parseInt(event.target.value)
    if (temp1[value[value.length - 1]] <= 0) {
      this.setState({ disabled: true })
      return
    }
    this.setState({ config: config, disabled: false })
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

  submit() {
    this.setState({ 
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: "設定を送信しました",
    })
    const { dispatch } = this.props
    dispatch(updateConfig(this.state.config))
  }

  reset() {
    this.setState({
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: "設定を初期化しました",
    })
    const { dispatch } = this.props
    dispatch(updateConfig(this.state.defaultConfig))
  }

  render() {
    const { page } = this.props
    const { config } = this.state
    const actions = [
      <RaisedButton
        label="適用"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
        disabled={this.state.disabled}
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
          style={{marginLeft: '5%'}} 
        >
          <ActionSettings />
        </FloatingActionButton>
        <Dialog
          title="設定編集"
          actions={actions}
          model={false}
          open={this.state.isOpenDialog}
          autoScrollBodyContent={true}
        >
          <p>ラウンド数</p>
          <TextField
            hintText={"ラウンド数(正の整数やで)"}
            defaultValue={config.max_round}
            onChange={this.handleChangeOnlyNaturalNum.bind(this, ["max_round"])}
            multiLine={false}
            fullWidth={true}
          />
          <p>利得表</p>
          <Tabs
            onChange={this.handleSlideIndex.bind(this)}
            value={this.state.slideIndex}
          >
            <Tab label="USER1" value={0} />
            <Tab label="USER2" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            <table>
              <tbody>
                <tr><th></th><th style={{textAlign: "center"}}>User2</th></tr>
                <tr>
                  <th>User1</th>
                  <th>
                    <table>
                      <tbody>
                        <tr>
                          <th></th>
                          <th style={{textAlign: "center"}}>自白する</th>
                          <th style={{textAlign: "center"}}>自白しない</th>
                        </tr>
                        <tr>
                          <th>自白する</th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[0][0]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 0, "0"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[1][0]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 1, "0"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>自白しない</th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[2][0]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 2, "0"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[3][0]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 3, "0"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </th>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr><th></th><th style={{textAlign: "center"}}>User2</th></tr>
                <tr>
                  <th>User1</th>
                  <th>
                    <table>
                      <tbody>
                        <tr>
                          <th></th>
                          <th style={{textAlign: "center"}}>自白する</th>
                          <th style={{textAlign: "center"}}>自白しない</th>
                        </tr>
                        <tr>
                          <th>自白する</th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[0][1]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 0, "1"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[1][1]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 1, "1"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>自白しない</th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[2][1]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 2, "1"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                          <th style={{borderStyle: "solid"}}>
                            <TextField
                              hintText={"実数"}
                              defaultValue={config.gain_table[3][1]}
                              onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 3, "1"])}
                              multiLine={false}
                              fullWidth={true}
                            />
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </th>
                </tr>
              </tbody>
            </table>
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

export default connect(mapStateToProps)(ConfigEditor)
