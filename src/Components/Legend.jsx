import './Legend.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';
import Input from './Input';

function Legend({option, updateOption, setSelection}) {
    return (
        <div className='Legend'>
            <h1 className='Legend__heading'>Legend</h1>
             <div className="Legend__sections">
                <div className="Legend__section-left">
             
                </div>
                <div className="Legend__section-middle">
                 
                </div>
                <div className="Legend__section-right">
                
                </div>
             </div>

            <img 
                className='Legend__close' 
                src={closeIcon} 
                onClick={() => setSelection('')}
            />
        </div>
      )
}

export default Legend