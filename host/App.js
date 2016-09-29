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
import MatchingButton from './MatchingButton'
import DownloadButton from './DownloadButton'


const mapStateToProps = ({ config, users, pairs, page }) => ({
   config, users, pairs, page
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
    const { config, users, pairs, page } = this.props
    let datas = []
    if(pairs && config && users){
      for(var i = 0; i < Object.keys(pairs).length * 2; i++) datas[i] = []
      for(var key in pairs){
        var base = (parseInt(key) - 1) * 2
        datas[base + 0] = [key, (users[pairs[key].user1].snum != "")? users[pairs[key].user1].snum : pairs[key].user1, "User1"].concat(pairs[key].logs.map(obj => (obj.answer1 == "yes")? "自白する" : "自白しない").reverse())
        datas[base + 1] = [  "", (users[pairs[key].user2].snum != "")? users[pairs[key].user2].snum : pairs[key].user2, "User2"].concat(pairs[key].logs.map(obj => (obj.answer2 == "yes")? "自白する" : "自白しない").reverse())
      }
    }
    console.log(datas)
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
        <MatchingButton />
        <DownloadButton
          fileName={"prisoners_dilemma.csv"}
          list={[
            ["囚人のジレンマ"],
            ["実験日", new Date()],
            ["登録者数", users? Object.keys(users).length : 0],
            ["グループ数", pairs? Object.keys(pairs).length : 0],
            ["ID", "利得"],
          ].concat(
            users? Object.keys(users).map(id => [(users[id].snum != "")? users[id].snum : id, users[id].point]) : []
          ).concat([
            ["ペアID", "ID", "役割"].concat((() => { if(!config) return []; let data =[]; for(var i = 1; i <= config["max_round"]; i++) data[i - 1] = "ラウンド" + i; return data; })()),
          ]).concat(
            datas
          )}
          style={{marginLeft: '2%'}}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)