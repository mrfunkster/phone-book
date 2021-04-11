import { motion } from 'framer-motion';
import history from '../../common/components/history';
import ScrollToTopOnMount from '../../common/components/ScrollToTopOnMount';

const PageNotFound = () => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row">
                <div className="col">
                    <h2 className="text-centered">Ooooops! <span className="text-danger">404</span>.</h2>
                    <br/>
                    <p style={{textAlign: 'center'}}>It looks like "<span className="text-success fw-bold">{document.location.host}/</span><span className="text-danger fw-bold">{history.location.pathname.substr(1)}</span>" are wrong adress!</p>
                    <br/>
                </div>
            </div>
            <div className="row">
                <div className="col flex justify-content-center">
                    <button className="btn btn-success"
                        onClick={() => history.push("/")}
                    >Go to My PhoneBook page</button>
                </div>
            </div>
            <ScrollToTopOnMount />
        </motion.div>
    );
};

export default PageNotFound;