import moment from 'moment'
/**
 * 
 * @param {String} field 
 * @param {object} date 
 * @param {Array} data 
 */
export const getTotalByWeekofTaskTypeWraper = (field, date, data) => {
    let total = 0
    let complexity = 0
    let setScaff = {total: 0, complexity: 0}
    let paperWire = {total: 0, complexity: 0}
    let housewrap = {total: 0, complexity: 0}
    let lathInspection = {total: 0, complexity: 0}
    let weatherBarrierInspection = {total: 0, complexity: 0}
    let tentHeat = {total: 0, complexity: 0}
    let stuccoBrown = {total: 0, complexity: 0}
    let watering = {total: 0, complexity: 0}
    let jChannel = {total: 0, complexity: 0}
    let siding = {total: 0, complexity: 0}
    let specialCorbels = {total: 0, complexity: 0}
    let paint = {total: 0, complexity: 0}
    let rock = {total: 0, complexity: 0}
    let brick = {total: 0, complexity: 0}
    let soffitFascia = {total: 0, complexity: 0}
    let stuccoColor = {total: 0, complexity: 0}
    let shutters = {total: 0, complexity: 0}
    let miscWork = {total: 0, complexity: 0}
    let cleanup = {total: 0, complexity: 0}
    let gutters = {total: 0, complexity: 0}
    let vpoWork = {total: 0, complexity: 0}
    let warrantyWork = {total: 0, complexity: 0}
    let touchUps = {total: 0, complexity: 0}
    let removeScaff = {total: 0, complexity: 0}
    let foundationPlaster = {total: 0, complexity: 0}
    let finalInspection = {total: 0, complexity: 0}

    data.filter(item => {
        return moment(item[field]).isBetween(date.start, date.end);
    }).forEach(item => {
        // console.log(item['Task Type'])
        total++
        complexity += Number(item['Complexity (# of Plexes)'])
            

        switch (item['Task Type']) {
            case 'Set Scaff': setScaff.total++; setScaff.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Paper/Wire': paperWire.total++; paperWire.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Housewrap': housewrap.total++; housewrap.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Lath Inspection': lathInspection.total++; lathInspection.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Weather Barrier Inspection': weatherBarrierInspection.total++; weatherBarrierInspection.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Tent & Heat': tentHeat.total++; tentHeat.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Stucco Brown': stuccoBrown.total++; stuccoBrown.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Watering': watering.total++; watering.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'J-Channel': jChannel.total++; jChannel.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Siding': siding.total++; siding.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Special Corbels': specialCorbels.total++; specialCorbels.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Paint': paint.total++; paint.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Rock': rock.total++; rock.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Brick': brick.total++; brick.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Soffit/Fascia': soffitFascia.total++; soffitFascia.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Stucco Color': stuccoColor.total++; stuccoColor.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Shutters': shutters.total++; shutters.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Misc. Work': miscWork.total++; miscWork.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Cleanup': cleanup.total++; cleanup.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Gutters': gutters.total++; gutters.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'VPO Work': vpoWork.total++; vpoWork.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Warranty Work': warrantyWork.total++; warrantyWork.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Touch Ups': touchUps.total++; touchUps.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Remove Scaff': removeScaff.total++; removeScaff.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Foundation Plaster': foundationPlaster.total++; foundationPlaster.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            case 'Final Inspection': finalInspection.total++; finalInspection.complexity += Number(item['Complexity (# of Plexes)']);
                break;
            default:
        }

    })

    return {
        total,
        complexity,
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

/**
 * 
 * @param {Number} weekNumber 
 * @param {Number} year 
 */

export const getDateRangesFromWeekNumber = (weekNumber, year) => {

    var beginningOfWeek = moment().set('year', year).week(weekNumber).startOf('week');
    var endOfWeek = moment().set('year', year).week(weekNumber).startOf('week').add(7, 'days')

    return { start: beginningOfWeek, end: endOfWeek }
}
/**
 * 
 * @param {Number} year 
 */
export const getTotalWeeksFromYear = (year) => {
    return moment().set('year', year).isoWeeksInYear()
}