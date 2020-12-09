import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Contribution from "../Contributions/Contribution";
import React from "react";

const Header = () => (
    <Router>
        <div className="header">
            <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/>
            <div className="links">
                <Link to={'/'}><h1> Hacker News </h1></Link>
                <Link to={'/newest'}> new | </Link>
                <Link to={'/ask'}>ask</Link>
            </div>
        </div>
        <Route exact path="/newest" render={ () => <Contribution type={'all'}/> } />
        <Route exact path="/ask" render={ () => <Contribution type={'ask'}/> } />
        <Route exact path="/" render={ () => <Contribution type={'url'}/> } />
    </Router>

)

export default Header
