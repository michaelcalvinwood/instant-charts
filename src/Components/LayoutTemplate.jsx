import './Layout.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';
import Input from './Input';

function LayoutTemplate({option, updateOption, setSelection}) {
    return (
        <div className='Layout'>
            <h1 className='Layout__heading'>Layout</h1>
             <div className="Layout__sections">
                <div className="Layout__section-left">
             
                </div>
                <div className="Layout__section-middle">
                 
                </div>
                <div className="Layout__section-right">
                
                </div>
             </div>

            <img 
                className='Layout__close' 
                src={closeIcon} 
                onClick={() => setSelection('')}
            />
        </div>
      )
}

export default LayoutTemplate