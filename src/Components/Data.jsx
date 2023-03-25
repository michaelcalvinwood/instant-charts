import './Data.scss';
import React from 'react'


function Data({section, updateOption, updateSection}) {
    const option = section.option;
    const chart = option && option.info && option.info.chart ? option.info.chart : '';

    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className='Data'>
         {!chart && <h2 className="file-upload--input">Select Chart Type</h2>}
            {chart && <h2 className="file-upload--input">{capitalized(chart)} Chart</h2> }
            {/* <div className='file-upload--fileName'>{fileName}</div> */}
            {!chart && <select id="chartType" name = "chartType" className='file-upload--select' onChange={e => updateSection({curChart: e.target.value})}>
                <option value=''>---</option>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
                <option value="stack">&nbsp;Stack</option>
            </select> 
            }
           {/* {chart && !csv.length && <div className="dropzone-container">
            <Dropzone 
                onDrop={acceptedFiles => uploadFiles(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop chart csv file here.<br /> Or click to select file</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
           </div>} */}
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