import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import RestaurantService from '../../services/restaurant-service'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  state = {
    user: '',
    r_id: 0,
    name: '',
  }

  componentDidMount() {
    RestaurantService.getUser()
      .then(user => {
        this.setState({
          user: user.user_type
        })
      })
  }

  componentDidUpdate() {
    RestaurantService.getUser()
    .then(user => {
      if(this.state.user !== user.user_type){
        this.setState({
          user: user.user_type
        })
      }
    })
    RestaurantService.getInfo()
    .then(restaurant =>{
      if(restaurant.id!==this.state.r_id){
      this.setState({
        r_id:restaurant.id,
        name:restaurant.r_name
      })}
    }) 
    
  }

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    if (this.state.user === 'User') {
      //User dropdown
      return (
        <div>
          <Navbar variant="light">
            <Navbar.Brand><Link to='/'><h3>Reservation</h3></Link></Navbar.Brand>

            <Nav className="mr-auto">
            </Nav>


            <NavDropdown
              alignRight
              title={this.context.user.name}
              id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to='myreservation'>My Reservations</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  onClick={this.handleLogoutClick}
                  to='/login'>
                  Logout
        </Link>
              </NavDropdown.Item>
            </NavDropdown>


          </Navbar>
        </div>
      )
    }
    else{
      //Admin dropdown
      return (
        <div>
          <Navbar variant="light">
            <Navbar.Brand><Link to='/'><h3>Reservation</h3></Link></Navbar.Brand>

            <Nav className="mr-auto">
            </Nav>


            <NavDropdown
              alignRight
              title={this.state.name}
              id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to={`/edit/${this.state.r_id}`}>All Tables</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  onClick={this.handleLogoutClick}
                  to='/login'>
                  Logout
        </Link>
              </NavDropdown.Item>
            </NavDropdown>


          </Navbar>
        </div>
      )
    }
  }

  renderLoginLink() {
    return (
      <Navbar variant="light">
        <Navbar.Brand href='/'><h3>Reservation</h3></Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Link className='login' to='/login'><Button className='btn'>Login</Button></Link>
        {' '}
        <Link className='login' to='/register'><Button className='btn'>Sign up</Button></Link>

      </Navbar>
    )
  }

  render() {
    return (
      <header>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}

export default Header
