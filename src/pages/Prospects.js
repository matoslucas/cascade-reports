import React, { Component } from 'react';
import Views from '../utils/Views'
import ProspectSince2016 from '../reportsUI/ProspectSince2016'
import ProspectByYear from '../reportsUI/ProspectByYear'
import ProspectByWeeks from '../reportsUI/ProspectByWeeks'
import ProspectByWeeksComplexity from '../reportsUI/ProspectByWeeksComplexity'
import ProspectByTaskType from '../reportsUI/ProspectByTaskType'

class Prospects extends Component {

    render() {
        const { match} = this.props

        const id = match.params.id ? match.params.id : 'weeks'
        // console.log(id)
        switch(id){
            case 'weeks' : return <ProspectByWeeks viewId={Views[id]}/>
            case 'since' : return  <ProspectSince2016 viewId={Views[id]}/>
            case 'years' : return <ProspectByYear />
            case 'mainTask' : return <ProspectByTaskType  viewId={Views[id]} showMain={true}/>
            case 'secondaryTask' : return <ProspectByTaskType  viewId={Views[id]} showMain={false}/>
            case 'complexity' : return <ProspectByWeeksComplexity viewId={Views[id]} />
            default: return <div>No data</div>
        }
       
    }

}
export default Prospects