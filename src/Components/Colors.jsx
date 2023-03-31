import './Colors.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';
import Input from './Input';

function Colors({option, updateOption, setSelection}) {
    return (
        <div className='Colors'>
            <h1 className='Colors__heading'>Colors</h1>
             <div className="Colors__sections">
                <div className="Colors__section-left">
             
                </div>
                <div className="Colors__section-middle">
                 
                </div>
                <div className="Colors__section-right">
                
                </div>
             </div>

            <img 
                className='Colors__close' 
                src={closeIcon} 
                onClick={() => setSelection('')}
            />
        </div>
      )
}

export default Colors