import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'

const msp = (state) => {
    return {
        loggedIn: state.session.isAuthenticated,
    }
}

const Auth = ({ component: Component, path, loggedIn }) => (
    <Route
        path={path}
        render={(props) =>
            loggedIn ? <Redirect to="/" /> : <Component {...props} />
        }
    />
)
const Protected = ({ component: Component, path, loggedIn }) => (
    <Route
        path={path}
        render={(props) =>
            loggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
)

export const AuthRoute = withRouter(connect(msp)(Auth))
export const ProtectedRoute = withRouter(connect(msp, undefined)(Protected))
