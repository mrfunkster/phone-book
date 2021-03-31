import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../../common/components/history';
import { logOut } from '../../common/store/action';

const HeaderMenu = ({
    isLogged,
    logOut
}) => {
    if(isLogged) {
        return (
            <ul className="nav-menu">
                <li><Link to="/account">Account</Link></li>
                <li className="btn btn-danger"
                    onClick={() => logOut()}
                >Log Out</li>
            </ul>
        );
    } else {
        return (
            <ul className="nav-menu">
                <li><Link to="/login">Sign In</Link></li>
                <li className="btn btn-success"
                    onClick={() => history.push('/registration')}
                >Sign Up!</li>
            </ul>
        );
    }
};

const mapStateToProps = state => ({
    isLogged: state.app.isLogged
});

const mapDispatchToProps = {
    logOut
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu);