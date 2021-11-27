import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import New from "../../pages/New"
import Agreement from "../../pages/Agreement"
import Home from "../../pages/Home/Home"
import Edit from '../../pages/Edit/Edit'
import Account from "../../pages/Account"
import Support from "../../pages/Support"
import EmailVerifyPrivate from '../../pages/EmailVerifyPrivate'


export default function PrivateRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/new">
                    <New/>
                </Route>
                <Route path="/edit/:id" component={Edit}/>
                <Route path="/account" exact>
                    <Account/>
                </Route>
                <Route path="/support" exact>
                    <Support/>
                </Route>
                <Route path="/agreement">
                    <Agreement/>
                </Route>
                <Route path="/auth/email-verify/">
                    <EmailVerifyPrivate/>
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}