import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/headers/Header";
import ContribIndex from "./components/contributions/ContribIndex";
import ContribShow from "./components/contributions/ContribShow";
import UserShow from "./components/users/UserShow";
import ContribForm from "./components/contributions/ContribForm";


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/" render={ () => <ContribIndex type={'url'}/> } />
            <Route exact path="/contributions/:id" component={ContribShow} />
            <Route exact path="/newest" render={ () => <ContribIndex type={'all'}/> } />
            <Route exact path="/ask" render={ () => <ContribIndex type={'ask'}/> } />
            <Route exact path="/users/:id" component={UserShow} />
            <Route exact path="/contributions" component={ContribForm}/>
        </Router>
    );
};

export default AppRouter;
