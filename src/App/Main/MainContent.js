import React from 'react';
import { motion } from 'framer-motion';
import ContactPreview from './ContactPreview';
import ContactList from './ContactList';

const MainContent = () => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row">
                <div className="col">
                    <h2 className="text-centered">My PhoneBook</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <ContactPreview />
                </div>
                <div className="col-sm-12 col-md-8 col-lg-6">
                    <ContactList />
                </div>
            </div>
        </motion.div>
    );
};

export default MainContent;