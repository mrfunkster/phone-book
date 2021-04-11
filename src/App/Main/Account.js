import React from 'react';
import { motion } from 'framer-motion';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import { connect } from 'react-redux';
import history from '../../common/components/history';
import { contactsCount } from '../../common/components/commonFunctions';

const Account = ({
    userContacts,
    userInfo
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
                    <h2 className="text-centered">Account Page</h2>
                    <div className="main-description">
                            <h3 style={{textAlign: 'center'}}>Your account info:</h3>
                        </div>
                        <div className="account-info">
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>E-mail:</b></p>
                                </div>
                                <div className="col input-field">
                                    <p>{userInfo.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Password:</b></p>
                                </div>
                                <div className="col input-field">
                                    <p>{userInfo.password}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Total count of contacts:</b></p>
                                </div>
                                <div className="col input-field">
                                    <p>{contactsCount(userContacts) === "" ? "0" : contactsCount(userContacts)}</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-success"
                    onClick={() => history.push("/")}
                >Go to My PhoneBook page</button>
            </div>
            <ScrollToTopOnMount />
        </motion.div>
    );
};

const mapStateToProps = state => ({
    userInfo: state.app.userData.userInfo,
    userContacts: state.app.userData.userPhoneBook
});

export default connect(
    mapStateToProps
)(Account);