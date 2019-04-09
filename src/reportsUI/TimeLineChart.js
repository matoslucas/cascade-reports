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
    
  }

  componentDidMount() {

    const { viewId } = this.props

    const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
    api.getView(viewId)
      .then(results => {
        let rows = []

        const data = results.data

        // console.log(data)

        data.forEach(e => {
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
          const jobKeyActual = e['Record ID'] + "*"



          if (fourWay && wrap && wrap > fourWay) {
            rows.push([jobKeyActual, 'Wrap', fourWay, wrap]);
          }

          if (inspec > wrap) {
            rows.push([jobKeyActual, 'Inspection', wrap, inspec]);
          }

          if (brown > inspec) {
            rows.push([jobKeyActual, 'Brown', inspec, brown]);
          }

          if (rcp > brown) {
            rows.push([jobKeyActual, 'Rock/Color/Paint', brown, rcp]);
          }

          if (soffit > rcp) {
            rows.push([jobKeyActual, 'Soffit', rcp, soffit]);
          }

          if (gutters > soffit) {
            rows.push([jobKeyActual, 'Gutters', soffit, gutters]);
          }

          if (removeScaff > gutters) {
            rows.push([jobKeyActual, 'Remove Scaff', gutters, removeScaff]);
          }

        });

        this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
          //console.log(this.state)
        })


      })
  }

  goToTasksDetailPage(id) {
    // console.log(id, this.props)
    const { selectClickHandler } = this.props
    
    selectClickHandler(String(id).replace('*',''));
  }

  render() {

    if (this.state.loading) {
      return <div className="loader border-top-info"></div>
    } else {
      return (
      
          <Chart
            width={'calc(100vw - 22px)'}
            height={'76vh'}
            chartType="Timeline"
            loader={<div className="loader border-top-info"></div>}
            data={this.state.chartData}
            
            options={{
              showRowNumber: true,
            }}
            rootProps={{ 'data-testid': '1' }}

            chartPackages={['corechart', 'controls']}
            controls={[
              {
                controlType: 'StringFilter',
                options: {
                  filterColumnIndex: 0,
                  matchType: 'any', // 'prefix' | 'exact',
                  ui: {
                    label: 'Filter by name',
                  },
                },
              },

              {
                controlType: 'DateRangeFilter',
                options: {
                  // Filter by the date axis.
                  filterColumnIndex: 2,
                  
                },
                // Initial range: 2012-02-09 to 2012-03-20.
                //'state': {'range': {'start': new Date(1380740460000), 'end': new Date(1380740480000)}}
              },
              
            ]}


            chartEvents={[
              {
                eventName: 'select',
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart()
                  const selection = chart.getSelection()
                 
                  if (selection.length === 1) {
                    const [selectedItem] = selection
                    const dataTable = chartWrapper.getDataTable()
                    //console.log(dataTable.getValue(0, 0))
                    const { row } = selectedItem
                    // console.log(row, column, dataTable.getValue(row, 0))
                    const value = dataTable.getValue(row, 0)
                    this.goToTasksDetailPage(value)
                    
                  }
                 
                },
              },
            ]}

          />
       
      )
    }
  }
}

export default TimeLineChart;
