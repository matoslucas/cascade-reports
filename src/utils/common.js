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
        // console.log(item['Task Type'])
        total++
        complexity += Number(item['Complexity (# of Plexes)'])
            

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