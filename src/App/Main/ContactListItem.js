import React from 'react';
import { formatPhoneNumber } from '../../common/components/commonFunctions';

const ContactListItem = ({
    phoneContacts,
    markSelected,
    searchQuery,
    selectedContact,
    showMobilePreview
}) => {
    return (
        <div className={selectedContact.id === phoneContacts.id ? "contact-list-item selected" : searchQuery.length ? "contact-list-item bg-warning" : "contact-list-item"}
            onClick={() => {
                markSelected(phoneContacts.id);
                showMobilePreview();
            }}
        >
            <div className="first-name">{phoneContacts.firstName}</div>
            <div className="last-name">{phoneContacts.lastName}</div>
            <div className="phone">{formatPhoneNumber(phoneContacts.phone)}</div>
        </div>
    )
}

export default ContactListItem;