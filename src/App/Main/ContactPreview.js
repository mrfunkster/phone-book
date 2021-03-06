import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPhoneNumber, namePreview } from '../../common/components/commonFunctions';
import base from '../../common/components/firebase';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import { clearSelectedContact, hideMobilePreview, updateDataFromServer } from '../../common/store/action';

import './ContactPreview.css'
import EditContact from './EditContact';

class ContactPreview extends Component {

    state = {
        imageLoaded: false,
        isEditMode: false,
        showModal: false,
        isDeleting: false,
    }

    targetRef = this.props.bodyLockRef;
    targetElement = null;

    hideLoader = () => {
        this.setState(prevState => ({
            ...prevState,
            imageLoaded: true
        }));
    };

    showDeletingStatus = () => {
        this.setState(prevState => ({
            ...prevState,
            isDeleting: true
        }));
    };

    hideDeletingStatus = () => {
        this.setState(prevState => ({
            ...prevState,
            isDeleting: false
        }));
    }

    closeModal = () => {
        this.setState(prevState => ({
            ...prevState,
            showModal: false
        }));
    };

    openDeleteModal = () => {
        this.setState(prevState => ({
            ...prevState,
            showModal: true
        }));
    };

    enterEditMode = () => {
        this.setState(prevState => ({
            ...prevState,
            isEditMode: true
        }));
    };

    exitEditMode = () => {
        this.setState(prevState => ({
            ...prevState,
            isEditMode: false
        }));
    };

    deleteContact = () => {
        const userID = this.props.userID;
        const contactID = this.props.selectedUser.id;
        const image = this.props.selectedUser.image;
        try {
            this.showDeletingStatus();
            base.database().ref('users/' + userID + '/userPhoneBook/' + contactID).set(null)
            .then(() => {
                if (image) {
                    const storageRef = base.storage().ref();
                    const dirRef = storageRef.child(`${userID}/${contactID}/image`);
                    return dirRef.delete().then(() => {
                        this.props.clearSelectedContact();
                        this.props.updateDataFromServer(userID);
                        this.hideDeletingStatus();
                        this.closeModal();
                    });
                };
                this.props.clearSelectedContact();
                this.props.updateDataFromServer(userID);
                this.hideDeletingStatus();
                this.closeModal();
            });
        } catch (error) {
            alert(error.message);
            this.hideDeletingStatus();
            this.closeModal();
        };
    };

    disableScroll = () => {
        disableBodyScroll(this.targetElement);
    };

    enableBodyScroll = () => {
        enableBodyScroll(this.targetElement);
    };

    componentDidMount() {
        this.targetElement = this.targetRef.current;
        if (this.props.isMobile && this.props.mobilePreview) {
            this.disableScroll();
        };
    };

    componentDidUpdate() {
        if (this.props.isMobile && this.props.mobilePreview) {
            this.disableScroll();
        };
    };

    componentWillUnmount() {
        clearAllBodyScrollLocks();
    };

    render() {
        const {
            selectedUser,
            contactImage,
            markSelected,
            hideMobilePreview,
            isMobile,
            headerHeight
        } = this.props
        return (
            <div className="contact-preview-section shadow" id="contact-preview-section" ref={this.targetRef}
                style={{
                    top: !isMobile && headerHeight + 15 + 'px',
                    maxHeight: isMobile && `calc(88vh - ${headerHeight}px - 15px)`,
                }}
            >
                {
                    Object.entries(selectedUser).length ?
                        <>
                            {
                                this.state.isEditMode ? 
                                    <>
                                        <EditContact 
                                            exitEditMode={this.exitEditMode}
                                            selectedUser={selectedUser}
                                            selectedContactImage={contactImage}
                                            markSelected={markSelected}
                                        />
                                    </>
                                :
                                <div className="contact-preview">
                                    {
                                        this.state.showModal && 
                                        <div className="preview-modal">

                                            {
                                                this.state.isDeleting ?
                                                    <div className="modal-info">
                                                        <div className="d-flex flex-column align-items-center">
                                                            <div className="spinner-border text-danger" style={{width: "3rem", height: "3rem"}} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <span style={{fontSize: "22px", padding: "15px"}}>Deleting contact...</span>
                                                            <ScrollToTopOnMount />
                                                        </div>
                                                    </div>
                                                :
                                                    <div className="modal-info shadow">
                                                        <h3 className="text-danger">
                                                            Attention!
                                                        </h3>
                                                        <p>This action will <span className="text-danger">delete</span> contact!</p>
                                                        <p>Are you sure to proceed?</p>
                                                        <div className="input-field" style={{display: 'flex', justifyContent: 'center'}}>
                                                            <button className="btn btn-success"
                                                                onClick={() => this.closeModal()}
                                                            >No</button>
                                                            <button className="btn btn-danger"
                                                                onClick={() => this.deleteContact()}
                                                            >Delete</button>
                                                        </div>
                                                        <ScrollToTopOnMount />
                                                    </div>
                                            }
                                        </div>
                                    }
                                    <div className="text-primary back-to-list-btn"
                                        onClick={() => {
                                            hideMobilePreview();
                                            this.enableBodyScroll();
                                        }}
                                    >Back</div>
                                    <div className="text-primary edit-btn"
                                        onClick={() => this.enterEditMode()}
                                    >Edit</div>
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
                                    <button className="btn btn-danger delete-btn"
                                        style={{marginTop: "15px", marginBottom: "15px"}}
                                        onClick={() => this.openDeleteModal()}
                                    >Delete Contact</button>
                                </div>
                            }
                        </> :
                        <>
                            <div className="text-primary back-to-list-btn"
                                onClick={() => {
                                    hideMobilePreview();
                                    this.enableBodyScroll();
                                }}
                            >Back</div>
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
    contactImage: state.app.contactImage,
    userID: state.app.userID,
    isMobile: state.app.isMobile,
    headerHeight: state.app.headerHeight,
    mobilePreview: state.app.mobilePreview
});

const mapDispatchToProps = {
    updateDataFromServer,
    clearSelectedContact,
    hideMobilePreview
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPreview);