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
            results: [],
            success: false,
            group: 'id'
        }
    }

    componentDidMount() {
        this.fetchAllSurveys()
    }

    fetchAllSurveys = async () =>{
        let surveys = await integratedBackend.fetchAllTemplates()
        this.setState({surveys: surveys.data})
    }

    handleChange = async (event) => {
        let name = event.target.value
        await this.refreshSurveys(name)
        this.setState({name})
    }

    refreshSurveys = async (name) => {
        let surveys = await integratedBackend.fetchSurveyByName(name)
        this.setState({results: surveys.data})
    }

    createTable = (survey) => {
        let table = []

        let surveyIds = survey.map((surveyCurrent)=>{
            return surveyCurrent.id
        })

        // Outer loop to create parent
        for (let i = 0; i < Math.ceil(survey[survey.length-1].id/10); i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 10; j++) {
                let current = (i*10)+j+1
                children.push(<td className={surveyIds.includes(current.toString()) ? 'green' : 'red'}>{current}</td>)
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
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

                    {this.state.results.length > 0 && <div>
                        <div>
                            <button className={'button-submit'} onClick={()=>{this.setState({group:'results'})}}> Results Table</button>
                            <button className={'button-submit'} onClick={()=>{this.setState({group:'id'})}}> Id Table</button>
                        </div>
                        <button className={'refresh'} onClick={async () => {await this.refreshSurveys(this.state.name)}}> Refresh </button>
                        <div>{`Count: ${this.state.results.length}`}</div>
                        {this.state.group === 'results' && <table className={'results width-80'}>
                            <tr>
                                <th>Id</th>
                                {this.state.results[0].results.map((option) => {return(<th>{option.name}</th>)})}
                            </tr>
                            {this.state.results.map((survey)=>{
                                return <tr><td>{survey.id}</td>{survey.results.map((row)=>{return <td>{row.results}</td>})}</tr>
                            })}
                        </table>}
                        {this.state.group === 'id' && <div className={'width-80'}>
                            <table>
                                <tbody>
                                    {this.createTable(this.state.results)}
                                </tbody>
                            </table>
                        </div>}
                    </div>}
                </div>
            </div>
        )
    }
};

export default Results;