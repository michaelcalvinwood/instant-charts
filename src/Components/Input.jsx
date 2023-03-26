import './Input.scss';
import React from 'react';
import { get, set, cloneDeep, clone } from 'lodash';

function Input({type, option, optionPath, updateOption, placeholder}) {

    switch (type) {
        case 'text':
            return (
                <input 
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

    }

    return (<div>Unknown Input Type: {type}</div>)
 
}

export default Input