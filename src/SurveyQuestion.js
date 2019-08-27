import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

class SurveyQuestions extends Component{
    constructor() {
        super();
        this.state = {

        }
    }

    createSurvey = (input, index, groupName) => {
        if(input.type === 'free'){
            return(
                <div className={`free-text ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'free-text__label label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    <input className={'free-text__input'} id={`input-${index}-0`} onChange={(e) => {this.props.handleChange(e,input.name, groupName)}} type={'text'}/>
                </div>
            )
        } else if(input.type === 'radio' || input.type === 'checkbox'){
            return(
                <div className={`choice ${input.style} width-60 ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'choice-name label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    {input.options.map( (option, newIndex) => {
                        return(<div className={'selection'} id={`input-${index}-${newIndex}-parent`}>
                                    <input type={input.type} name={`input-${index}`} id={`input-${index}-${newIndex}`} onChange={(e) => {this.props.handleChange(e,input.name, groupName)}} value={option}/>
                                    <label htmlFor={`input-${index}-${newIndex}`}><ReactMarkdown source={option} className={`${newIndex === input.options.length - 1 ? 'border-bottom' : ''} markdown ${input.align}`} htmlFor={`input-${index}-${newIndex}`}/></label><br/>
                               </div>)
                    })}
                </div>
            )
        } else if(input.type === 'scale') {
            return(
                <div className={`choice width-60 ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'choice-name label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    <div className={'scale'}>
                        {input.options.map( (option, newIndex) => {
                            return(<div className={'scale selection'} id={`input-${index}-${newIndex}-parent`}>
                                <input type={'radio'} name={`input-${index}`} id={`input-${index}-${newIndex}`} onChange={(e) => {this.props.handleChange(e,input.name, groupName)}} value={option.value}/>
                                <label htmlFor={`input-${index}-${newIndex}`}><ReactMarkdown source={option.text} className={`${newIndex === input.options.length - 1 ? 'border-bottom-right' : ''} ${newIndex === 0 ? 'border-bottom-left' : ''} markdown ${input.align}`} htmlFor={`input-${index}-${newIndex}`}/></label><br/>
                            </div>)
                        })}
                    </div>
                </div>
            )
        } else if(input.type === 'dropdown'){
            return(
                <div className={`free-text ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={`free-text__label label`}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    <div className={'select-list'}>
                        <select className={'dropdown'} onChange={(e) => {this.props.handleChange(e,input.name, groupName)}}>
                            <option value="" disabled selected>Select your option</option>
                            {input.options.map( (option) => {
                                return(<option value={option}> {option} </option> )
                            })}
                        </select>
                    </div>
                </div>
            )
        } else if(input.type === 'textbox'){
            return(
                <div className={`choice textbox width-60 ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'choice-name label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    <textarea placeholder={'(Enter some comments here)'} rows="6"/>
                </div>
            )
        } else if(input.type === 'matrix'){
            return(
                <div className={`choice textbox width-80`} id={`input-${index}`}>
                    <h3> Rate your satisfaction with the following items</h3>
                    <table className={'matrix-desktop'}>
                        <tr>
                            <th>Options</th>
                            {input.options.map((option) => {return(<th>{option.text}</th>)})}
                        </tr>
                        {input.values.map((value)=>{
                            return(<tr>
                                <td className={`${value.blank ? 'blank' : ''}`}>{value.name}</td>
                                {input.options.map((option)=>{
                                    return(
                                        <td className={'matrix-selection'}>
                                            <input id={`${value.name}-${option.value}`} type={'radio'} onChange={(e) => {this.props.handleChange(e, value.name, 'Matrix')}} name={value.name} value={option.value}/>
                                            <label htmlFor={`${value.name}-${option.value}`} className={'matrix-cell'}>{option.value}</label>
                                        </td>
                                    )
                                })}
                            </tr>)
                        })}
                    </table>
                    <div className={'matrix-mobile'}>
                        {input.values.map((value)=>{
                            return(
                                <div className={`free-text ${value.blank ? 'blank' : ''}`}>
                                    <div className={`free-text__label label matrix-label`}>{`${value.name}${input.optional ? '':'*'}`}</div>
                                    <div className={'select-list'}>
                                        <select className={'dropdown'} onChange={(e) => {this.props.handleChange(e,value.name, 'Matrix')}}>
                                            <option value="" disabled selected>Select your option</option>
                                            {input.options.map( (option) => {
                                                return(<option value={option.value}> {option.text} </option> )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else if(input.type === "group") {
            return (
                <div className={'width-60'}>
                    <div className={'group-name'}>{input.name}</div>
                    {input.children.map((input2, index)=>{
                        return this.createSurvey(input2, index, input.name)
                    })}
                </div>)
        }else{
            return(<div>Error</div>)
        }
    }

    render(){
        const input = this.props.input
        const index = this.props.index
        const groupName = this.props.groupName
        return (
            this.createSurvey(input, index, groupName) 
        )
    }
}

SurveyQuestions.propTypes = {
    input: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    groupName: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

export default SurveyQuestions;