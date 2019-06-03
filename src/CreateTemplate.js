// src/components/CreateTemplate.js

// Import react
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {integratedBackend} from './backend'

class CreateTemplate extends Component {
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

    handleChange = (event, index) => {
        let template = this.state.template
        let object = template[index]
        if(event.target.type === 'checkbox'){
            object[event.target.name]=event.target.checked
        } else {
            object[event.target.name]=event.target.value
        }
        this.forceUpdate()
    }

    

    createTemplate = (input, index) => {

        if(input.type === 'choice' && !input.options){
            let template = this.state.template
            template[index] = {...template[index], options:[]}
        }else if(input.type === 'free' && input.options){
            let template = this.state.template
            template[index] = {name:template[index].name, type:template[index].type, optional:template[index].optional}
        }

        if(input.type === 'choice' || input.type === 'free'){
            return(
                <div id={`input-${index}`}>
                    <label htmlFor={`input-${index}-0`}>Name</label>
                    <input name={'name'} id={`input-${index}-0`} onChange={(e) => {this.handleChange(e,index)}} type={'text'}/>

                    <label htmlFor={`input-${index}-0`}>Type </label>
                    <select name={'type'} id={`input-${index}-0`} onChange={(e) => {this.handleChange(e,index)}}>
                        <option value={'free'}>Free Text</option>
                        <option value={'choice'}>Multiple Choice</option>
                    </select>

                    <label htmlFor={`input-${index}-0`}>Optional</label>
                    <input name={'optional'} onChange={(e) => {this.handleChange(e,index)}} type={'checkbox'}/>

                    {input.type === 'choice' && <div></div>}
                </div>
            )
        } else{
            return(<div>Error</div>)
        }
    }
    
    newQuestion = () =>{
        let template = this.state.template
        template.push({name: '', type:'free', optional: false})
        console.log(template)
        this.setState(template)
    }

    render() {
        return (
            <div className="CreateTemplate">
                <h3>Template Creation</h3>
                {this.state.template.map((input, index)=>{
                    return this.createTemplate(input, index)
                })}
                <button onClick={this.newQuestion}>New Question</button>
                <button onClick={this.handleSubmit}>Submit Thy CreateTemplate</button>
            </div>
        )
    }
}

CreateTemplate.propTypes = {
}

export default CreateTemplate;