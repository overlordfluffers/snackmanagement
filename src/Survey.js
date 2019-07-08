// src/components/Survey.js

// Import react
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {integratedBackend} from './backend'
import ReactMarkdown from 'react-markdown'

class Survey extends Component {
    constructor() {
        super();
        this.state = {
            id: 1,
            name: "",
            template: [],
            results: [],
            required: [],
            tempId: -1,
            errorId: false,
        }
    }

    componentDidMount() {
        this.getTemplate()
    }

    getTemplate = async() => {
        let payload = this.props.template
        let required = payload.template.map( (item) => {return item.optional !== true})
        let results = payload.template.map( (item) => {
            if (item.type === 'free' || item.type === 'radio' || item.type === 'dropdown' || item.type === 'scale' || item.type === 'textbox'){
                return {name: item.name, results: ""}
            } else if (item.type === 'checkbox'){
                return {name: item.name, results: []}
            } else if (item.type === 'group'){
                return {name: item.name, children: item.children.map( (item) => {
                    return {name: item.name, results: ""}
                })}
            } else if (item.type === 'matrix'){
                return {name: 'Matrix', children: item.values.map((value) =>{ return {name: value.name, results: ""}})}
            }
        })
        this.setState({name:payload.surveyname, required, template: payload.template, results})
    }

    handleChange = (event, name, groupName) => {
        if(groupName === null){
            let obj = this.state.results.find(o => o.name === name);
            if(event.target.type === 'text' || event.target.type === 'radio' || event.target.type === 'select-one'){
                obj.results = event.target.value
            } else if (event.target.type === 'checkbox') {
                let index = obj.results.indexOf(event.target.value);
                if (index !== -1) {
                    obj.results.splice(index, 1);
                } else  {
                    obj.results.push(event.target.value)
                }
            }
            obj.blank=false
        } else {
            let obj = this.state.results.find(o => o.name === groupName);
            let obj2 = obj.children.find(o => o.name === name);
            obj2.results = event.target.value
            obj2.blank=false
        }
        this.forceUpdate()
    }

    createSurvey = (input, index, groupName) => {
        if(input.type === 'free'){
            return(
                <div className={`free-text ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'free-text__label label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    <input className={'free-text__input'} id={`input-${index}-0`} onChange={(e) => {this.handleChange(e,input.name, groupName)}} type={'text'}/>
                </div>
            )
        } else if(input.type === 'radio' || input.type === 'checkbox'){
            return(
                <div className={`choice ${input.style} width-60 ${input.blank ? 'blank' : ''}`} id={`input-${index}`}>
                    <div className={'choice-name label'}>{`${input.name}${input.optional ? '':'*'}`}</div>
                    {input.options.map( (option, newIndex) => {
                        return(<div className={'selection'} id={`input-${index}-${newIndex}-parent`}>
                                    <input type={input.type} name={`input-${index}`} id={`input-${index}-${newIndex}`} onChange={(e) => {this.handleChange(e,input.name, groupName)}} value={option}/>
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
                                <input type={'radio'} name={`input-${index}`} id={`input-${index}-${newIndex}`} onChange={(e) => {this.handleChange(e,input.name, groupName)}} value={option.value}/>
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
                        <select className={'dropdown'} onChange={(e) => {this.handleChange(e,input.name, groupName)}}>
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
                            let emojis = ['😫','😟','😐','😀','😁']
                            return(<tr>
                                <td className={`${value.blank ? 'blank' : ''}`}>{value.name}</td>
                                {input.options.map((option)=>{
                                    return(
                                        <td className={'matrix-selection'}>
                                            <input id={`${value.name}-${option.value}`} type={'radio'} onChange={(e) => {this.handleChange(e, value.name, 'Matrix')}} name={value.name} value={option.value}/>
                                            <label htmlFor={`${value.name}-${option.value}`} className={'matrix-cell'}>{emojis[parseInt(option.value)-1]}</label>
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
                                        <select className={'dropdown'} onChange={(e) => {this.handleChange(e,value.name, 'Matrix')}}>
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

    formatNumberLength = (num, length) => {
        let r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        // let addNumber = parseInt(r) + 1000
        // r = addNumber.toString()
        return r;
    }

    handleSubmit = async () => {
        let stopPost = false
        let template = this.state.template
        let results = this.state.results
        if(!this.props.template.generateid && (!localStorage.id || localStorage.id < 1)){
            this.setState({errorId:true})
            stopPost = true
        }
        for (let item in results){
            if(template[item].optional === false){
                if(typeof results[item].results === 'string' && (results[item].results === "" || results[item].results === null || results[item].results === undefined)){
                    template[item].blank = true
                    stopPost = true
                } else if(typeof results[item].results === 'object' && (results[item].results.length === 0 || results[item].results === null || results[item].results === undefined)){
                    template[item].blank = true
                    stopPost = true
                } else if (template[item].values && template[item].values.length > 0) {
                    for (let item2 in template[item].values){
                        if(typeof results[item].children[item2].results === 'string' && (results[item].children[item2].results === "" || results[item].children[item2].results === null || results[item].children[item2].results === undefined)){
                            template[item].values[item2].blank = true
                            stopPost = true
                        } else if(typeof results[item].children[item2].results === 'object' && (results[item].children[item2].results.length === 0 || results[item].children[item2].results === null || results[item].children[item2].results === undefined)){
                            template[item].values[item2].blank = true
                            stopPost = true
                        } else {
                            template[item].values[item2].blank = false
                        }
                    }
                } else {
                    template[item].blank = false
                }
            } else if(template[item].children){
                for (let item2 in template[item].children){
                    if(typeof results[item].children[item2].results === 'string' && (results[item].children[item2].results === "" || results[item].children[item2].results === null || results[item].children[item2].results === undefined)){
                        template[item].children[item2].blank = true
                        stopPost = true
                    } else if(typeof results[item].children[item2].results === 'object' && (results[item].children[item2].results.length === 0 || results[item].children[item2].results === null || results[item].children[item2].results === undefined)){
                        template[item].children[item2].blank = true
                        stopPost = true
                    } else {
                        template[item].children[item2].blank = false
                    }
                }
            }
        }
        this.setState({template})
        if (!stopPost){
            console.log("POSTING THE SURVEY SIR")
            let success = await integratedBackend.postSurvey(this.state.name, results, localStorage.id ? localStorage.id : -1)
            if (success.status === 200) {
                if(this.props.template.generateid){
                    this.props.setConfirm(true)
                    this.props.setId(this.formatNumberLength(success.data.data.id, 5))
                }
                this.props.setSuccess(success.status === 200)
            }
        }
    }

    handleIdChange = (e) =>{
        this.setState({tempId:e})
    }

    render() {
        console.log('=====================>', this.state.errorId)
        return (
            <div className="Survey">
                <h3 className={'survey-name'}>{this.state.name}</h3>
                <div className={'notice-red width-60'}>* Required field</div>
                {this.props.allowIdSet && <div className={'width-60'}>
                    <h3>{`Please Enter Your ID`}</h3>
                    <div className={'insert-parent'}>
                        <input type={'number'} className={'insert-id'} onChange={(e) => {this.handleIdChange(e.target.value)}}/>
                        <button className={'insert-button'} onClick={() => {this.props.setId(this.state.tempId)}}>Set ID</button>
                    </div>
                </div>}
                {this.state.template.map((input, index)=>{
                    return this.createSurvey(input, index, null)
                })}
                {this.state.errorId && <div className={'notice-red width-60'}>Please Set Id</div>}
                <button className={'width-60 button-submit'} onClick={this.handleSubmit}>Submit Survey</button>
                <div className={'bottom16'}>🐿</div>
            </div>
        )
    }
}

Survey.propTypes = {
    template: PropTypes.object.isRequired,
    setSuccess: PropTypes.func.isRequired,
    setConfirm: PropTypes.func.isRequired,
    setId: PropTypes.func.isRequired,
    allowIdSet: PropTypes.bool.isRequired,
    changeId: PropTypes.func.isRequired,
}

export default Survey;