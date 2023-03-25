import logo from './logo.svg';
import './App.scss';
import { useEffect, useState } from 'react';
import Data from './Components/Data';
import { merge, cloneDeep } from 'lodash';

function App() {
  const selections = [
    'Data'
  ]
  let section = {
    option: {}
    
  };

  const [selection, setSelection] = useState('Data');
  const [sections, setSections] = useState([section]);
  const [curSection, setCurSection] = useState(0);

  const updateSection = data => {
    const sectionsCopy = cloneDeep(sections);
    merge(sectionsCopy[curSection], data);
    console.log('merged sectionCopy', sectionsCopy[curSection]);
    setSections(sectionsCopy);
  }

  const updateOption = data => {
    const sectionCopy = cloneDeep(sections[curSection]);
    merge(sectionCopy.option, data);
    setSections(sectionCopy);
  }

  console.log('curSection', sections[curSection]);


  return (
    <div className="App">
      {selection === 'Data' && <Data section={sections[curSection]} updateOption={updateOption} updateSection={updateSection}/>}
    </div>
  );
}

export default App;
