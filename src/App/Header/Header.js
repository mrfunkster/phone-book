import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import HeaderMenu from './HeaderMenu';

const Header = () => {
    return (
        <header className="shadow" id="header">
            <div className="container">
                <div className="row">
                    <div className="header-title">
                        <Link to="/">
                            <div className="header-logo">
                                <img src="/images/contacts-ios.svg" alt=""/>
                            </div>
                        </Link>
                        <Link to="/">
                            <h2>PhoneBook</h2>
                        </Link>
                    </div>
                    <div className="header-menu">
                        <HeaderMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;