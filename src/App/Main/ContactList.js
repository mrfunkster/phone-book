import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserContact } from '../../common/store/action';

import ContactListItem from './ContactListItem';
import Search from './Search';

class ContactList extends Component {

    state = {
        isSelected: {},
        sortBy: "firstName"
    }

    isSelectedObject = () => {
        let objArr = this.props.contactsList.map(({id}) => ({[id]: false}))
        let isSelectedObj = {};
        for (let i = 0; i < objArr; i++) {
            Object.assign(isSelectedObj, objArr[i]);
        };
        this.setState({
            isSelected: isSelectedObj
        })
    }

    markSelected = id => {
        let clickedObj = this.state.isSelected;
        for (let key in clickedObj) {
            clickedObj[key] = false;
        };
        clickedObj[id] = true;
        this.setState({
            isSelected: clickedObj
        });
        let selectedArray = this.props.contactsList.filter((el) => {
            return el.id === id
        });
        this.props.selectUserContact(selectedArray[0]);
    };

    sortByName = (a, b) => {
        if(a.firstName < b.firstName) { return -1; };
        if(a.firstName > b.firstName) { return 1; };
        return 0;
    }

    sortByLastName = (a, b) => {
        if(a.lastName < b.lastName) { return -1; };
        if(a.lastName > b.lastName) { return 1; };
        return 0;
    }

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


    render() {
        const {
            contactsList,
            searchQuery
        } = this.props
        return (
            <div className="contact-list-section">
                <Search />
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
                                <div className="phone">Phone Number</div>
                            </div>
                            {
                                contactsList.sort(this.state.sortBy === "firstName" ? this.sortByName : this.sortByLastName)
                                    .map((phoneContacts) => (
                                        <ContactListItem 
                                            key={phoneContacts.id}
                                            phoneContacts={phoneContacts}
                                            markSelected={this.markSelected}
                                            isSelected={this.state.isSelected}
                                            searchQuery={searchQuery}
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
    }
}

const mapStateToProps = state => ({
    contactsList: state.app.phoneContacts,
    searchQuery: state.app.searchQuery
});

const mapDispatchToProps = {
    selectUserContact
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);