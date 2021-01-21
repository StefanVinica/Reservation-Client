import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { format } from "date-fns";


export default class MyReservations extends Component {

    state = {
        reservations: []
    }

    componentDidMount(){
        RestaurantService.myReseservations()
        .then(reservations =>{
            this.setState({
                reservations
            })
        })
    }

    componentDidUpdate(){
        RestaurantService.myReseservations()
        .then(reservations =>{
            this.setState({
                reservations
            })
        }) 
    }

    fixTimeZone(utc_date){
        const offset = new Date().getTimezoneOffset()
        const date = new Date(utc_date)
        const newDate = date.setMinutes(date.getMinutes() - offset)
        return newDate
    }

    render() {
        
        const res = this.state.reservations
        const myres = res.map((rez,index)=>{
            return <div key={index} className='box'>
                <div className='boxheader'>
                    <h3 className='boxtitle'>{rez.r_name}</h3>
                    <p>Adress: {rez.r_adress}</p>
                    <p>Phone: {rez.r_phone}</p>
                </div>
                <div className='boxbody'>
                    <h4>Reservation From: {format(new Date(this.fixTimeZone(rez.res_from)), 'MM/dd/yyyy  hh:mm:ss a')}</h4>
                </div>
                <div className='boxfooter'>
                    <button className='btn' value={rez.id}>Cancel</button>
                </div>
            </div>
        })
        return(
            <section>
            <div className='boxheader'>
            <h2>My Reservations</h2>
            </div>
            <div className='boxbody'>
            {myres}
            </div>
            </section>
        )
    }
}