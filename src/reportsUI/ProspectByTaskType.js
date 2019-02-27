import React, { Component } from 'react';
import TaskRadioGroup from '../comps/TaskRadioGroup'
/*
import worker from '../workers/app.worker';
import WebWorker from '../workers/WebWorker';
*/
import Config from '../utils/Trackvia.config'
// import TaskList from '../utils/TaskList'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';

import { getTotalByWeekofTaskTypeWraper, getDateRangesFromWeekNumber, getTotalWeeksFromYear } from '../utils/common'

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
            type: props.showMain ? 'setScaff' : 'lathInspection',
            loading: true,
            progressLabel: 'Loading...',
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
        console.log('Tarckvia View Id: ' + viewId)
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env)
        api.getView(viewId, { start: 0, max: 15000 }).then(this.resultResponse)
    }

    resultResponse(results) {

        console.log('resultResponse')


        const data = results.data
        // console.log(data)
        this.setState({
            progressLabel: 'Parsing data ...'
        })

        let dataWraper = []
        if (Array.isArray(data)) {

            dataWraper = this.createDataForChart(data)
            /*
            this.worker = new WebWorker(worker);
            console.log(data)
            this.worker.postMessage(data);

            this.worker.addEventListener('message', event => {
                // const sortedList = event.data;
                console.log('App', event.data)
                dataWraper = event.data;

                this.setState({
                    loading: false,
                    chartData: dataWraper.setScaff,
                    tasks: dataWraper,
        
                }, () => {
                    // console.log(this.state)
                })

            });
            */
            this.setState({
                loading: false,
                chartData: dataWraper.setScaff,
                tasks: dataWraper,

            }, () => {
                // console.log(this.state)
            })

        }

    }

    createDataForChart(data) {
        // try to print 53 weeks
        // console.log(data)


        let setScaff = [['Week', '2018', '2019']]
        let paperWire = [['Week', '2018', '2019']]
        let housewrap = [['Week', '2018', '2019']]
        let lathInspection = [['Week', '2018', '2019']]
        let weatherBarrierInspection = [['Week', '2018', '2019']]
        let tentHeat = [['Week', '2018', '2019']]
        let stuccoBrown = [['Week', '2018', '2019']]
        let watering = [['Week', '2018', '2019']]
        let jChannel = [['Week', '2018', '2019']]
        let siding = [['Week', '2018', '2019']]
        let specialCorbels = [['Week', '2018', '2019']]
        let paint = [['Week', '2018', '2019']]
        let rock = [['Week', '2018', '2019']]
        let brick = [['Week', '2018', '2019']]
        let soffitFascia = [['Week', '2018', '2019']]
        let stuccoColor = [['Week', '2018', '2019']]
        let shutters = [['Week', '2018', '2019']]
        let miscWork = [['Week', '2018', '2019']]
        let cleanup = [['Week', '2018', '2019']]
        let gutters = [['Week', '2018', '2019']]
        let vpoWork = [['Week', '2018', '2019']]
        let warrantyWork = [['Week', '2018', '2019']]
        let touchUps = [['Week', '2018', '2019']]
        let removeScaff = [['Week', '2018', '2019']]
        let foundationPlaster = [['Week', '2018', '2019']]
        let finalInspection = [['Week', '2018', '2019']]


        let targetReached = false
        for (let isoWeek = 1; isoWeek <= 53; isoWeek++) {
            const tasksWraper = {
                setScaff: [],
                paperWire: [],
                housewrap: [],
                lathInspection: [],
                weatherBarrierInspection: [],
                tentHeat: [],
                stuccoBrown: [],
                watering: [],
                jChannel: [],
                siding: [],
                specialCorbels: [],
                paint: [],
                rock: [],
                brick: [],
                soffitFascia: [],
                stuccoColor: [],
                shutters: [],
                miscWork: [],
                cleanup: [],
                gutters: [],
                vpoWork: [],
                warrantyWork: [],
                touchUps: [],
                removeScaff: [],
                foundationPlaster: [],
                finalInspection: [],
            }

            for (let year = 2018; year <= 2019; year++) {
                const yearWeekLen = getTotalWeeksFromYear(year)
                if (isoWeek <= yearWeekLen) {
                    const week = getDateRangesFromWeekNumber(isoWeek, year)
                    //console.log(isoWeek, week)
                    var alltypes = getTotalByWeekofTaskTypeWraper('Completed Date/Time', week, data)

                    // console.log(alltypes)

                    tasksWraper.setScaff.push(alltypes.setScaff.total)
                    tasksWraper.paperWire.push(alltypes.paperWire.total)
                    tasksWraper.housewrap.push(alltypes.housewrap.total)
                    tasksWraper.lathInspection.push(alltypes.lathInspection.total)
                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection.total)
                    tasksWraper.tentHeat.push(alltypes.tentHeat.total)
                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown.total)
                    tasksWraper.watering.push(alltypes.watering.total)
                    tasksWraper.jChannel.push(alltypes.jChannel.total)
                    tasksWraper.siding.push(alltypes.siding.total)
                    tasksWraper.specialCorbels.push(alltypes.specialCorbels.total)
                    tasksWraper.paint.push(alltypes.paint.total)
                    tasksWraper.rock.push(alltypes.rock.total)
                    tasksWraper.brick.push(alltypes.brick.total)
                    tasksWraper.soffitFascia.push(alltypes.soffitFascia.total)
                    tasksWraper.stuccoColor.push(alltypes.stuccoColor.total)
                    tasksWraper.shutters.push(alltypes.shutters.total)
                    tasksWraper.miscWork.push(alltypes.miscWork.total)
                    tasksWraper.cleanup.push(alltypes.cleanup.total)
                    tasksWraper.gutters.push(alltypes.gutters.total)
                    tasksWraper.vpoWork.push(alltypes.vpoWork.total)
                    tasksWraper.warrantyWork.push(alltypes.warrantyWork.total)
                    tasksWraper.touchUps.push(alltypes.touchUps.total)
                    tasksWraper.removeScaff.push(alltypes.removeScaff.total)
                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster.total)
                    tasksWraper.finalInspection.push(alltypes.finalInspection.total)

                } else {
                    targetReached = true
                }

            }
            if (targetReached) break;
            setScaff.push([isoWeek, ...tasksWraper.setScaff])
            paperWire.push([isoWeek, ...tasksWraper.paperWire])
            housewrap.push([isoWeek, ...tasksWraper.housewrap])
            lathInspection.push([isoWeek, ...tasksWraper.lathInspection])
            weatherBarrierInspection.push([isoWeek, ...tasksWraper.weatherBarrierInspection])
            tentHeat.push([isoWeek, ...tasksWraper.tentHeat])
            stuccoBrown.push([isoWeek, ...tasksWraper.stuccoBrown])
            watering.push([isoWeek, ...tasksWraper.watering])
            jChannel.push([isoWeek, ...tasksWraper.jChannel])
            siding.push([isoWeek, ...tasksWraper.siding])
            specialCorbels.push([isoWeek, ...tasksWraper.specialCorbels])
            paint.push([isoWeek, ...tasksWraper.paint])
            rock.push([isoWeek, ...tasksWraper.rock])
            brick.push([isoWeek, ...tasksWraper.brick])
            soffitFascia.push([isoWeek, ...tasksWraper.soffitFascia])
            stuccoColor.push([isoWeek, ...tasksWraper.stuccoColor])
            shutters.push([isoWeek, ...tasksWraper.shutters])
            miscWork.push([isoWeek, ...tasksWraper.miscWork])
            cleanup.push([isoWeek, ...tasksWraper.cleanup])
            gutters.push([isoWeek, ...tasksWraper.gutters])
            vpoWork.push([isoWeek, ...tasksWraper.vpoWork])
            warrantyWork.push([isoWeek, ...tasksWraper.warrantyWork])
            touchUps.push([isoWeek, ...tasksWraper.touchUps])
            removeScaff.push([isoWeek, ...tasksWraper.removeScaff])
            foundationPlaster.push([isoWeek, ...tasksWraper.foundationPlaster])
            finalInspection.push([isoWeek, ...tasksWraper.finalInspection])
        }


        return {
            setScaff,
            paperWire,
            housewrap,
            lathInspection,
            weatherBarrierInspection,
            tentHeat,
            stuccoBrown,
            watering,
            jChannel,
            siding,
            specialCorbels,
            paint,
            rock,
            brick,
            soffitFascia,
            stuccoColor,
            shutters,
            miscWork,
            cleanup,
            gutters,
            vpoWork,
            warrantyWork,
            touchUps,
            removeScaff,
            foundationPlaster,
            finalInspection,
        }
    }


    
    handleChange(event) {
        this.setState({ chartData: this.state.tasks[event.target.value], type: event.target.value });
    }
    
    render() {
        const { type, progressLabel } = this.state
        console.log(progressLabel)
        const { showMain } = this.props
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

                            <TaskRadioGroup onChange={this.handleChange} type={type} filter={showMain ? 'Main' : 'Secondary'} />


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
