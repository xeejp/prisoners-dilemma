import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({}) => ({
})

class Log extends Component {
  render() {
    const {pairs, users} = this.props

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
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Log)
