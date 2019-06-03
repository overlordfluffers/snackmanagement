// src/components/Home.js

// Import react
import React, { Component } from 'react';
import Survey from './Survey'
import {integratedBackend} from './backend'
import CreateTemplate from './CreateTemplate'

class Home extends Component {
    constructor() {
        super();
        // Define state
        this.state = {
            template: {},
            surveys: []
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

    render() {
        return (
            <div className="Home">
                <h1>Survey Rhino</h1>
                {/*<CreateTemplate/>*/}
                <div className={'body'}>
                    {this.isEmpty(this.state.template) &&<div className={'top-100'}>
                        {this.state.surveys.map( (template) => {
                        return(
                            <div className={'survey-select'} onClick={() => {this.setTemplate(template)}}> {template.surveyname} </div>
                        )
                    })}
                    </div>}
                    {!this.isEmpty(this.state.template) && <Survey template={this.state.template} />}
                </div>
                {/*<div className="footer">*/}
                {/*    <p>Footer</p>*/}
                {/*</div>*/}
            </div>
        )
    }
};

export default Home;