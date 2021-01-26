import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../LandingPage/customers.png'
import img2 from '../LandingPage/restaurant.jpg'
import img3 from '../LandingPage/reservations.jpg'

export default class LandingPage extends Component {

    render(){
        return(
            <div className='box'>
            <div className='boxheader'>
            </div>
            <div className='boxbody'>
            <h2>How to get Started!</h2>
            <ol>
            <p><li>If you have a restaurant create a Admin account</li></p>
            <p><li>If you want to use the app to make reservations create a User account</li></p>
            </ol>
            </div>

            <div className='boxbody '>
            <h2>User Account</h2>
            <div className='cont'>
            <img src={img1} alt={'users'} />
            <p className='text'>
            Search our database of retaurants with a few easy steps
            <span>
            <ul>
                <li>Choose the date you want to make the reservation</li>
                <li>Choose what kind of restaurant you want to eat at</li>
                <li>Set the party size for you and your friends</li>
                <Link to={'/register'}><button className='btn'>Try it NOW</button></Link>
            </ul>
            </span>
            </p>
            </div>
            </div>

            <div className='boxbody '>
            <h2>Admin Account</h2>
            <div className='cont'>
            <img src={img2} alt={'restaurant'}/>
            <p className='text'>
            Make your restaurant avilable to our clients, easy to set-up and manage
            <span>
            <ul>
                <li>Add all your tables</li>
                <li>See all reservations made</li>
                <li>Mark whenever the reservation is complete</li>
                <Link to={'/register'}><button className='btn'>Try it NOW</button></Link>
            </ul>
            </span>
            </p>
            </div>
            </div>

            <div className='boxbody '>
            <h2>Reservations</h2>
            <div className='cont'>
            <img src={img3} alt={'reservations'} />
            <p className='text'>
            Our app gives every reservation 2 hours, and manages the tables so you dont have to worry
            about people waiting or overboocking
            <span>
            <ul>
                <li>If the reservation is over before the 2 hours you can manualy make that table avilable</li>
                <li>This gives you more time to focus on better service</li>
                <Link to={'/register'}><button className='btn'>Try it NOW</button></Link>
            </ul>
            </span>
            </p>
            </div>
            </div>

        </div>
    
        )
    }
}