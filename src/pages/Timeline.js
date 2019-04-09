import React, { Component } from 'react';

import TimeLineChart from '../reportsUI/TimeLineChart'
import Views from '../utils/Views'


class Timeline extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.goToTasksDetailPage = this.goToTasksDetailPage.bind(this);
        
      }

  
    componentDidMount() {
         // const { match} = this.props
        // console.log(match.params.id)
    }

    goToTasksDetailPage(id) {
        // console.log(id, this.props)
        const { history } = this.props
        history.push("/tasks/"+id);
    }

    render() {
        const { match} = this.props

        const id = match.params.id ? match.params.id : 'All'

        return (
            <div className="d-flex justify-content-center align-items-center">
                <TimeLineChart viewId={Views[id]} selectClickHandler={this.goToTasksDetailPage}/>
            </div>
        )
    }

}
export default Timeline