import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({users, pairs, own_data, own_id, config}) => ({
  users,
  pairs,
  own_data,
  own_id,
  config,
})



class Log extends Component {

  render() {
    const {users, own_data, own_id, config} = this.props

    let ranking_id = Object.keys(users).filter(function(a) {
      return users[a].role != "visitor"
    }).sort(function(a, b) {
      //desc
      return users[b].point - users[a].point
    })
    console.log(ranking_id)

    let ranking = []
    let flag = false
    let loop = (ranking_id.length < 10) ? ranking_id.length : 10
    console.log(own_id)
    for (let i = 0; i < loop; i++) {
      console.log(ranking_id[i])
      if (ranking_id[i] == own_id) flag = true
      ranking.push({
        id: ranking_id[i],
        point: users[ranking_id[i]].point,
        own_ratio: users[ranking_id[i]].ans_yes/config.max_round,
        buddy_ratio: users[users[ranking_id[i]].buddy_id].ans_yes/config.max_round,
        isMe: flag,
      })
    }
    console.log(flag)
    if (!flag) {
      ranking.push({
        id: own_id,
        point: own_data.point,
        own_ratio: own_data.ans_yes/config.max_round,
        buddy_ratio: users[own_data.buddy_id].ans_yes/config.max_round,
        isMe: true
      })
    }

    console.log(ranking)


    return (
      <Card 
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title={"ランキング"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>順位</th>
                <th>ID</th>
                <th>ポイント</th>
                <th>"自白する"を選んだ割合(自分)</th>
                <th>"自白する"を選んだ割合(相手)</th>
              </tr>
            </thead>
            <tbody>
              {
                ranking.map((data, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.point}</td>
                    <td>{data.own_ratio}</td>
                    <td>{data.buddy_ratio}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Log)
