import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import useToken from './useToken';
import Login from '../Login/Login';
import Registration from "../Registration/Registration";
import Preferences from '../Preferences/Preferences';
import Home from "../Home/Home";

function App() {
    const { token, setToken } = useToken();

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/preferences">
                        {(token != null && !token) ? <Preferences /> : <Login setToken={setToken} />}
                    </Route>
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/registration">
                        <Registration setToken={setToken} />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}


export default App;