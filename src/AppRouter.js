import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/headers/Header";
import ContribIndex from "./components/contributions/ContribIndex";
import ContribShow from "./components/contributions/ContribShow";


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/" render={ () => <ContribIndex type={'url'}/> } />
            <Route exact path="/contribution/:id" component={ContribShow} />
            <Route exact path="/newest" render={ () => <ContribIndex type={'all'}/> } />
            <Route exact path="/ask" render={ () => <ContribIndex type={'ask'}/> } />
        </Router>
    );
};

export default AppRouter;
