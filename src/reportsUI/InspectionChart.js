import React, { Component } from 'react'
import Chart from 'react-google-charts'

import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

class InspectionChart extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            open: false
        }

        this.handleClick = this.handleClick.bind(this)

    }

    handleClick() {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        const { loader, colors, barChartData, pieChartData, index } = this.props
        return (

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', margin: 1, }}>
                    <Chart
                        width={'49vw'}
                        height={'100%'}
                        chartType="BarChart"
                        loader={loader}
                        data={barChartData}
                        options={{
                            seriesType: 'bars',
                            colors: colors,
                            legend: { position: "none" }
                        }}
                        rootProps={{ 'bar-data-testid': index }}
                    />
                    <Chart
                        width={'49vw'}
                        height={'100%'}
                        chartType="PieChart"
                        loader={loader}
                        data={pieChartData}
                        options={{
                            colors: colors,
                        }}
                        rootProps={{ 'pie-data-testid': index }}
                    />
                </div>
                <CardActions disableActionSpacing
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <IconButton onClick={this.handleClick} >
                        {
                            this.state.open ?
                                <ExpandLess />
                                :
                                <ExpandMore />
                        }
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="Table"
                        loader={loader}
                        data={[
                            [
                                { type: 'string', label: 'Name' },
                                { type: 'number', label: 'Salary' },
                                { type: 'boolean', label: 'Full Time Employee' },
                            ],
                            ['Mike', { v: 10000, f: '$10,000' }, true],
                            ['Jim', { v: 8000, f: '$8,000' }, false],
                            ['Alice', { v: 12500, f: '$12,500' }, true],
                            ['Bob', { v: 7000, f: '$7,000' }, true],
                        ]}
                        options={{
                            showRowNumber: true,
                        }}
                        rootProps={{ 'table-data-testid': index}}
                    />
                </Collapse>

            </div>

        )
    }
}

export default InspectionChart;