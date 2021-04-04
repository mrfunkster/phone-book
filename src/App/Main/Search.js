import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { clearSelectedContact, getPhoneContacts, selectUserContact, setSearchQuery } from '../../common/store/action';

const Search = ({
    userPhoneBook,
    getPhoneContacts,
    setSearchQuery,
    selectUserContact,
    clearSelectedContact
}) => {

    const [searchTerm, setSearchTerm] = useState("");

    const searchInput = useRef(null);

    useEffect(() => {
        let searchQuery = searchTerm.replace(/\s/g, '').toLowerCase();
        setSearchQuery(searchTerm.trim());
        if(searchTerm) {
            const results = userPhoneBook.filter(element => {
                return element.firstName.toLowerCase().includes(searchQuery) 
                    || element.lastName.toLowerCase().includes(searchQuery) || element.phone.toString().includes(searchQuery);
            });
            // if(results.length === 1) {
            //     selectUserContact(results[0]);
            // } else {
            //     clearSelectedContact();
            // };
            getPhoneContacts(results);
        } else {
            getPhoneContacts(userPhoneBook);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    useEffect(() => {
        searchInput.current.focus();
    }, [])

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search shadow">
            <input type="text" placeholder="Search..."
                name="search"
                value={searchTerm}
                onChange={handleChange}
                ref={searchInput}
            />
            {
                searchTerm.length !== 0 && <div className="clear-btn" onClick={() => setSearchTerm("")}>x</div>
            }
            
        </div>
    );
};


const mapStateToProps = state => ({
    userPhoneBook: Object.values(state.app.userData.userPhoneBook)
});

const mapDispatchToProps = {
    getPhoneContacts,
    setSearchQuery,
    selectUserContact,
    clearSelectedContact
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);