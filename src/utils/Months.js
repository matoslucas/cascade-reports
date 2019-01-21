
class Months {
    getMonthsByYear(year) {

        let Months = []
        if (!year) {
            //TODO default year to current year instead of hardcode 
            year = '2018'
        }

        Months.push({ name: 'DEC ' + year, value: year + '-12' });
        Months.push({ name: 'NOV ' + year, value: year + '-11' });
        Months.push({ name: 'OCT ' + year, value: year + '-10' });
        Months.push({ name: 'SEP ' + year, value: year + '-09' });
        Months.push({ name: 'AUG ' + year, value: year + '-08' });
        Months.push({ name: 'JUL ' + year, value: year + '-07' });
        Months.push({ name: 'JUN ' + year, value: year + '-06' });
        Months.push({ name: 'MAY ' + year, value: year + '-05' });
        Months.push({ name: 'APR ' + year, value: year + '-04' });
        Months.push({ name: 'MAR ' + year, value: year + '-03' });
        Months.push({ name: 'FEB ' + year, value: year + '-02' });
        Months.push({ name: 'JAN ' + year, value: year + '-01' });

        return Months.reverse()
    }
    getDefaultMonths() {
        let Months = []

        Months.push({ name: 'DEC ', value: '12' });
        Months.push({ name: 'NOV ', value: '11' });
        Months.push({ name: 'OCT ', value: '10' });
        Months.push({ name: 'SEP ', value: '09' });
        Months.push({ name: 'AUG ', value: '08' });
        Months.push({ name: 'JUL ', value: '07' });
        Months.push({ name: 'JUN ', value: '06' });
        Months.push({ name: 'MAY ', value: '05' });
        Months.push({ name: 'APR ', value: '04' });
        Months.push({ name: 'MAR ', value: '03' });
        Months.push({ name: 'FEB ', value: '02' });
        Months.push({ name: 'JAN ', value: '01' });

        return Months.reverse()
    }
    getYears() {
        let years = []

        years.push('2016')
        years.push('2017')
        years.push('2018')

        return years
    }
}


export default new Months()