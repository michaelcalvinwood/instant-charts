import './Chart.scss';
import React, { useEffect, useRef, useState, theChart } from 'react';
import { cloneDeep } from 'lodash';
import theTheme from '../themes/test.js'

function Chart({option, updateOption, theChart}) {
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

  /*
   * Chart Type A are simple line, bar, and pie charts
   */

  const displayChartTypeA = () => {
    const chartDom = chartRef.current;
    const echarts = window.echarts;
    if (!theChart.current) theChart.current = echarts.init(chartDom);
    var myChart = theChart.current;
    myChart.on('legendselectchanged', function (params) {
      console.clear();
      console.log(params);
      console.log(option);
    });
    myChart.resize({opts: {
      height: 'auto'
    }});
    myChart.setOption(option);

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

    let legendDimensions = {height: 0};

    if (option.legend.length) {
      legendDimensions = getComponentDimensions(myChart, 'legend', 0);
      console.log('legendHeight', legendDimensions);
    }

    /*
     * Adjust chart placement based on title height and legend height
     */

    let chartHeight;

    if (option.series.length) {
      if (option.series[0].type === 'pie') {
        const newOption = {};
        newOption.series = cloneDeep(option.series);
        const { center, setCenter} = newOption.series[0];
        chartHeight = newOption.series[0].radius * 2;
        if (center[1] !== setCenter[1] + titleHeight + legendDimensions.height) {
          console.log('Updating Pie center');
          center[1] = setCenter[1]  + titleHeight + legendDimensions.height;
          newOption.series[0].center = center;
          updateOption(newOption);
        };
      }
    }

    console.log('chartHeight', chartHeight);

    const sourceDimensions = getComponentDimensions(myChart, 'graphic', 0);
    console.log('sourceDimensions', sourceDimensions);

    const neededHeight = titleHeight + 12 + legendDimensions.height + chartHeight + sourceDimensions.height;
    //const neededHeight = titleHeight + 12 + legendDimensions.height + chartHeight
    console.log('neededHeight', neededHeight, option.info.containerHeight);

    if (!isNaN(neededHeight) && option.info.containerHeight < neededHeight) {
      const newOption = {};
      newOption.info = cloneDeep(option.info);
      newOption.info.containerHeight = neededHeight;
      console.log('chartDom', chartDom);
      chartDom.style.height = neededHeight + 'px';
      //updateOption(newOption);
    }
  }

  const displayGroupedBarChart = () => {
    console.log('displayGroupedBarChart');
    const chartDom = chartRef.current;
    const echarts = window.echarts;
    console.log('theChart' , theChart);
    if (!theChart.current) theChart.current = echarts.init(chartDom);
    var myChart = echarts.init(chartDom);
    
    myChart.resize({opts: {
      height: 'auto'
    }});
    myChart.setOption(option);
    
    if (!option.info.sectionAdjusted && option.grid.length && option.legend.length) {
      let newOption = cloneDeep(option);
      const chartTitleHeight = getTitleHeight(0);
      let sectionBegin = chartTitleHeight + 12;
      newOption.legend[0].top = sectionBegin;
      const legendDimensions = getComponentDimensions(myChart, 'legend', 0);
      console.log('legendDimensions', legendDimensions);
      sectionBegin += legendDimensions.height + option.yAxis[1].nameTextStyle.lineHeight

      newOption.grid[1].top = sectionBegin;
      for (let i = 2; i < option.grid.length; ++i) {
        sectionBegin += option.grid[i-1].height + option.yAxis[i-1].nameTextStyle.lineHeight * 2.5;
        newOption.grid[i].top = sectionBegin;
      }
      newOption.info.sectionAdjusted = true;
      updateOption(newOption);
      chartDom.style.height = 3000 + 'px';
    }


  }

  const handlePercentages = () => {
     let percentageFlagAdjusted = true;

     for (let i = 0; i < option.series.length; ++i) {
       for (let j = 0; j < option.series[i].data.length; ++j) {
         if (typeof option.series[i].data[j].percentFlag === 'undefined') {
           percentageFlagAdjusted = false;
         } else if (option.series[i].data[j].percentFlag !== option.info.percentFlag) {
           percentageFlagAdjusted = false;
         }
       }
     }
 
     if (!percentageFlagAdjusted) {
       const newOption = {series: cloneDeep(option.series)};
       for (let i = 0; i < newOption.series.length; ++i) {
         for (let j = 0; j < newOption.series[i].data.length; ++j) {
           const flagValue = option.info.percentFlag;
           const curValue = newOption.series[i].data[j].percentFlag ? true : false;
           if (flagValue && !curValue) newOption.series[i].data[j].multiplier = 100;
           if (!flagValue && curValue) newOption.series[i].data[j].multiplier = 1;
           newOption.series[i].data[j].percentFlag = option.info.percentFlag
         }
       }
       updateOption(newOption);
     }
  }

  const handleDecimalPlaces = () => {
    let decimalAdjusted = true;

    for (let i = 0; i < option.series.length; ++i) {
      for (let j = 0; j < option.series[i].data.length; ++j) {
        if (typeof option.series[i].data[j].decimal === 'undefined') {
          decimalAdjusted = false;
        } else if (option.series[i].data[j].decimal !== option.info.decimal) {
          decimalAdjusted = false;
        }
      }
    }

    if (!decimalAdjusted) {
      const newOption = {series: cloneDeep(option.series)};
      console.log('handleDecimalPlaces newOption', newOption);
      for (let i = 0; i < newOption.series.length; ++i) {
        for (let j = 0; j < newOption.series[i].data.length; ++j) {
          const data = newOption.series[i].data[j];

          const value = option.info.decimal;
          const curValue = data.decimal ? data.decimal : null;
          if (value !== curValue) {
            if (typeof data.origValue === 'undefined') data.origValue = data.value;
            data.value = data.multiplier ? Number((data.origValue * data.multiplier).toFixed(value)) : Number(data.origValue.toFixed(value));
            data.decimal = value;
          }
          
        }
      }
      updateOption(newOption);
    }
 }

  useEffect(() => {
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const { containerWidth, containerHeight} = option.info;
    if (containerWidth !== width || containerHeight !== height) {
      const newOption = {info: {}};
      newOption.info.containerWidth = width;
      newOption.info.containerHeight = height;
      updateOption(newOption);
    }

    handlePercentages();
    handleDecimalPlaces();
   

    switch (option.info.chartType) {
      case 'bar':
      case 'line':
      case 'pie':
        displayChartTypeA();
        break;
      case 'grouped bar':
        displayGroupedBarChart();
        break;
    }
    
  })

  return (
    <div className='chart'>
        <h1 className="chart__heading">Chart</h1>
        <div id="theChart" ref={chartRef}></div>
    </div>
  )
}

export default Chart