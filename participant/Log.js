import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({logs, own_data}) => ({
  logs,
  own_data,
})



class Log extends Component {

  createRoundInfo(log, own_data) {
    if (own_data.role == "夫") {
      return (
        <tr key={log.round}>
          <td>{log.round}</td>
          <td>{log.answer1}</td>
          <td>{log.answer2}</td>
          <td>{log.round_point1}</td>
          <td>{log.point1}</td>
        </tr>
      )
    } else {
      return (
        <tr key={log.round}>
          <td>{log.round}</td>
          <td>{log.answer2}</td>
          <td>{log.answer1}</td>
          <td>{log.round_point2}</td>
          <td>{log.point2}</td>
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
                <th>ラウンドのポイント</th>
                <th>総ポイント</th>
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
