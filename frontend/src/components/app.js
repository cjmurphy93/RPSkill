import React from 'react';
import { Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import LogIn from './session/login_container';
import SignUp from './session/signup_container';
import Hiscores from './hiscores/hiscores_container'
import NavBar from "./nav_bar/nav_bar_container";
import Profile from "./profile/profile_container";
import AboutUs from "./aboutus/aboutus"
import "./main/main_page.css";


const App = () => (
  <div>
    
    <NavBar />

    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/hiscores" component={Hiscores} />
      <Route exact path="/user/:username" component={Profile} />
      <Route exact path="/aboutus" component={AboutUs} />
      <AuthRoute exact path="/login" component={LogIn} />
      <AuthRoute exact path="/signup" component={SignUp} />
    </Switch>
  </div>
);

export default App;