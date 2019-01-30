import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';
import Months from '../utils/Months'

import moment from 'moment'

class ProspectByWeeks extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Week', '2018']
                ],
            jobs: [
                ['Week', '2018']
            ],
            homes: [
                ['Week', '2018']
            ],
            showHomes: false,
            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.toggleData = this.toggleData.bind(this)
    }



    componentDidMount() {

        for (let i = 2008; i <= 2020; i++) {
            console.log(
                this.getTotalWeeksFromYear(i)
            )
        }
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
                let rows = []

                const data = results.data

                const y2018Len = this.getTotalWeeksFromYear(2018);
                const y2019Len = this.getTotalWeeksFromYear(2019);

                let weeks = [];

                for (let i = 1; i <= y2018Len; i++) {
                    //console.log(i);
                    weeks.push(
                        this.getDateRangesFromWeekNumber(i, 2018)
                    )
                }

                /*
                for (let i = 1; i <= y2019Len; i++) {
                    //console.log(i);
                    weeks.push(
                        this.getDateRangesFromWeekNumber(i, 2019)
                    )
                }
                */

                // console.log(weeks)

                // console.log(data)


                if (Array.isArray(data)) {

                    /* Array format sample 
                    // ['1 Jan to 7 Jan', x, y]
                    // ['8 Jan to 14 Jan', x, y]
                    */

                    
                    weeks.forEach((week, index) => {
                       
                      
                        const qty = this.getTotalJobsFromWeek('Re-4-Way Date', week, data)
                        console.log(
                            week.start.format('DD-MMM') ,
                            qty
                            )
                        var name = Number(index+1) //week.start.format('DD-MMM') +' to '+  week.start.format('DD-MMM-YYYY')
                        rows.push([ name, qty])

                    })
                    
                    /*
                    var year = 2018
                    var weekNumber = 1
                    var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
                    var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(6, 'days')

                    console.log(
                        'test',
                        moment('2018-01-05').isBetween(beginningOfWeek, endOfWeek)
                    )
                    */

                    /*
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
                          */

                }


                
                  _self.setState({
                      loading: false,
                      chartData: [...this.state.chartData, ...rows],
                   
                  }, () => {
                      //console.log(this.state)
                  })
                  


            })
    }

    getTotalJobsFromWeek(field, date, data) {
        return data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);

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

    getDateRangesFromWeekNumber(weekNumber, year) {

        var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
        var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(6, 'days')

        // console.log(beginningOfWeek.format('ll'));
        // console.log(endOfWeek.format('ll'));

        return { start: beginningOfWeek, end: endOfWeek }
    }

    getTotalWeeksFromYear(year) {
        return moment().set('year', year).isoWeeksInYear()
    }

    render() {
        const { showHomes } = this.state
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
                                        title: showHomes ? 'Jobs Qty' : 'Housing Units',
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

export default ProspectByWeeks;
