import React from 'react';
import Contribution from "./Contributions/Contribution";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from "./Contributions/Home";
import PageNotFound from "./components/PageNotFound";



const Routes = () => (
    <Switch>
        <Route exact path="/newest" render={ () => <Contribution type={'all'}/> } />
        <Route exact path="/ask" render={ () => <Contribution type={'ask'}/> } />
        <Route exact path="/" render={ () => <Contribution type={'url'}/> } />
        {/*<Route path="/:type" component={mostrar_contribution} />*/}
        <Route component={PageNotFound} />
    </Switch>
)

export default Routes;
