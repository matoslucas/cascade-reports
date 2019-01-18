import React, { Component } from 'react';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';
import getMonthsByYear from '../utils/Months'


class ProspectReport extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Month', 'Jobs', 'Housing Units']
                ],
            loading: true,
        }
        //this.handleClick = this.handleClick.bind(this);
    }



    componentDidMount() {
        const { year, viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView( viewId , { start: 0, max: 1500 })
            .then(results => {
                let rows = []


                const data = results.data
                // console.log(data)

                if (Array.isArray(data)) {

                    getMonthsByYear(year).forEach(item => {

                        rows.push([
                            item.name,
                            this.getTotalJobsFromMonth('Re-4-Way Date', item.value, data),
                            this.getTotalJobsComplexity('Re-4-Way Date', item.value, data),
                        ])
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
        const { year } = this.props
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height:'60vh', width: '100vw'}}>
                {
                    this.state.loading ?
                    <div className="loader border-top-info"></div> :
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="ComboChart"
                            loader={<div class="loader border-top-info"></div>}
                            data={this.state.chartData}

                            options={{
                                title: year+' | Jobs vs. Housing Units',
                                colors: ['#00aae6', '#74797d'],
                                vAxis: { title: 'Qty', minValue: 0, },
                                hAxis: { title: 'Month' },
                                seriesType: 'bars',
                              }}

                            rootProps={{ 'data-testid': '1' }}
                        />
                }

            </div>
        );
    }
}

export default ProspectReport;
