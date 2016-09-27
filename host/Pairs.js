import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({pairs, users, page}) => ({
  pairs,
  users,
  page,
})

class Pairs extends Component {
  render() {
    const {pairs, users, page} = this.props

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
                <th>夫(Point)</th>
                <th>妻(Point)</th>
                <th>ラウンド</th>
                <th>状況</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(pairs).map(id => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{pairs[id].user1+"("+users[pairs[id].user1].point+")"}</td>
                    <td>{pairs[id].user2+"("+users[pairs[id].user2].point+")"}</td>
                    <td>{pairs[id].current_round}</td>
                    { page == "experiment"
                      ? <td>{pairs[id].finished ? "終了" : "実験中"}</td>
                      : null
                    }
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
