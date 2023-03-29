import './Templates.scss';
import React from 'react';

function Templates({option, updateOption}) {
  const groupedBarTemplates = ['Default', 'Stacked'];

  const handleGroupedBar = name => {
    const info = {chartTemplate: name}
    updateOption ({info});

    switch (name) {
      case 'Default':   
        break;
      case 'Stacked':
        break;
    }
  }

  return (
    <div className='templates'>
        <h1 className="templates__heading">Templates</h1>
        
          { option.info.chartType === 'grouped bar' && <div className='templates__container'>
              {
                groupedBarTemplates.map(name => {
                return (<div 
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