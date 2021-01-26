import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import RestaurantCreation from '../../routes/RestaurantCreation/RestaurantCreation'
import Redirect from '../../routes/Redirect'
import UserDashboard from '../../routes/UserDashboardRoute/UserDashboard'
import MyReservations from '../../routes/MyReservations/MyReservations'
import EditTables from '../../routes/EditTables/EditTables'
import LandingPage from '../../routes/LandingPage/LandingPage'
import './App.css'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/redirect'}
              component={Redirect}
            />
            <PrivateRoute
              path={'/edit/:id'}
              component={EditTables}
            />
            <PrivateRoute
              path={'/myreservation'}
              component={MyReservations}
            />
            <PrivateRoute
              path={'/userDashboard'}
              component={UserDashboard}
            />
            <PrivateRoute 
              path={'/create'}
              component={RestaurantCreation}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <PublicOnlyRoute
              path={'/landing'}
              component={LandingPage}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    )
  }
}
