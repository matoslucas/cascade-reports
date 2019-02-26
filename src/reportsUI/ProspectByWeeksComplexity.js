import React, { Component } from 'react';
import TaskRadioGroup from '../comps/TaskRadioGroup'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';
import { getTotalByWeekofTaskTypeWraper, getDateRangesFromWeekNumber, getTotalWeeksFromYear } from '../utils/common'

class ProspectByWeeksComplexity extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        /* 
        week, 
        Complexity 2018, 
        Complexity 2019,
        Task type 2018,
        Task Type  2019,
        */
        this.state = {
            chartData: [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']],
            tasks: {},
            type: 'setScaff',
            loading: true,
        }
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.resultResponse = this.resultResponse.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleData = this.toggleData.bind(this)
    }

    componentDidMount() {
        this.loadDataFromApi()
    }

    loadDataFromApi() {
        const { viewId } = this.props
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        console.log('load view ID: ', viewId )
        api.getView(viewId, { start: 0, max: 15000 }).then(this.resultResponse)

    }

    resultResponse(results) {
        const data = results.data

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
        //console.log(data)

        let setScaff = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let paperWire = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let housewrap = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let lathInspection = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let weatherBarrierInspection = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let tentHeat = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let stuccoBrown = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let watering = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let jChannel = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let siding = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let specialCorbels = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let paint = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let rock = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let brick = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let soffitFascia = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let stuccoColor = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let shutters = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let miscWork = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let cleanup = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let gutters = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let vpoWork = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let warrantyWork = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let touchUps = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let removeScaff = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let foundationPlaster = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]
        let finalInspection = [['Week', 'Complexity 2018,', 'Task 2018', 'Complexity 2019', 'Task 2019']]



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

                    const alltypes = getTotalByWeekofTaskTypeWraper('Completed Date/Time', week, data)
                    // console.log(isoWeek, year, alltypes.complexity, alltypes.setScaff)


                    tasksWraper.setScaff.push(alltypes.complexity)
                    tasksWraper.setScaff.push(alltypes.setScaff)

                    tasksWraper.paperWire.push(alltypes.complexity)
                    tasksWraper.paperWire.push(alltypes.paperWire)

                    tasksWraper.housewrap.push(alltypes.complexity)
                    tasksWraper.housewrap.push(alltypes.housewrap)

                    tasksWraper.lathInspection.push(alltypes.complexity)
                    tasksWraper.lathInspection.push(alltypes.lathInspection)

                    tasksWraper.weatherBarrierInspection.push(alltypes.complexity)
                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection)

                    tasksWraper.tentHeat.push(alltypes.complexity)
                    tasksWraper.tentHeat.push(alltypes.tentHeat)

                    tasksWraper.stuccoBrown.push(alltypes.complexity)
                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown)

                    tasksWraper.watering.push(alltypes.complexity)
                    tasksWraper.watering.push(alltypes.watering)

                    tasksWraper.jChannel.push(alltypes.complexity)
                    tasksWraper.jChannel.push(alltypes.jChannel)

                    tasksWraper.siding.push(alltypes.complexity)
                    tasksWraper.siding.push(alltypes.siding)

                    tasksWraper.specialCorbels.push(alltypes.complexity)
                    tasksWraper.specialCorbels.push(alltypes.specialCorbels)

                    tasksWraper.paint.push(alltypes.complexity)
                    tasksWraper.paint.push(alltypes.paint)

                    tasksWraper.rock.push(alltypes.complexity)
                    tasksWraper.rock.push(alltypes.rock)

                    tasksWraper.brick.push(alltypes.complexity)
                    tasksWraper.brick.push(alltypes.brick)

                    tasksWraper.soffitFascia.push(alltypes.complexity)
                    tasksWraper.soffitFascia.push(alltypes.soffitFascia)

                    tasksWraper.stuccoColor.push(alltypes.complexity)
                    tasksWraper.stuccoColor.push(alltypes.stuccoColor)

                    tasksWraper.shutters.push(alltypes.complexity)
                    tasksWraper.shutters.push(alltypes.shutters)

                    tasksWraper.miscWork.push(alltypes.complexity)
                    tasksWraper.miscWork.push(alltypes.miscWork)

                    tasksWraper.cleanup.push(alltypes.complexity)
                    tasksWraper.cleanup.push(alltypes.cleanup)

                    tasksWraper.gutters.push(alltypes.complexity)
                    tasksWraper.gutters.push(alltypes.gutters)

                    tasksWraper.vpoWork.push(alltypes.complexity)
                    tasksWraper.vpoWork.push(alltypes.vpoWork)

                    tasksWraper.warrantyWork.push(alltypes.complexity)
                    tasksWraper.warrantyWork.push(alltypes.warrantyWork)

                    tasksWraper.touchUps.push(alltypes.complexity)
                    tasksWraper.touchUps.push(alltypes.touchUps)

                    tasksWraper.removeScaff.push(alltypes.complexity)
                    tasksWraper.removeScaff.push(alltypes.removeScaff)

                    tasksWraper.foundationPlaster.push(alltypes.complexity)
                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster)

                    tasksWraper.finalInspection.push(alltypes.complexity)
                    tasksWraper.finalInspection.push(alltypes.finalInspection)

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



    toggleData() {
        const { showHomes, homes, jobs } = this.state
        if (showHomes) {
            this.setState({ chartData: homes, showHomes: false })
        } else {
            this.setState({ chartData: jobs, showHomes: true })
        }
    }

    handleChange(event) {
        this.setState({ chartData: this.state.tasks[event.target.value], type: event.target.value });
    }


    render() {
        const { type } = this.state
        const chartColors = ['#b7c0ca', '#b7c0ca', '#00aae6', '#00aae6',]
        const vAxis = { title: 'Qty', minValue: 0, }
        const hAxis = { title: 'Week' }
        /*
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
        }*/

        const series = {
            0: { lineDashStyle: [2, 2] },
            2: { lineDashStyle: [2, 2] },

        }
        return (
            <div className="d-flex justify-content-center" style={{ height: '90vh', width: '100vw' }}>
                {
                    this.state.loading ?
                        <div className="loader border-top-info"></div>
                        : <div style={{ width: '100%' }}>
                            <TaskRadioGroup
                                onChange={this.handleChange}
                                type={type}
                                filter={'Main'} />

                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: '100%', width: '100vw' }}>

                                <Chart
                                    width={'100%'}
                                    height={'70vh'}
                                    chartType="ComboChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: type + ' Qty',
                                        colors: chartColors,
                                        series: series,
                                        //trendlines: trendLineForChart,   // Draw a trendline for data series 0.
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
                                {/*
                                

                                <Chart
                                    width={'100%'}
                                    height={'40vh'}
                                    chartType="ComboChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: type + ' Qty',
                                        colors: chartColors,
                                        series: series,
                                        //trendlines: trendLineForChart,   // Draw a trendline for data series 0.
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
                            */}
                            </div>
                        </div>
                }

            </div>
        );
    }
}

export default ProspectByWeeksComplexity;
