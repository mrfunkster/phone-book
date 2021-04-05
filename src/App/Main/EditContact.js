import React, { useEffect, useRef, useState } from 'react';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import history from '../../common/components/history';
import base from '../../common/components/firebase';
import { connect } from 'react-redux';
import { capitalizeFirstLetter, namePreview } from '../../common/components/commonFunctions';
import { clearSelectedContact, updateDataFromServer } from '../../common/store/action';

import './CreateContact.css';

const EditContact = ({
    userID,
    updateDataFromServer,
    exitEditMode,
    selectedUser,
    selectedContactImage,
    markSelected,
    clearSelectedContact
}) => {

    const [finishStatus, setFinishStatus] = useState(false);
    const [contactImage, setContactImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userImagePreview, setUserImagePreview] = useState("");
    const [userContactData, setUserContactData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        image: false,
        notifications: "",
        id: ""
    });
    const classNames = {
        input: "col-sm-12 col-md-6 col-lg-6 form-input shadow",
        inputError: "col-sm-12 col-md-6 col-lg-6 form-input shadow form-error"
    }
    const [errorObject, setErrorObject] = useState({
        firstName: false,
        phone: false,
    })
    const selectImage = useRef();

    const inputHandler = e => {
        setUserContactData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const imageHandler = e => {
        let file = e.target.files[0];
        if (file) {
            if (file.type.match('image') && file.size <= 3145728 ) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const src = ev.target.result;
                    setUserImagePreview(src);
                    setContactImage(file);
                };
                reader.readAsDataURL(file);
            } else {
                if (file.size > 3145728) {
                    alert("Your image must be less then 3 MB!");
                    clearImageSelector();
                } else if (!file.type.match('image')) {
                    alert("Use only image file!!!");
                    clearImageSelector();
                } else {
                    clearImageSelector();
                };
            };
        };
    };

    const clearImageSelector = () => {
        selectImage.current.value = null;
    };

    const clearContactImage = () => {
        setUserImagePreview('');
        clearImageSelector();
    };

    const addContactImage = () => {
        selectImage.current.click();
    };

    const successRedirect = () => {
        setIsUploading(false);
        setShowModal(false);
        setFinishStatus(true);
        exitEditMode();
        clearSelectedContact();
        updateDataFromServer(userID).then(() => {
            markSelected(selectedUser.id);
            console.log("DATA UPDATED FROM SERVER")
        });
    };

    const uploadingError = () => {
        setShowModal(false);
        setFinishStatus(false);
        setIsUploading(false);
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (formValidator() === 0) {
            let dataObject = {
                firstName: capitalizeFirstLetter(userContactData.firstName),
                lastName: capitalizeFirstLetter(userContactData.lastName),
                phone: userContactData.phone,
                email: userContactData.email,
                image: userContactData.image,
                notifications: userContactData.notifications,
                id: selectedUser.id
            };
            setSuccess(true);
            setIsUploading(true);
            try {
                uploadImage(dataObject.id)
                .then((res) => {
                    if (userImagePreview.length) {
                        dataObject.image = true;
                    } else {
                        dataObject.image = res
                    };
                    console.log("response after image uploading: " + res)
                })
                .then(async () => {
                    await base.database().ref('users/' + userID + '/userPhoneBook/' + dataObject.id).update(dataObject);
                    return setShowModal(true);
                })
            } catch (error) {
                console.log(error.code)
                alert(error.message)
                setSuccess(false);
                setShowModal(true);
            };
        };
    };

    const resetForm = () => {
        if (window.confirm("Are you sure to clean ALL data?")) {
            setFinishStatus(true);
            clearContactImage();
            setUserContactData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                image: false,
                notifications: "",
                id: ""
            });
            setErrorObject({
                firstName: false,
                phone: false
            });
        };
    };

    const uploadImage = async (contactID) => {
        const storageRef = base.storage().ref();
        const fileRef = storageRef.child(`${userID}/${contactID}/image`);
        if (contactImage) {
            console.log("UPLOADING IMAGE TO SERVER")
            await fileRef.put(contactImage);
            return  new Promise(resolve => resolve(true));
        } else if (!userImagePreview.length && !contactImage) {
            console.log("USER PREVIEW AND CONTACT IMAGE ARE EMPTY")
            return new Promise(resolve => resolve(false));
        } else if (!userImagePreview.length) {
            console.log("DELETING IMAGE FROM SERVER")
            await fileRef.delete();
            return new Promise(resolve => resolve(false));
        };
    };

    const onBackButtonEvent = e => {
        e.preventDefault();
        if (!finishStatus) {
            if (window.confirm("If you go back, your lost your data!")) {
                setFinishStatus(true);
                history.push('/');
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setFinishStatus(false);
            };
        };
    };

    const formValidator = () => {
        let error = 0;
        if (!userContactData.firstName && !userContactData.phone) {
            setErrorObject({
                firstName: true,
                phone: true
            });
            error++;
        } else if (!userContactData.firstName) {
            setErrorObject(prevState => ({
                ...prevState,
                firstName: true
            }));
            error++;
        } else if (!userContactData.phone) {
            setErrorObject(prevState => ({
                ...prevState,
                phone: true
            }));
            error++;
        };
        return error;
    };

    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
          window.removeEventListener('popstate', onBackButtonEvent);
        };
    });

    useEffect(() => {
        if (userContactData.firstName || userContactData.lastName || userContactData.phone || userContactData.email || userImagePreview) {
            setFinishStatus(false);
        } else {
            setFinishStatus(true);
        }
    }, [userContactData, userImagePreview]);

    useEffect(() => {
        setUserContactData({
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            phone: selectedUser.phone,
            email: selectedUser.email,
            image: selectedUser.image,
            notifications: selectedUser.notifications,
            id: selectedUser.id
        });
        setUserImagePreview(selectedContactImage);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                isUploading &&
                <div className="preview-modal">
                    {
                        !showModal ?
                        <div className="modal-info">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <span>Updating contact...</span>
                        </div>
                        : success ?
                        <div className="modal-info">
                            <span style={{color: "#198754", fontSize: "30px", fontWeight: 600}}>Congratulations!</span>
                            <p>Youre contact is successfuly updated!</p>
                            <br/>
                            <button 
                                className="btn btn-success"
                                onClick={() => successRedirect()}
                            >Ok</button>
                            <ScrollToTopOnMount />
                        </div>
                        :
                        <>
                            <span style={{color: "#dc3545", fontSize: "30px", fontWeight: 600}}>Ooops!</span>
                            <span>Something go wrong... Please try again!</span>
                            <br/>
                            <button 
                                className="btn btn-danger"
                                onClick={() => uploadingError()}
                            >Ok</button>
                            <ScrollToTopOnMount />
                        </>
                    }
                </div>
            }
            <div className="create-contact-section" style={{width: "100%", position: "relative", padding: "0", borderRadius: "unset"}}>
                <div className="text-primary back-btn"
                    onClick={() => exitEditMode()}
                >Back</div>
                <div className="contact-image create"
                    onClick={() => userImagePreview ? clearContactImage() : addContactImage()}
                >
                    <div className="overlay">
                        <div className="add-remove-button">{userImagePreview ? "Remove Photo" : "Add Photo"}</div>
                    </div>
                    {
                        userImagePreview ? 
                            <>
                                <img src={userImagePreview} alt="Contact Preview"/>
                            </>
                        : <div className="name-preview">{(userContactData.firstName || userContactData.lastName) ? namePreview(userContactData) : "?"}</div>
                    }
                </div>
                <form onSubmit={submitForm} style={{width: "100%"}}>
                    <input type="file"
                        name="picture"
                        onChange={imageHandler}
                        ref={selectImage}
                        style={{display: "none"}}
                        disabled={isUploading}
                    />
                    <div className="contact-header"><span>{`${capitalizeFirstLetter(userContactData.firstName)} ${capitalizeFirstLetter(userContactData.lastName)}`}</span></div>
                    <div className="input-field">
                        <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                            First Name:
                        </div>
                        <div className={errorObject.firstName ? classNames.inputError : classNames.input}>
                            <input type="text"
                                placeholder="First Name"
                                value={userContactData.firstName}
                                onChange={inputHandler}
                                name="firstName"
                                disabled={isUploading}
                                onFocus={() => setErrorObject(prevState => ({...prevState, firstName: false}))}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                            Last Name:
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 form-input shadow">
                            <input type="text"
                                placeholder="Last Name"
                                value={userContactData.lastName}
                                onChange={inputHandler}
                                name="lastName"
                                disabled={isUploading}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                            Phone:
                        </div>
                        <div className={errorObject.phone ? classNames.inputError : classNames.input}>
                            <input type="text"
                                placeholder="Phone"
                                value={userContactData.phone}
                                onChange={inputHandler}
                                name="phone"
                                disabled={isUploading}
                                onFocus={() => setErrorObject(prevState => ({...prevState, phone: false}))}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                            E-mail:
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 form-input shadow">
                            <input type="email"
                                placeholder="Email"
                                value={userContactData.email}
                                onChange={inputHandler}
                                name="email"
                                disabled={isUploading}
                            />
                        </div>
                    </div>
                    <div className="input-field buttons">
                        {
                            !finishStatus && 
                            <div 
                                className="btn btn-danger create-btn"
                                onClick={resetForm}
                                disabled={isUploading}
                            >Reset</div>
                        }
                        <button 
                            className="btn btn-success create-btn"
                            disabled={finishStatus || isUploading}
                        >Update Contact</button>
                    </div>
                </form>
                <ScrollToTopOnMount />
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    userID: state.app.userID
});

const mapDispatchToProps = {
    updateDataFromServer,
    clearSelectedContact
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContact);