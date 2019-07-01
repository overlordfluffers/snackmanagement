// src/components/ChartPanel.js

// Import react
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {ResponsiveBar} from '@nivo/bar'

class ChartPanel extends Component {
    constructor() {
        super()
        // Define state
        this.state = {

        }
    }
    
    createBarChart = (surveys, index) => {
        let data = [
            {
                "id": "None",
                "None": 18,
                "NoneColor": "hsl(3, 70%, 50%)",
            },
            {
                "id": "Less than 1 year",
                "Less than 1 year": 11,
                "Less than 1 yearColor": "hsl(3, 70%, 50%)",
            },
        ]
        let keys = this.props.template.template[index].options
        console.log('=====================> Keys', keys)

        return(
            <ResponsiveBar
                data={data}
                keys={keys}
                indexBy="id"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                groupMode="grouped"
                colors={{ scheme: 'nivo' }}
                width={100}
                height={100}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />)
    }


    render() {
        console.log('=====================>', this.props.surveys)
        return (
            <div className="ChartPanel">
                {this.createBarChart(this.props.surveys, 12)}
            </div>
        )
    }
}

ChartPanel.propTypes = {
    surveys: PropTypes.array.isRequired,
    template: PropTypes.object.isRequired,
}

export default ChartPanel