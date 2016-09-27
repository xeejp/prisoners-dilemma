import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'


const mapStateToProps = ({config}) => ({
  config,
})

const GainCell = ({ gain_table, index }) => (
  <td style={{borderStyle: "solid", width: '40%', textAlign: "center"}}>
    {gain_table[index][0] + ", " + gain_table[index][1]}
  </td>
)

const GainTable = ({gain_table}) => (
  <table>
    <tbody>
      <tr><td></td><td style={{textAlign: "center"}}>相手</td></tr>
      <tr>
        <td>自分</td>
        <td style={{width: '100%'}}>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td style={{textAlign: "center"}}>待つ</td>
                <td style={{textAlign: "center"}}>出掛ける</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>待つ</td>
                <GainCell gain_table={gain_table} index={0} />
                <GainCell gain_table={gain_table} index={1} />
              </tr>
              <tr>
                <td>出掛ける</td>
                <GainCell gain_table={gain_table} index={2} />
                <GainCell gain_table={gain_table} index={3} />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
)

class GainTableCard extends Component {
  render() {
    const { config } = this.props

    return (
      <Card 
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title={"利得表"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <GainTable gain_table={config.gain_table} />
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(GainTableCard)
