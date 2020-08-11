import React from 'react';
import MainPage from './main/main_page';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => (
    <div>
        <Switch>
            <Route exact path ="/" component={MainPage} />
        </Switch>
    </div>
);

export default App;