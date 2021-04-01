import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import Footer from './App/Footer/Footer';
import Header from './App/Header/Header';
import Main from './App/Main/Main';

import './App/App.css'
import { authWithEmailAndPassword } from './common/store/action';
import { connect } from 'react-redux';

function App({
  authWithEmailAndPassword
}) {

  const readCookie = () => {
    const cookie = Cookies.get('userInfo');
    if (cookie) {
      let userData = JSON.parse(cookie);
      authWithEmailAndPassword(userData);
      console.log(userData)
    };
  };

  useEffect(() => {
    readCookie();
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
  authWithEmailAndPassword
}

export default connect(
  null,
  mapDispatchToProps
)(App);
