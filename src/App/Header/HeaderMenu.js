import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../../common/components/history';
import { logOut, setHeaderHeight } from '../../common/store/action';
import { contactsCount } from '../../common/components/commonFunctions';



class HeaderMenu extends Component {

    headerHeight = () => {
        const header = document.getElementById('header').clientHeight;
        this.props.setHeaderHeight(header);
    }

    componentDidMount() {
        this.headerHeight();
    };

    componentDidUpdate() {
        this.headerHeight();
    };

    render() {
        const {
            isLogged,
            logOut,
            userContacts,
        } = this.props

        if(isLogged) {
            return (
                <ul className="nav-menu">
                    <li><Link to="/">My Contacts{contactsCount(userContacts) ? `(${contactsCount(userContacts)})` : ""}</Link></li>
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
                    >Sign Up</li>
                </ul>
            );
        };
    };
};

const mapStateToProps = state => ({
    isLogged: state.app.isLogged,
    userContacts: state.app.userData.userPhoneBook
});

const mapDispatchToProps = {
    logOut,
    setHeaderHeight
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu);