import './Input.scss';
import React from 'react';
import { get, set, cloneDeep, clone } from 'lodash';

function Input({type, option, optionPath, updateOption, placeholder, width, label, selectKey, selectValues}) {
   
    const capitalizeAllWords = sentence => {
        const words = sentence.split(" ");
        if (!words.length) return;

        for (let i = 0; i < words.length; i++) {
            if (!words[i].length) continue;
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(' ');
    }
    switch (type) {
        case 'text':
            return (
                <div className="input__container" 
                    style={{
                        width: width ? width : '100%'
                    }}
                >   
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
                </div>
                
              )
        case 'textarea': 
        return (
            <div className="input__container" 
                style={{
                    width: width ? width : '100%'
                }}
            >
                { label && <div className='input__label'>{label}</div>
                }
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
                    
                />
            </div>
          )
        case 'select':
            return (
                <div className="input__container" 
                    style={{
                        width: width ? width : '100%'
                    }}
                >
                    { label && <div className='input__label'>{label}</div>
                    }
                    <select 
                        className="input__select"
                        value={get(option, optionPath, '')}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const curOption = cloneDeep(option);
                            set(curOption, optionPath, newValue);
                            updateOption(curOption);
                        }}    
                    >
                    {
                        selectValues.map(value => {
                            return <option key={selectKey + '-' + value} value={value}>{capitalizeAllWords(value)}</option>
                        })
                    }
                    </select>
                </div>
            )

    }

    return (<div>Unknown Input Type: {type}</div>)
 
}

export default Input