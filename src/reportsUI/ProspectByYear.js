import React, { Component } from 'react';

import ProspectReport from './ProspectReport'


class ProspectByYear extends Component {

    render() {
        return (
            <div>
                <ProspectReport  year={'2018'} viewId={922}/>
                <ProspectReport  year={'2017'} viewId={923}/>
                <ProspectReport  year={'2016'} viewId={924}/>
            </div>
        )
    }

}
export default ProspectByYear