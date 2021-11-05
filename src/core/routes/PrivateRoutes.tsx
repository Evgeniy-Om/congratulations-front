import React from 'react'
import {Redirect, Route} from "react-router-dom"
// import Edit from "../../pages/Edit"
import New from "../../pages/New"
import Agreement from "../../pages/Agreement"
import Home from "../../pages/Home"

export default function PrivateRoutes() {
    return (
        <>
            <Route path="/new">
                <New/>
            </Route>
            <Route path="/agreement">
                <Agreement/>
            </Route>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Redirect to="/"/>
        </>
    )
}