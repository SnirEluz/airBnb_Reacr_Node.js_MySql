import React from 'react'
import { VictoryChart, VictoryBar, Bar, VictoryTooltip } from 'victory'

export default function Statics({ vacationsArrayStatics }) {
    const array = []
    for (let index = 0; index < vacationsArrayStatics.length; index++) {
        if (vacationsArrayStatics[index].followers > 0) {
            array.push({
                x: vacationsArrayStatics[index].destination,
                y: vacationsArrayStatics[index].followers
            })
        }
    }
    array.sort((a, b) => { return a.y - b.y })

    return (
        <div className='Statics'>
            <h1>Statistics</h1>
            <VictoryChart
                height={300}
                width={400}
                domainPadding={{ x: 50, y: [0, 20] }}
                scale={{ x: "time" }}
            >
                <VictoryBar
                    data={array}
                    labels={({ datum }) => `followers: ${datum.y}`}
                    labelComponent={<VictoryTooltip />}
                    dataComponent={
                        <Bar
                            tabIndex={0}
                            ariaLabel={({ datum }) => `x: ${datum.x}`}
                        />
                    }
                />
            </VictoryChart>
        </div>
    )
}
