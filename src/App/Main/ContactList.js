import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserContact } from '../../common/store/action';

import ContactListItem from './ContactListItem';
import Search from './Search';

class ContactList extends Component {

    state = {
        isSelected: {}
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


    render() {
        const {
            contactsList,
        } = this.props
        return (
            <div className="contact-list-section">
                <Search />
                <div className="contact-list shadow">
                    {
                        contactsList.map((phoneContacts) => (
                            <ContactListItem 
                                key={phoneContacts.id}
                                phoneContacts={phoneContacts}
                                markSelected={this.markSelected}
                                isSelected={this.state.isSelected}
                            />
                        ))
                    }
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contactsList: state.app.phoneContacts
});

const mapDispatchToProps = {
    selectUserContact
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);