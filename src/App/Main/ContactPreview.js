import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPhoneNumber, namePreview } from '../../common/components/commonFunctions';

import './ContactPreview.css'

class ContactPreview extends Component {

    state = {
        imageLoaded: false
    }

    hideLoader = () => {
        this.setState(prevState => ({
            ...prevState,
            imageLoaded: true
        }));
    };

    render() {
        const {
            selectedUser,
            contactImage
        } = this.props
        return (
            <div className="contact-preview-section shadow">
                {
                    Object.entries(selectedUser).length ?
                        <>
                            <div className="contact-image">
                                {
                                    contactImage ?
                                    <>
                                        <img src={contactImage} alt="Contact"
                                            onLoad={this.hideLoader}
                                        />
                                        {
                                            !this.state.imageLoaded &&  
                                                <div className="preloader-overlay">
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                        }
                                    </>
                                    :
                                    <div className="name-preview">{namePreview(selectedUser)}</div>
                                }
                            </div>
                            <div className="contact-header"><span>{`${selectedUser.firstName} ${selectedUser.lastName}`}</span></div>
                            {
                                selectedUser.phone && 
                                    <div className="contact-info">
                                        <span className="description">phone</span>
                                        <span className="info">{formatPhoneNumber(selectedUser.phone)}</span>
                                    </div>
                            }
                            {
                                selectedUser.email && 
                                    <div className="contact-info">
                                        <span className="description">email</span>
                                        <span className="info">{selectedUser.email}</span>
                                    </div>
                            }
                            {
                                selectedUser.notification && 
                                    <div className="contact-info">
                                        <span className="description">notification</span>
                                        <span className="info">{selectedUser.notification}</span>
                                    </div>
                            }
                        </> :
                        <>
                            <div className="contact-header"><span>No User Selected</span></div>
                            <div className="contact-description"><span>Please select contact to see more details</span></div>
                        </>
                }
            </div>
        );
    };
};

const mapStateToProps = state => ({
    selectedUser: state.app.selectedUser,
    contactImage: state.app.contactImage
})

export default connect(
    mapStateToProps
)(ContactPreview);