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
import GameRoom from './game/game_container';
import Result from './result/result';
import "./main/main_page.css";
import io from "socket.io-client";


const App = () => {
  const [socket, setSocket] = React.useState(null);
  // const setupSocket = () => {
  //   const userToken = localStorage.getItem('userToken');
  //   if (userToken && !socket) {
  //     const newSocket = io("http://localhost:5000");
  //     newSocket.on('connect', () => {
  //       console.log('newSocket connected');
  //     })
  //   }
  // };

  const setupSocket = () => {
    const userToken = localStorage.getItem("jwtToken");
    if (userToken && !socket) {
      const newSocket = io.connect("http://localhost:5000", {
        query: {
          token: localStorage.getItem("userToken"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 2000);
        console.log("socket disconnected");
      });

      newSocket.on("connect", () => {
        console.log("socket connected!");
      });

      setSocket(newSocket);
      return newSocket;
    }
  };

  // React.useEffect(() => {
  //   setupSocket();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/hiscores" component={Hiscores} />
        <Route exact path="/user/:username" component={Profile} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/result/" component={Result}/>
        <AuthRoute
          exact
          path="/login"
          // render={() => <LogIn setupSocket={setupSocket} />}
          component={LogIn}
        />
        <AuthRoute exact path="/signup" component={SignUp} />
        <Route
          path="/gameroom/"
          render={() => <GameRoom setupSocket={setupSocket} />}
          exact
        />
      </Switch>
    </div>
  );
};

export default App;