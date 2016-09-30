import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Highcharts from 'react-highcharts'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({text, ans_a, ans_b, ans_each}) => ({
  text,
  ans_a,
  ans_b,
  ans_each,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleExpandChange(expanded) {
    this.setState({
      expanded: expanded,
    })
  }

  render() {
    const { text, ans_a, ans_b, ans_each } = this.props

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
            chart: {
              type: 'column',
              inverted: false
            },
            title: {
              text: '実験結果'
            },
            xAxis: {
              type: 'category',
            },
            yAxis: {
              min: 0,
              allowDecimals: false,
              title: {
                text: '人数'
              }
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            tooltip: {
              enabled: false
            },
            series: [{
              name: '人数',
              data: [
                [text.answers[0], ans_a],
                [text.answers[1], ans_b],
                [text.answers[2], ans_each]
              ],
              dataLabels: {
                enabled: true,
                color: '#000',
                align: 'center',
                format: '{point.y}',
              }
            }]
          }} 
        />
      </CardText>
    </Card>
    )
  }
}

export default connect(mapStateToProps)(throttle(App, 200))
