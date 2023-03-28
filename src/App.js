import logo from './logo.svg';
import './App.scss';
import { useEffect, useRef, useState } from 'react';
import Data from './Components/Data';
import { merge, cloneDeep } from 'lodash';
import Sections from './Components/Sections';
import Chart from './Components/Chart';


function App() {
  const selections = [
    'Data'
  ]
  let template = {
    color: [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#91c7ae',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3'
    ],
    info: {
      containerWidth: 0,
      containerHeight: 0,
      curSection: null,
      sections: [],
      chartType: '',
      template: 'default',
      sectionAdjusted: false,
    },
    tooltip: {},
    title: [],
    legend: [],
    grid: [],
    xAxis: [],
    yAxis: [],
    graphic: [{
      id: 'source',
      type: 'text',
      bottom: 0,
      left: 0,
      style: {
        text: 'Source:',
        fontSize: 12,
        lineHeight: 16
      }}, 
      {
        id: 'logo',
        type: 'image',
        style: {
          image: 'https://node.pymnts.com/images/svg/PYMNTS_data_logo.svg',
          width: 128,
          height: 24
        },
        bottom: 0,
        right: 0,
        z:10,
        invisible: false

      }
    ],
    series: [],
    toolbox: {
      feature: {
        
        dataView: {
          readOnly: false,
        },
        saveAsImage: {},
      }
    },

  };

  const [selection, setSelection] = useState('Data');
  const [option, setOption] = useState(template);
  const optionRef = useRef(option);
  
  const updateOption = data => {
    console.log('updateOption', data);
    optionRef.current = merge(optionRef.current, data);
    setOption(cloneDeep(optionRef.current));
  }

  console.log('curOption', option);

  return (
    <div className="App">
      {selection === 'Data' && <Data option={option} updateOption={updateOption} />}
      <Sections />
      <Chart option={option} updateOption={updateOption}/>
    </div>
  );
}

export default App;
