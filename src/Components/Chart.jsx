import './Chart.scss';
import React, { useEffect, useRef, useState } from 'react';
import { cloneDeep } from 'lodash';

function Chart({option, updateOption}) {
  const debugCount = useRef(0);
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
    const subtitle = option.title[index].subtext;
    const titleLines = title ? title.split("\n").length : 0;
    const subtitleLines = subtitle ? subtitle.split("\n").length : 0;
    const titleHeight = title ? titleLines * option.title[index].textStyle.lineHeight + option.title[index].padding : 0;
    const subtitleHeight = subtitle ? subtitleLines * option.title[index].subtextStyle.lineHeight + option.title[index].padding : 0;
    return titleHeight + subtitleHeight;
  }

  const maxRadius = (cWidth, cHeight) => cWidth < cHeight ? cWidth / 2 : cHeight / 2;

  const displayChart = () => {
    /*
     * Adjust legend placement based on title height
     */
    const titleHeight = getTitleHeight();
    if (option.legend.length && option.legend[0].top !== titleHeight + 4) {
      const newOption = {};
      newOption.legend = cloneDeep(option.legend);
      newOption.legend[0].top = titleHeight + 4;
      updateOption(newOption);
    };

    if (option.series.length) {
      if (option.series[0].type === 'pie') {
        const newOption = {};
        newOption.series = cloneDeep(option.series);
        const { center, setCenter} = newOption.series[0];
        if (center[1] !== setCenter[1] + titleHeight) {
          console.log('Updating Pie center');
          center[1] = setCenter[1]  + titleHeight;
          newOption.series[0].center = center;
          updateOption(newOption);
        };
      }
    }

    const chartDom = chartRef.current;
    const echarts = window.echarts;
    var myChart = echarts.init(chartDom);
    myChart.setOption(option);    
  }

  useEffect(() => {
    ++debugCount.current;
    if (debugCount.current > 10) return;

    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const { containerWidth, containerHeight} = option.info;
    if (containerWidth !== width || containerHeight !== height) {
      const newOption = {info: {}};
      newOption.info.containerWidth = width;
      newOption.info.containerHeight = height;
      updateOption(newOption);
    }
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