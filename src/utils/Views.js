/**
 * After add a new view to the list remember to whitelist that view to Read only access
 *  */
// view 945 to test weeks reports
const View = {
    All: 903, // Custom Reporting | Status Aging
    Ivory: 911, // Custom Reporting Jobs by Builder | Ivory    
    AllTask: 933, // Custom Reporting | All task query | Jobs Tasks
    weeks: 941, // Custom Reporting | Prospect by week | 2018-2019
    since: 927, // Custom Reporting | Prospect Since 2016-2018
    mainTask: 943, // Custom Reporting | Jobs Tasks Main, using filter from 2018 year
    secondaryTask: 949, // Custom Reporting | Jobs Tasks Secondary , using filter from 2018 year
    complexity: 953, // Custom Reporting | Jobs Tasks ( Scaffolding )
    inspections: 964, // Custom Report | Inspections
    allTasksAtcive: 950, // Custom Report | Jobs Tasks Active
    allTask: 968, // Custom Reporting | Jobs Tasks All
    season: 988, // Custom reporting | Season Analysis
}
export default View