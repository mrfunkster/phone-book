import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';
import history from '../../common/components/history';

import './CreateContact.css'
import { capitalizeFirstLetter, namePreview } from '../../common/components/commonFunctions';

const CreateContact = () => {

    const [finishStatus, setFinishStatus] = useState(true);
    const [userImagePreview, setUserImagePreview] = useState("");
    const [userContactData, setUserContactData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        notifications: ""
    });
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
                };
                reader.readAsDataURL(file);
            } else {
                if (file.size > 3145728) {
                    alert("Your image must be less then 3 MB!");
                    selectImage.current.value = null;
                } else if (!file.type.match('image')) {
                    alert("Use only image file!!!");
                    selectImage.current.value = null;
                } else {
                    selectImage.current.value = null;
                };
            };
        };
    };

    const clearContactImage = () => {
        setUserImagePreview('');
        selectImage.current.value = null;
    };

    const addContactImage = () => {
        selectImage.current.click();
    }

    const submitForm = (e) => {
        e.preventDefault();
    }

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
                        />
                        <div className="contact-header"><span>{`${capitalizeFirstLetter(userContactData.firstName)} ${capitalizeFirstLetter(userContactData.lastName)}`}</span></div>
                        <div className="input-field">
                            <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                                First Name:
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 form-input shadow">
                                <input type="text"
                                    placeholder="First Name"
                                    value={userContactData.firstName}
                                    onChange={inputHandler}
                                    name="firstName"
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
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="col-sm-12 col-md-6 col-lg-6 input-description">
                                Phone:
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 form-input shadow">
                                <input type="text"
                                    placeholder="Phone"
                                    value={userContactData.phone}
                                    onChange={inputHandler}
                                    name="phone"
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
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ScrollToTopOnMount />
        </motion.div>
    );
};

export default CreateContact;