import React, { Component } from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highcharts'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({own_data, config, users}) => ({
  own_data,
  config,
  users,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
    }
  }

  handleExpandChange(expanded) {
    this.setState({
      expanded: expanded,
    })
  }

  render() {
    const {own_data, config, users} = this.props

    let buddy_data = users[own_data.buddy_id]


    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange.bind(this)}
      >
        <CardHeader
          title="実験結果"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <Highcharts 
          config={{
            title: {
              text: '平均値の推移',
              x: -20 //center
            },
            credits: {
              enabled: false
            },
            xAxis: {
              title: {
                text: 'ラウンド数'
              },
              min: 1,
            },
            yAxis: {
              title: {
                text: '自白を選んだ率'
              },
            },
            tooltip: {
              valueSuffix: '%'
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
            },
            series: [{
              name: '自分',
              data: [7.0, 3.5,7.0, 3.5,7.0, 3.5,7.0, 3.5],
              pointStart: 1,
            }, {
              name: '相手',
              data: [3.5, 7,3.5, 7,3.5, 7,3.5, 7,],
              pointStart: 1,
            }]
          }} 
        />
      </CardText>
    </Card>
    )
  }
}

export default connect(mapStateToProps)(App)
