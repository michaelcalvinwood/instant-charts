import './Chart.scss';
import React, { useEffect, useRef } from 'react';

function Chart({option}) {
  const chartRef = useRef();

  const chartDom = chartRef.current;

  
  return (
    <div className='chart'>
        <h1 className="chart__heading">Chart</h1>
        <div id="theChart" ref={chartRef}></div>
    </div>
  )
}

export default Chart