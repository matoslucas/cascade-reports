import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Config from '../utils/Trackvia.config'
// import TaskList from '../utils/TaskList'
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
            type: 'setScaff',
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
        // console.log(data)
        let dataWraper = []
        if (Array.isArray(data)) {

            dataWraper = this.createDataForChart(data)

        }

        this.setState({
            loading: false,
            chartData: dataWraper.setScaff,
            tasks: dataWraper,

        }, () => {
            // console.log(this.state)
        })


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
                const yearWeekLen = this.getTotalWeeksFromYear(year)
                if (isoWeek <= yearWeekLen) {
                    const week = this.getDateRangesFromWeekNumber(isoWeek, year)
                    var alltypes = this.getTotalByWeekofTaskTypeWraper('Completed Date/Time', week, data)


                    tasksWraper.setScaff.push(alltypes.setScaff)
                    tasksWraper.paperWire.push(alltypes.paperWire)
                    tasksWraper.housewrap.push(alltypes.housewrap)
                    tasksWraper.lathInspection.push(alltypes.lathInspection)
                    tasksWraper.weatherBarrierInspection.push(alltypes.weatherBarrierInspection)
                    tasksWraper.tentHeat.push(alltypes.tentHeat)
                    tasksWraper.stuccoBrown.push(alltypes.stuccoBrown)
                    tasksWraper.watering.push(alltypes.watering)
                    tasksWraper.jChannel.push(alltypes.jChannel)
                    tasksWraper.siding.push(alltypes.siding)
                    tasksWraper.specialCorbels.push(alltypes.specialCorbels)
                    tasksWraper.paint.push(alltypes.paint)
                    tasksWraper.rock.push(alltypes.rock)
                    tasksWraper.brick.push(alltypes.brick)
                    tasksWraper.soffitFascia.push(alltypes.soffitFascia)
                    tasksWraper.stuccoColor.push(alltypes.stuccoColor)
                    tasksWraper.shutters.push(alltypes.shutters)
                    tasksWraper.miscWork.push(alltypes.miscWork)
                    tasksWraper.cleanup.push(alltypes.cleanup)
                    tasksWraper.gutters.push(alltypes.gutters)
                    tasksWraper.vpoWork.push(alltypes.vpoWork)
                    tasksWraper.warrantyWork.push(alltypes.warrantyWork)
                    tasksWraper.touchUps.push(alltypes.touchUps)
                    tasksWraper.removeScaff.push(alltypes.removeScaff)
                    tasksWraper.foundationPlaster.push(alltypes.foundationPlaster)
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
        //console.log(scaffWraper)

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

    getTotalByTaskType(data, type) {
        return data.reduce((total, item) => {
            var v = 0
            if (item['Task Type'] === type) {
                v = 1
            }
            return total + v
        }, 0)
    }

    getTotalByWeekofTaskTypeWraper(field, date, data) {
        let setScaff = 0
        let paperWire = 0
        let housewrap = 0
        let lathInspection = 0
        let weatherBarrierInspection = 0
        let tentHeat = 0
        let stuccoBrown = 0
        let watering = 0
        let jChannel = 0
        let siding = 0
        let specialCorbels = 0
        let paint = 0
        let rock = 0
        let brick = 0
        let soffitFascia = 0
        let stuccoColor = 0
        let shutters = 0
        let miscWork = 0
        let cleanup = 0
        let gutters = 0
        let vpoWork = 0
        let warrantyWork = 0
        let touchUps = 0
        let removeScaff = 0
        let foundationPlaster = 0
        let finalInspection = 0

        data.filter(item => {
            return moment(item[field]).isBetween(date.start, date.end);
        }).forEach(item => {

            switch (item['Task Type']) {
                case 'Set Scaff': setScaff++
                    break;
                case 'Paper/Wire': paperWire++
                    break;
                case 'Housewrap': housewrap++
                    break;
                case 'Lath Inspection': lathInspection++
                    break;
                case 'Weather Barrier Inspection': weatherBarrierInspection++
                    break;
                case 'Tent & Heat': tentHeat++
                    break;
                case 'Stucco Brown': stuccoBrown++
                    break;
                case 'Watering': watering++
                    break;
                case 'J-Channel': jChannel++
                    break;
                case 'Siding': siding++
                    break;
                case 'Special Corbels': specialCorbels++
                    break;
                case 'Paint': paint++
                    break;
                case 'Rock': rock++
                    break;
                case 'Brick': brick++
                    break;
                case 'Soffit/Fascia': soffitFascia++
                    break;
                case 'Stucco Color': stuccoColor++
                    break;
                case 'Shutters': shutters++
                    break;
                case 'Misc. Work': miscWork++
                    break;
                case 'Cleanup': cleanup++
                    break;
                case 'Gutters': gutters++
                    break;
                case 'VPO Work': vpoWork++
                    break;
                case 'Warranty Work': warrantyWork++
                    break;
                case 'Touch Ups': touchUps++
                    break;
                case 'Remove Scaff': removeScaff++
                    break;
                case 'Foundation Plaster': foundationPlaster++
                    break;
                case 'Final Inspection': finalInspection++
                    break;
                default:
            }

        })

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
                                <RadioGroup style={{ flexDirection: 'row', marginLeft: 15 }}
                                    value={type}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel value="setScaff" control={<Radio />} label="Set Scaff"  />
                                    <FormControlLabel value="paperWire" control={<Radio />} label="Paper/Wire" />
                                    <FormControlLabel value="housewrap" control={<Radio />} label="Housewrap" />
                                    <FormControlLabel value="lathInspection" control={<Radio />} label="Lath Inspection" />
                                    <FormControlLabel value="weatherBarrierInspection" control={<Radio />} label="Weather Barrier Inspection" />
                                    <FormControlLabel value="tentHeat" control={<Radio />} label="Tent & Heat" />
                                    <FormControlLabel value="stuccoBrown" control={<Radio />} label="Stucco Brown" />
                                    <FormControlLabel value="watering" control={<Radio />} label="Watering" />
                                    <FormControlLabel value="jChannel" control={<Radio />} label="J-Channel" />
                                    <FormControlLabel value="siding" control={<Radio />} label="Siding" />
                                    <FormControlLabel value="specialCorbels" control={<Radio />} label="Special Corbels" />
                                    <FormControlLabel value="paint" control={<Radio />} label="Paint" />
                                    <FormControlLabel value="rock" control={<Radio />} label="Rock" />
                                    <FormControlLabel value="brick" control={<Radio />} label="Brick" />
                                    <FormControlLabel value="soffitFascia" control={<Radio />} label="Soffit/Fascia" />
                                    <FormControlLabel value="stuccoColor" control={<Radio />} label="Stucco Color" />
                                    <FormControlLabel value="shutters" control={<Radio />} label="Shutters" />
                                    <FormControlLabel value="miscWork" control={<Radio />} label="Misc. Work" />
                                    <FormControlLabel value="cleanup" control={<Radio />} label="Cleanup" />
                                    <FormControlLabel value="gutters" control={<Radio />} label="Gutters" />
                                    <FormControlLabel value="vpoWork" control={<Radio />} label="VPO Work" />
                                    <FormControlLabel value="warrantyWork" control={<Radio />} label="Warranty Work" />
                                    <FormControlLabel value="touchUps" control={<Radio />} label="Touch Ups" />
                                    <FormControlLabel value="removeScaff" control={<Radio />} label="Remove Scaff" />
                                    <FormControlLabel value="foundationPlaster" control={<Radio />} label="Foundation Plaster" />
                                    <FormControlLabel value="finalInspection" control={<Radio />} label="Final Inspection" />
                                
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
