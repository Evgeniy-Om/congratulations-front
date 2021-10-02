import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Edit from "../../pages/Edit"
import New from "../../pages/New"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"
import Agreement from "../../pages/Agreement"
import Home from "../../pages/Home"

function Routes() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/edit">
                        <Edit/>
                    </Route>
                    <Route path="/new">
                        <New/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <Route path="/agreement">
                        <Agreement/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Routes