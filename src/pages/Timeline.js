import React, { Component } from 'react';

import TimeLineChart from '../reportsUI/TimeLineChart'
import Views from '../utils/Views'


class Timeline extends Component {

    componentDidMount() {
         const { match} = this.props
         console.log(match.params.id)
    }

    render() {
        const { match} = this.props

        const id = match.params.id ? match.params.id : 'All'

        return (
            <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                <TimeLineChart viewId={Views[id]} />
            </div>
        )
    }

}
export default Timeline