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
                    <Input 
                        label="Font Size:"
                        type="number"
                        min={1}
                        max={124}
                        step={1}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtextStyle.fontSize'
                    />
                    <Input 
                        label="Line Height:"
                        type="number"
                        min={1}
                        max={148}
                        step={1}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtextStyle.lineHeight'
                    />

                </div>
                <div className="SubTitle__section-middle">
                    <Input
                        type='select'
                        align='left'
                        label='Font Weight'
                        keyVal='subtitleFontWeigth'
                        selectValues={['normal', 'bold', 'bolder', 'lighter']}
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtextStyle.fontWeight'
                    /> 
                </div>
                <div className="SubTitle__section-right">
                    <Input
                        type='color'
                        align='left'
                        label='Font Color'
                        
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtextStyle.color'
                    /> 

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