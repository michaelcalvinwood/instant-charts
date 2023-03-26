import './Chart.scss';
import React, { useEffect, useRef } from 'react';

function Chart({option}) {
  const chartRef = useRef();

  

  useEffect(() => {
    const chartDom = chartRef.current;
    const echarts = window.echarts;
    var myChart = echarts.init(chartDom);
    myChart.setOption(option);
  })

  return (
    <div className='chart'>
        <h1 className="chart__heading">Chart</h1>
        <div id="theChart" ref={chartRef}></div>
    </div>
  )
}

export default Chart