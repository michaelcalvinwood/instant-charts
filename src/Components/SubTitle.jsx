import './SubTitle.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';
import Input from './Input';

function SubTitle({option, updateOption, setSelection}) {
    return (
        <div className='SubTitle'>
            <h1 className='SubTitle__heading'>SubTitle</h1>
             <div className="SubTitle__sections">
                <div className="SubTitle__section-left">
                    <Input 
                        label='SubTitle:'
                        type='textarea'
                        rows={4}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtext'
                        
                    />
                </div>
                <div className="SubTitle__section-middle">
                 
                </div>
                <div className="SubTitle__section-right">
                
                </div>
             </div>

            <img 
                className='SubTitle__close' 
                src={closeIcon} 
                onClick={() => setSelection('')}
            />
        </div>
      )
}

export default SubTitle