import React, { Component } from 'react';
import Chart from 'react-google-charts';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
//import Chart from 'react-google-charts';

class AllTaskChart extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData: [
                [
                    { type: 'string', id: 'Client' },
                    { type: 'string', id: 'Job' },
                    { type: 'date', id: 'Start' },
                    { type: 'date', id: 'End' },
                ]
            ],
            loading: true,
        }

        this.loadDataFromApi = this.loadDataFromApi.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
    }

    componentDidMount() {


        this.loadDataFromApi()

    }

    loadDataFromApi() {


        let { viewId, id } = this.props



        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        const query = id //'134-Waters Edge-Woodside'
        if (id === 'all') {
            viewId = 950
            api.getView(950, { start: 0, max: 15000 }).then(this.responseHandler)
        } else {
            api.getView(viewId, { start: 0, max: 15000 }, query).then(this.responseHandler)
        }

        console.log('loadDataFromApi', viewId, id)

    }

    responseHandler(results) {
        let rows = []

        const data = results.data
        // console.log(results)
        if (Array.isArray(data)) {

            //console.log(data)
            data.forEach(item => {
                // console.log(, item['Task Status'], item['Team and Task']) //['Task Type'])
                // console.log( item)
                const jobName = item['Job']
                const start = item['Start Date/Time'] ? new Date(item['Start Date/Time']) : null
                let end
                let taskTitle = item['Task Type']
                if (item['Completed Date/Time']) {
                    end = new Date(item['Completed Date/Time'])
                } else {
                    end = new Date()
                    taskTitle += ' on Progress'
                }

                //console.log(taskTitle)
                //console.log('* start ' + start)
                //console.log( '* end '+end)
                //console.log('====')

                if (start && end && end > start) {

                    rows.push([jobName, taskTitle, start, end]);
                }

            })

            if (rows.length === 0) {
                // rows.push([query, "No Data to show", new Date(), new Date()]);
            }

            this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
                //console.log(this.state)
            })

        }




    }

    render() {
        const { loading, chartData } = this.state
        const loader = (<div style={{ 
            height: '79.8vh', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' }}>
            <div className="loader border-top-info"></div>
        </div>)
        
        if (loading) {
            return (loader)
        }
        else {
            return (<Chart
                width={'calc(100vw - 22px)'}
                height={'80.78vh'}
                chartType="Timeline"
                loader={loader}
                data={chartData}
                options={{
                    showRowNumber: true,
                }}
                rootProps={{ 'data-testid': '1' }}

                chartPackages={['corechart', 'controls']}
                controls={[
                    {
                        controlType: 'StringFilter',
                        options: {
                            filterColumnIndex: 0,
                            matchType: 'any', // 'prefix' | 'exact',
                            ui: {
                                label: 'Filter by name',
                            },
                        },
                    },

                    {
                        controlType: 'DateRangeFilter',
                        options: {
                            // Filter by the date axis.
                            filterColumnIndex: 2,

                        },
                        // Initial range: 2012-02-09 to 2012-03-20.
                        //'state': {'range': {'start': new Date(1380740460000), 'end': new Date(1380740480000)}}
                    },

                ]}

            />
            )
        }



    }
}

export default AllTaskChart;
