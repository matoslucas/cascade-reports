import React, { Component } from 'react';
import moment from 'moment'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';

const START_DATE = 'Start Date/Time'
const END_DATE = 'Completed Date/Time'

class ProspectBySeason extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Week', '2018', '2019']
                ],

            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.resultResponse = this.resultResponse.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {
        const { viewId } = this.props
        console.log('Tarckvia View Id: ' + viewId)
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env)
        api.getView(viewId, { start: 0, max: 15000 }).then(this.resultResponse)
    }

    getDate(value) {
        return value ? new Date(value) : 0
    }

    resultResponse(results) {

        console.log('resultResponse')
        const data = this.createDataForChart(results.data)

        console.log(data)

        this.setState({
            chartData: data,
            loading: false,
        })

    }

    createDataForChart(data) {

        let header = ['Plan Name', 'Duration']
        let newData = []

        let summerData = []
        let winterData = []

        if (Array.isArray(data)) {

            for (let item of data) {
                // const builderPlanName = item['Builder Plan Name']
                var e =data.filter(v => {
                    return v['Builder Plan Name'] === item['Builder Plan Name']
                })
                console.log('===', e)
            }

            data.filter(item => {
                return item['Task Type'] === 'Set Scaff' && item['Builder Name'] === 'Woodside'
            }).forEach(item => {

                const start = this.getDate(item[START_DATE])
                const end = this.getDate(item[END_DATE])
                const duration = moment.duration(moment(end).diff(start)).asHours()
                const builderPlanName = item['Builder Plan Name']
                const taskType = item['Task Type']

                // console.log(builderPlanName, item)

                if (builderPlanName && (duration > 0) && isNaN(builderPlanName)) {

                    if (moment(start).isDST()) {
                        // summer
                        summerData.push([builderPlanName, duration])
                    } else {
                        // winter
                        winterData.push([builderPlanName, duration])
                    }

                }

            })

        }

        //console.log(summerData)

        summerData.forEach(item => {

            var row = winterData.filter(value => {
                // console.log(value[0])
                return value[0] === item[0]
            })
            console.log(row)
        })

        // newData.push([header, ...summerData, ...winterData])
        // newData.push([header, ...winterData])

        return [header, ...summerData, ...winterData]

    }

    render() {
        return (
            <div className="d-flex justify-content-center" >
                {
                    this.state.loading ?
                        <div className="loader border-top-info"></div>
                        :
                        <Chart
                            width={'100vw'}
                            height={'70vh'}
                            chartType="LineChart"
                            loader={<div className="loader border-top-info"></div>}

                            data={this.state.chartData}

                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                }
            </div>
        )
    }

}
export default ProspectBySeason