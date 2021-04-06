import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import history from '../../common/components/history';
import base from '../../common/components/firebase';
import { uniqueId } from 'lodash';
import Cleave from 'cleave.js/react';
import { connect } from 'react-redux';
import { capitalizeFirstLetter, namePreview } from '../../common/components/commonFunctions';
import { clearSelectedContact, updateDataFromServer } from '../../common/store/action';

import './CreateContact.css';


const CreateContact = ({
    userID,
    updateDataFromServer,
    clearSelectedContact
}) => {
    const [finishStatus, setFinishStatus] = useState(true);
    const [contactImage, setContactImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(true);
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
        inputError: "col-sm-12 col-md-6 col-lg-6 form-input shadow form-error",
        inputSuccess: "col-sm-12 col-md-6 col-lg-6 form-input shadow success"
    };
    const [errorObject, setErrorObject] = useState({
        firstName: false,
        phone: false,
        incorrectPhone: false
    });

    const selectImage = useRef();

    const inputHandler = e => {
        let value = e.target.value;
        if (e.target.type === "tel") {
            value = e.target.rawValue
        };
        setUserContactData(prevState => ({
            ...prevState,
            [e.target.name]: value.replace(/^\s\s*/, '')
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
        updateDataFromServer(userID);
        clearSelectedContact();
        history.push('/');
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
                firstName: capitalizeFirstLetter(userContactData.firstName).replace(/\s\s*$/, ''),
                lastName: capitalizeFirstLetter(userContactData.lastName).replace(/\s\s*$/, ''),
                phone: userContactData.phone,
                email: userContactData.email.replace(/\s\s*$/, ''),
                image: userContactData.image,
                notifications: userContactData.notifications.replace(/\s\s*$/, ''),
                id: uniqueId('contact-')
            };
            console.log("We can start uploading now!");
            setIsUploading(true);
            try {
                uploadImage(dataObject.id)
                .then((res) => {
                    dataObject.image = res;
                })
                .then(() => {
                    return base.database().ref('users/' + userID + '/userPhoneBook/' + dataObject.id).set(dataObject);
                })
                .then(() => setShowModal(true));
            } catch (error) {
                console.log(error.code)
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
                phone: false,
                incorrectPhone: false
            });
        };
    };

    const uploadImage = async (contactID) => {
        if (contactImage) {
            const storageRef = base.storage().ref();
            const fileRef = storageRef.child(`${userID}/${contactID}/image`);
            await fileRef.put(contactImage);
            return await new Promise(resolve => resolve(true));
        } else {
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
        } else if (!validateFirstName()) {
            error++;
        } else if (!validatePhoneNumber()) {
            error++;
        };
        return error;
    };

    const validatePhoneNumber = () => {
        if (!userContactData.phone.length) {
            setErrorObject(prevState => ({
                ...prevState,
                phone: true
            }));
            return false;
        } else if (userContactData.phone.length < 12) {
            setErrorObject(prevState => ({
                ...prevState,
                phone: true,
                incorrectPhone: true
            }))
            return false;
        } else {
            setErrorObject(prevState => ({
                ...prevState,
                phone: false,
                incorrectPhone: false
            }));
            return true;
        };
    };

    const validateFirstName = () => {
        if (!userContactData.firstName.length) {
            setErrorObject(prevState => ({
                ...prevState,
                firstName: true
            }));
            return false;
        } else {
            setErrorObject(prevState => ({
                ...prevState,
                firstName: false
            }));
            return true;
        };
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

    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row">
                <div className="col">
                    <h2 className="text-centered">CreateContact</h2>
                </div>
            </div>
            <div className="row">
                <div className="create-contact-section shadow">
                    {
                        isUploading &&
                        <div className="modal-overlay">
                            {
                                !showModal ?
                                <>
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span>Creating a new contact...</span>
                                </>
                                : success ?
                                <>
                                    <span style={{color: "#198754", fontSize: "30px", fontWeight: 600}}>Well Done!</span>
                                    <span>Youre contact is successfuly created!</span>
                                    <br/>
                                    <button 
                                        className="btn btn-success"
                                        onClick={() => successRedirect()}
                                    >Ok</button>
                                </>
                                :
                                <>
                                <span style={{color: "#dc3545", fontSize: "30px", fontWeight: 600}}>Ooops!</span>
                                <span>Something go wrong... Please try again!</span>
                                <br/>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => uploadingError()}
                                >Ok</button>
                            </>
                            }
                        </div>
                    }
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
                    <form onSubmit={submitForm}>
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
                                First Name<span className="text-danger">*</span>:
                            </div>
                            <div className={(userContactData.firstName.length && !errorObject.firstName) ? classNames.inputSuccess : errorObject.firstName ? classNames.inputError : classNames.input} style={{position: 'relative'}}>
                                <input type="text"
                                    placeholder="First Name"
                                    value={userContactData.firstName}
                                    onChange={inputHandler}
                                    name="firstName"
                                    disabled={isUploading}
                                    onFocus={() => setErrorObject(prevState => ({...prevState, firstName: false}))}
                                    onBlur={() => validateFirstName()}
                                />
                                {
                                    errorObject.firstName &&
                                    <span className="text-danger"
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: '-25px'
                                    }}
                                    >First Name is required!</span>
                                }
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                                Last Name:
                            </div>
                            <div className={userContactData.lastName.length ? classNames.inputSuccess : classNames.input}>
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
                                Phone<span className="text-danger">*</span>:
                            </div>
                            <div className={userContactData.phone.length === 12  ? classNames.inputSuccess : errorObject.phone ? classNames.inputError : classNames.input } style={{position: "relative"}}>
                                <Cleave type="tel"
                                    inputMode="tel"
                                    autoComplete="cc-tel"
                                    placeholder="+380 (XX) XXX XX XX"
                                    value={userContactData.phone}
                                    onChange={inputHandler}
                                    name="phone"
                                    disabled={isUploading}
                                    onFocus={() => setErrorObject(prevState => ({...prevState, phone: false, incorrectPhone: false}))}
                                    onBlur={() => validatePhoneNumber()}
                                    options={{
                                        blocks: [0,3,0,2,0,3,2,2], 
                                        delimiters: ['+',' ','(', ')', ' '], 
                                        numericOnly: true
                                    }}
                                />
                                {
                                    errorObject.incorrectPhone &&
                                    <span className="text-danger"
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: '-25px'
                                    }}
                                    >Enter a correct phone number!</span>
                                }
                                {
                                    (errorObject.phone && !errorObject.incorrectPhone) &&
                                    <span className="text-danger"
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: '-25px'
                                    }}
                                    >Phone number is required!</span>
                                }
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                                E-mail:
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 form-input shadow">
                                <input type="email"
                                    placeholder="example@mail.com"
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
                            >Create Contact</button>
                        </div>
                    </form>
                </div>
            </div>
            <ScrollToTopOnMount />
        </motion.div>
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
)(CreateContact);