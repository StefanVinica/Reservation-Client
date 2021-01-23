import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationForm from './RegistrationRoute'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
  <BrowserRouter>
  <RegistrationForm />
  </BrowserRouter>,
   div)
  ReactDOM.unmountComponentAtNode(div)
})
