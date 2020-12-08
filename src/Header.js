import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Contribution from "./contributions/Contribution";

const Header = () => (
    <Router>
        <div className="header">
            <div className="links"/>
            <img src="https://www.linkpicture.com/q/y18.gif" alt="logo"/><h1>Hacker News</h1>
            <div className="links">
                <Link to={'/newest'}>newest</Link>
                <Link to={'/ask'}>newest</Link>
                <Link to={'/'}>newest</Link>
            </div>
        </div>
        <Route path="/newest" render={ () => <Contribution type={'all'}/> } />
        <Route path="/ask" render={ () => <Contribution type={'ask'}/> } />
        <Route path="/" render={ () => <Contribution type={'url'}/> } />
    </Router>

)


export default Header
