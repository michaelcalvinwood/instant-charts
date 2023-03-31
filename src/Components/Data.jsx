import './Data.scss';
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import Input from './Input';
import closeIcon from '../assets/images/close.svg';

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

function Data({option, updateOption, setSelection}) {
    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

    const addTitle = (fileName, csv) => {
        const name = csv[0][0] ? csv[0][0] : fileName;
        const nameParts = name.substring(0, name.lastIndexOf('.') !== -1 ? name.lastIndexOf('.') : name.length).split('--');
        let newTitle = {   
                show: true,
                text: nameParts[0].trim(),
                subtext: nameParts.length > 1 ? nameParts[1].trim() : '',
                left: 'center',
                textStyle: {
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: "#000000",
                  height: 0
                  },
                  subtextStyle: {
                      fontSize: 12,
                      lineHeight: 16,
                      color: "#000000",
                  },
                padding: 5,
        }
        let curTitles = cloneDeep(option.title);
        curTitles.push(newTitle);
        updateOption({title: curTitles});
    }

    const convertValue = val => {
        val = val.replaceAll('%', '');

        return Number(val)
    }

    const maxRadius = () => {
        const { containerWidth, containerHeight } = option.info;
        const maxRadius = containerWidth < containerHeight ? containerWidth / 2 : containerHeight / 2;
        return maxRadius;
    }

    const addPieSeries = csv => {
        /*
         * Calculate pie placement
         */
        const { containerWidth, containerHeight } = option.info;
        const center = [.5 * containerWidth, .5 * containerHeight];
        const radius = maxRadius() * .9;

        /*
         * add series
         */
        const legendData = [];
        const data = [];
        let percentFlag = false;
        for (let i = 1; i < csv[0].length; ++i) {
            const name = csv[0][i];
            if (name) legendData.push(name);
            const value = convertValue(csv[1][i]);
            if (csv[1][i].indexOf('%') !== -1) percentFlag = true;
            data.push({name, value, percentFlag: false});
        }
        const newOption = {};
        newOption.series = cloneDeep(option.series);
        newOption.series.push({
            name: csv[1][0],
            type: 'pie',
            center, radius, setCenter: center,
            data,
            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            label: {
                show: true,
                position: 'inside',
                fontSize: 15,
                color: '#000000',
                formatter: (a) => {
                  let percentFlag = a.data.percentFlag;
                  let value = a.data.origValue ? a.data.origValue : a.value;
                  let multiplier = a.data.multiplier ? a.data.multiplier : 1;
                  let decimal = a.data.decimal ? a.data.decimal : 2;
                  return percentFlag ? `${(value * multiplier).toFixed(decimal)}%` : `${value.toFixed(decimal)}`;
                }
            },
            tooltip: {
                formatter: (a, b, c, d) => {
                    let percentFlag = a.data.percentFlag;
                    let value = a.data.origValue ? a.data.origValue : a.value;
                    let multiplier = a.data.multiplier ? a.data.multiplier : 1;
                    let decimal = a.data.decimal ? a.data.decimal : 2;
                    let displayValue = percentFlag ? `${(value * multiplier).toFixed(decimal)}%` : `${value.toFixed(decimal)}`;
                    return `${a.name}:<br>${displayValue}`
                },
                backgroundColor: "rgba(0, 0, 0, .6)",
                textStyle: {
                  color: 'white'
                },
                extraCssText: 'text-align:center'
              }
        })

        /*
         * Configure legend
         */
        if (legendData.length) {
            newOption.legend = cloneDeep(option.legend);
            newOption.legend.push({data: legendData, top: 0});
        }
       
        //console.log('newOption',newOption);
        updateOption(newOption);
    }

    const addBarSeries = csv => {
        const legendData = [];
        const newOption = {};

        /*
         * Configure series
         */
        newOption.series = cloneDeep(option.series);
        for (let i = 1; i < csv.length; ++i) {
          const name = csv[i][0];
          if (name) legendData.push(name);
          console.log('bar name', name);
          const data = [];
          for (let j = 1; j < csv[i].length; ++j) {
            if (!csv[i][j]) continue;
            let value = convertValue(csv[i][j]);
            data.push({value});
          }
          newOption.series.push({
            name,
            data, 
            type: 'bar', 
            xAxisIndex: 0, 
            yAxisIndex: 0,
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            },
            tooltip: {
                
                formatter: "<div style='text-align:center'>{b}<br>{a}<br>{c}</div>",
                backgroundColor: "rgba(0, 0, 0, .8)",
                textStyle: {
                color: 'white'
                }
            }
          });
        }

        /*
         * Configure xAxis
         */
        const xAxis = {
            type: 'category',
            data: [],
        }
        for (let i = 1; i < csv[0].length; ++i) {
            if (csv[0][i]) xAxis.data.push(csv[0][i])
        };
        newOption.xAxis = cloneDeep(option.xAxis);
        newOption.xAxis.push(xAxis);
       
        /*
         * Configure yAxis
         */
        newOption.yAxis = cloneDeep(option.yAxis);
        newOption.yAxis.push({
            type: 'value',
  
        })
       
        /*
         * Configure grid
         */
        newOption.grid = cloneDeep(option.grid);
        newOption.grid.push({});

        /*
         * Configure legend
         */
        if (legendData.length) {
            newOption.legend = cloneDeep(option.legend);
            newOption.legend.push({data: legendData, top: 0});
        }
        
        updateOption(newOption);
        
    }

    const addLineSeries = csv => {
        
        const newOption = {};
        const legendData = [];

        /*
         * Configure series
         */
        newOption.series = cloneDeep(option.series);
        for (let i = 1; i < csv.length; ++i) {
          const name = csv[i][0];
          if (name) legendData.push(name);
          const data = [];
          for (let j = 1; j < csv[i].length; ++ j) {
            if (csv[i][j] === '') continue;
            let value = convertValue(csv[i][j]);
            data.push({value});
          }
          newOption.series.push({
            name, 
            data, 
            type: 'line', 
            xAxisIndex: 0, 
            yAxisIndex: 0
          });
        }

        /*
         * Configure xAxis
         */
        const xAxis = {
            type: 'category',
            data: [],
            
        }
        for (let i = 1; i < csv[0].length; ++i) xAxis.data.push(csv[0][i]);
        newOption.xAxis = cloneDeep(option.xAxis);
        newOption.xAxis.push(xAxis);
       
        /*
         * Configure yAxis
         */
        newOption.yAxis = cloneDeep(option.yAxis);
        newOption.yAxis.push({
            type: 'value',
  
        })
       
        /*
         * Configure grid
         */
        newOption.grid = cloneDeep(option.grid);
        newOption.grid.push({});

        /*
         * Configure tooltip
         */
        newOption.tooltip = {
            trigger: 'axis',
            backgroundColor: "rgba(0, 0, 0, .6)",
            textStyle: {
              color: 'white'
            },
        }

        /*
         * Configure legend
         */
        if (legendData.length) {
            newOption.legend = cloneDeep(option.legend);
            newOption.legend.push({data: legendData, top: 0});
        }
        
        updateOption(newOption);
    }

    const constructGroupBar = csv => {
        const newOption = cloneDeep(option);
        console.log('constructGroupBar', newOption)
        let sectionNum = 0;
        newOption.grid.push({ id: sectionNum, height: 0, show: false});
        newOption.xAxis.push({
            id: sectionNum,
            gridIndex: sectionNum,
            type: 'value',
            
        })
        newOption.yAxis.push({
            id: sectionNum,
            gridIndex: sectionNum,
            type: 'category',
            data: [],
        })
        console.log('constructGroupBar newOption title', newOption)

        const legend1 = [];
        const legend2 = []
        
        let prev = 'dleiwufoiihiuwehfhsdkjhw8ytealdsj;lasdghklashg';

        let maxValue = -10000000;
        for (let i = 1; i < csv.length; ++i) {
            for (let j = 2; j < csv[0].length; ++j) {
                const value = convertValue(csv[i][j]);
                if (value > maxValue) maxValue = value;
            }
        }
        //maxValue = maxValue * 3;

        console.log('maxValue', maxValue);

        for (let i = 1; i < csv.length; ++i) {
            if (csv[i][0] !== prev) {
                ++sectionNum;
                prev = csv[i][0];
                legend1.push(csv[i][0]);
                newOption.grid.push({
                    id: sectionNum,
                    height: 200,
                    left: 4
                })
                
                newOption.xAxis.push({
                    id: sectionNum,
                    gridIndex: sectionNum,
                    type: 'value',
                    max: maxValue,
                    show: false
                    
                })

                const yData = [];

                // prev is new ("N")
                const seriesData = [];
                
                for (let j = i; j < csv.length; ++j) {
                    if (csv[j][0] === prev) {
                        yData.push({ 
                            value: csv[j][1],
                            textStyle: {
                                color: 'black',
                                width: 0
                            }
                        });
                        for (let k = 2; k < csv[0].length; ++k) {
                            if (typeof seriesData[k-2] === 'undefined') seriesData[k-2] = [];
                            seriesData[k-2].push({
                                value: convertValue(csv[j][k])
                            })
                        }
                      
                    } else break;
                }

                newOption.yAxis.push({
                    show: true,
                    id: sectionNum,
                    gridIndex: sectionNum,
                    position: 'left',
                    
                    type: 'category',
                    data: yData,
                    name: prev,
                    nameLocation: 'end',
                    nameGap: 12,
                    nameTextStyle: {
                        color: 'black',
                        align: 'left',
                        padding: [0, 0, 0, 8],
                        fontSize: 16,
                        fontWeight: 'bold',
                        lineHeight: 22
                    }
                    
                })

                const name = csv[i][1];
                if (name) legend2.push(name);
                console.log('bar name', name);
                // const data = [];
                // for (let j = 2; j < csv[i].length; ++j) {
                //     if (!csv[i][j]) continue;
                //     let value = convertValue(csv[i][j]);
                //     data.push(value);
                // }

                for (let m = 0; m < seriesData.length; ++m) {
                    newOption.series.push({
                        name: csv[0][m+2],
                        data: seriesData[m], 
                        type: 'bar', 
                        barWidth: 30,
                        barGap: '100%',
                        stack: null,
                        //stack: 'total ' + sectionNum,
                        xAxisIndex: sectionNum, 
                        yAxisIndex: sectionNum,
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        },
                        tooltip: {
                            formatter: "<div style='text-align:center'>{b}<br>{a}<br>{c}</div>",
                            backgroundColor: "rgba(0, 0, 0, .8)",
                            textStyle: {
                            color: 'white'
                            }
                        },
                        label: {
                            normal: {
                              color: 'black',
                              show: true,
                              position: ['8px', '-24px'],
                              textStyle: {
                                fontSize: 16,
                                lineHeight: 24
                              },
                              formatter: function (a, b) {
                                //console.log('formatter', a , b)
                                return `${a.name}: ${a.value}`;
                              }
                            }
                          }
                    });
                }
                  
            }

            console.log('i, csv.length', i, csv.length);

            if (i === csv.length - 1) newOption.xAxis[sectionNum].show = true;
            
   
              
            console.log(sectionNum, csv[i][0]);
        }

        newOption.legend[0] = {
            data: ['Received a discount', 'Used a coupon'],
            top: 0
        }

        // set the height of each grid

        for (let i = 1; i < newOption.grid.length; ++i) {
            const numGroups = newOption.yAxis[i].data.length;

            let count = 0;
            for (let j = 0; j < newOption.series.length; ++j) {
                const yAxisIndex = newOption.series[j].yAxisIndex;
                if (yAxisIndex === i) ++count;
            }

            const numBars = numGroups * count;
            const barWidth = newOption.series[0].barWidth;
            const barGap = Number(newOption.series[0].barGap.replaceAll('%', ''))/100 * barWidth;
            const heightNeeded = numBars * (barWidth + barGap);
            newOption.grid[i].height = heightNeeded;
        }

        updateOption(newOption);
    }

    const uploadFiles = files => {
        console.log('files', files);
        
        const fd = new FormData();
        //console.log(files[0].name);
        
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
            addTitle(files[0].name, csv);

            switch (option.info.chartType) {
                case 'pie':
                    return addPieSeries(csv);
                case 'bar':
                    return addBarSeries(csv);
                case 'line':
                    return addLineSeries(csv);
                case 'grouped bar':
                    return constructGroupBar(csv);
                
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

    // useEffect(() => {
    //     if (option.info.chartType !== chartType) {
    //         const newOption = {};
    //         newOption.info = cloneDeep(option.info);
    //         newOption.info.chartType = chartType;
    //         updateOption(newOption);
    //     }
    // })

  return (
    <div className='Data'>
        <h1 className='Data__heading'>Data</h1>
         <div className="Data__sections">
            <div className="Data__section-left">
                { !option.info.chartType && <h3 className='Data__chart-type-header'>Chart Type</h3> }
                <Input
                    type='select'
                    align='center'
                    keyVal='chartType'
                    selectValues={['', 'bar', 'line', 'pie', 'grouped bar']}
                    option={option}
                    updateOption={updateOption}
                    optionPath='info.chartType'
                /> 
                { option.info.chartType && 
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
            <div className="Data__section-middle">
                { option.series.length !== 0 && <div>
                    <Input 
                        label='Title:'
                        type='textarea'
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].text'
                        
                    />
                    <Input 
                        label="Subtitle:"
                        type='textarea'         
                        option={option}
                        updateOption={updateOption}
                        optionPath='title[0].subtext'
                    />
                    <Input
                        label="Source:"
                        type='textarea'
                        option={option}
                        updateOption={updateOption}
                        optionPath='graphic[0].style.text'
                    /> 
                 </div>
                }
            </div>
            <div className="Data__section-right">
                <Input 
                    label="Decimal:"
                    type="number"
                    min={0}
                    max={10}
                    step={1}
                    option={option}
                    updateOption={updateOption}
                    optionPath='info.decimal'
                />
                <Input
                    label="Percent:"
                    type="boolean"
                    keyVal="percentFlag"
                    option={option}
                    updateOption={updateOption}
                    optionPath='info.percentFlag'
                />
            </div>
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
        <img 
            className='Data__close' 
            src={closeIcon} 
            onClick={() => setSelection('')}
        />
    </div>
  )
}

export default Data