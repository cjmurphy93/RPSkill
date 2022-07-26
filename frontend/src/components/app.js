import React from 'react'
import { Route } from 'react-router'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Switch } from 'react-router-dom'
import MainPage from './main/main_page'
import LogIn from './session/login_container'
import SignUp from './session/signup_container'
import Hiscores from './hiscores/hiscores_container'
import NavBar from './nav_bar/nav_bar_container'
import Profile from './profile/profile_container'
import AboutUs from './aboutus/aboutus'
import GameRoom from './game/game_container'
import Result from './result/result'
import './main/main_page.css'
// import io from "socket.io-client";

const App = () => {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/hiscores" component={Hiscores} />
                <Route exact path="/user/:username" component={Profile} />
                <Route exact path="/aboutus" component={AboutUs} />
                <Route exact path="/result/" component={Result} />
                <AuthRoute
                    exact
                    path="/login"
                    // render={() => <LogIn setupSocket={setupSocket} />}
                    component={LogIn}
                />
                <AuthRoute exact path="/signup" component={SignUp} />
                <ProtectedRoute path="/gameroom/" component={GameRoom} exact />
            </Switch>
        </div>
    )
}

export default App
