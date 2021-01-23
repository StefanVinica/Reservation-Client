import React from 'react'
import ReactDOM from 'react-dom'
import UserDashboard from './UserDashboard'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
  <BrowserRouter>
  <UserDashboard />
  </BrowserRouter>,
   div)
  ReactDOM.unmountComponentAtNode(div)
})
