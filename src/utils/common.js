import moment from 'moment'
/**
 * 
 * @param {String} field 
 * @param {object} date 
 * @param {Array} data 
 */
const COMPLEXITY = 'Complexity (# of Plexes)'

const checkifIsNan = (value) => {
    return value ? Number(value) : 0
}

export const getTotalByWeekofTaskTypeWraper = (field, date, data, daylightSaving) => {
    const cert = moment(date.start).isDST()
    let total = 0
    let complexity = 0
    let setScaff = { total: 0, complexity: 0, certainty : cert }
    let paperWire = { total: 0, complexity: 0, certainty : cert }
    let housewrap = { total: 0, complexity: 0, certainty : cert }
    let lathInspection = { total: 0, complexity: 0, certainty : cert }
    let weatherBarrierInspection = { total: 0, complexity: 0, certainty : cert }
    let tentHeat = { total: 0, complexity: 0, certainty : cert }
    let stuccoBrown = { total: 0, complexity: 0, certainty : cert }
    let watering = { total: 0, complexity: 0, certainty : cert }
    let jChannel = { total: 0, complexity: 0, certainty : cert }
    let siding = { total: 0, complexity: 0, certainty : cert }
    let specialCorbels = { total: 0, complexity: 0, certainty : cert }
    let paint = { total: 0, complexity: 0, certainty : cert }
    let rock = { total: 0, complexity: 0, certainty : cert }
    let brick = { total: 0, complexity: 0, certainty : cert }
    let soffitFascia = { total: 0, complexity: 0, certainty : cert }
    let stuccoColor = { total: 0, complexity: 0, certainty : cert }
    let shutters = { total: 0, complexity: 0, certainty : cert }
    let miscWork = { total: 0, complexity: 0, certainty : cert }
    let cleanup = { total: 0, complexity: 0, certainty : cert }
    let gutters = { total: 0, complexity: 0, certainty : cert }
    let vpoWork = { total: 0, complexity: 0, certainty : cert }
    let warrantyWork = { total: 0, complexity: 0, certainty : cert }
    let touchUps = { total: 0, complexity: 0, certainty : cert }
    let removeScaff = { total: 0, complexity: 0, certainty : cert }
    let foundationPlaster = { total: 0, complexity: 0, certainty : cert }
    let finalInspection = { total: 0, complexity: 0, certainty : cert }

    data.filter(item => {
        var toRet 
        if(daylightSaving){
            toRet = moment(item[field]).isBetween(date.start, date.end) && cert;
        } else{
            toRet = moment(item[field]).isBetween(date.start, date.end);
        }
        return toRet
    }).forEach(item => {
        // console.log(item['Task Type'])
        total++
        complexity += checkifIsNan(item[COMPLEXITY])
        
        switch (item['Task Type']) {
            case 'Set Scaff':
                setScaff.total++;
                setScaff.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Paper/Wire':
                paperWire.total++;
                paperWire.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Housewrap':
                housewrap.total++;
                housewrap.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Lath Inspection':
                lathInspection.total++;
                lathInspection.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Weather Barrier Inspection':
                weatherBarrierInspection.total++;
                weatherBarrierInspection.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Tent & Heat':
                tentHeat.total++;
                tentHeat.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Stucco Brown':
                stuccoBrown.total++;
                stuccoBrown.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Watering':
                watering.total++;
                watering.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'J-Channel':
                jChannel.total++;
                jChannel.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Siding':
                siding.total++;
                siding.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Special Corbels':
                specialCorbels.total++;
                specialCorbels.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Paint':
                paint.total++;
                paint.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Rock':
                rock.total++;
                rock.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Brick':
                brick.total++;
                brick.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Soffit/Fascia':
                soffitFascia.total++;
                soffitFascia.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Stucco Color':
                stuccoColor.total++;
                stuccoColor.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Shutters':
                shutters.total++;
                shutters.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Misc. Work':
                miscWork.total++;
                miscWork.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Cleanup':
                cleanup.total++;
                cleanup.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Gutters':
                gutters.total++;
                gutters.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'VPO Work':
                vpoWork.total++;
                vpoWork.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Warranty Work':
                warrantyWork.total++;
                warrantyWork.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Touch Ups':
                touchUps.total++;
                touchUps.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Remove Scaff':
                removeScaff.total++;
                removeScaff.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Foundation Plaster':
                foundationPlaster.total++;
                foundationPlaster.complexity += checkifIsNan(item[COMPLEXITY]);
                break;
            case 'Final Inspection':
                finalInspection.total++;
                finalInspection.complexity += checkifIsNan(item[COMPLEXITY]);
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