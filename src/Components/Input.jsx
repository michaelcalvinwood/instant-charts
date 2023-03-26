import './Input.scss';
import React from 'react';
import { get, set, cloneDeep, clone } from 'lodash';

function Input({type, option, optionPath, updateOption, placeholder, width}) {
   
    switch (type) {
        case 'text':
            return (
                <input 
                    className='input__text'
                    type='text'
                    placeholder={placeholder ? placeholder : ''} 
                    value={get(option, optionPath, '')}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        const curOption = cloneDeep(option);
                        set(curOption, optionPath, newValue);
                        updateOption(curOption);
                    }}
                />
              )
        case 'textarea': 
        return (
            <textarea 
                className="input__textarea"
                placeholder={placeholder ? placeholder : ''} 
                value={get(option, optionPath, '')}
                onChange={(e) => {
                    const newValue = e.target.value;
                    const curOption = cloneDeep(option);
                    set(curOption, optionPath, newValue);
                    updateOption(curOption);
                }}
                style={{
                    width: width ? width : '100%'
                }}
            />
          )

    }

    return (<div>Unknown Input Type: {type}</div>)
 
}

export default Input