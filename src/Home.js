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
            success: false,
        }
    }
    
    componentDidMount() {
        this.fetchAllSurveys()
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

    goHome = () => {
        this.setState({template: {},success: false,})
    }

    render() {
        return (
            <div className="Home">
                <h1 onClick={this.goHome}>Survey Rhino</h1>
                <div className={'body'}>
                    {!this.state.success && this.isEmpty(this.state.template) &&<div className={'top-100'}>
                        {this.state.surveys.map( (template) => {
                        return(
                            <div className={'survey-select'} onClick={() => {this.setTemplate(template)}}> {template.surveyname} </div>
                        )
                    })}
                    </div>}
                    {!this.state.success && !this.isEmpty(this.state.template) && <Survey template={this.state.template} setSuccess={this.setSuccess} />}
                    {this.state.success && <Success/>}
                </div>
            </div>
        )
    }
};

export default Home;