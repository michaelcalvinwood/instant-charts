import './Data.scss';
import React from 'react'
import Dropzone from 'react-dropzone';

function Data({section, updateOption, updateSection}) {
    
    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className='Data'>
        <h1 className='Data__heading'>Data</h1>
         <div className="Data__choices">
            <div className="Data__chart-type">
                {!section.curChart && <h2 className="Data__instructions">Select Chart Type</h2>}
                {section.curChart && <h2 className="Data__">{capitalized(section.curChart)} Chart</h2> }
                    {/* <div className='file-upload--fileName'>{fileName}</div> */}
                    {<select id="chartType" name = "chartType" className='file-upload--select' onChange={e => updateSection({curChart: e.target.value})} value={section.curChart ? section.curChart : ''}>
                        <option value=''>---</option>
                        <option value="bar">&nbsp;Bar</option>
                        <option value="line">&nbsp;Line</option>
                        <option value="pie">&nbsp;Pie</option>
                        <option value="stack">&nbsp;Stack</option>
                    </select> 
                    }
                    {<div className={section.curChart ? "dropzone-container" : "dropzone-container dropzone-container--hidden"}>
                        <Dropzone 
                            //onDrop={acceptedFiles => uploadFiles(acceptedFiles)}
                        >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop chart csv file here.<br /> Or click to select file</p>
                                    </div>
                                    </section>
                                )}
                        </Dropzone>
                    </div>}
                </div>
                <h2 className="Data__csv">CSV</h2>   
               
         </div>
        
           {/* {!embedCode && <div ref={metaAreaRef} className="file-upload__chartMetaContainer">
                <h3 className='file-upload__metaDataLabel'>Meta Data</h3>
                <textarea 
                    onChange={handleMetaData}
                    value={config.meta ? config.meta : ''}
                    rows="3" 
                    className="file-upload__metaDataInput" 
                    type="textarea" 
                    name="chartMeta" 
                    id="chartMeta" 
                />
              
           </div>} */}
            {/* {!embedCode && csv.length !== 0 && <div 
                    onClick={handleEmbedButton}
                    className={"file-upload--embed-button"}       
                >
                    Embed
                </div>
            } */}
            {/* { embedCode && <div>
                <p 
                    className='file-upload--embed-code'
                >
                    {embedCode}
                </p>
                <div
                    className='file-upload__reload-button'
                    onClick={() => window.location.reload()}
                >
                    Reload
                </div>
                </div>
            } */}
           
    </div>
  )
}

export default Data