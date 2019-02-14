/**
 * After add a new view to the list remember to whitelist that view to Read only access
 *  */
const View = {
    All: 903, // Custom Reporting | Status Aging
    Ivory: 911, // Custom Reporting Jobs by Builder | Ivory    
    AllTask: 933, // Lucas | Jobs Tasks
    weeks: 941, // Custom Reporting | Prospect by week | 2018-2019
    since: 927, // Custom Reporting | Prospect Since 2016-2018
    mainTask: 943, // Custom Reporting | Jobs Tasks Main, using filter from 2018 year
    secondaryTask: 949, // Custom Reporting | Jobs Tasks Secondary , using filter from 2018 year
}
export default View