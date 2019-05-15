import React, { Component } from 'react';
import moment from 'moment'

import TaskRadioGroup from '../comps/TaskRadioGroup'

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
            tasks: [],
            switcher: true,
            type: 'setScaff',
            chartData: [],
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
        console.log('Tarckvia View Id: ' + viewId)
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env)
        api.getView(viewId, { start: 0, max: 15000 }).then(this.resultResponse)
    }

    getDate(value) {
        return value ? new Date(value) : 0
    }


    resultResponse(results) {

        //console.log('resultResponse')
        const data = this.createDataForChart(results.data)

        //console.log(data.setScaff)

        this.setState({
            chartData: data.setScaff,
            tasks: data,
            loading: false,
        })

    }

    createDataForChart(data) {
        if (!Array.isArray(data)) {
            return
        }

        const header = ['Plan Name', 'Winter Duration', 'Summer Duration']
        const tasksWraper = {
            setScaff: [header],
            paperWire: [header],
            housewrap: [header],
            lathInspection: [header],
            weatherBarrierInspection: [header],
            tentHeat: [header],
            stuccoBrown: [header],
            watering: [header],
            jChannel: [header],
            siding: [header],
            specialCorbels: [header],
            paint: [header],
            rock: [header],
            brick: [header],
            soffitFascia: [header],
            stuccoColor: [header],
            shutters: [header],
            miscWork: [header],
            cleanup: [header],
            gutters: [header],
            vpoWork: [header],
            warrantyWork: [header],
            touchUps: [header],
            removeScaff: [header],
            foundationPlaster: [header],
            finalInspection: [header],
        }
        /*
     let setScaff = [header]
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
        */

        let targetReached = false
        for (let item of data) {
            
            const start = this.getDate(item[START_DATE])
            const end = this.getDate(item[END_DATE])
            const duration = Number(item['Actual Task Duration']) //moment.duration(moment(end).diff(start)).asHours()
            const builderPlanName = item['Builder Plan Name']? item['Builder Plan Name']: 0
            const taskType = item['Task Type']

            if (builderPlanName && (duration > 0) && isNaN(builderPlanName)) {
                let summerDuration = null
                let winterDuration = null

                if (moment(start).isDST()) {
                    summerDuration = duration
                } else {
                    winterDuration = duration
                }

                // console.log(winterDuration, summerDuration)


                switch (taskType) {
                    case 'Set Scaff':
                        tasksWraper.setScaff.push([builderPlanName, winterDuration, summerDuration])


                        break;
                    case 'Paper/Wire':
                        tasksWraper.paperWire.push([builderPlanName, winterDuration, summerDuration])

                        break;
                    case 'Housewrap':
                        tasksWraper.housewrap.push([builderPlanName, winterDuration, summerDuration])

                        break;
                    case 'Lath Inspection':
                        tasksWraper.lathInspection.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Weather Barrier Inspection':
                        tasksWraper.weatherBarrierInspection.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Tent & Heat':
                        tasksWraper.tentHeat.push([builderPlanName, winterDuration, summerDuration])

                        break;
                    case 'Stucco Brown':
                        tasksWraper.stuccoBrown.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Watering':
                        tasksWraper.watering.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'J-Channel':
                        tasksWraper.jChannel.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Siding':
                        tasksWraper.siding.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Special Corbels':
                        tasksWraper.specialCorbels.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Paint':
                        tasksWraper.paint.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Rock':
                        tasksWraper.rock.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Brick':
                        tasksWraper.brick.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Soffit/Fascia':
                        tasksWraper.soffitFascia.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Stucco Color':
                        tasksWraper.stuccoColor.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Shutters':
                        tasksWraper.shutters.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Misc. Work':
                        tasksWraper.miscWork.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Cleanup':
                        tasksWraper.cleanup.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Gutters':
                        tasksWraper.gutters.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'VPO Work':
                        tasksWraper.vpoWork.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Warranty Work':
                        tasksWraper.warrantyWork.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Touch Ups':
                        tasksWraper.touchUps.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Remove Scaff':
                        tasksWraper.removeScaff.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Foundation Plaster':
                        tasksWraper.foundationPlaster.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    case 'Final Inspection':
                        tasksWraper.finalInspection.push([builderPlanName, winterDuration, summerDuration])
                        break;
                    default:
                }
            }
        }

        // setScaff.push([isoWeek, ...tasksWraper.setScaff])


        return tasksWraper

    }


    handleChange(event) {
        this.setState({
            chartData: this.state.tasks[event.target.value],
            type: event.target.value
        });

    }

    render() {

        const { type } = this.state
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" >


                {
                    this.state.loading ?
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                            <div className="loader border-top-info"></div>
                        </div>
                        :
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <TaskRadioGroup
                                onChange={this.handleChange}
                                type={type}
                                filter={'Main'} />
                            <Chart
                                className="d-flex flex-column align-items-center justify-content-center"
                                width={'99vw'}
                                height={'80vh'}
                                chartType="Scatter"
                                loader={<div className="loader border-top-info"></div>}

                                data={this.state.chartData}
                                options={{

                                    // seriesType: 'line',
                                    animation: {
                                        duration: 1000,
                                        easing: 'out',
                                        startup: true,
                                    },
                                }}

                                // For tests
                                rootProps={{ 'data-testid': '1' }}

                                chartPackages={['corechart', 'controls']}
                                controls={[
                                    {
                                        controlType: 'StringFilter',
                                        options: {
                                            filterColumnIndex: 0,
                                            matchType: 'any', // 'prefix' | 'exact',
                                            ui: {
                                                label: 'Search by Plan Name',
                                            },
                                        },
                                    },

                                ]}
                            />
                        </div>
                }
            </div>
        )
    }

}
export default ProspectBySeason