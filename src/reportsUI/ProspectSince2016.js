import React, { Component } from 'react';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';
import Months from '../utils/Months'

class ProspectSince2016 extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Month', '2016', '2017', '2018']
                ],
            loading: true,
        }
        //this.handleClick = this.handleClick.bind(this);
    }



    componentDidMount() {

        const { viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(viewId, { start: 0, max: 3000 })
            .then(results => {
                let rows = []


                const data = results.data
                 // console.log(data)


                if (Array.isArray(data)) {

                /* Array format sample 
                // ['JAN','2016-01','2017-01', '2018-01']
                // ['FEB','2016-02','2017-02', '2018-02']
                */

                    Months.getDefaultMonths().forEach(m => {
                        //console.log(m.name)
                        let mm = []
                        Months.getYears().forEach(y => {
                            const val = y + "-" + m.value
                            
                            const qty = this.getTotalJobsComplexity('Re-4-Way Date', val, data)
                          
                            mm.push(qty)
                        })
                        rows.push([m.name, ...mm])
                    })

                }


                this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
                    // console.log(this.state)
                })



            })
    }

    getTotalJobsFromMonth(field, value, data) {
        return data.filter(item => {
            var d = String(item[field]).split('-')
            var month = d[0] + "-" + d[1]
            return month === value
        }).length
    }
    

    getTotalJobsComplexity(field, value, data) {
        return data.filter(item => {
            var d = String(item[field]).split('-')
            var month = d[0] + "-" + d[1]
                       
            return month === value
        }).reduce((total, item) => {
            var v = Number(item['Complexity (# of Plexes)'])
            //console.log(v)
            return total + v
        }, 0)
    }

    render() {

        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh', width: '100vw' }}>
                {
                    this.state.loading ?
                        <div className="loader border-top-info"></div> :
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="ComboChart"
                            loader={<div className="loader border-top-info"></div>}
                            data={this.state.chartData}

                            options={{
                                title: 'Housing Units',
                                colors: ['#b7c0ca', '#74797d', '#00aae6'],
                                vAxis: { title: 'Qty', minValue: 0, },
                                hAxis: { title: 'Month' },
                                seriesType: 'line',
                            }}

                            rootProps={{ 'data-testid': '1' }}
                        />
                }

            </div>
        );
    }
}

export default ProspectSince2016;
