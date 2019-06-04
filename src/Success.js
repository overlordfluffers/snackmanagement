// src/components/Success.js

// Import react
import React, { Component } from 'react';
import moment from 'moment';

class Success extends Component {
    constructor() {
        super();
        // Define state
        this.state = {
            template: {},
            surveys: [],
        }
    }

    getDate = () => {
        return moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    render() {
        return (
            <div className="Success">
                <img className={'success-icon'} src="assets/Success.png" alt={'success'}/>
                <div className={'success-title'}>Survey Submitted</div>
                <div className={'success-body'}>Please take this to the front deck to receive your badge <br/> or screenshot if you completed this survey ahead of time</div>
                <div className={'success-time'}>{this.getDate()}</div>
                <div className={'success-time'}>{Date.now()}</div>
            </div>
        )
    }
};

export default Success;