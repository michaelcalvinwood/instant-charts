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
    info: {
      curSection: null,
      sections: [],
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
      }
    }],
    series: [],
    toolbox: {
      feature: {
        
        dataView: {
          readOnly: true,
        },
        saveAsImage: {},
      }
    }
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
      <Chart option={option}/>
    </div>
  );
}

export default App;
