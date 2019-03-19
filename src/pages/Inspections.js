import React, { Component } from 'react';
import Chart from 'react-google-charts';

import Views from '../utils/Views'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'


class Inspections extends Component {


    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData: [
                [
                    'Team',
                    'Excellent',
                    'Very Good',
                    'Sufficient',
                    'Really Bad',
                    'Not Complete',
                ]
            ],
            loading: true,
        }


        this.responseHandler = this.responseHandler.bind(this);
    }
    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {


        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(Views.inspections, { start: 0, max: 15000 }).then(this.responseHandler)

        console.log('loadDataFromApi', Views.inspections)

    }

    responseHandler(results) {
        const data = results.data
        let dataWraper = []
        if (Array.isArray(data)) {
            dataWraper = this.createDataForChart(data)
        }

        this.setState({ loading: false, chartData: dataWraper }, () => {
            console.log(this.state)
        })


    }

    createDataForChart(data) {

        let chartData = [[
            'Team',
            'Excellent',
            'Very Good',
            'Sufficient',
            'Really Bad',
            'Not Complete',
        ]]
        if (Array.isArray(data)) {

            const teams = this.getTeams(data)

            teams.forEach(team => {
                let teamData = this.filterByTeam(team, data)
                const inspectionResults = this.getInspectionResult(teamData)
                chartData.push([
                    team,
                    inspectionResults.excellent,
                    inspectionResults.veryGood,
                    inspectionResults.sufficient,
                    inspectionResults.reallyBad,
                    inspectionResults.notComplete,
                ])
            })

        }

        return chartData
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

    filterByTeam(team, data) {
        return data.filter(item => item['Task Team'] === team)
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
                //console.log(item['Cascade Super Inspection Grade'])
            })

        }
        return inspectionResults
    }

    render() {
        const { loading, chartData } = this.state
        return (

            <Chart
                width={'80vw'}
                height={'900vh'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'Inspections',
                    vAxis: { title: 'Qty' },
                    hAxis: { title: 'Teams' },
                    seriesType: 'bars',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }

}
export default Inspections