import React, { Component } from 'react';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';

class TimeLineChart extends Component {

  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = {
      chartData: [
        [
          { type: 'string', id: 'Client' },
          { type: 'string', id: 'Job' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' },
        ]
      ],
      loading: true,
    }
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    const { viewId } = this.props

    const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
    api.getView(viewId)
      .then(results => {
        let rows = []

        results.data.forEach(e => {
          //console.log(e);
          //Client Start Date
          // console.log(e['Client Start Date']);
          // console.log(e['Needs Wrap Target']);
          // console.log(e['Needs Inspections Target']);


          const start = e['Client Start Date'] ? new Date(e['Client Start Date']) : null
          const fourWay = e['4-Way Date'] ? new Date(e['4-Way Date']) : null
          const wrap = e['Needs Wrap Target'] ? new Date(e['Needs Wrap Target']) : null
          const inspec = e['Needs Inspections Target'] ? new Date(e['Needs Inspections Target']) : null
          const brown = e['Needs Brown/Siding Target'] ? new Date(e['Needs Brown/Siding Target']) : null
          const rcp = e['Needs Rock/Color/Paint Target'] ? new Date(e['Needs Rock/Color/Paint Target']) : null
          const soffit = e['Needs Soffit Target'] ? new Date(e['Needs Soffit Target']) : null
          const gutters = e['Needs Gutters Target'] ? new Date(e['Needs Gutters Target']) : null
          const removeScaff = e['Remove Scaff Target'] ? new Date(e['Remove Scaff Target']) : null




          if (fourWay && start && fourWay > start) {
            rows.push([e['Record ID'], 'Set Scaff', start, fourWay]);
          }

          if (fourWay && wrap && wrap > fourWay) {
            rows.push([e['Record ID'], 'Wrap', fourWay, wrap]);
          }

          if (inspec > wrap) {
            rows.push([e['Record ID'], 'Inspection', wrap, inspec]);
          }

          if (brown > inspec) {
            rows.push([e['Record ID'], 'Brown', inspec, brown]);
          }

          if (rcp > brown) {
            rows.push([e['Record ID'], 'Rock/Color/Paint', brown, rcp]);
          }

          if (soffit > rcp) {
            rows.push([e['Record ID'], 'Soffit', rcp, soffit]);
          }

          if (gutters > soffit) {
            rows.push([e['Record ID'], 'Gutters', soffit, gutters]);
          }

          if (removeScaff > gutters) {
            rows.push([e['Record ID'], 'Remove Scaff', gutters, removeScaff]);
          }



        });

        this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
          console.log(this.state)
        })


      })
  }

  render() {

    if (this.state.loading) {
      return <div class="loader border-top-info"></div> 
    } else {
      return (
        <Chart
          width={'calc(100vw - 20px)'}
          height={'100vh'}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            showRowNumber: true,
          }}
          rootProps={{ 'data-testid': '1' }}

          chartPackages={['corechart', 'controls']}
          controls={[
            {
              'controlType': 'ChartRangeFilter',
                  'containerId': 'control',
                  'options': {
                  // Filter by the date axis.
                  'filterColumnIndex': 2,
                      'ui': {
                      'chartType': 'LineChart',
                          'chartOptions': {
                          'width': '100vw',
                              'height': 70,
                              'chartArea': {
                              width: '80%', // make sure this is the same for the chart and control so the axes align right
                              height: '80%'
                          },
                              'hAxis': {
                              'baselineColor': 'none'
                          }
                      },
                      // Display a single series that shows the closing value of the stock.
                      // Thus, this view has two columns: the date (axis) and the stock value (line series).
                      'chartView': {
                          'columns': [2, 3]
                      }
                  }
              },
              // Initial range: 2012-02-09 to 2012-03-20.
              //'state': {'range': {'start': new Date(1380740460000), 'end': new Date(1380740480000)}}
          }
          ]}

        />
      )
    }
  }
}

export default TimeLineChart;
