import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { authWithEmailAndPassword, loginWithCookies } from './common/store/action';

import Footer from './App/Footer/Footer';
import Header from './App/Header/Header';
import Main from './App/Main/Main';

import './App/App.css'
import { formatPhoneNumber } from './common/components/commonFunctions';


function App({
  authWithEmailAndPassword,
  loginWithCookies
}) {

  const readCookie = () => {
    const cookie = Cookies.get('userInfo');
    if (cookie) {
      loginWithCookies();
      let userData = JSON.parse(cookie);
      authWithEmailAndPassword(userData);
    };
  };

  useEffect(() => {
    readCookie();
    formatPhoneNumber(380956929416)
  })

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

const mapDispatchToProps = {
  authWithEmailAndPassword,
  loginWithCookies
}

export default connect(
  null,
  mapDispatchToProps
)(App);
