import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../common/components/history';
import { getContactImage, selectUserContact, setContactImage, showMobilePreview } from '../../common/store/action';

import ContactListItem from './ContactListItem';
import Search from './Search';

class ContactList extends Component {

    state = {
        sortBy: "firstName"
    }

    sortByName = (a, b) => {
        if(a.firstName < b.firstName) { return -1; };
        if(a.firstName > b.firstName) { return 1; };
        return 0;
    };

    sortByLastName = (a, b) => {
        if(a.lastName < b.lastName) { return -1; };
        if(a.lastName > b.lastName) { return 1; };
        return 0;
    };

    sortByNumber = (a, b) => {
        if(a.phone < b.phone) { return -1; };
        if(a.phone > b.phone) { return 1; };
        return 0;
    };

    setSortByName = () => {
        this.setState(prevState => ({
            ...prevState,
            sortBy: "firstName"
        }));
    };

    setSortByLastName = () => {
        this.setState(prevState => ({
            ...prevState,
            sortBy: "lastName"
        }));
    };

    setSortByPhone = () => {
        this.setState(prevState => ({
            ...prevState,
            sortBy: "phone"
        }));
    }


    render() {
        const {
            contactsList,
            searchQuery,
            markSelected,
            selectedContact,
            showMobilePreview
        } = this.props
        return (
            <div className="contact-list-section">
                <div className="search-add-section">
                    <Search />
                    <div className="create-new-contact">
                        <button className="btn btn-success add-button shadow"
                            onClick={() => history.push('/createcontact')}
                        >Add New Contact</button>
                    </div>
                </div>
                {
                    contactsList.length ? 
                        <div className="contact-list shadow">
                            <div className="contact-list-title bg-success">
                                <div className={this.state.sortBy === "firstName" ? "first-name selected" : "first-name"}
                                    onClick={() => this.setSortByName()}
                                >First Name</div>
                                <div className={this.state.sortBy === "lastName" ? "last-name selected" : "last-name"}
                                    onClick={() => this.setSortByLastName()}
                                >Last Name</div>
                                <div className={this.state.sortBy === "phone" ? "phone selected" : "phone"}
                                    onClick={() => this.setSortByPhone()}
                                >Phone Number</div>
                            </div>
                            {
                                contactsList.sort(this.state.sortBy === "firstName" ? this.sortByName : this.state.sortBy === "lastName" ? this.sortByLastName : this.sortByNumber)
                                    .map((phoneContacts) => (
                                        <ContactListItem 
                                            key={phoneContacts.id}
                                            phoneContacts={phoneContacts}
                                            markSelected={markSelected}
                                            searchQuery={searchQuery}
                                            selectedContact={selectedContact}
                                            showMobilePreview={showMobilePreview}
                                        />
                                ))
                            }
                        </div>
                    :
                    <div className="contact-list shadow">
                        <h5 style={{marginTop: "8px"}} className="text-centered">There is no search results for "{searchQuery}".</h5>
                    </div>
                }

            </div>
        );
    };
};

const mapStateToProps = state => ({
    contactsList: state.app.phoneContacts,
    searchQuery: state.app.searchQuery,
    userID: state.app.userID,
    selectedContact: state.app.selectedUser
});

const mapDispatchToProps = {
    selectUserContact,
    getContactImage,
    setContactImage,
    showMobilePreview
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);