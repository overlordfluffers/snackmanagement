// src/components/Results.js

// Import react
import React, { Component } from 'react';
import {integratedBackend} from './backend'

class Results extends Component {
    constructor() {
        super();
        // Define state
        this.state = {
            name: "",
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

    handleChange = (event) => {
        this.setState({name:event.target.value})
    }

    render() {
        return (
            <div className="Results">
                <h1>Survey Rhino</h1>
                <div className={'body'}>
                    <select onChange={(e) => {this.handleChange(e)}}>
                        <option value="" disabled selected>Select your option</option>
                        {this.state.surveys.map( (template) => {return <option>{template.surveyname}</option>})}
                    </select>
                </div>
            </div>
        )
    }
};

export default Results;