import logo from './logo.svg';
import './App.scss';
import { useEffect, useState } from 'react';
import Data from './Components/Data';
import { merge, cloneDeep } from 'lodash';

function App() {
  const selections = [
    'Data'
  ]
  let template = {
    
  };

  const [selection, setSelection] = useState('Data');
  const [option, setOption] = useState(template);

  const updateOption = data => {
    console.log('data', data);
    const optionCopy = cloneDeep(option);
    merge(optionCopy, data);
    console.log('optionCopy', optionCopy)
    setOption(optionCopy);
  }

  console.log('option', option);
  option && option.info && option.info.changes();

  useEffect(() => {
    updateOption({
      info: {
        chart: 'bar',
        changes: () => console.log('stuff')
      }
    })
  
    
  }, [])

  return (
    <div className="App">
      {selection === 'Data' && <Data />}
    </div>
  );
}

export default App;
