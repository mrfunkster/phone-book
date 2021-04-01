import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';

import MainContent from './MainContent';
import Login from './Login';
import Registration from './Registration';

import './Main.css';
import Account from './Account';
import CreateContact from './CreateContact';

const Main = ({
    isLogged
}) => {
    return (
        <main className="main">
            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route path="/" exact>
                        {isLogged ? <MainContent /> : <Redirect to="/account"/>}
                    </Route>
                    <Route path="/login">
                        {isLogged ? <Redirect to="/"/> : <Login />}
                    </Route>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Route path="/account">
                        {isLogged ? <Account /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/createcontact">
                        {isLogged ? <CreateContact /> : <Redirect to="/login"/>}
                    </Route>
                </Switch>
            </AnimatePresence>
        </main>
    );
};

const mapStateToProps = state => ({
    isLogged: state.app.isLogged
});

export default connect(
    mapStateToProps
)(Main);