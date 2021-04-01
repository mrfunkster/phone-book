import React from 'react';
import { motion } from 'framer-motion';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';

const CreateContact = () => {
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
            <ScrollToTopOnMount />
        </motion.div>
    );
};

export default CreateContact;