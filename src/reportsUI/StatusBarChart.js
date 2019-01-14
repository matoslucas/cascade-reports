import React, { Component } from 'react';

import Chart from 'react-google-charts';

class StatusBarChart extends Component {

    render() {
        const { width, height, data } = this.props
        return (
            <Chart
                width={width}
                height={height}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    showRowNumber: true,
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}

export default StatusBarChart;
