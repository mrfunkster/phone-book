import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import { connect } from 'react-redux';

const Login = ({
    isCookie
}) => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row space-between align-center">
                {
                    isCookie ? 
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h2 className="text-centered">Logining to PhoneBook...</h2>
                            <br/>
                            <p className="text-centered">Please wait...</p>
                            <p className="text-centered">After successfull logining you will be redirect to your PhoneBook page.</p>
                            <div className="login-loader">
                                <div className="spinner-border text-success " role="status"></div>
                            </div>
                        </div>
                    : <>
                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <h2 className="text-centered">Welcome to the PhoneBook!</h2>
                            <br/>
                            <p className="text-centered">If you already registered, please sign in.</p>
                            <p className="text-centered">But if you do not have your personal account on PhoneBook, please <Link to="registration">sign up</Link>. It's absolutely free!!!</p>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <LoginForm />
                        </div>
                    </>
                }

            </div>
        </motion.div>
    );
};

const mapStateToProps = state => ({
    isCookie: state.app.isCookie
})

export default connect(
    mapStateToProps
)(Login);