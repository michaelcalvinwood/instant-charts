import './Title.scss';
import React from 'react';
import closeIcon from '../assets/images/close.svg';
import Input from './Input';

function Title({option, updateOption, setSelection}) {
    return (
        <div className='Title'>
            <h1 className='Title__heading'>Title</h1>
             <div className="Title__sections">
                <div className="Title__section-left">
                <Input 
                        label='Title:'
                        type='textarea'
                        rows={4}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].text'
                        
                    />
                <Input 
                        label="Font Size:"
                        type="number"
                        min={1}
                        max={124}
                        step={1}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].textStyle.fontSize'
                    />
                <Input 
                        label="Line Height:"
                        type="number"
                        min={1}
                        max={148}
                        step={1}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].textStyle.lineHeight'
                    />
                </div>
                <div className="Title__section-middle">
                    <Input
                        label="Show:"
                        type="boolean"
                        keyVal="showTitle"
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].show'
                    />
                    <Input
                        type='select'
                        align='left'
                        label='Font Weight'
                        keyVal='titleFontWeigth'
                        selectValues={['normal', 'bold', 'bolder', 'lighter']}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].textStyle.fontWeight'
                    /> 
                 
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