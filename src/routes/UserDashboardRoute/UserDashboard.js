import React, { Component, useState } from 'react'
import 'date-fns'
import DateTimePicker from 'react-datetime-picker'


export default class UserDashboard extends Component {

    state={
        date: ''
    }

    handleChange = event => {
        
        this.setState({
            date: event.target.value
        })
    }

    render() {
        
        
        return (
            <div>
                <p>Select DateTime</p>
                <input
                type="datetime-local"
                id="reservation-time"
                name="reservation-time" 
                value={this.state.date}
                onChange={this.handleChange}
                >
                </input>
            </div>
        )
    }
}