import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
            jobs: [
                ['Month', '2016', '2017', '2018']
            ],
            homes: [
                ['Month', '2016', '2017', '2018']
            ],
            showHomes: false,
            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.toggleData = this.toggleData.bind(this)
    }



    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {
        const { viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        const _self = this
        api.getView(viewId, { start: 0, max: 3000 })
            .then(results => {
                let homes = []
                let jobs = []

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
                        let mmJobs = []
                        Months.getYears().forEach(y => {
                            const val = y + "-" + m.value

                            const qty = this.getTotalJobsComplexity('Re-4-Way Date', val, data)
                            const jobsQty = this.getTotalJobsFromMonth('Re-4-Way Date', val, data)
                            // console.log(val, jobsQty, qty)
                            mm.push(qty)
                            mmJobs.push(jobsQty)
                        })
                        homes.push([m.name, ...mm])
                        jobs.push([m.name, ...mmJobs])
                    })

                }


                _self.setState({
                    loading: false,
                    chartData: [...this.state.chartData, ...homes],
                    homes: [...this.state.chartData, ...homes],
                    jobs: [...this.state.chartData, ...jobs]
                }, () => {
                    //console.log(this.state)
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

    toggleData() {
        const { showHomes, homes, jobs } = this.state
        if (showHomes) {
            this.setState({ chartData: homes, showHomes: false })
        } else {
            this.setState({ chartData: jobs, showHomes: true })
        }
    }

    render() {
        const { showHomes } = this.state
        return (
            <div className="d-flex justify-content-center" style={{ height: '90vh', width: '100vw' }}>
                {
                    this.state.loading ?
                        <div className="loader border-top-info"></div>
                        : <div style={{width: '100%'}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showHomes}
                                        onChange={this.toggleData}
                                        color="primary"
                                    />
                                }
                                label={'Housing Units vs. Jobs Qty'}
                            />

                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: '100%', width: '100vw' }}>

                                <Chart
                                    width={'100%'}
                                    height={'40vh'}
                                    chartType="ComboChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: showHomes ? 'Jobs Qty': 'Housing Units',
                                        colors: ['#b7c0ca', '#74797d', '#00aae6'],
                                        vAxis: { title: 'Qty', minValue: 0, },
                                        hAxis: { title: 'Month' },
                                        seriesType: 'line',
                                        animation: {
                                            duration: 1000,
                                            easing: 'out',
                                            startup: true,
                                        },
                                    }}

                                    rootProps={{ 'data-testid': '1' }}
                                />
                                <Chart
                                    width={'100%'}
                                    height={'40vh'}
                                    chartType="ComboChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: showHomes ? 'Jobs Qty': 'Housing Units',
                                        colors: ['#b7c0ca', '#74797d', '#00aae6'],
                                        vAxis: { title: 'Qty', minValue: 0, },
                                        hAxis: { title: 'Month' },
                                        seriesType: 'bars',
                                        animation: {
                                            duration: 1000,
                                            easing: 'out',
                                            startup: true,
                                        },
                                    }}

                                    rootProps={{ 'data-testid': '2' }}
                                />
                            </div>
                        </div>
                }

            </div>
        );
    }
}

export default ProspectSince2016;
