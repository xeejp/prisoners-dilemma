import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({logs, own_data}) => ({
  logs,
  own_data,
})



class Log extends Component {

  createRoundInfo(log, own_data) {
    if (own_data.role == "User1") {
      return (
        <tr key={log.round}>
          <th>{log.round}</th>
          <th>{log.answer1}</th>
          <th>{log.answer2}</th>
          <th>{log.point1}</th>
          <th>{log.point2}</th>
        </tr>
      )
    } else {
      return (
        <tr key={log.round}>
          <th>{log.round}</th>
          <th>{log.answer2}</th>
          <th>{log.answer1}</th>
          <th>{log.point2}</th>
          <th>{log.point1}</th>
        </tr>
      )
    }
  }

  render() {
    const {logs, own_data} = this.props

    return (
      <Card 
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title={"ログ"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ラウンド</th>
                <th>自分の選択</th>
                <th>相手の選択</th>
                <th>自分のポイント</th>
                <th>相手のポイント</th>
              </tr>
            </thead>
            <tbody>
              {
                logs.map(log => (
                  this.createRoundInfo(log, own_data)
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
