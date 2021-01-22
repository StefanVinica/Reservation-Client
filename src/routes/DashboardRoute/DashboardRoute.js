import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { format } from "date-fns";

export default class DashboardRoute extends Component {
  state = {
    info: {},
    r_id: 0,
    reservations: []
  }

  componentDidMount() {
    const { history } = this.props
    RestaurantService.getUser()
      .then(user => {
        if (user.user_type === 'User') {
          history.push('/userDashboard')
        }
      })

    RestaurantService.getInfo()
      .then(info => {
        this.setState({
          info: info,
          r_id: info.id
        })
      })
  }

  componentDidUpdate() {
    if (this.state.reservations.length === 0) {
        RestaurantService.getInfo()
          .then(info => {
            this.setState({
              info: info,
              r_id: info.id
            })
          })

        RestaurantService.adminReseservations(parseInt(this.state.r_id))
          .then(reservations => {
            this.setState({
              reservations
            })
          })
    }
  }

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
          <button>Reservation Complete</button>
        </div>
      </div>
    })
    return (
      <section>
        <div className='boxheader'>
          <h2>{this.state.info.r_name}</h2>
        </div>
        <div className='boxbody'>
        <button onClick={this.redirect} className='btn'>Edit Tables</button>
        </div>
        <div className='container'>
          <h2>All reservations</h2>
          {allreservations}
        </div>

      </section>
    )
  }
}

