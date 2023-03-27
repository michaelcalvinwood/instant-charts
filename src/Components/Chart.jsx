import './Chart.scss';
import React, { useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';

function Chart({option, updateOption}) {
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

  const getTitleHeight = (index = 0) => {
    if (!option.title.length) return 0;

    const title = option.title[index].text;
    console.log('title', title);
    const subtitle = option.title[index].subtext;
    console.log('subtitle', subtitle);
    const titleLines = title ? title.split("\n").length : 0;
    const subtitleLines = subtitle ? subtitle.split("\n").length : 0;
    const titleHeight = title ? titleLines * option.title[index].textStyle.lineHeight + option.title[index].padding : 0;
    const subtitleHeight = subtitle ? subtitleLines * option.title[index].subtextStyle.lineHeight + option.title[index].padding : 0;
    return titleHeight + subtitleHeight;
  }

  const displayChart = () => {
    const titleHeight = getTitleHeight();
    console.log('totalHeight', titleHeight);
    if (option.legend[0].top !== titleHeight + 4) {
      const newOption = {};
      newOption.legend = cloneDeep(option.legend);
      newOption.legend[0].top = titleHeight + 4;
      updateOption(newOption);
    };

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