// src/components/Results.js

// Import react
import React, { Component } from 'react';
import {integratedBackend} from './backend'
import ChartPanel from './ChartPanel'

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
                children.push(<td className={`border-background ${surveyIds.includes(current.toString()) ? 'green' : 'red'}`}>{current}</td>)
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    // findByValue = (array, name) => {
    //     let array.filter((survey)=>{
    //         return survey.surveyname === name
    //     })[0]
    // }
    
    render() {
        console.log('=====================>', this.props.match)
        return (
            <div className="Results">
                <h1>Survey Rhino</h1>
                <div className={'body'}>
                    <select onChange={(e) => {this.handleChange(e)}}>
                        <option value="" disabled selected>Select your option</option>
                        {this.state.surveys.map( (template) => {return <option>{template.surveyname}</option>})}
                    </select>

                    {this.state.results.length > 0 && <div className={'results-area'}>
                        <div className={'tool-bar width-60'}>
                            <button className={'border-left button-toolbar'} onClick={()=>{this.setState({group:'results'})}}> Results Table</button>
                            <button className={'button-toolbar'} onClick={()=>{this.setState({group:'id'})}}> Id Table</button>
                            {/*<button className={'button-toolbar'} onClick={()=>{this.setState({group:'chart'})}}> Charts</button>*/}
                            <button className={'border-right button-toolbar refresh'} onClick={async () => {await this.refreshSurveys(this.state.name)}}> Refresh </button>
                        </div>
                        <h3>{`Survey Count: ${this.state.results.length}`}</h3>
                        {this.state.group === 'chart' && <ChartPanel surveys={this.state.results} template={this.findByValue(this.state.surveys)}/>}
                        {this.state.group === 'results' && <table className={'results-table width-80'}>
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
                                <tbody className={'border-background'}>
                                    {this.createTable(this.state.results)}
                                </tbody>
                            </table>
                        </div> }
                    </div>}
                </div>
            </div>
        )
    }
};

export default Results;