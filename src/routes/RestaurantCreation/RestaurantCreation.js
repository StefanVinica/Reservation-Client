import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'


export default class RestaurantCreation extends Component {
  state = {
    info: {}
  }

  componentDidMount() {
    RestaurantService.getInfo()
    .then(info => {
      this.setState({
        info: info
      })
    })
  }
  
  render() {
    return (
      <section classname='box'>
       
        Create

        
      </section>
    );
  }
}

