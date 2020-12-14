import {Link} from "react-router-dom";
import React from "react";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            api: false
        }
        this.changeApiKey = this.changeApiKey.bind(this)
    }

    changeApiKey(e) {
        if(this.state.api)
            localStorage.setItem('token', 'Kq3Bs4dEBkTxdUvlSk7faw')
        else
            localStorage.setItem('token', '-ExnIm9fIjM-Za8sfP7RYg')

        const neg_api = !this.state.api

        this.setState({
            api: neg_api
        })
    }

    render() {
        return (
            <div className="header">
                <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/>
                <div className="links">
                    <Link to={'/contributions'}><h1> Hacker News | </h1></Link>
                    <Link to={'/newest'}> new | </Link>
                    <Link to={'/ask'}>ask | </Link>
                    <Link to={'/comments/users/2'}>threads | </Link>
                    <Link to={'/submit'}>submit</Link> |
                    <Link to={'/myProfile'}> profile | </Link>
                    api-key: {localStorage.getItem('token')}
                    <button onClick={this.changeApiKey}>change</button>
                </div>
            </div>
        )
    }
}

export default Header
