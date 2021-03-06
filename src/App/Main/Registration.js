import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row space-between align-center">
                <div className="col-sm-12 col-md-6 col-lg-8">
                    <h2 className="text-centered">Registration</h2>
                    <br/>
                    <p className="text-centered">Welcome to the PhoneBook. This application can help you store all your contacts in the cloud.</p>
                    <p className="text-centered">If you already have your personal account on PhoneBook, please <Link to="login">login</Link>.</p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <RegisterForm />
                </div>
            </div>
            <ScrollToTopOnMount />
        </motion.div>
    );
};

export default Registration;