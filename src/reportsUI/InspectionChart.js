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
        const { loader, colors, barChartData, pieChartData, tableChartData, index } = this.props

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
                        width={'100%'}
                        height={'55vh'}
                        chartType="Table"
                        loader={loader}
                        data={tableChartData}
                        options={{
                            showRowNumber: true,
                        }}
                        rootProps={{ 'table-data-testid': index}}
                    />
                    <br />
                </Collapse>

            </div>

        )
    }
}

export default InspectionChart;