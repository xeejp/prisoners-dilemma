import React, { Component } from 'react'
import { connect } from 'react-redux'

import reactCSS from 'reactcss'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({page, users, joined, finish_description}) => ({
  page,
  users,
  joined,
  finish_description,
})

function createHeaderInfoStr(page, finish_description) {
  switch (page) {
    case "description":
      return "(" + finish_description + "人が説明を読み終えました)"
    default:
      return ""
  }
}

class Users extends Component {
  render() {
    const {users, page, joined, finish_description} = this.props

    return (
      <Card 
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title={"登録者 " + joined + "人 " + createHeaderInfoStr(page, finish_description)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>役割</th>
                <th>ポイント</th>
                <th>所属ペア</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(users).map(id => (
                  <tr key={id}>
                    <th>{id}</th>
                    <th>{users[id].role}</th>
                    <th>{users[id].point}</th>
                    <th>{users[id].pair_id}</th>
                    { page == "experiment"
                      ? <th>{users[id].finished ? "終了" : "実験中"}</th>
                      : null
                    }
                  </tr>
                )).reverse()
              }
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Users)
