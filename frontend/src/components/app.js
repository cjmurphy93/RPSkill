import React from 'react';
import { Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import LogIn from './session/login';
import SignUp from './session/signup';


const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={LogIn} />
            <AuthRoute exact path="/signup" component={SignUp} />
        </Switch>
    </div>
);

export default App;