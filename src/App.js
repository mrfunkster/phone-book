import React, { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { authWithEmailAndPassword, isMobile, loginWithCookies, setHeaderHeight } from './common/store/action';

import Footer from './App/Footer/Footer';
import Header from './App/Header/Header';
import Main from './App/Main/Main';

import './App/App.css'
import { enableBodyScroll } from 'body-scroll-lock';


function App({
  authWithEmailAndPassword,
  loginWithCookies,
  isMobile,
  setHeaderHeight
}) {

  const readCookie = () => {
    const cookie = Cookies.get('userInfo');
    if (cookie) {
      loginWithCookies();
      let userData = JSON.parse(cookie);
      authWithEmailAndPassword(userData);
    };
  };

  const isMobileWidth = () => {
    const {innerWidth: width} = window;
    if (width <= 768) return true;
    else return false;
  }

  useEffect(() => {
    readCookie();
  });

  const bodyLockRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      isMobile(isMobileWidth());
      const header = document.getElementById('header').clientHeight;
      setHeaderHeight(header);
      if (!isMobileWidth()) {
        enableBodyScroll(bodyLockRef.current);
      };
    };

    isMobile(isMobileWidth());

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <>
      <Header />
      <Main bodyLockRef={bodyLockRef}/>
      <Footer />
    </>
  );
}

const mapDispatchToProps = {
  authWithEmailAndPassword,
  loginWithCookies,
  isMobile,
  setHeaderHeight
}

export default connect(
  null,
  mapDispatchToProps
)(App);
