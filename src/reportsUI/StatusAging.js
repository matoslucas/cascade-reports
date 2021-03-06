import React, { Component } from 'react';

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'
import Chart from 'react-google-charts';
import Jobs from '../utils/Jobs'

class StatusAging extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            chartData:
                [
                    ['Status', 'Qty']
                ],
            loading: true,
        }
        //this.handleClick = this.handleClick.bind(this);
    }



    componentDidMount() {
        const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);
        api.getView(903, { start: 0, max: 1500 })
            .then(results => {
                let rows = []

               
                const data = results.data
                 console.log(data )

                if (Array.isArray(data)) {
                    const field = 'Status for Chart'
                    const needsConfirmedStartCount = this.getTotalValuesFrom(field, Jobs.job01, data)
                    const needsScaffCount = this.getTotalValuesFrom(field, Jobs.job02, data) 
                    const needsWrapCount = this.getTotalValuesFrom(field, Jobs.job03, data) 
                    const needsInspectionsCount = this.getTotalValuesFrom(field, Jobs.job04, data)
                    const needsBrownSidingCount = this.getTotalValuesFrom(field, Jobs.job05, data)        
                    const needsRockColorPaintCount = this.getTotalValuesFrom(field, Jobs.job06, data)
                    const needsSoffitCount = this.getTotalValuesFrom(field, Jobs.job07, data)
                    const needsGuttersCount = this.getTotalValuesFrom(field, Jobs.job08 , data)
                    
                    const removeScaffCount = this.getTotalValuesFrom(field, Jobs.job10 , data)
                    const preparingCloseCount = this.getTotalValuesFrom(field, Jobs.job11, data)
                    const warrantyCount = this.getTotalValuesFrom(field, Jobs.job12, data)
                    const vpoCount = this.getTotalValuesFrom(field, Jobs.job13, data)

                    rows.push([Jobs.job01, needsConfirmedStartCount])
                    rows.push([Jobs.job02, needsScaffCount])
                    rows.push([Jobs.job03, needsWrapCount])
                    rows.push([Jobs.job04, needsInspectionsCount])
                    rows.push([Jobs.job05, needsBrownSidingCount])
                    rows.push([Jobs.job06, needsRockColorPaintCount])
                    rows.push([Jobs.job07, needsSoffitCount])
                    rows.push([Jobs.job08, needsGuttersCount])
                    rows.push([Jobs.job10, removeScaffCount])
                    rows.push([Jobs.job11, preparingCloseCount])
                    rows.push([Jobs.job12, warrantyCount])
                    rows.push([Jobs.job13, vpoCount])
                                    
                }

                    
                this.setState({ loading: false, chartData: [...this.state.chartData, ...rows] }, () => {
                    // console.log(this.state)
                })
                


            })
    }

    getTotalValuesFrom(field, value, data) {
        return data.filter(item => item[field] === value).length
    }

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                        null :
                        <Chart
                            width={'100%'}
                            height={'100vh'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.chartData}
                            options={{
                                showRowNumber: true,
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                }

            </div>
        );
    }
}

export default StatusAging;
