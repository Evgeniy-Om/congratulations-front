import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Edit from "../pages/Edit"
import New from "../pages/New"
import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Agreement from "../pages/Agreement"
import Home from "../pages/Home"

function Routes(props: { auth: boolean }) {
    return (
        <Router>
            <Switch>
                {props.auth
                    ?
                    <>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/edit">
                            <Edit/>
                        </Route>
                        <Route path="/new">
                            <New/>
                        </Route>
                        <Route path="/registration">
                            <Registration/>
                        </Route>
                        <Route path="/agreement">
                            <Agreement/>
                        </Route>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Redirect to="/"/>
                    </>
                    :
                    <>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/registration">
                            <Registration/>
                        </Route>
                        <Redirect to="/login"/>
                    </>
                }

            </Switch>
        </Router>
    )
}

export default Routes