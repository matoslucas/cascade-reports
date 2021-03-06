import React, { Component } from 'react';
import TaskRadioGroup from '../comps/TaskRadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
            chartData: [],
            switcher: true,
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
        console.log('load view ID: ', viewId)
        api.getView(viewId, { start: 0, max: 15000 }).then(this.resultResponse)

    }

    resultResponse(results) {
        const data = results.data

        let dataWraper = []
        if (Array.isArray(data)) {
            dataWraper = this.createDataForChart(data)
        }

        // const test = this.dataFormatter(dataWraper.setScaff)

        // console.log(test)

        this.setState({
            loading: false,
            chartData: this.dataFormatter(dataWraper.setScaff, this.state.switcher),
            tasks: dataWraper,

        }, () => {
            // console.log(this.state)
        })

    }

    createDataForChart(data) {
        // try to print 53 weeks
        //console.log(data)
        const header = ['Week', 'Complexity 2018,', 'Task 2018', {type:'boolean',role:'certainty'}, 'Complexity 2019', 'Task 2019', {type:'boolean',role:'certainty'}]
        let setScaff =  [header]
        let paperWire = [header]
        let housewrap = [header]
        let lathInspection = [header]
        let weatherBarrierInspection = [header]
        let tentHeat = [header]
        let stuccoBrown = [header]
        let watering = [header]
        let jChannel = [header]
        let siding = [header]
        let specialCorbels = [header]
        let paint = [header]
        let rock = [header]
        let brick = []
        let soffitFascia = [header]
        let stuccoColor = [header]
        let shutters = [header]
        let miscWork = [header]
        let cleanup = [header]
        let gutters = [header]
        let vpoWork = [header]
        let warrantyWork = [header]
        let touchUps = [header]
        let removeScaff = [header]
        let foundationPlaster = [header]
        let finalInspection = [header]
    

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


                    tasksWraper.setScaff.push(alltypes.setScaff.complexity)
                    tasksWraper.setScaff.push(alltypes.setScaff.total)
                    tasksWraper.setScaff.push(alltypes.setScaff.certainty)

                    tasksWraper.paperWire.push(alltypes.paperWire.complexity)
                    tasksWraper.paperWire.push(alltypes.paperWire.total)
                    tasksWraper.paperWire.push(alltypes.paperWire.certainty)

                    tasksWraper.housewrap.push(alltypes.housewrap.complexity)
                    tasksWraper.housewrap.push(alltypes.housewrap.total)
                    tasksWraper.housewrap.push(alltypes.housewrap.certainty)

                    tasksWraper.lathInspection.push(alltypes.lathInspection.complexity)
                    tasksWraper.lathInspection.push(alltypes.lathInspection.total)
                    tasksWraper.lathInspection.push(alltypes.lathInspection.certainty)

                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection.complexity)
                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection.total)
                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection.certainty)

                    tasksWraper.tentHeat.push(alltypes.tentHeat.complexity)
                    tasksWraper.tentHeat.push(alltypes.tentHeat.total)
                    tasksWraper.tentHeat.push(alltypes.tentHeat.certainty)

                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown.complexity)
                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown.total)
                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown.certainty)

                    tasksWraper.watering.push(alltypes.watering.complexity)
                    tasksWraper.watering.push(alltypes.watering.total)
                    tasksWraper.watering.push(alltypes.watering.certainty)

                    tasksWraper.jChannel.push(alltypes.jChannel.complexity)
                    tasksWraper.jChannel.push(alltypes.jChannel.total)
                    tasksWraper.jChannel.push(alltypes.jChannel.certainty)

                    tasksWraper.siding.push(alltypes.siding.complexity)
                    tasksWraper.siding.push(alltypes.siding.total)
                    tasksWraper.siding.push(alltypes.siding.certainty)

                    tasksWraper.specialCorbels.push(alltypes.specialCorbels.complexity)
                    tasksWraper.specialCorbels.push(alltypes.specialCorbels.total)
                    tasksWraper.specialCorbels.push(alltypes.specialCorbels.certainty)

                    tasksWraper.paint.push(alltypes.paint.complexity)
                    tasksWraper.paint.push(alltypes.paint.total)
                    tasksWraper.paint.push(alltypes.paint.certainty)

                    tasksWraper.rock.push(alltypes.rock.complexity)
                    tasksWraper.rock.push(alltypes.rock.total)
                    tasksWraper.rock.push(alltypes.rock.certainty)

                    tasksWraper.brick.push(alltypes.brick.complexity)
                    tasksWraper.brick.push(alltypes.brick.total)
                    tasksWraper.brick.push(alltypes.brick.certainty)

                    tasksWraper.soffitFascia.push(alltypes.soffitFascia.complexity)
                    tasksWraper.soffitFascia.push(alltypes.soffitFascia.total)
                    tasksWraper.soffitFascia.push(alltypes.soffitFascia.certainty)

                    tasksWraper.stuccoColor.push(alltypes.stuccoColor.complexity)
                    tasksWraper.stuccoColor.push(alltypes.stuccoColor.total)
                    tasksWraper.stuccoColor.push(alltypes.stuccoColor.certainty)

                    tasksWraper.shutters.push(alltypes.shutters.complexity)
                    tasksWraper.shutters.push(alltypes.shutters.total)
                    tasksWraper.shutters.push(alltypes.shutters.certainty)

                    tasksWraper.miscWork.push(alltypes.miscWork.complexity)
                    tasksWraper.miscWork.push(alltypes.miscWork.total)
                    tasksWraper.miscWork.push(alltypes.miscWork.certainty)

                    tasksWraper.cleanup.push(alltypes.cleanup.complexity)
                    tasksWraper.cleanup.push(alltypes.cleanup.total)
                    tasksWraper.cleanup.push(alltypes.cleanup.certainty)

                    tasksWraper.gutters.push(alltypes.gutters.complexity)
                    tasksWraper.gutters.push(alltypes.gutters.total)
                    tasksWraper.gutters.push(alltypes.gutters.certainty)

                    tasksWraper.vpoWork.push(alltypes.vpoWork.complexity)
                    tasksWraper.vpoWork.push(alltypes.vpoWork.total)
                    tasksWraper.vpoWork.push(alltypes.vpoWork.certainty)

                    tasksWraper.warrantyWork.push(alltypes.warrantyWork.complexity)
                    tasksWraper.warrantyWork.push(alltypes.warrantyWork.total)
                    tasksWraper.warrantyWork.push(alltypes.warrantyWork.certainty)

                    tasksWraper.touchUps.push(alltypes.touchUps.complexity)
                    tasksWraper.touchUps.push(alltypes.touchUps.total)
                    tasksWraper.touchUps.push(alltypes.touchUps.certainty)

                    tasksWraper.removeScaff.push(alltypes.removeScaff.complexity)
                    tasksWraper.removeScaff.push(alltypes.removeScaff.total)
                    tasksWraper.removeScaff.push(alltypes.removeScaff.certainty)

                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster.complexity)
                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster.total)
                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster.certainty)

                    tasksWraper.finalInspection.push(alltypes.finalInspection.complexity)
                    tasksWraper.finalInspection.push(alltypes.finalInspection.total)
                    tasksWraper.finalInspection.push(alltypes.finalInspection.certainty)

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
        const { switcher, tasks, type } = this.state
        const data = this.dataFormatter(tasks[type], !switcher)
        console.log(data)
        this.setState({
            chartData: data,
            switcher: !switcher
        })
    }

    handleChange(event) {
        this.setState({
            chartData: this.dataFormatter(this.state.tasks[event.target.value], this.state.switcher),
            type: event.target.value
        });
    }

    dataFormatter(data, flag) {
        let toRet = []
        if (Array.isArray(data)) {
            toRet = data.map(item => {
                // console.log(item, item[4], item[5])
                return flag ? [item[0], item[1], item[4], item[3]] : [item[0], item[2], item[5], item[6]]
            })
        }
        return toRet

    }


    render() {
        const { type, switcher } = this.state
        const chartColors = ['#b7c0ca', '#00aae6',]
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
                            <div style={{width: '100%', }}>
                                <TaskRadioGroup
                                    onChange={this.handleChange}
                                    type={type}
                                    filter={'Main'} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={switcher}
                                            onChange={this.toggleData}
                                            color="primary"
                                        />
                                    }
                                    label={'Complexity vs. Task'}
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: '100%', width: '98vw' }}>

                                <Chart
                                    width={'100%'}
                                    height={'70vh'}
                                    chartType="LineChart"
                                    loader={<div className="loader border-top-info"></div>}
                                    data={this.state.chartData}

                                    options={{
                                        title: type + ' Qty',
                                        colors: chartColors,
                                        // series: series,
                                        // trendlines: trendLineForChart,   // Draw a trendline for data series 0.
                                        vAxis: vAxis,
                                        hAxis: hAxis,
                                        // seriesType: 'line',
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
