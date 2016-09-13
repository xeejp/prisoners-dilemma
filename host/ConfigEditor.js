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

  ExperimentTab() {
    return (
      <div>
      </div>
    )
  }

  DescriptionTab() {
    return (
      <div>
      </div>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({ 
      config: this.props.config,
      isOpenDialog: true,
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

  handleChange(value, event) {
    var config = Object.assign({}, this.state.config)
    var temp = config
    for (var i = 0; i < value.length - 1; i++) {
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    console.log(config)
    this.setState({ config: config })
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
      snackbarMessage: "メッセージを送信しました",
    })
    const { dispatch } = this.props
    dispatch(updateConfig(this.state.config))
  }

  reset() {
    this.setState({
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: "メッセージを初期化しました",
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
          title="Message編集"
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
          <table>
            <tbody>
              <tr><th></th><th>User2</th></tr>
              <tr>
                <th>User1</th>
                <th>
                  <Table
                    selectable={false}
                  >
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                    >
                      <TableRow>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn>自白する</TableHeaderColumn>
                        <TableHeaderColumn>自白しない</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={false}
                    >
                      <TableRow>
                        <TableHeaderColumn>自白する</TableHeaderColumn>
                        <TableHeaderColumn>
                          <p>USER1</p>
                          <TextField
                            hintText={"USER1"}
                            defaultValue={config.gain_table[0][0]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 0, 0])}
                            multiLine={false}
                            fullWidth={true}
                          />
                          <br />
                          <p>USER2</p>
                          <TextField
                            hintText={"USER2"}
                            defaultValue={config.gain_table[0][1]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 0, 1])}
                            multiLine={false}
                            fullWidth={true}
                          />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          <p>USER1</p>
                          <TextField
                            hintText={"USER1"}
                            defaultValue={config.gain_table[1][0]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 1, 0])}
                            multiLine={false}
                            fullWidth={true}
                          />
                          <br />
                          <p>USER2</p>
                          <TextField
                            hintText={"USER2"}
                            defaultValue={config.gain_table[1][1]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 1, 1])}
                            multiLine={false}
                            fullWidth={true}
                          />
                        </TableHeaderColumn>
                      </TableRow>
                      <TableRow>
                        <TableHeaderColumn>自白しない</TableHeaderColumn>
                        <TableHeaderColumn>
                          <p>USER1</p>
                          <TextField
                            hintText={"USER1"}
                            defaultValue={config.gain_table[2][0]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 2, 0])}
                            multiLine={false}
                            fullWidth={true}
                          />
                          <br />
                          <p>USER2</p>
                          <TextField
                            hintText={"USER2"}
                            defaultValue={config.gain_table[2][1]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 2, 1])}
                            multiLine={false}
                            fullWidth={true}
                          />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          <p>USER1</p>
                          <TextField
                            hintText={"USER1"}
                            defaultValue={config.gain_table[3][0]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 3, 0])}
                            multiLine={false}
                            fullWidth={true}
                          />
                          <br />
                          <p>USER2</p>
                          <TextField
                            hintText={"USER2"}
                            defaultValue={config.gain_table[3][1]}
                            onChange={this.handleChangeOnlyNum.bind(this, ["gain_table", 3, 1])}
                            multiLine={false}
                            fullWidth={true}
                          />
                        </TableHeaderColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </th>
              </tr>
            </tbody>
          </table>



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
