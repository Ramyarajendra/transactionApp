import React from 'react'
import {connect} from 'react-redux'
import {Route, Switch, BrowserRouter, Router} from 'react-router-dom'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register'
import {createBrowserHistory} from 'history'
import PrivateRoute from './PrivateRoute'
import Navbar from '../components/Navbar'

// export const history = createBrowserHistory()

const AppRouter = ({auth}) => {
    return (
        <BrowserRouter>
        <div>
            {auth.isAuthenticated && <Navbar/>}
            <Switch>
                <Route path='/' component={Login} exact={true}/>
                <Route path='/register' component={Register}/>
                <PrivateRoute path='/profile' component={Profile}/>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppRouter)
