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

function createUserStatuStr(page, user) {
  const style = reactCSS({
    'default': {
      selected: {
        color: '#000000',
      },
      nonselect: {
        color: '#DCDCDC',
      }
    }
  })
  switch (page) {
    case "description":
      return (
        <span>
          {
            user.is_finish_description
            ? <span style={ style.selected }>既読</span>
            : <span style={ style.nonselect }>既読</span>
          }
          <span>・</span>
          {
            !user.is_finish_description
            ? <span style={ style.selected }>未読</span>
            : <span style={ style.nonselect }>未読</span>
          }
        </span>
      )
    case "experiment": case "result":
      return null
    default:
      return "-"
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
