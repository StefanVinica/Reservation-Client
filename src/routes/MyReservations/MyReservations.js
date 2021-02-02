import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { format } from "date-fns"
import {Button} from 'react-bootstrap'


export default class MyReservations extends Component {

    state = {
        reservations: []
    }

    componentDidMount(){
        //Get all reservations based on who is logged in
        //
        RestaurantService.myReseservations()
        .then(reservations =>{
            this.setState({
                reservations
            })
        })
    }

    componentDidUpdate(){
    //Keep updating reservations
    //
        RestaurantService.myReseservations()
        .then(reservations=>{
            if(reservations.length>this.state.reservations.length){
                this.setState({
                    reservations
                })
            }
        })
    }

    //Convert time zones
    //
    fixTimeZone(utc_date){
        const offset = new Date().getTimezoneOffset()
        const date = new Date(utc_date)
        const newDate = date.setMinutes(date.getMinutes() - offset)
        return newDate
    }


    redirect = () => {
        const { history } = this.props
        history.push('/userDashboard')        
    }
    //Delete reservation and update
    //
    handleDelete = e => {
       RestaurantService.deleteres(parseInt(e))
        RestaurantService.myReseservations()
        .then(reservations =>{
            this.setState({
                reservations
            })
        }) 
       
    }

    render() {
        
        const res = this.state.reservations
        const myres = res.map((rez,index)=>{
            return <div key={index} className='box'>
                <div className='boxheader'>
                    <h3 className='boxtitle'>{rez.r_name}</h3>
                    <p>Address: {rez.r_adress}</p>
                    <p>Phone: {rez.r_phone}</p>
                </div>
                <div className='boxbody'>
                    <h4>Reservation From: {format(new Date(this.fixTimeZone(rez.res_from)), 'MM/dd/yyyy  hh:mm:ss a')}</h4>
                </div>
                <div className='boxfooter'>
                    <Button 
                    value={rez.id}
                    onClick={e => this.handleDelete(e.target.value)}
                    >Cancel
                    </Button>
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