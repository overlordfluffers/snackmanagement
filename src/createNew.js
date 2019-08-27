import React, { Component } from 'react';
import Survey from './Survey'
import {integratedBackend} from './backend'
import InputBar from './InputBar'

class CreateNew extends Component{
    constructor() {
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="Home">
                <div> 
                    <h1>Survey Rhino</h1> 
                </div>
                <div> 
                    <InputBar/> 
                </div>
            </div>
        )
    }
}

export default CreateNew;