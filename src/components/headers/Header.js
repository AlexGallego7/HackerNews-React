import {Link} from "react-router-dom";
import React from "react";

const Header = () => (
    <div className="header">
        <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/>
        <div className="links">
            <Link to={'/'}><h1> Hacker News | </h1></Link>
            <Link to={'/newest'}> new | </Link>
            <Link to={'/ask'}>ask | </Link>
            <Link to={'/contributions'}>submit</Link>
        </div>
    </div>
)

export default Header
