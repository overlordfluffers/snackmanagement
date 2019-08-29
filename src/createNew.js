import React, { Component } from 'react';
import Survey from './Survey'
import {integratedBackend} from './backend'
import InputBar from './InputBar'
import Display from './Display'

class CreateNew extends Component{
    constructor() {
        super();
        this.state = {
            surveyName:'',
            generateId: undefined,
            questions: [],
            notWork: '',
        }
    }

    getQuestions = (questions) => {
        this.setState({questions})
    }

    getSurveyName = (surveyName) => {
        this.setState({surveyName})
    }
    getId = (generateId) => {
        this.setState({generateId})
    }

    postTemplate = () => {
        let canPost = true
        if (this.state.surveyName.length === 0){
            canPost = false
            this.notWorking('survey')
        }else if (this.state.generateId === undefined){
            canPost = false
            this.notWorking('Id')
        }else if (this.state.questions.length === 0){
            canPost = false
            this.notWorking('question')
        }
        if(canPost){
            integratedBackend.postTemplate(this.state.generateId, this.state.surveyName, this.state.questions)
            this.notWorking('good')
        }
    }
    notWorking = (notWork) => {
        this.setState({notWork})
    }

    render(){
        return (
            <div className="container">
                <div className="item-a"> 
                    <h1>Survey Rhino</h1> 
                </div>
                <div className="item-b">
                    <InputBar setQuestions={this.getQuestions} setSurveyName={this.getSurveyName} setId={this.getId}/>
                </div>
                <div className="item-c">
                    <Display questions={this.state.questions}/>
                </div>
                <div className="item-e notice-red">
                {this.state.notWork === 'survey' && <div className="notDone">You have not filled in Survey Name.</div>}
                {this.state.notWork === 'Id' && <div className="notDone">You have not pushed a button for Generate Id.</div>}
                {this.state.notWork === 'question' && <div className="notDone">You have not entered any questions.</div>}
                {this.state.notWork === 'good' && <div className="notDone">Survey has been Posted</div>}
                </div>
                <div className="item-d test">
                    <button className="button-submit" onClick={() => {this.postTemplate()}}>Create Survey</button>
                </div>
            </div>
        )
    }
}

export default CreateNew;