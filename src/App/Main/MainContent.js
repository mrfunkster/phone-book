import React, { Component } from 'react';
import { motion } from 'framer-motion';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContactImage, selectUserContact, setContactImage } from '../../common/store/action';

import ContactPreview from './ContactPreview';
import ContactList from './ContactList';

class MainContent extends Component {

    state = {
        isSelected: {}
    };

    markSelected = id => {
        let clickedObj = this.state.isSelected;
        for (let key in clickedObj) {
            clickedObj[key] = false;
        };
        clickedObj[id] = true;
        this.setState({
            isSelected: clickedObj
        });
        let selectedArray = this.props.contactsList.filter((el) => {
            return el.id === id
        });

        this.props.selectUserContact(selectedArray[0]);
        this.props.setContactImage(''); 
        if (selectedArray[0].image) {
            this.props.getContactImage(this.props.userID, selectedArray[0].id);
        };
    };

    render() {
        const {
            phoneContacts,
            contactsLoader
        } = this.props;
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
                                <ContactPreview 
                                    markSelected={this.markSelected}
                                />
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-8">
                                {
                                    contactsLoader ? 
                                        <div className="d-flex flex-column align-items-center">
                                            <span style={{fontSize: "22px", padding: "15px"}}>Please wait, your PhoneBook is loading now...</span>
                                            <div className="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    : <ContactList 
                                        markSelected={this.markSelected}
                                    />
                                }
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
};

const mapStateToProps = state => ({
    phoneContacts: state.app.userData.userPhoneBook ? Object.values(state.app.userData.userPhoneBook) : [],
    contactsList: state.app.phoneContacts,
    contactsLoader: state.app.contactsLoader,
    userID: state.app.userID
});

const mapDispatchToProps = {
    selectUserContact,
    getContactImage,
    setContactImage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);