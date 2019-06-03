// src/components/Survey.js

// Import react
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {integratedBackend} from './backend'

class Survey extends Component {
    constructor() {
        super();
        this.state = {
            id: 1,
            name: "",
            template: [],
            results: [],
            required: [],
        }
    }

    componentDidMount() {
        this.getTemplate()
    }

    getTemplate = async() => {
        let payload = this.props.template
        let required = payload.template.map( (item) => {return item.optional !== true})
        let results = payload.template.map( (item) => {
            if (item.type !== 'group'){
                return {name: item.name, results: ""}
            } else if (item.type === 'group'){
                return {name: item.name, children: item.children.map( (item) => {
                    return {name: item.name, results: ""}
                })}
            }
        })
        this.setState({name:payload.surveyname, required, template: payload.template, results})
    }

    handleChange = (event, name, groupName) => {
        if(groupName === null){
            let obj = this.state.results.find(o => o.name === name);
            obj.results = event.target.value
        } else {
            let obj = this.state.results.find(o => o.name === groupName);
            let obj2 = obj.children.find(o => o.name === name);
            obj2.results = event.target.value
        }
    }

    createSurvey = (input, index, groupName) => {
        if(input.type === 'free'){
            return(
                <div className={'free-text'} id={`input-${index}`}>
                    <div className={'free-text__label'}>{input.name}</div>
                    <input className={'free-text__input'} id={`input-${index}-0`} onChange={(e) => {this.handleChange(e,input.name, groupName)}} type={'text'}/>
                </div>
            )
        } else if(input.type === 'choice'){
            return(
                <div className={'choice width-60'} id={`input-${index}`}>
                    <div className={'choice-name'}>{input.name}</div>
                    {input.options.map( (option, newIndex) => {
                        return(<div className={'selection'} id={`input-${index}-${newIndex}-parent`}>
                                    <input type="radio" name={`input-${index}`} id={`input-${index}-${newIndex}`} onChange={(e) => {this.handleChange(e,input.name, groupName)}} value={option}/>
                                    <label className={newIndex===input.options.length-1 ? 'border-bottom' : ''} htmlFor={`input-${index}-${newIndex}`}> {option}  </label><br/>
                               </div>)
                    })}
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

    handleSubmit = async () => {
        console.log("POSTING THE SURVEY SIR")
        let stopPost = false
        for (let item in this.state.required){
            if(this.state.required[item] === true && (this.state.results[item] === null || this.state.results[item] === '' || this.state.results[item] === undefined)){
                stopPost = true
            }
        }
        if (!stopPost){
            await integratedBackend.postSurvey(this.state.name, this.state.results)
        }
    }

    render() {
        return (
            <div className="Survey">
                <h3 className={'survey-name'}>{this.state.name}</h3>
                {this.state.template.map((input, index)=>{
                    return this.createSurvey(input, index, null)
                })}
                <button className={'width-60 button-submit'} onClick={this.handleSubmit}>Submit Survey</button>
                <div className={'bottom16'}>A Chipmunk Production</div>
            </div>
        )
    }
}

Survey.propTypes = {
    template: PropTypes.arrayOf(PropTypes.object)
}

export default Survey;