import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"
import ConfirmEmail from "../../pages/ConfirmEmail"
import Agreement from "../../pages/Agreement"
import EmailVerifyPublic from "../../pages/EmailVerifyPublic"
import PasswordResetEmail from "../../pages/PasswordResetEmail"
import PasswordResetComplete from "../../pages/PasswordResetComplete"

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
                <Route path="/confirm">
                    <ConfirmEmail/>
                </Route>
                <Route path="/auth/email-verify/">
                    <EmailVerifyPublic/>
                </Route>
                <Route path="/auth/password-reset-email/">
                    <PasswordResetEmail/>
                </Route>
                <Route path="/auth/password-reset/">
                    <PasswordResetComplete/>
                </Route>
                <Route path="/agreement">
                    <Agreement/>
                </Route>
                <Redirect to="/login"/>
            </Switch>
        </Router>

    )
}