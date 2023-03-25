import logo from './logo.svg';
import './App.scss';
import { useEffect, useRef, useState } from 'react';
import Data from './Components/Data';
import { merge, cloneDeep } from 'lodash';

function App() {
  const selections = [
    'Data'
  ]
  let template = {
    info: {
      curDiagram: 0
    }
  };

  const [selection, setSelection] = useState('Data');
  const [option, setOption] = useState(template);
  const optionRef = useRef(option);

  const curOption = template;
  
  const updateOption = data => {
    optionRef.current = merge(optionRef.current, data);
    setOption(cloneDeep(optionRef.current));
  }

  console.log('curOption', option);


  return (
    <div className="App">
      {selection === 'Data' && <Data option={option} updateOption={updateOption} />}
    </div>
  );
}

export default App;
