import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'



export default class DashboardRoute extends Component {
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
      <section className='boxbody'>
       <div className='boxheader'>
         <h2>{this.state.info.r_name}</h2>
       </div>
        
      </section>
    )
  }
}

