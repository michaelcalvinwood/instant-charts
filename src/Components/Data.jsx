import './Data.scss';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { cloneDeep } from 'lodash';
/*
 * use: https://react-papaparse.js.org/
 * Write our own csv to html table
 * <tr>
 *  <th></th> [0][0]
 *  <th></th> [1][0]
 * </tr>
 * <tr>
 *  <td></td>[0][1]
 *  <td></td>[1][1]
 * </tr>
 * 
 */

function Data({option, updateOption}) {
    const [chartType, setChartType] = useState('');
    
    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

    const addPieSeries = csv => {
        const data = [];
        for (let i = 1; i < csv[0].length; ++i) {
            const name = csv[0][i];
            const value = csv[1][i];
            data.push({name, value});
        }
        const newOption = {};
        newOption.series = cloneDeep(option.series);
        newOption.series.push({
            name: csv[1][0],
            type: 'pie',
            data
        })
            
        updateOption(newOption);
    }

    const addBarSeries = csv => {
        
    }

    const addLineSeries = csv => {
        
    }

    const constructStack = csv => {
        
    }

    const uploadFiles = files => {
        console.log('files', files);
        
        const fd = new FormData();
        console.log(files[0].name);
        files.forEach(file =>fd.append('File[]',file));
        const config = {  };

        const request = {
            url: `https://charts.pymnts.com:6300/csv`,
            method: 'post',
            data: fd,
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios(request)
        .then((response) => {
            const csv = response.data;
            console.log('csv', csv);

            switch (chartType) {
                case 'pie':
                    return addPieSeries(csv);
                case 'bar':
                    return addBarSeries(csv);
                case 'line':
                    return addBarSeries(csv);
                case 'stack':
                    return constructStack(csv);
                
            }
        })
        .catch(error => {
            console.error(error.message, error.code);
            switch (error.code) {
                case 'ERR_NETWORK':
                    alert ("Error: Instant Charts server is down.\nPlease contact admin@pymnts.com.");
                    break;
                default:
                    alert('Error: Could not process CSV. Please reformat file.');
            }
            
        })
    }


  return (
    <div className='Data'>
        <h1 className='Data__heading'>Data</h1>
         <div className="Data__sections">
            <div className="Data__section-left">
                <h3 className='Data__chart-type-header'>Chart Type</h3>
                <select id="chartType" 
                        name = "chartType" 
                        className='Data__select-chart-type' 
                        onChange={e => setChartType(e.target.value)} 
                        value={chartType}
                     >
                            <option value=''>---</option>
                            <option value="bar">&nbsp;Bar</option>
                            <option value="line">&nbsp;Line</option>
                            <option value="pie">&nbsp;Pie</option>
                            <option value="stack">&nbsp;Stack</option>
                    </select> 
                { chartType && 
                    <div className='dropzone-container'>

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
                    </div> 
                }
            </div>
            <div className="Data__section-middle">Middle</div>
            <div className="Data__section-right">Right</div>
         </div>
         
         
         {/* <div className="Data__choices">
            <div className="Data__chart-type">
                {!option.info.curChart && <h2 className="Data__instructions">Select Chart Type</h2>}
                {option.info.curChart && <h2 className="Data__">{capitalized(option.info.curChart)} Chart</h2> }
                    <div className='file-upload--fileName'>{fileName}</div>
                   
       
                </div>
                <div>PapaParse</div>
         </div> */}
        
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