import React from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { logIn } from '../../common/store/action'
import { Link } from 'react-router-dom';

const Login = ({
    logIn
}) => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row space-between align-center">
                <div className="col-sm-12 col-md-6 col-lg-8">
                    <h2 className="text-centered">Welcome to the PhoneBook!</h2>
                    <br/>
                    <p className="text-centered">If you already registered, please sign in.</p>
                    <p className="text-centered">But if you do not have your personal account on PhoneBook, please <Link to="registration">sign up</Link>. It's absolutely free!!!</p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="login-form shadow">
                        <div className="btn btn-success"
                            onClick={() => logIn()}
                        >LOG IN</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const mapDispatchToProps = {
    logIn
}

export default connect(
    null,
    mapDispatchToProps
)(Login);