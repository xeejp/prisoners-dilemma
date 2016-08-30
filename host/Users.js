import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


function createUserStatuStr(status) {
  return (
    <div>
    </div>
  )
}

const User = ({ id, status }) => (
  <tr>
    <td>{id}</td>
    <td>{createUserStatuStr(status)}</td>
  </tr>
)

const mapStateToProps = ({users}) => ({
  users,
})

class Users extends Component {
  render() {
    const {users} = this.props

    return (
      <Card 
        style={{marginBottom: "5%"}}
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
                      id={id}
                      status={users[id].status}
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
