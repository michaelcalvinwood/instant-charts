import logo from './logo.svg';
import './App.scss';
import { useEffect, useRef, useState } from 'react';
import Data from './Components/Data';
import { merge, cloneDeep } from 'lodash';
import Templates from './Components/Templates';
import Chart from './Components/Chart';
import ShowSelections from './Components/ShowSelections';
import Title from './Components/Title';
import SubTitle from './Components/SubTitle';
import Colors from './Components/Colors';
import Legend from './Components/Legend';

function App() {
  const theChart = useRef(null);

  const selections = [
    'Title', 'SubTitle', 'Legend', 'Colors', 'Data'
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
      chartTemplate: 'Default',
      sectionAdjusted: false,
      percentFlag: false,
      decimal: 2
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
  
  const updateOption = (data, final=false) => {
    console.log('updateOption', data);
    merge(data, {info: { sectionAdjusted: final}})
    optionRef.current = merge(optionRef.current, data);
    setOption(cloneDeep(optionRef.current));
  }

  console.log('curOption', option);

  return (
    <div className="App">
      {selection === '' && <ShowSelections selections= {selections} setSelection={setSelection}/>}
      {selection === 'Data' && <Data option={option} updateOption={updateOption} setSelection={setSelection}/>}
      {selection === 'Title' && <Title option={option} updateOption={updateOption} setSelection={setSelection}/>}
      {selection === 'SubTitle' && <SubTitle option={option} updateOption={updateOption} setSelection={setSelection}/>}      
      {selection === 'Legend' && <Legend option={option} updateOption={updateOption} setSelection={setSelection}/>}
      {selection === 'Colors' && <Colors option={option} updateOption={updateOption} setSelection={setSelection}/>}

      <Templates  option={option} updateOption={updateOption} theChart={theChart}/>
      <Chart option={option} updateOption={updateOption} theChart={theChart}/>
    </div>
  );
}

export default App;
