import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPhoneContacts, setSearchQuery } from '../../common/store/action';

const Search = ({
    userPhoneBook,
    phoneContacts,
    getPhoneContacts,
    setSearchQuery
}) => {

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        let searchQuery = searchTerm.toLowerCase();
        setSearchQuery(searchTerm);
        if(searchTerm) {
            const results = phoneContacts.filter(element => {
                return element.firstName.toLowerCase().includes(searchQuery) 
                    || element.lastName.toLowerCase().includes(searchQuery) || element.phone.toString().includes(searchQuery);
            });
            getPhoneContacts(results);
        } else {
            getPhoneContacts(userPhoneBook);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search shadow">
            <input type="text" placeholder="Search..."
                name="search"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    userPhoneBook: Object.values(state.app.userData.userPhoneBook),
    phoneContacts: state.app.phoneContacts
});

const mapDispatchToProps = {
    getPhoneContacts,
    setSearchQuery
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);