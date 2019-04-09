import React, { Component } from 'react';
import AllTaskChart from '../reportsUI/AllTaskChart'
import View from '../utils/Views'


class AllTask extends Component {

    render() {
        const { match} = this.props

        const id = match.params.id ? match.params.id : 'all'
        return (
            <div>
               <AllTaskChart viewId={View['AllTask']} id={id}/>
            </div>
        )
    }

}
export default AllTask