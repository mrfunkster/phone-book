import React from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { logIn } from '../../common/store/action'

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
            <div className="row">
                <div className="col">
                    LOGIN
                </div>
                <div className="col">
                    <div className="btn btn-success"
                        onClick={() => logIn()}
                    >LOG IN</div>
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