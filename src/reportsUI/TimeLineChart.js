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
          const wrap_target = e['Needs Wrap Target'] ? new Date(e['Needs Wrap Target']) : null
          const inspec_target = e['Needs Inspections Target'] ? new Date(e['Needs Inspections Target']) : null
          const brown_target = e['Needs Brown/Siding Target'] ? new Date(e['Needs Brown/Siding Target']) : null
          const rcp_target = e['Needs Rock/Color/Paint Target'] ? new Date(e['Needs Rock/Color/Paint Target']) : null
          const soffit_target = e['Needs Soffit Target'] ? new Date(e['Needs Soffit Target']) : null
          const gutters_target = e['Needs Gutters Target'] ? new Date(e['Needs Gutters Target']) : null
          const removeScaff_target = e['Remove Scaff Target'] ? new Date(e['Remove Scaff Target']) : null

          // console.log(e['Needs Inspections Actual'])

          const wrap = e['Needs Wrap Actual'] ? new Date(e['Needs Wrap Actual']) : null
          const inspec = e['Needs Inspections Actual'] ? new Date(e['Needs Inspections Actual']) : null
          const brown = e['Needs Brown/Siding Actual'] ? new Date(e['Needs Brown/Siding Actual']) : null
          const rcp = e['Needs Rock/Color/Paint Actual'] ? new Date(e['Needs Rock/Color/Paint Actual']) : null
          const soffit = e['Needs Soffit Actual'] ? new Date(e['Needs Soffit Actual']) : null
          const gutters = e['Needs Gutters Actual'] ? new Date(e['Needs Gutters Actual']) : null
          const removeScaff = e['Remove Scaff Actual'] ? new Date(e['Remove Scaff Actual']) : null

          // console.log(wrap, inspec, brown)

          const jobKey = e['Record ID']
  

          if (fourWay && start && fourWay > start) {
            rows.push([jobKey, 'Set Scaff', start, fourWay]);
          }

          if (fourWay && wrap_target && wrap_target > fourWay) {
            rows.push([jobKey, 'Wrap', fourWay, wrap_target]);
          }

          if (inspec_target > wrap_target) {
            rows.push([jobKey, 'Inspection', wrap_target, inspec_target]);
          }

          if (brown_target > inspec_target) {
            rows.push([jobKey, 'Brown', inspec_target, brown_target]);
          }

          if (rcp_target > brown_target) {
            rows.push([jobKey, 'Rock/Color/Paint', brown_target, rcp_target]);
          }

          if (soffit_target > rcp_target) {
            rows.push([jobKey, 'Soffit', rcp_target, soffit_target]);
          }

          if (gutters_target > soffit_target) {
            rows.push([jobKey, 'Gutters', soffit_target, gutters_target]);
          }

          if (removeScaff_target > gutters_target) {
            rows.push([jobKey, 'Remove Scaff', gutters_target, removeScaff_target]);
          }


          //actual 
          const jobKeyActual = e['Record ID']+"*"

         

          if (fourWay && wrap && wrap > fourWay) {
            rows.push([jobKeyActual, 'Wrap', fourWay, wrap]);
          }

          if (inspec  > wrap ) {
            rows.push([jobKeyActual, 'Inspection', wrap , inspec ]);
          }

          if (brown  > inspec ) {
            rows.push([jobKeyActual, 'Brown', inspec , brown ]);
          }

          if (rcp  > brown ) {
            rows.push([jobKeyActual, 'Rock/Color/Paint', brown , rcp ]);
          }

          if (soffit  > rcp ) {
            rows.push([jobKeyActual, 'Soffit', rcp , soffit ]);
          }

          if (gutters  > soffit ) {
            rows.push([jobKeyActual, 'Gutters', soffit , gutters ]);
          }

          if (removeScaff  > gutters ) {
            rows.push([jobKeyActual, 'Remove Scaff', gutters , removeScaff ]);
          }

        });

        this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
          console.log(this.state)
        })


      })
  }

  render() {

    if (this.state.loading) {
      return <div className="loader border-top-info"></div> 
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
