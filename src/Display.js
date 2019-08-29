import React, { Component } from 'react';
import {PropTypes} from "prop-types"
import SurveyQuestions from './SurveyQuestion'


class Display extends Component{
    constructor() {
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="body">
                <h3 className="CreateSurvey">Survey Viewer*</h3>
                <div className="body area">
                        
                        {this.props.questions &&
                            this.props.questions.map((buttonClicked, index) => {
                                return( 
                                    <SurveyQuestions input={buttonClicked} index={index} groupName={null} handleChange={()=>{}}/>
                                )
                            })
                        }
                </div>
            </div>
        )
    }
}

Display.propTypes = {
    questions: PropTypes.array
}

export default Display;