import './Chart.scss';
import React, { useEffect, useRef } from 'react';

function Chart({option}) {
  const chartRef = useRef();

  function getSeriesInfo(chart) {
    console.log(chart.getModel().getSeries());
  }

  function getComponentDimensions(chart, name, index = -1) {
      const model = chart.getModel().getComponent(name);
      const view = chart.getViewOfComponentModel(model);
      const rect = view.group.getBoundingRect();
      const [x, y] = view.group.transformCoordToGlobal(rect.x, rect.y)
      const { width, height } = rect;
      const dimensions = {x, y, width, height};
      return dimensions;
  }

  const displayChart = () => {
    const chartDom = chartRef.current;
    const echarts = window.echarts;
    var myChart = echarts.init(chartDom);
    myChart.setOption(option);    
  }

  useEffect(() => {
    displayChart();
  })

  return (
    <div className='chart'>
        <h1 className="chart__heading">Chart</h1>
        <div id="theChart" ref={chartRef}></div>
    </div>
  )
}

export default Chart