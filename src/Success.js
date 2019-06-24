// src/components/Success.js

// Import react
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'

class Success extends Component {
    constructor() {
        super();
        this.state = {
            template: {},
            surveys: [],
            success: false,
            newId: 0,
        }
    }



    getDate = () => {
        return moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    setSuccess = () => {
        if(this.props.id === this.state.newId){
            this.setState({success:true})
            this.props.setConfirm(false)
        }
    }

    handleChange = (event) => {
        this.setState({newId: event.target.value})
    }

    render() {
        return (
            <div className="Success-parent">
                {this.props.confirm && <div className={"Success"}>
                    <img className={'success-icon'} src="assets/stopsign.png" alt={'success'}/>
                    <div className={'success-id'}>{`Your ID is ${this.props.id}`}</div>
                    <div className={'success-body'}>In order to keep surveys anonymous we have given you <br/> a random id. Please write this down as further surveys will ask you <br/> for this id</div>
                    <div className={'success-body'}>Please type in your ID to confirm you wrote it down <br/> as you will need it later</div>
                    <input className={'success__input'} onChange={(e) => {this.handleChange(e)}} type={'text'}/>
                    <button className={'success__button button-submit'} onClick={this.setSuccess}>Yes, I wrote my Id down!</button>
                </div>}
                {!this.props.confirm && <div className={"Success"}>
                    <img className={'success-icon'} src="assets/Success.png" alt={'success'}/>
                    <div className={'success-title'}>Survey Submitted</div>
                    <div className={'success-body'}>Please take this to the front deck to receive your badge <br/> or screenshot if you completed this survey ahead of time</div>
                    <div className={'success-time'}>{this.getDate()}</div>
                    <div className={'success-time'}>{Date.now()}</div>
                </div>}
            </div>
        )
    }
};

Success.propTypes = {
    id: PropTypes.string.isRequired,
    confirm: PropTypes.bool.isRequired,
    setConfirm: PropTypes.func.isRequired,
}

export default Success;