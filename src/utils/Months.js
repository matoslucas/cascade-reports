
const getMonthsByYear = (year) => {

    let Months = []
    
    Months.push({ name: 'DEC '+year, value: year+'-12' });
    Months.push({ name: 'NOV '+year, value: year+'-11' });
    Months.push({ name: 'OCT '+year, value: year+'-10' });
    Months.push({ name: 'SEP '+year, value: year+'-09' });
    Months.push({ name: 'AUG '+year, value: year+'-08' });
    Months.push({ name: 'JUL '+year, value: year+'-07' });
    Months.push({ name: 'JUN '+year, value: year+'-06' });
    Months.push({ name: 'MAY '+year, value: year+'-05' });
    Months.push({ name: 'APR '+year, value: year+'-04' });
    Months.push({ name: 'MAR '+year, value: year+'-03' });
    Months.push({ name: 'FEB '+year, value: year+'-02' });
    Months.push({ name: 'JAN '+year, value: year+'-01' });

    return Months.reverse()

}


export default getMonthsByYear