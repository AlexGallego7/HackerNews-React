import {Link} from "react-router-dom";
import React from "react";

const Header = () => (
    <div className="header">
        <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/>
        <div className="links">
            <Link to={'/contributions'}><h1> Hacker News | </h1></Link>
            <Link to={'/newest'}> new | </Link>
            <Link to={'/ask'}>ask | </Link>
            <Link to={'/comments/users/2'}>threads | </Link>
            <Link to={'/submit'}>submit</Link> |
            <Link to={'/myProfile'}> profile </Link>
        </div>
    </div>
)

export default Header
