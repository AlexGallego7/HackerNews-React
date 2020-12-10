import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/headers/Header";
import ContribIndex from "./components/contributions/ContribIndex";
import ContribShow from "./components/contributions/ContribShow";


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Route path="/" exact render={ () => <ContribIndex type={'url'}/> } />
            <Route path="/contribution/:id" exact component={ContribShow} />
            <Route path="/newest" exact render={ () => <ContribIndex type={'all'}/> } />
            <Route path="/ask" exact render={ () => <ContribIndex type={'ask'}/> } />
        </Router>
    );
};

export default AppRouter;
