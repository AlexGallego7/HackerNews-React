import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Contribution from "./contributions/Contribution";

const Header = () => (
    <Router>
        <div className="header">
            <div className="links"/>
            <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/>
            <div className="links">
                <Link to={'/'}>Hacker News | </Link>
                <Link to={'/newest'}>newest | </Link>
                <Link to={'/ask'}>ask</Link>
            </div>
        </div>
        <Route exact path="/newest" render={ () => <Contribution type={'all'}/> } />
        <Route exact path="/ask" render={ () => <Contribution type={'ask'}/> } />
        <Route exact path="/" render={ () => <Contribution type={'url'}/> } />
    </Router>

)


export default Header
