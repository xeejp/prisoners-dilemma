import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import reactCSS from 'reactcss'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { openParticipantPage } from './actions'


const mapStateToProps = ({page, users, joined, finish_description}) => ({
  page,
  users,
  joined,
  finish_description,
})

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

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
    const {users, page, joined, finish_description, openParticipantPage} = this.props

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
                    <td><a onClick={openParticipantPage(id)}>{(users[id].snum != "")? users[id].snum : id}</a></td>
                    <td>{users[id].role}</td>
                    <td>{users[id].point}</td>
                    <td>{users[id].pair_id}</td>
                    { page == "experiment" && users[id].role != "visitor"
                      ? <td>{users[id].finished ? "終了" : "実験中"}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
