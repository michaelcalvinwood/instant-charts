import './Templates.scss';
import React from 'react';
import { cloneDeep } from 'lodash';

function Templates({option, updateOption}) {
  const groupedBarTemplates = ['Default', 'Stacked'];

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
          if (series.type === 'bar') series.stack = null;
        }
        maxValue = getGridMaxValue();
        for (let i = 0; i < newOption.xAxis.length; ++i) newOption.xAxis[i].max = maxValue;
       
        break;
      case 'Stacked':
        for (let i = 0; i < newOption.series.length; ++i) {
          let series = newOption.series[i];
          if (series.type === 'bar') series.stack = 'total' + series.xAxisIndex;
        }
        maxValue = getMaxGridTotal();
        for (let i = 0; i < newOption.xAxis.length; ++i) newOption.xAxis[i].max = maxValue;
        break;
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