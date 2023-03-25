import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import Data from './Components/Data';

function App() {
  const selections = [
    'Data'
  ]
  let template = {

  };

  const [selection, setSelection] = useState('Data');
  const [option, setOption] = useState(template);

  return (
    <div className="App">
      {selection === 'Data' && <Data />}
    </div>
  );
}

export default App;
