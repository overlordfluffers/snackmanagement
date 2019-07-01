// src/components/Home.js

// Import react
import React, { Component } from 'react';
import Survey from './Survey'
import {integratedBackend} from './backend'
import CreateTemplate from './CreateTemplate'
import Success from './Success'

class Home extends Component {
    constructor() {
        super();
        // Define state
        this.state = {
            template: {},
            surveys: [],
            confirm: false,
            success: false,
            id:0,
        }
    }
    
    componentDidMount() {
        this.fetchAllSurveys()
        localStorage.setItem('id', this.state.id)
    }
    
    fetchAllSurveys = async () =>{
        let surveys = await integratedBackend.fetchAllTemplates()
        this.setState({surveys: surveys.data})
    }

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    setTemplate = (template) => {
        this.setState({template})
    }

    setSuccess = (value) => {
        this.setState({success:value})
    }
    setConfirm = (value) => {
        this.setState({confirm:value})
    }
    setId = (value) => {
        if(value !== -1){
            localStorage.setItem('id', value)
            this.setState({id:value})
        }
    }

    goHome = () => {
        this.setState({template: {},success: false,})
    }


    render() {
        let allowSetId = !localStorage.id || localStorage.id < 1 && !this.state.template.generate_id
        return (
            <div className="Home">
                <h1 onClick={this.goHome}>Survey Rhino</h1>
                {localStorage.id && localStorage.id > 0 && <h3>{`Your ID is ${localStorage.id}`}</h3>}
                <div className={'body'}>
                    {!this.state.success && this.isEmpty(this.state.template) &&<div className={'top-100'}>
                        {this.state.surveys.map( (template) => {
                        return(
                            <div className={'survey-select'} onClick={() => {this.setTemplate(template)}}> {template.surveyname} </div>
                        )
                    })}
                    </div>}
                    {!this.state.success && !this.isEmpty(this.state.template) && <Survey template={this.state.template} setSuccess={this.setSuccess} setConfirm={this.setConfirm} setId={this.setId} allowIdSet={allowSetId}/>}
                    {this.state.success && <Success id={this.state.id} confirm={this.state.confirm} setConfirm={this.setConfirm}/>}
                </div>
            </div>
        )
    }
};

export default Home;