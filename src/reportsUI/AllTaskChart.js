import React, { Component } from 'react';
import Chart from 'react-google-charts';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import moment from 'moment'
//import Chart from 'react-google-charts';

const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);


class AllTaskChart extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData: [
                [
                    { type: 'string', id: 'Client' },
                    { type: 'string', id: 'Job' },
                    { type: 'string', role: 'tooltip', p: { html: true } },
                    { type: 'date', id: 'Start' },
                    { type: 'date', id: 'End' },
                ]
            ],
            loading: true,
            viewId: 0,
        }

        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.responseHandler = this.responseHandler.bind(this)
        this.goToTasksDetailPage = this.goToTasksDetailPage.bind(this)
    }

    componentDidMount() {


        this.loadDataFromApi()

    }

    loadDataFromApi() {


        let { viewId, id } = this.props


        let query = id //'134-Waters Edge-Woodside'
        if (id === 'all') {
            viewId = 968
            query = ''

        } else if (id === 'active') {
            viewId = 950
            query = ''
        }

        api.getView(viewId, { start: 0, max: 15000 }, query).then(this.responseHandler)
        this.setState({ viewId: viewId })

        console.log('loadDataFromApi', viewId, id)

    }

    getSVG(value){
        const clock = '<svg  width="24" height="24" viewBox="0 0 24 24">'+
        '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>'+
        '<path d="M0 0h24v24H0z" fill="none"/>'+
        '<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>'+
        '</svg>'
        const timer ='<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>'
        let toRet =''
        switch(value) {
            case 'clock': toRet = clock
              break;
            case 'timer': toRet = timer
              break;
            default: toRet = ''
          }
        return toRet
    }

    createCustomHTMLContent(flagURL, totalGold, totalSilver, totalBronze) {
        return '<div style="padding:5px 5px 5px 5px;">' +
            //'<img src="' + flagURL + '" style="width:75px;height:50px"><br/>' +
            '<table class="medals_layout"><tr>' +
            '<td>'+this.getSVG('clock')+'</td>' +
            '<td nowrap align="justify"><b>' + totalGold + '</b></td></tr><tr>' +
            '<td>'+this.getSVG('clock')+'</td>' +
            '<td nowrap align="justify"><b>' + totalSilver + '</b></td></tr><tr>' +
            '<td>'+this.getSVG('timer')+'</td>' +
            '<td nowrap align="justify"><b>' + totalBronze + '</b></td></tr></table></div>';
    }

    responseHandler(results) {
        let rows = []

        const data = results.data
        // console.log(results)
        if (Array.isArray(data)) {

            // console.log(data)
            data.forEach(item => {
                // console.log(, item['Task Status'], item['Team and Task']) //['Task Type'])

                const jobName = item['Job'] + ' | ' + String(item['Cascade Superintendent']).replace(/[^a-zA-Z ]/g, '')
                const start = item['Start Date/Time'] ? new Date(item['Start Date/Time']) : null
                let end
                let taskTitle = item['Task Type'] + ' | ' + item['Team Name']
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

                    //console.log(item)
                    // const { viewId } = this.state
                    let url = ''
                    /*
                    api.getFile(viewId, item['id'], 'Photo at Task Completion', { maxDimension: 150 }).then((data) => {
                        // console.log(data.message.body)
                        if (data.message.body) {
                            const reader = data.message.body.getReader()
                            let u8 = [];

                            reader.read()
                                .then(function processText({ done, value }) {
                                    if (done) { return; }

                                    u8 = [...u8, ...value];
                                    //return reader.read().then(processText);
                                });

                            const binary = '';
                            u8.forEach(byte => {
                                binary += String.fromCharCode(byte);
                            });

                            const b64 = btoa(binary);

                            // imageElement.src = `data:image/png;base64,${b64}`;
                            url = `data:image/png;base64,${b64}`;
                            console.log(url)
                        }

                    })*/

                    var duration = moment.duration(moment(end).diff(start))
                    var h = moment.duration(duration, "minutes").humanize() + ' | ' + Math.round(duration.asHours()) + ' hours'

                    rows.push([
                        jobName,
                        taskTitle,
                        this.createCustomHTMLContent(
                            url,
                            moment(start).format('llll'),
                            moment(end).format('llll'),
                            h),
                        start,
                        end]);
                }

            })

            if (rows.length === 0) {
                // rows.push([query, "No Data to show", new Date(), new Date()]);
            }

            this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
               // console.log(this.state)
            })

        }




    }

    goToTasksDetailPage(id) {
        console.log(id)
       // const chunk = String(id).split('|')
        // console.log(this.props)
        //const { selectClickHandler } = this.props

        //selectClickHandler(chunk[0]);
    }

    render() {
        const { loading, chartData } = this.state
        const loader = (<div style={{
            height: '79.8vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
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
                    tooltip: { isHtml: true },
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
                            filterColumnIndex: 3,

                        },
                        // Initial range: 2012-02-09 to 2012-03-20.
                        //'state': {'range': {'start': new Date(1380740460000), 'end': new Date(1380740480000)}}
                    },

                ]}

                chartEvents={[
                    {
                        eventName: 'select',
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart()
                            const selection = chart.getSelection()

                            if (selection.length === 1) {
                                const [selectedItem] = selection
                                const dataTable = chartWrapper.getDataTable()
                                //console.log(dataTable.getValue(0, 0))
                                const { row } = selectedItem
                                // console.log(row, column, dataTable.getValue(row, 0))
                                const value = dataTable.getValue(row, 0)
                                this.goToTasksDetailPage(value)

                            }

                        },
                    },
                ]}

            />
            )
        }



    }
}

export default AllTaskChart;
