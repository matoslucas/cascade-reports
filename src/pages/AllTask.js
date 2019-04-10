import React, { Component } from 'react';
import AllTaskChart from '../reportsUI/AllTaskChart'
import View from '../utils/Views'


class AllTask extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.goToTasksDetailPage = this.goToTasksDetailPage.bind(this);
        
      }
    
    goToTasksDetailPage(id) {
         console.log(id, this.props)
        const { history } = this.props
        history.push("/tasks/"+id);
    }

    render() {
        const { match} = this.props

        const id = match.params.id ? match.params.id : 'all'
        return (
            <div>
               <AllTaskChart viewId={View['AllTask']} id={id} selectClickHandler={this.goToTasksDetailPage} />
            </div>
        )
    }

}
export default AllTask