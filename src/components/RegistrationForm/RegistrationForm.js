import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import UserContext from "../../contexts/UserContext"
import './RegistrationForm.css'
import Select from '../Select/Select'

class RegistrationForm extends Component {
  static contextType = UserContext
  static defaultProps = {
      onRegistrationSuccess: () => {},
      location: {},
      history: {
          push: () => {},
      },
  }

  state = { error: null, loading: false }

  firstInput = React.createRef()

  handleLogin = (username, password) => {
      AuthApiService.postLogin({
          username: username,
          password: password,
      })
          .then((res) => {
              this.context.processLogin(res.authToken)
              this.props.onRegistrationSuccess()
          })
          .catch((res) => {
              this.setState({ error: res.error })
          })
  }

  handleSubmit = (ev) => {
     
      this.setState({
          loading: true,
      })
      ev.preventDefault()
      const { name, username, password, user_type } = ev.target
      AuthApiService.postUser({
          name: name.value,
          username: username.value,
          password: password.value,
          user_type: user_type.value
      })
          .then((user) => {
              console.log(user)
              this.handleLogin(username.value, password.value)
              this.setState({
                  loading: true,
              })
              name.value = ""
              username.value = ""
              password.value = ""
          })
          .catch((res) => {
              this.setState({ error: res.error })
          })
  }

  handleLoadingState = () => {
      if (this.state.loading) {
          return (
              <div>
                  <h1>Loading...</h1>
              </div>
          )
      }
  }

  componentDidMount() {
      this.firstInput.current.focus()
  }

  render() {
      const { error } = this.state
      return (
          <form onSubmit={this.handleSubmit} className='boxbody'>
              <div role='alert'>{error && <p>{error}</p>}</div>
              <div className='label-input'>
                  <Label htmlFor='registration-name-input'>
                      Enter your name
                      <Required />
                  </Label>
                  <Input
                      ref={this.firstInput}
                      id='registration-name-input'
                      name='name'
                      required
                  />
              </div>
              <div className=''>
                  <Label htmlFor='registration-username-input'>
                      Choose a username
                      <Required />
                  </Label>
                  <Input
                      id='registration-username-input'
                      name='username'
                      required
                  />
              </div>
              <div className=''>
                  <Label htmlFor='registration-password-input'>
                      Choose a password
                      <Required />
                  </Label>
                  <Input
                      id='registration-password-input'
                      name='password'
                      type='password'
                      required
                  />
              </div>
              <div className=''>
                  <Label htmlFor='user-type'>
                      Choose a user Type
                      <Required />
                  </Label>
                  <Select
                  />
              </div>
              {this.handleLoadingState()}
              <footer>
                  <Button type='submit'>Sign up</Button>{" "}
                  <Link to='/login'>Already have an account?</Link>
              </footer>
          </form>
      )
  }
}

export default RegistrationForm