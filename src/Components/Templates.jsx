import './Templates.scss';
import React from 'react';
import { cloneDeep } from 'lodash';

function Templates({option, updateOption, theChart}) {
  const groupedBarTemplates = ['Default', 'Stacked'];

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
  function getComponentDimensions(chart, name, index = -1) {
    const model = chart.getModel().getComponent(name);
    const view = chart.getViewOfComponentModel(model);
    const rect = view.group.getBoundingRect();
    const [x, y] = view.group.transformCoordToGlobal(rect.x, rect.y)
    const { width, height } = rect;
    const dimensions = {x, y, width, height};
    return dimensions;
}


  const getMaxGridTotal = () => {
    const totals = [];
    const {grid, series} = option;

    let maxValue = -1000000000000;

    for (let i = 0; i < grid.length; ++i) {
      const row = [];
      for (let j = 0; j < series.length; ++j) {
        if (series[j].xAxisIndex === i) {
          if (series[j].data && series[j].data.length) {
            const data = series[j].data;
            for (let k = 0; k < data.length; ++k) {
              if (!row[k]) row[k] = data[k].value;
              else row[k] += data[k].value;
            }
          }
        }
      }
      for (let m = 0; m < row.length; ++m) {
        if (row[m] > maxValue) maxValue = row[m];
      }
    }
  
    return maxValue;
  }

  const getGridMaxValue = () => {
    const totals = [];
    const {grid, series} = option;

    let maxValue = -1000000000000;

    for (let i = 0; i < grid.length; ++i) {
      const row = [];
      for (let j = 0; j < series.length; ++j) {
        if (series[j].xAxisIndex === i) {
          if (series[j].data && series[j].data.length) {
            const data = series[j].data;
            for (let k = 0; k < data.length; ++k) {
              if (data[k].value > maxValue) maxValue = data[k].value;
            }
          }
        }
      }
    }
  
    return maxValue;
  }

  const handleGroupedBar = name => {
    const newOption = cloneDeep(option);
    newOption.info.chartTemplate = name;
    let maxValue;

    switch (name) {
      case 'Default':   
        for (let i = 0; i < newOption.series.length; ++i) {
          let series = newOption.series[i];
          if (series.type === 'bar') {
            series.stack = null;
            series.barGap = "100%";
          }
        }
        maxValue = getGridMaxValue();
        for (let i = 0; i < newOption.xAxis.length; ++i) newOption.xAxis[i].max = maxValue;
        newOption.info.sectionAdjusted = false;
        break;
      case 'Stacked':
        for (let i = 0; i < newOption.series.length; ++i) {
          let series = newOption.series[i];
          if (series.type === 'bar') {
            series.stack = 'total' + series.xAxisIndex;
            series.barGap = "85%";
          }
        }
        maxValue = getMaxGridTotal();
        for (let i = 0; i < newOption.xAxis.length; ++i) newOption.xAxis[i].max = maxValue;

        newOption.info.sectionAdjusted = false;
        break;
    }

     // set the height of each grid

    for (let i = 1; i < newOption.grid.length; ++i) {
      const numGroups = newOption.yAxis[i].data.length;

      let count = 0;
      for (let j = 0; j < newOption.series.length; ++j) {
          const yAxisIndex = newOption.series[j].yAxisIndex;
          if (yAxisIndex === i) ++count;
      }

      const numBars = name === 'Stacked' ? numGroups : numGroups * count;
      const barWidth = newOption.series[0].barWidth;
      const barGap = Number(newOption.series[0].barGap.replaceAll('%', ''))/100 * barWidth;
      const heightNeeded = numBars * (barWidth + barGap);
      newOption.grid[i].height = heightNeeded;
    }
    if (theChart.current) {
      var myChart = theChart.current;
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
    }

    updateOption(newOption);
  }

  return (
    <div className='templates'>
        <h1 className="templates__heading">Templates</h1>
        
          { option.info.chartType === 'grouped bar' && <div className='templates__container'>
              {
                groupedBarTemplates.map(name => {
                return (<div 
                    key={'template-'+name}
                    className={name === option.info.chartTemplate ? "templates__name templates__name--active" : "templates__name"}
                    onClick={() => handleGroupedBar(name)}
                  >
                    {name}
                  </div>)
                })
              }

            </div>
          }
        
    </div>
  )
}

export default Templates