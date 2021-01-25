import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            className='login'
            onClick={this.handleLogoutClick}
            to='/login'>
            <button className='btn'>
            Logout
            </button>
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='navbar'>
        <Link className='login' to='/login'><button className='btn'>Login</button></Link>
        {' '}
        <Link className='login' to='/register'><button className='btn'>Sign up</button></Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
            <h3>Reservation</h3>
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}

export default Header
