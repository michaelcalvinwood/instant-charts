import './ShowSelections.scss';
import React from 'react';

function ShowSelections({selections, setSelection}) {
  return (
    <div className='showSelections'>
        {selections.map(selection => {
            return (
                <div 
                    key={selection} 
                    className='showSelections__selection'
                    onClick={() => setSelection(selection)}
                >
                        {selection}
                </div>
            )
        })}
    </div>
  )
}

export default ShowSelections