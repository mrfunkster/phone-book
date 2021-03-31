import React from 'react';
import { motion } from 'framer-motion';

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
                    <h2 className="text-centered">MAIN CONTENT</h2>
                </div>
            </div>
        </motion.div>
    );
};

export default MainContent;