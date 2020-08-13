import React from 'react';
import { Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import LogIn from './session/login';
import SignUp from './session/signup';
import Hiscores from './hiscores/hiscores'
import NavBar from "./nav_bar/nav_bar";
import Profile from "./profile/profile";
import AboutUs from "./aboutus/aboutus"
import GameRoom from './game/game';
import "./main/main_page.css";
import io from "socket.io-client";


const App = () => {
  
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    if (!socket) {
      const newSocket = io("http://localhost:5000");
      newSocket.on('connect', () => {
        console.log('newSocket connected');
      })
    }
  };

  React.useEffect(() => {
    setupSocket();
  }, []);

  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/hiscores" component={Hiscores} />
        <Route exact path="/user/:username" component={Profile} />
        <Route exact path="/aboutus" component={AboutUs} />
        <AuthRoute
        exact path="/login"
        render={() => <LogIn setupSocket={setupSocket} />}
        component={LogIn} 
        />
        <AuthRoute exact path="/signup" component={SignUp} />
        <Route
         path="/gameroom/"
         render={() => <GameRoom socket={socket} />}
         exact
        />
      </Switch>
    </div>
  )
};

export default App;