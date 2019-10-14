import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import New from './pages/New'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
            </Switch>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    )
}