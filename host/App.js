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
    if(pairs && config){
      for(var i = 0; i < Object.keys(pairs).length * 2; i++) datas[i] = []
      for(var key in pairs){
        var base = (parseInt(key) - 1) * 2
        datas[base + 0] = [key, pairs[key].user1, "彼"].concat(pairs[key].logs.map(obj => (obj.answer1 == "yes")? "待つ" : "出掛ける").reverse())
        datas[base + 1] = [  "", pairs[key].user2, "彼女"].concat(pairs[key].logs.map(obj => (obj.answer2 == "yes")? "待つ" : "出掛ける").reverse())
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
          fileName={"battle-of-sexes.csv"}
          list={[
            ["デートゲーム"],
            ["実験日", new Date()],
            ["登録者数", users? Object.keys(users).length : 0],
            ["グループ数", pairs? Object.keys(pairs).length : 0],
            ["ID", "利得"],
          ].concat(
            users? Object.keys(users).map(id => [id, users[id].point]) : []
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