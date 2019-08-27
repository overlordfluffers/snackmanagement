import React, { Component } from 'react';
import AdditionalOptions from './AdditionalOptions';
import SurveyQuestions from './SurveyQuestion'
import {isEqual} from 'lodash'



class InputBar extends Component{
    constructor() {
        super();
        this.state = {
            // for undefined arrays do []
            // for string answer ''
            // for true/false statements add true, false, or boolean
            questions: [],
            questionValue:'',
            buttonChoice: '',
            optional: undefined,
            components:{
                align: '',
                options: [],
                scaleOptions: [],
                style: '',
                value:[]
            }
        }
    }

    // this function is to allow info to be posted into something
    questionResp() {
        let question = {}
        let canPost = true
        if (this.state.questionValue.length===0 || this.state.optional === undefined){
            canPost = false
        } else if (this.state.buttonChoice === 'FreeText'){
            question = {
                name: this.state.questionValue,
                type: 'free',
                optional: this.state.optional
            }
        } else if (this.state.buttonChoice === 'Radio'){
            question = {
                name: this.state.questionValue,
                type: 'radio',
                optional: this.state.optional,
                align: this.state.components.align,
                options: this.lysol(this.state.components.options)
            } 
        }else if (this.state.buttonChoice === 'Checkbox'){
            question =  {
                name: this.state.questionValue,
                type: 'checkbox',
                optional: this.state.optional,
                align: this.state.components.align,
                options: this.lysol(this.state.components.options)
            }
        }else if (this.state.buttonChoice === 'Matrix'){
            question = {
                name: this.state.questionValue,
                type: 'matrix',
                optional: this.state.optional,
                style: this.state.components.style,
                options: this.lysol(this.state.components.scaleOptions),
                values: this.lysol(this.state.components.value)
            }
        }else if (this.state.buttonChoice === 'Scale'){
            question = {
                name: this.state.questionValue,
                type: 'scale',
                optional: this.state.optional,
                align: this.state.components.align,
                options: this.lysol(this.state.components.scaleOptions)
            }
        }else if (this.state.buttonChoice === 'Dropdown'){
            question = {
                name: this.state.questionValue,
                type: 'dropdown',
                optional: this.state.optional,
                style: this.state.components.style,
                options: this.lysol(this.state.components.options)
            }
        }else if (this.state.buttonChoice === 'CommentBox'){
            question = {
                name:this.state.questionValue,
                type: 'commentbox',
                optional: this.state.optional
            }
        } else {
            console.log('YOUR DUMB')
            canPost = false
        }
        if(canPost){
           this.state.questions.push(question)
           this.setState({questions: this.state.questions, questionValue:'', optional:undefined, buttonChoice:''})
        }
    }

    // function that allows for when an even happens to reset the values to something new
    handleChange = (event) => {
        this.setState({questionValue:event.target.value})
    }

    handleOptions = (optional) => {
        this.setState({optional})
    }

    // a function that calls upon a string to set the value of it to something
    whichButton = (buttonChoice) => {
        this.setState({buttonChoice})
    }

    getComponents = (components) => {
        this.setState({components})
        console.log(this.state.components)
    }

    lysol = (array) => {
        return array.filter(object => {
            return (object !== '' && !_.isEqual(object, {name:""}) && !_.isEqual(object, {value:"",text:""}))
        })
    }

    render(){
        return (
            <div className="body">
                <h3 className="CreateSurvey" maxlength="64">Create Survey</h3>
                <div className="requiredCSS">
                    <div className="box">Survey Name:</div>
                    <input className="question"/>
                </div>
                <div className="requiredCSS">
                    <div className="requiredQuestion">Create ID</div>
                    <div className="surveyOptions buttonGroup  choice">
                        <div className={'selection'}>
                            <input type="radio" name={"ID"} id={"IDYes"} name="ID" value=''/>
                            <label htmlFor={'IDYes'}>
                                <div className="test3 question-type">Yes</div>
                            </label>
                            <br/>
                        </div>
                        <div className={'selection'}>
                            <input type="radio" name={"ID"} id={"IDNo"} name="ID" value=''/>
                            <label htmlFor={'IDNo'}>
                                <div className="test3 question-type">No</div>
                            </label>
                            <br/>
                        </div>
                    </div>
                </div>

                <br/>
                <div className={'questionBox'}>
                    <div className="requiredCSS">
                        <div className="box">Question:</div>
                        <input className="question" value={this.state.questionValue} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="requiredCSS frankie">
                        <div className="requiredQuestion">Is this question Required*</div>
                        <div className="surveyOptions buttonGroup choice">
                            <div className={'selection'}>
                                <input type="radio" id={"False"} name="optional" value='false' checked={this.state.optional===false} onChange={() => {this.handleOptions(false)}}/>
                                <label htmlFor={'False'}>
                                    <div className="test3 question-type">Yes</div>
                                </label>
                                <br/>
                            </div>
                            <div className={'selection'}>
                                <input type="radio" id={"True"} name="optional" value='true' checked={this.state.optional===true} onChange={() => {this.handleOptions(true)}}/>
                                <label htmlFor={'True'}>
                                    <div className="test3 question-type">No</div>
                                </label>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div className="surveyOptions choice">
                        <div className={'selection'} id={`FreeText-Parent`}>
                            <input type={"radio"} name={"Choice"} id={`FreeText`} checked={this.state.buttonChoice==='FreeText'} onChange={(e) => {this.whichButton('FreeText')}}/>
                            <label htmlFor={`FreeText`}>
                                <div className="markdown question-type">FreeText</div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'Radio'} checked={this.state.buttonChoice==='Radio'} onClick={(e)=> {this.whichButton('Radio')}}/>
                            <label htmlFor={`Radio`}>
                                <div className="markdown question-type"> Radio </div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'Checkbox'} checked={this.state.buttonChoice==='Checkbox'} onClick={(e)=> {this.whichButton('Checkbox')}}/>
                            <label htmlFor={`Checkbox`}>
                                <div className="markdown question-type"> Checkbox </div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'Matrix'} checked={this.state.buttonChoice==='Matrix'} onClick={(e)=> {this.whichButton('Matrix')}}/>
                            <label htmlFor={`Matrix`}>
                                <div className="markdown question-type"> Matrix </div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'Scale'} checked={this.state.buttonChoice==='Scale'} onClick={(e)=> {this.whichButton('Scale')}}/>
                            <label htmlFor={`Scale`}>
                                <div className="markdown question-type"> Scale </div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'Dropdown'} checked={this.state.buttonChoice==='Dropdown'} onClick={(e)=> {this.whichButton('Dropdown')}}/>
                            <label htmlFor={`Dropdown`}>
                                <div className="markdown question-type"> Dropdown </div>
                            </label><br/>
                        </div>
                        <div className={'selection'} id={'FreeText-Parent'}>            
                            <input type={"radio"} name={"Choice"} id={'CommentBox'} checked={this.state.buttonChoice==='CommentBox'} onClick={(e)=> {this.whichButton('CommentBox')}}/>
                            <label htmlFor={`CommentBox`}>
                                <div className="markdown question-type"> CommentBox </div>
                            </label><br/>
                        </div>
                    </div>

                    <div className={'additionalOptions'}>
                        {(this.state.buttonChoice === 'Radio' || this.state.buttonChoice === 'Checkbox') && <div className="test"><AdditionalOptions type={'choice'} setComponents={this.getComponents}/></div>}
                        {this.state.buttonChoice === 'Matrix' && <div className="test"><AdditionalOptions type={'matrix'} setComponents={this.getComponents}/></div>}
                        {this.state.buttonChoice === 'Scale' && <div className="test"><AdditionalOptions type={'scale'} setComponents={this.getComponents}/></div>}
                        {this.state.buttonChoice === 'Dropdown' && <div className="test"><AdditionalOptions type={'dropdown'} setComponents={this.getComponents}/></div>}
                    </div>
                    <button className="button-submit" onClick={()=>{this.questionResp()}}>Post</button>
                </div>

                <br/>
                
                {this.state.questions &&
                    this.state.questions.map((buttonClicked, index) => {
                        return( 
                                <SurveyQuestions input={buttonClicked} index={index} groupName={null} handleChange={()=>{}}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default InputBar;