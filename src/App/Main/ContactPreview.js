import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ContactPreview.css'

class ContactPreview extends Component {

    namePreview = user => {
        return user.firstName.substr(0, 1).toUpperCase() + user.lastName.substr(0, 1).toUpperCase()
    }

    render() {
        const {
            selectedUser
        } = this.props
        return (
            <div className="contact-preview-section shadow">
                {
                    Object.entries(selectedUser).length ?
                        <>
                            <div className="contact-image">
                                <div className="name-preview">{this.namePreview(selectedUser)}</div>
                            </div>
                            <div className="contact-header"><span>{`${selectedUser.firstName} ${selectedUser.lastName}`}</span></div>
                            {
                                selectedUser.phone && 
                                    <div className="contact-info">
                                        <span className="description">phone</span>
                                        <span className="info">{selectedUser.phone}</span>
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
    selectedUser: state.app.selectedUser
})

export default connect(
    mapStateToProps
)(ContactPreview);