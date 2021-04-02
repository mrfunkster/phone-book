import React from 'react';
import { motion } from 'framer-motion';
import ContactPreview from './ContactPreview';
import ContactList from './ContactList';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MainContent = ({
    phoneContacts
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
                    <h2 className="text-centered main-content-title">My PhoneBook</h2>
                </div>
            </div>
            <div className="row">
                {
                    phoneContacts.length ? 
                    <>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <ContactPreview />
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <ContactList />
                        </div>
                    </> :
                    <>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h4 className="text-centered">Your PhoneBook is empty yet.</h4>
                            <h4 className="text-centered">Let's <Link to="/createcontact">create</Link> your first contact!</h4>
                        </div>
                    </>
                }

            </div>
            <ScrollToTopOnMount />
        </motion.div>
    );
};

const mapStateToProps = state => ({
    phoneContacts: Object.values(state.app.userData.userPhoneBook)
})

export default connect(
    mapStateToProps
)(MainContent);