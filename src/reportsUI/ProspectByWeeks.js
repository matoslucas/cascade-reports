import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';

import { getDateRangesFromWeekNumber, getTotalWeeksFromYear } from '../utils/common'

import moment from 'moment'

class ProspectByWeeks extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Week', '2018', '2019']
                ],
            jobs:
                [
                    ['Week', '2018', '2019']
                ],
            homes:
                [
                    ['Week', '2018', '2019']
                ],
            showHomes: false,
            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.responseHandler = this.responseHandler.bind(this)
        this.toggleData = this.toggleData.bind(this)
    }



    componentDidMount() {
        this.loadDataFromApi()
    }


    loadDataFromApi() {
        const { viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(viewId, { start: 0, max: 5000 }).then(this.responseHandler)
    }

    responseHandler(results) {
        const data = results.data
        let dataWraper = []
        if (Array.isArray(data)) {
            dataWraper = this.createDataForChart(data)
        }

        this.setState({
            loading: false,
            chartData: [...this.state.chartData, ...dataWraper.homes],
            homes: [...this.state.chartData, ...dataWraper.homes],
            jobs: [...this.state.chartData, ...dataWraper.jobs]

        }, () => {
            //console.log(this.state)
        })

    }

    createDataForChart(data) {
        // try to print 53 weeks
        // console.log(data)

        let jobsWraper = []
        let homesWraper = []
        let targetReached = false
        for (let isoWeek = 1; isoWeek <= 53; isoWeek++) {
            let jobs = []
            let homes = []
            for (let year = 2018; year <= 2019; year++) {
                const yearWeekLen = getTotalWeeksFromYear(year)
                if (isoWeek <= yearWeekLen) {
                    const week = getDateRangesFromWeekNumber(isoWeek, year)

                    const jobsQty = this.getTotalJobsByWeek('Re-4-Way Date', week, data)
                    const homesQty = this.getTotalHomesByWeek('Re-4-Way Date', week, data)

                    jobs.push(jobsQty)
                    homes.push(homesQty)

                } else {
                    targetReached = true
                }

            }
            if (targetReached) break;
            jobsWraper.push([isoWeek, ...jobs])
            homesWraper.push([isoWeek, ...homes])
        }
        // console.log(weeksWraper)
        return {
            jobs: jobsWraper,
            homes: homesWraper
        }
    }

    getTotalJobsByWeek(field, date, data) {
        return data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);
        }).length
    }

    getTotalHomesByWeek(field, date, data) {
        return data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);
        }).reduce((total, item) => {
            let value = item['Complexity (# of Plexes)'] ? item['Complexity (# of Plexes)'] : 0
            let v = Number(value)
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
    /*
        getDateRangesFromWeekNumber(weekNumber, year) {
    
            var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
            var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(6, 'days')
    
            return { start: beginningOfWeek, end: endOfWeek }
        }
    */
    /*
        getTotalWeeksFromYear(year) {
            return moment().set('year', year).isoWeeksInYear()
        }
    */
    render() {
        const { showHomes } = this.state
        const chartColors = ['#b7c0ca', '#00aae6', '#74797d',]
        const vAxis = { title: 'Qty', minValue: 0, }
        const hAxis = { title: 'Week' }
        const trendLineForChart = {
            0: {
                type: 'polynomial',
                visibleInLegend: false,
                color: 'red'
            }
            ,
            1: {
                type: 'polynomial',
                visibleInLegend: false,
                color: 'orange'
            }
        }
        return (
            <div className="d-flex justify-content-center" style={{ height: '90vh', width: '100vw' }}>
                {
                    this.state.loading ?
                        <div className="loader border-top-info"></div>
                        : <div style={{ width: '100%' }}>
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
                                        title: showHomes ? 'Jobs Qty' : 'Housing Units',
                                        colors: chartColors,
                                        trendlines: trendLineForChart,   // Draw a trendline for data series 0.
                                        vAxis: vAxis,
                                        hAxis: hAxis,
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
                                        title: showHomes ? 'Jobs Qty' : 'Housing Units',
                                        colors: chartColors,
                                        trendlines: trendLineForChart,   // Draw a trendline for data series 0.
                                        vAxis: vAxis,
                                        hAxis: hAxis,
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

export default ProspectByWeeks;
