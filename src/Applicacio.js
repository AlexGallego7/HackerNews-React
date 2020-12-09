import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from "./Contributions/Home";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import Contribution from "./Contributions/Contribution";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/newest" render={ () => <Contribution type={'all'}/> } />
                <Route exact path="/ask" render={ () => <Contribution type={'ask'}/> } />
                <Route exact path="/" render={ () => <Contribution type={'url'}/> } />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
