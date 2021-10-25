import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"

export default function PublicRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Redirect to="/login"/>
            </Switch>
        </Router>
    )
}