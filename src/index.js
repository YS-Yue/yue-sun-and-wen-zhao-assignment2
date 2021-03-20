import React from 'react';
import './css/index.css';
import App from './Components/App';
import Home from './Components/Home';
import Rule from './Components/Rule';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Reducers from './Reducers/Reducers';


export const store = createStore(Reducers);

render(
    <Provider store = {store}>
        <Router>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/Home"} component={Home}/>
                <Route exact path={"/Rule"} component={Rule} />
                <Route exact path={"/Game"} component={App} />
                <Route render={() => <h1>Not found!</h1>} />
            </Switch>
        </Router>
    </Provider>

, document.getElementById('root'));