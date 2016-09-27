import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({joined}) => ({
  joined,
})

class Waiting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { joined } = this.props
    return (
      <Card>
        <CardTitle title="家事分担" subtitle="待機画面" />
          <CardText>
            <p>参加者の登録を待っています。</p>
            <p>この画面のまましばらくお待ち下さい。</p>
            <p>現在{joined}人が参加しています。 </p>
          </CardText>
          <div style={{textAlign: "center"}}>
          <CircularProgress size={2}/>
        </div>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Waiting)
