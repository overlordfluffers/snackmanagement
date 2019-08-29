import React, { Component } from 'react';
import PropTypes from 'prop-types'



class AdditionalOptions extends Component{
    constructor() {
        super();
        this.state = {
            align: '',
            options: [''],
            scaleOptions: [{value:'', text:''}],
            style: '',
            value:[{name:''}]
        }
    }

    handleChange = async (key, value) => {
        await this.setState({[key]:value})
        this.props.setComponents(this.state)
    }
    handleOptionsChange = (event, index) => {
        let options = this.state.options
        options[index] = event.target.value
        if(options[options.length-1] !== ''){
            options.push('')
        }
        this.setState({options})
        this.props.setComponents(this.state)
    }
    handleValueChange = (event, index) => {
        let value = this.state.value
        value[index].name = event.target.value
        if(value[value.length-1].name !== ''){
            value.push({name: ''})
        }
        this.setState({value})
        this.props.setComponents(this.state)
    }
    handleScaleChange = (event, index, key) => {
        let scaleOptions = this.state.scaleOptions
        scaleOptions[index][key] = event.target.value
        if(scaleOptions[scaleOptions.length-1].value !== '' && scaleOptions[scaleOptions.length-1].text !== ''){
            scaleOptions.push({value: '', text: ''})
        }
        this.setState({scaleOptions})
        this.props.setComponents(this.state)
    }

    


    render(){
        return (
            <div>
                {(this.props.type === 'choice' || this.props.type === 'scale') && 
                    <div className="test">
                        <div className="surveyOptions choice width-100">
                            <div className={'requiredQuestion optionsLabel'}>
                                Options Alignment:
                            </div>
                            <div className={'radioButton'}>
                                <input type={"radio"} name={"align"} id={`left`} onChange={(e) => {this.handleChange('align', 'left')}}/>
                                <label htmlFor={`left`}>
                                    <div className="buttonText width-optionsAlign">Left</div>
                                </label>
                                  <br/>
                            </div>
                            <div className={'radioButton'}>
                                <input type={"radio"} name={"align"} id={`center`} onChange={(e) => {this.handleChange('align', 'center')}}/>
                                <label htmlFor={`center`}>
                                    <div className="buttonText width-optionsAlign">Center</div>
                                </label>
                                <br/>
                            </div>
                            <div className={'radioButton'}>
                                <input type={"radio"} name={"align"} id={`right`} onChange={(e) => {this.handleChange('align', 'right')}}/>
                                <label htmlFor={`right`}>
                                    <div className="buttonText width-optionsAlign">Right</div>
                                </label>
                                <br/>
                            </div>
                        </div>
                        <br/>
                    </div>
                }

                {(this.props.type === 'dropdown' || this.props.type === 'matrix') &&
                    <div className="surveyOptions choice width-100">
                        <div className={'requiredQuestion optionsLabel'}>
                            Options Style:
                        </div>
                        <div className={'radioButton'}>
                            <input type={"radio"} name={"style"} id={`list`} onChange={(e) => {this.handleChange('style', 'list')}}/>
                            <label htmlFor={`list`}>
                                <div className="buttonText width-optionsStyle">list</div>
                            </label>
                            <br/>
                        </div>
                        <div className={'radioButton'}>
                            <input type={"radio"} name={"style"} id={`inline`} onChange={(e) => {this.handleChange('style', 'inline')}}/>
                            <label htmlFor={`inline`}>
                                <div className="buttonText width-optionsStyle">inline</div>
                            </label>
                            <br/>
                        </div>
                        <br/>
                    </div>
                }

                {(this.props.type === 'choice' || this.props.type === 'dropdown') &&
                    <div>
                        <table>
                            <tr>
                                <th>
                                    Question Answer:
                                </th>
                            </tr>
                            {this.state.options.map((option, index) => (
                            <tr>
                                <td>
                                    {index+1}
                                    <input className="" type='text' value={option} onChange={(e)=> {this.handleOptionsChange(e,index)}}/>
                                </td>
                            </tr>
                            ))
                            }
                        </table>
                        <br/>
                    </div>
                }

                {(this.props.type === 'scale' || this.props.type === 'matrix')  &&
                    <div className="test">
                            <div className="">
                                <table>
                                    <tr>
                                        <th>
                                            Question Value:
                                        </th>
                                        <th>
                                            Question Text:
                                        </th>
                                    </tr>
                                    {this.state.scaleOptions.map((option, index) => (
                                    <tr>
                                        <td>
                                        {index+1}
                                            <input className="" type='text' value={option.value} onChange={(e)=> {this.handleScaleChange(e, index, 'value')}}/>
                                        </td>
                                        <td>
                                            <input className="" type='text' value={option.text} onChange={(e)=> {this.handleScaleChange(e, index, 'text')}}/>
                                        </td>
                                    </tr>
                                    ))
                                    }
                                </table>
                            </div>
                        <br/>
                    </div>
                }

                {this.props.type === 'matrix' &&
                    <div className="test">

                        <table>
                            <tr>
                                <th>
                                    Question Answer:
                                </th>
                            </tr>
                            {this.state.value.map((option, index) => (
                            <tr>
                                <td>
                                    {index+1}
                                    <input className="" type='text' value={option.name} onChange={(e)=> {this.handleValueChange(e, index)}}/>
                                </td>
                            </tr>
                            ))
                            }
                        </table>
                        <br/>
                    </div>
                }
            </div>
        )
    }
}

AdditionalOptions.propTypes = {
    type: PropTypes.string.isRequired,
    setComponents: PropTypes.func.isRequired
}

export default AdditionalOptions;