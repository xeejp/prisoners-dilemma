import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({pairs, users}) => ({
  pairs,
  users,
})

class Pairs extends Component {
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
          title={"ペア ("+Object.keys(pairs).length+")"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User1(Point)</th>
                <th>User2(Point)</th>
                <th>ラウンド</th>
                <th>状況</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(pairs).map(id => (
                  <tr key={id}>
                    <th>{id}</th>
                    <th>{pairs[id].members[0]+"("+users[pairs[id].members[0]].point+")"}</th>
                    <th>{pairs[id].members[1]+"("+users[pairs[id].members[1]].point+")"}</th>
                    <th>{pairs[id].current_round}</th>
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

export default connect(mapStateToProps)(Pairs)
