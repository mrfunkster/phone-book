import React from 'react';

const ContactListItem = ({
    phoneContacts,
    markSelected,
    isSelected
}) => {
    return (
        <div className={isSelected[phoneContacts.id] ? "contact-list-item selected" : "contact-list-item"}
            onClick={() => markSelected(phoneContacts.id)}
        >
            <div className="first-name">{phoneContacts.firstName}</div>
            <div className="last-name">{phoneContacts.lastName}</div>
            <div className="phone">{phoneContacts.phone}</div>
        </div>
    )
}

export default ContactListItem;