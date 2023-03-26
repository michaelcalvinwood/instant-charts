import './Input.scss';
import React from 'react';
import { get, set, cloneDeep, clone } from 'lodash';

function Input({type, option, optionPath, updateOption, placeholder}) {
  return (
    <input 
        type={type} 
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

export default Input