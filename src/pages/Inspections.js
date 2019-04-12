import React, { Component } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment'

import Views from '../utils/Views'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "material-ui-pickers"

import InspectionChart from '../reportsUI/InspectionChart'

class Inspections extends Component {


    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            data: [],
            loading: true,
            team: 'team',
            startDate: new Date(),
            endDate: new Date(),
        }

        this.responseHandler = this.responseHandler.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.setDates = this.setDates.bind(this)
    }
    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {

        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(Views.inspections, { start: 0, max: 15000 }).then(this.responseHandler)

        console.log('load data from view id: ', Views.inspections)

    }

    responseHandler(results) {
        const data = results.data
        const { match } = this.props

        const team = match.params.team ? match.params.team : 'team'
        // console.log(team)
        //let dataWraper = []
        if (Array.isArray(data)) {
            //dataWraper = this.createDataForChart(data)
            this.setDates(data)
            this.setState({ loading: false, team: team, data: data }, () => {
                //console.log(this.state)
            })
        }

    }

    setDates(data) {
        let dates = []
        data.forEach(item => {
            dates.push(new Date(item['Completed Date/Time']))
        })

        const maxDate = new Date(Math.max.apply(null, dates))
        const minDate = new Date(Math.min.apply(null, dates))

        this.setState({ startDate: minDate, endDate: maxDate })

    }

    filterByDate(data) {
        const { startDate, endDate } = this.state
        return data.filter(item => {
            // console.log(item['Completed Date/Time'])
            return moment(item['Completed Date/Time']).isBetween(startDate, endDate);
        })
    }

    createDataForChartTeam(dataTofilter) {

        const data = this.filterByDate(dataTofilter)

        let dataforChart = {
            chartData: [],
            summary: [],
        }

        if (Array.isArray(data)) {

            const teams = this.getTeams(data)

            teams.forEach(team => {
                let teamData = this.filterByTeam(team, data)
                const inspectionResults = this.getInspectionResult(teamData)
                dataforChart.chartData.push([
                    team,
                    inspectionResults.excellent,
                    inspectionResults.veryGood,
                    inspectionResults.sufficient,
                    inspectionResults.reallyBad,
                    inspectionResults.notComplete,
                    inspectionResults.summary,
                ])
                //dataforChart.summary.push(inspectionResults.summary)
            })

        }

        return dataforChart
    }

    createDataForChartSuper(dataTofilter) {

        const data = this.filterByDate(dataTofilter)

        let dataforChart = {
            chartData: [],
            summary: [],
        }

        if (Array.isArray(data)) {

            const teams = this.getSupers(data)

            teams.forEach(team => {
                let teamData = this.filterBySuper(team, data)
                const inspectionResults = this.getInspectionResult(teamData)
                dataforChart.chartData.push([
                    team,
                    inspectionResults.excellent,
                    inspectionResults.veryGood,
                    inspectionResults.sufficient,
                    inspectionResults.reallyBad,
                    inspectionResults.notComplete,
                    inspectionResults.summary,
                ])

                //dataforChart.summary.push(inspectionResults.summary)
            })

        }

        return dataforChart
    }

    getTeams(data) {
        let teams = []
        data.forEach(item => {
            if (!teams.includes(item['Task Team'])) {
                teams.push(item['Task Team'])
            }
        })
        return teams
    }

    getSupers(data) {
        let teams = []
        data.forEach(item => {
            if (!teams.includes(item['Cascade Superintendent'])) {
                teams.push(item['Cascade Superintendent'])
            }
        })
        return teams
    }

    filterByTeam(team, data) {
        return data.filter(item => item['Task Team'] === team)
    }

    filterBySuper(team, data) {
        return data.filter(item => item['Cascade Superintendent'] === team)
    }

    getInspectionResult(data) {
        /**
         * 
         5 - Excelente (Excellent) 
         4 - Muy Bien (Very Good) 
         3 - Suficiente (Sufficient) 
         2 - Deficiente (Deficient) 
         1 - Pesimo (Really Bad) 
         0 - No Terminado (Not Complete)
         */
        //Cascade Super Inspection Grade
        //Cascade Super Inspection Results
        //Task Team

        let inspectionResults = {
            excellent: 0,
            veryGood: 0,
            sufficient: 0,
            deficient: 0,
            reallyBad: 0,
            notComplete: 0,
            summary: []
        }

        if (Array.isArray(data)) {
            data.forEach(item => {
                switch (item['Cascade Super Inspection Grade']) {
                    case '5 - Excelente (Excellent)': inspectionResults.excellent += 1;
                        break;
                    case '4 - Muy Bien (Very Good)': inspectionResults.veryGood += 1;
                        break;
                    case '3 - Suficiente (Sufficient)': inspectionResults.sufficient += 1;
                        break;
                    case '2 - Deficiente (Deficient)': inspectionResults.deficient += 1;
                        break;
                    case '1 - Pesimo (Really Bad)': inspectionResults.reallyBad += 1;
                        break;
                    default: inspectionResults.notComplete += 1;

                }
                inspectionResults.summary.push(item)
                //console.log(item['Cascade Super Inspection Grade'])
            })

        }
        return inspectionResults
    }

    sortData(data) {
        return data.sort((a, b) => {
            var a1 = a[2];
            var b1 = b[2];
            if (a1 === b1) return 0;
            return a1 > b1 ? -1 : 1;
        });
    }

    getCharts(data) {
        //console.log(data)
        let toRet = []
        const colors = ['#FFBC42', '#006BA6', '#0496FF', '#D81159', '#8F2D56']
        const loader = <div className="loader border-top-info"></div>
        if (Array.isArray(data.chartData)) {
            this.sortData(data.chartData).forEach((item, index) => {
                //console.log(item[0] , index)
                const header = [[
                    'Team',
                    'Excellent',
                    'Very Good',
                    'Sufficient',
                    'Really Bad',
                    'Not Complete',
                ]]
                const barChartData = [...header,
                    [
                        item[0],
                        item[1],
                        item[2],
                        item[3],
                        item[4],
                        item[5],
                    ]
                ]
                const pieChartData = [
                    ['Inspection', 'Score'],
                    ['Excellent', item[1]],
                    ['Very Good', item[2]],
                    ['Sufficient', item[3]],
                    ['Really Bad', item[4]],
                    ['Not Complete', item[5]],
                ]


                const tableChartData = this.getTableData(item[6])



                toRet.push(<InspectionChart
                    loader={loader}
                    colors={colors}
                    barChartData={barChartData}
                    pieChartData={pieChartData}
                    tableChartData={tableChartData}
                    key={item[0] + index} index={index} />)
            })

        }
        return toRet

    }

    getSuperCharts(data) {
        // console.log(chartData)

        let toRet = []
        const colors = ['#FFBC42', '#006BA6', '#0496FF', '#D81159', '#8F2D56']
        const loader = <div className="loader border-top-info"></div>
        if (Array.isArray(data.chartData)) {
            this.sortData(data.chartData).forEach((item, index) => {
                //console.log(item[0] , index)
                const header = [[
                    'Team',
                    'Excellent',
                    'Very Good',
                    'Sufficient',
                    'Really Bad',
                    'Not Complete',
                ]]
                const barChartData = [...header,
                    [
                        item[0],
                        item[1],
                        item[2],
                        item[3],
                        item[4],
                        item[5],
                    ]
                ]
                const pieChartData = [
                    ['Inspection', 'Score'],
                    ['Excellent', item[1]],
                    ['Very Good', item[2]],
                    ['Sufficient', item[3]],
                    ['Really Bad', item[4]],
                    ['Not Complete', item[5]],
                ]

                const tableChartData = this.getTableData(item[6])

                // console.log(tableChartData)

                toRet.push(<InspectionChart
                    loader={loader}
                    colors={colors}
                    barChartData={barChartData}
                    pieChartData={pieChartData}
                    tableChartData={tableChartData}
                    key={item[0] + index} />)
            })

        }
        return toRet

    }

    getTableData(data) {

        const header = [
            'Record ID',
            'Task Status',
            'Cascade Superintendent',
            'Task Team',
            'Builder Plan Name',
            'Super Inspection Log',           
        ]

        let rowData = [
            header
        ]

        data.forEach((row) => {
            // console.log(row)
            let linha = []
            header.forEach(item => {
                linha.push(row[item])
            })
            rowData.push(linha)
        })

        return rowData
    }

    handleDateChange(target, value) {
        let updated = this.state
        updated[target] = value
        this.setState(updated)
    }

    getDateFilter() {
        const { startDate, endDate } = this.state
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <DateTimePicker keyboard helperText="From" value={startDate} onChange={(date) => { this.handleDateChange('startDate', date) }} />
                    <DateTimePicker keyboard helperText="to" value={endDate} onChange={(date) => { this.handleDateChange('endDate', date) }} />
                </div>
            </MuiPickersUtilsProvider>
        )
    }

    render() {
        const { loading, team, data } = this.state
        let dataforChart = {
            chartData: [],
            summary: [],
        }

        if (team === 'team') {
            dataforChart = this.createDataForChartTeam(data)
        } else {
            dataforChart = this.createDataForChartSuper(data)
        }

        return (
            <div>{
                loading ?
                    <div className="loader border-top-info"></div>
                    :
                    <div>
                        {this.getDateFilter()}
                        {team === 'team' ? this.getCharts(dataforChart) : this.getSuperCharts(dataforChart)}
                    </div>
            }</div>

        )
    }

}
export default Inspections