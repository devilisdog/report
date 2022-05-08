import React from 'react'
import * as echarts from 'echarts'

export default function Charts(props) {
    const { option, style } = props

    React.useEffect(() => {
        const chartDom = document.getElementById('charts')
        const myChart = echarts.init(chartDom)

        if (option) {
            myChart.setOption(option)
        }
    }, [option])

    return <div id="charts" style={{ height: '400px', ...style }} />
}
