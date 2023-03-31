import './Input.scss';
import React from 'react';
import { get, set, cloneDeep, clone } from 'lodash';

function Input({type, option, optionPath, updateOption, placeholder, width, label, 
    keyVal, selectValues, max, min, step}) {
   
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
        case 'number':
            
            return (
                <div className="input__container input__container--left" 
                    style={{
                        width: width ? width : '100%'
                    }}
                >   
                { label && <div className='input__label'>{label}</div>
                }
                    <input 
                        className='input__text'
                        type='number'
                        max={max}
                        min={min}
                        step={step}
                        value={get(option, optionPath, 0)}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const curOption = cloneDeep(option);
                            set(curOption, optionPath, newValue);
                            updateOption(curOption);
                        }}
                    />  
                </div>
                
              )
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
          case 'boolean': 
            return (
                <div className="input__container input__container--left" 
                    style={{
                        width: width ? width : '100%'
                    }}
                >
                    { label && <div className='input__label'>{label}</div>
                    }
                    <input type="radio" id={`${keyVal}_yes`} name={`${keyVal}`} 
                        value="yes" className='input__radio--left'
                        defaultChecked={get(option, optionPath)}
                        onClick={() => {
                            const curOption = cloneDeep(option);
                            set(curOption, optionPath, true);
                            updateOption(curOption);
                        }}
                    />
                    <label htmlFor={`${keyVal}_yes`} className='input__radio-label--left'>Yes</label>
                    <input type="radio" id={`${keyVal}_no`} name={`${keyVal}`} value="CSS" 
                        className='input__radio--right'
                        defaultChecked={!get(option, optionPath)}
                        onClick={() => {
                            const curOption = cloneDeep(option);
                            set(curOption, optionPath, false);
                            updateOption(curOption);
                        }}    
                    />
                    <label htmlFor={`${keyVal}_no`} className='input__radio-label--right'>No</label>
                   
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
                            return <option key={keyVal + '-' + value} value={value}>{capitalizeAllWords(value)}</option>
                        })
                    }
                    </select>
                </div>
            )

    }

    return (<div>Unknown Input Type: {type}</div>)
 
}

export default Input