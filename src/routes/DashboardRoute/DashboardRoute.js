import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { format } from "date-fns"

export default class DashboardRoute extends Component {
  state = {
    info: {},
    r_id: 0,
    reservations: []
  }
  
  componentDidMount() {
    const { history } = this.props
    //Redirect if regular user
    //
    RestaurantService.getUser()
      .then(user => {
        if (user.user_type === 'User') {
          history.push('/userDashboard')
        }
      })
    
    //Get initial information for restaurant
    //  
    RestaurantService.getInfo()
      .then(info => {
        this.setState({
          info: info,
          r_id: info.id
        })
      })
    
    //Get initial reservations
    //  
    RestaurantService.adminReseservations(parseInt(this.state.r_id))
    .then(reservations => {
      console.log(reservations)
      this.setState({
        reservations
      })
    })  
  }

  componentDidUpdate() {
    //After first edit this is here to update the name
    //
    RestaurantService.getInfo()
      .then(info => {
        if(this.state.r_id === 0){
        this.setState({
          info: info,
          r_id: info.id
        })
      }
      })
    
    //Keep updating reservations after user cancels them
    //
    RestaurantService.adminReseservations(parseInt(this.state.r_id))
          .then(reservations => {
            if(reservations.length>this.state.reservations.length){
              this.setState({
                  reservations
              })
          }
          })    
  }

  //Converting time zones
  //
  fixTimeZone(utc_date) {
    const offset = new Date().getTimezoneOffset()
    const date = new Date(utc_date)
    const newDate = date.setMinutes(date.getMinutes() - offset)
    return newDate
  }

  redirect = () => {
    const { history } = this.props
    history.push(`/edit/${this.state.r_id}`)
  }

  handleDelete = e => {
    //Delete and call component update
    //
    RestaurantService.deleteres(parseInt(e))
    RestaurantService.adminReseservations(parseInt(this.state.r_id))
          .then(reservations => {
            this.setState({
              reservations
            })
          })
  }

  render() {
    const reservations = this.state.reservations
    const allreservations = reservations.map((res, index) => {
      return <div key={index} className='box'>
        <div className='boxheader'>
          <h3 className='boxtitle'>{res.name} - Table:{res.t_name}</h3>
        </div>
        <div className='boxbody'>
          <p>Party Size:{res.number_of_ppl}</p>
          <p>From:{format(new Date(this.fixTimeZone(res.res_from)), 'MM/dd/yyyy  hh:mm:ss a')}</p>
          <p>To:{format(new Date(this.fixTimeZone(res.res_to)), 'MM/dd/yyyy  hh:mm:ss a')}</p>
        </div>
        <div className='boxfooter'>
          <button value={res.id} onClick={e => this.handleDelete(e.target.value)}>Reservation Complete</button>
        </div>
      </div>
    })
    return (
      <section>
        <div className='boxheader'>
          <h2>{this.state.info.r_name}</h2>
        </div>
        <div className='boxbody'>
        <button onClick={this.redirect} className='btn'>View All Tables</button>
        </div>
        <div className='container'>
          <h2>All reservations</h2>
          {allreservations}
        </div>

      </section>
    )
  }
}

