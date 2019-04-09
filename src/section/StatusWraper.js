import React, { Component } from 'react';
//import Sample from '../reportsUI/Sample'


import StatusPieChart from '../reportsUI/StatusPieChart'
import StatusBarChart from '../reportsUI/StatusBarChart'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Jobs from '../utils/Jobs'


class StatusWraper extends Component {

  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = {
      PieChartData:
        [
          ['Status', 'Qty']
        ],
      BarChartData:
        [
          ['Status', 'Qty']
        ],
      loading: true,
    }
    //this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount() {
    const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
    api.getView(903, { start: 0, max: 1500 })
      .then(results => {
        let rows = []


        const data = results.data
        /*
        data.forEach(e => {
          console.log(e['Status for Chart'])
        });
        */

        if (Array.isArray(data)) {
          const field = 'Status for Chart'
          const needsConfirmedStartCount = this.getTotalValuesFrom(field, Jobs.job01, data)
          const needsScaffCount = this.getTotalValuesFrom(field, Jobs.job02, data)
          const needsWrapCount = this.getTotalValuesFrom(field, Jobs.job03, data)
          const needsInspectionsCount = this.getTotalValuesFrom(field, Jobs.job04, data)
          const needsBrownSidingCount = this.getTotalValuesFrom(field, Jobs.job05, data)
          const needsRockColorPaintCount = this.getTotalValuesFrom(field, Jobs.job06, data)
          const needsSoffitCount = this.getTotalValuesFrom(field, Jobs.job07, data)
          const needsGuttersCount = this.getTotalValuesFrom(field, Jobs.job08, data)

          const removeScaffCount = this.getTotalValuesFrom(field, Jobs.job10, data)
          const preparingCloseCount = this.getTotalValuesFrom(field, Jobs.job11, data)
          const warrantyCount = this.getTotalValuesFrom(field, Jobs.job12, data)
          const vpoCount = this.getTotalValuesFrom(field, Jobs.job13, data)

          /*
          console.log(Jobs.job01, needsConfirmedStartCount)
          console.log(Jobs.job02, needsScaffCount)
          console.log(Jobs.job03, needsWrapCount)
          console.log(Jobs.job04, needsInspectionsCount)
          console.log(Jobs.job05, needsBrownSidingCount)
          console.log(Jobs.job06, needsRockColorPaintCount)
          console.log(Jobs.job07, needsSoffitCount)
          console.log(Jobs.job08, needsGuttersCount)
          console.log(Jobs.job10, removeScaffCount)
          console.log(Jobs.job11, preparingCloseCount)
          console.log(Jobs.job12, warrantyCount)
          console.log(Jobs.job13, vpoCount)
          */

          rows.push([Jobs.job01, needsConfirmedStartCount])
          rows.push([Jobs.job02, needsScaffCount])
          rows.push([Jobs.job03, needsWrapCount])
          rows.push([Jobs.job04, needsInspectionsCount])
          rows.push([Jobs.job05, needsBrownSidingCount])
          rows.push([Jobs.job06, needsRockColorPaintCount])
          rows.push([Jobs.job07, needsSoffitCount])
          rows.push([Jobs.job08, needsGuttersCount])
          rows.push([Jobs.job10, removeScaffCount])
          rows.push([Jobs.job11, preparingCloseCount])
          rows.push([Jobs.job12, warrantyCount])
          rows.push([Jobs.job13, vpoCount])

        }

        this.setState({
          loading: false,
          PieChartData: [...this.state.PieChartData, ...rows],
          BarChartData: [...this.state.BarChartData, ...rows],
        })

      })
  }

  getTotalValuesFrom(field, value, data) {
    return data.filter(item => item[field] === value).length
  }


  render() {
    const { PieChartData, BarChartData, loading } = this.state
    const loader = (
      <div style={{
        height: '79.8vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="loader border-top-info"></div>
      </div>
    )
    const width = 'calc(100vw - 22px)'
    return (

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        {
          loading ?
            loader
            :
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4>Jobs Status</h4>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <StatusPieChart width={width} height={'38.2vh'} data={PieChartData} />
                <StatusBarChart width={width} height={'38.2vh'} data={BarChartData} />
              </div>
            </div>
        }

      </div>
    );
  }
}

export default StatusWraper;
