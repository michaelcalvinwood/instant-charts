import './Title.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';

function Title({option, updateOption, setSelection}) {
    return (
        <div className='Title'>
            <h1 className='Title__heading'>Title</h1>
             <div className="Title__sections">
                <div className="Title__section-left">
             
                </div>
                <div className="Title__section-middle">
                 
                </div>
                <div className="Title__section-right">
                
                </div>
             </div>

            <img 
                className='Title__close' 
                src={closeIcon} 
                onClick={() => setSelection('')}
            />
        </div>
      )
}

export default Title