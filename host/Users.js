import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({page, users}) => ({
  page,
  users,
})

function createUserStatuStr(page, user) {
  switch (page) {
    case "waiting":
      return null
    case "description":
      return (
        <div>
          {
            user.is_finish_description
            ? <p>既読</p>
            : <p>未読</p>
          }
        </div>
      )
    case "experiment":
      return null
    default:
      return null
  }
}

const User = ({page, user, id}) => (

  <tr>
    <td>{id}</td>
    <td>{createUserStatuStr(page, user)}</td>
  </tr>
)

class Users extends Component {
  render() {
    const {users, page} = this.props

    return (
      <Card 
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title="参加者"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(users).map(id => (
                  users[id].status != "noactive"
                    ? <User
                      key={id}
                      page={page}
                      user={users[id]}
                      id={id}
                    />
                    : null
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
