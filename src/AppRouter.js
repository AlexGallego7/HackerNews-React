import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/headers/Header";
import ContribIndex from "./components/contributions/ContribIndex";
import ContribShow from "./components/contributions/ContribShow";
import UserShow from "./components/users/UserShow";
import ContribForm from "./components/contributions/ContribForm";
import ReplyNew from "./components/CommentsAndReplies/ReplyNew";


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Route exact path="/contributions" component={ContribIndex} />
            <Route exact path="/contributions/:id" component={ContribShow} />
            <Route exact path="/newest" component={ContribIndex} />
            <Route exact path="/ask" component={ContribIndex} />
            <Route exact path="/users/:id" component={UserShow} />
            <Route exact path="/comments/:id" render={ () => <ReplyNew type={'comment'}/> } />
            <Route exact path="/replies/:id" render={ () => <ReplyNew type={'reply'}/> } />
            <Route exact path="/submit" component={ContribForm}/>
            <Route exact path="/contributions/users/:id" component={ContribIndex}/>
        </Router>
    );
};

export default AppRouter;
