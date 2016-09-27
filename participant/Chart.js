import React, { Component } from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highcharts'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({own_data, logs, users}) => ({
  own_data,
  logs,
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
    const {own_data, logs, users} = this.props
    let buddy_data = users[own_data.buddy_id]
    let answer = ["answer" + ((0 + (own_data.role != "彼")) + 1), "answer" + ((0 + (buddy_data.role != "彼")) + 1)]
    
    let rate = [[], []]

    for(var i = 0; i < 2; i++){
      for(var j = logs.length - 1; j >= 0; j--){
        var count = (logs.length - 1) - j
        rate[i][count] = 0 + (logs[count][answer[i]] == "yes") + ((count != 0)? rate[i][count - 1] : 0)
      }
    }

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
                text: '待つを選んだ率'
              },
              min:     0,
              max: 100,
            },
            tooltip: {
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y: .2f}%</b><br />'
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
            },
            series: [{
              name: '自分',
              data: rate[0].map((r, i) => r * 100 / (i + 1)),
              pointStart: 1,
            }, {
              name: '相手',
              data: rate[1].map((r, i) => r * 100 / (i + 1)),
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
