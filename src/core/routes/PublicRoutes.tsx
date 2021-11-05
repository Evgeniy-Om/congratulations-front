import React from 'react'
import {Redirect, Route} from "react-router-dom"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"
import ConfirmEmail from "../../pages/ConfirmEmail"
import Agreement from "../../pages/Agreement"

export default function PublicRoutes() {
    return (
        <>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/registration">
                <Registration/>
            </Route>
            <Route path="/confirm">
                <ConfirmEmail/>
            </Route>
            <Route path="/agreement">
                <Agreement/>
            </Route>
            <Redirect to="/login"/>
        </>
    )
}