import React, { Component } from 'react'
import RestaurantService from '../services/restaurant-service'
export default class Redirect extends Component {
    static defaultProps = {
        history: {
          push: () => {},
        },
      }
   
    componentDidMount(){
        const { history } = this.props
        RestaurantService.getUser()
        .then(user=>{
            if(user.user_type === 'User'){
                history.push('/userDashboard')
            }
            else{
                history.push('/create')
            }
        })
    }

    render(){
        return(
            <p>Redirect</p>
        )
    }
}