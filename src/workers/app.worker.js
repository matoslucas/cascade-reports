
import moment from 'moment'

export default () => {

   


    const getTotalByWeekofTaskTypeWraper = (field, date, data) => {
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
            console.log(item['Task Type'])
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


    const getTotalWeeksFromYear = year => {
        return moment().set('year', year).isoWeeksInYear()
    }

    const getDateRangesFromWeekNumber = (weekNumber, year) => {

        var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
        var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(6, 'days')

        return { start: beginningOfWeek, end: endOfWeek }
    }
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        console.log(e)
        if (!e) return;
        let data = e.data;

        let toRet = {}




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
                    var alltypes = getTotalByWeekofTaskTypeWraper('Completed Date/Time', week, data)

                    // console.log(alltypes)


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


        toRet = {
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


        postMessage(toRet);
    })
}