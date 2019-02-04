import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Config from '../utils/Trackvia.config'
import TaskList from '../utils/TaskList'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';

import moment from 'moment'

class ProspectByTaskType extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Week', '2018', '2019']
                ],
            tasks: {
                setScaff: ['Week', '2018', '2019'],
                housewrap: ['Week', '2018', '2019'],
                stuccoColor: ['Week', '2018', '2019'],
                stuccoBrown: ['Week', '2018', '2019'],
                paperWire: ['Week', '2018', '2019'],
                siding: ['Week', '2018', '2019'],
                gutters: ['Week', '2018', '2019'],
                rock: ['Week', '2018', '2019'],
                soffitFascia: ['Week', '2018', '2019'],
                removeScaff: ['Week', '2018', '2019'],
            },
            type: 'Set Scaff',
            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.resultResponse = this.resultResponse.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }



    componentDidMount() {
        this.loadDataFromApi()
    }


    loadDataFromApi() {
        const { viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env)
        api.getView(viewId, { start: 0, max: 3000 }).then(this.resultResponse)
    }

    resultResponse(results) {

        const data = results.data
        console.log(data)
        let dataWraper = []
        if (Array.isArray(data)) {

            dataWraper = this.createDataForChart(data)

        }

        this.setState({
            loading: false,
            chartData: dataWraper.setScaff,
            tasks: dataWraper,

        }, () => {
            console.log(this.state)
        })


    }

    createDataForChart(data) {
        // try to print 53 weeks
        // console.log(data)

        let scaffWraper = [
            ['Week', '2018', '2019']
        ]
        let housewrapWraper = [
            ['Week', '2018', '2019']
        ]
        let brownWraper = [
            ['Week', '2018', '2019']
        ]
        let sColorWraper = [
            ['Week', '2018', '2019']
        ]
        let paintWraper = [
            ['Week', '2018', '2019']
        ]
        
        let targetReached = false
        for (let isoWeek = 1; isoWeek <= 53; isoWeek++) {
            let scaff = []
            let wrap = []
            let brown = []
            let sColor = []
            let paint = []
            for (let year = 2018; year <= 2019; year++) {
                const yearWeekLen = this.getTotalWeeksFromYear(year)
                if (isoWeek <= yearWeekLen) {
                    const week = this.getDateRangesFromWeekNumber(isoWeek, year)

                    const scaffQty = this.getTotalByWeekofTaskType('Completed Date/Time', week, data, 'Set Scaff')
                    const wrapQty = this.getTotalByWeekofTaskType('Completed Date/Time', week, data, 'Housewrap') 
                    const brownQty = this.getTotalByWeekofTaskType('Completed Date/Time', week, data, 'Stucco Brown') 
                    const sColorQty =  this.getTotalByWeekofTaskType('Completed Date/Time', week, data,'Stucco Color')
                    const paintQty = this.getTotalByWeekofTaskType('Completed Date/Time', week, data,'Paint')
                    
                    scaff.push(scaffQty)
                    wrap.push(wrapQty)
                    brown.push(brownQty)
                    sColor.push(sColorQty)
                    paint.push(paintQty)

                } else {
                    targetReached = true
                }

            }
            if (targetReached) break;
            scaffWraper.push([isoWeek, ...scaff])
            housewrapWraper.push([isoWeek, ...wrap])
            brownWraper.push([isoWeek, ...brown])
            sColorWraper.push([isoWeek, ...sColor])
            paintWraper.push([isoWeek, ...paint])
        }
        // console.log(weeksWraper)

        return {
            setScaff: scaffWraper,
            housewrap: housewrapWraper,
            brown: brownWraper,
            color: sColorWraper,
            paint: paintWraper,
            /*
            stuccoColor: ,
            stuccoBrown: ,
            paperWire: ,
            siding: ,
            gutters: ,
            rock: ,
            soffitFascia: ,
            removeScaff: ,
            */
        }
    }

    getTotalJobsByWeek(field, date, data) {
        return data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);
        }).length
    }

    getTotalByWeekofTaskType(field, date, data, type) {
        return data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);
        }).reduce((total, item) => {
            var v = 0
            if (item['Task Type'] === type) {
                v = 1
            }
            return total + v
        }, 0)
    }

    handleChange(event) {
        this.setState({ chartData: this.state.tasks[event.target.value], type: event.target.value });
    }

    getDateRangesFromWeekNumber(weekNumber, year) {

        var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
        var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(6, 'days')

        return { start: beginningOfWeek, end: endOfWeek }
    }

    getTotalWeeksFromYear(year) {
        return moment().set('year', year).isoWeeksInYear()
    }

    render() {
        const { type } = this.state
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

                            <FormControl component="fieldset" >
                                <RadioGroup style={{flexDirection:'row'}}
                                    value={type}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel value="setScaff" control={<Radio />} label="Set Scaff" />
                                    <FormControlLabel value="housewrap" control={<Radio />} label="Housewrap" />
                                    <FormControlLabel value="brown" control={<Radio />} label="Stucco Brown" />
                                    <FormControlLabel value="color" control={<Radio />} label="Stucco Color" />
                                    <FormControlLabel value="paint" control={<Radio />} label="Paint" />
                                </RadioGroup>
                            </FormControl>

                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: '100%', width: '100vw' }}>

                                <Chart
                                    width={'100%'}
                                    height={'40vh'}
                                    chartType="ComboChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: type + ' Qty',
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
                                        title: type + ' Qty',
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

export default ProspectByTaskType;
