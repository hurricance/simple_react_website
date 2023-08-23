import * as echarts from 'echarts';
import { useRef, useEffect } from 'react';

const Bar = ({ title, xData, yData, style }) => {

    const domRef = useRef(null);

    const chartInit = () => {
        
        const myChart = echarts.init(domRef.current)

        myChart.setOption({
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [
                {
                name: 'sales',
                type: 'bar',
                data: yData
                }
            ]
        })

        return () => {
            myChart.dispose();
        }

    }

    useEffect(() => { chartInit() }, [])
  
    return <div ref={domRef} style={ style }></div>;
}

export default Bar