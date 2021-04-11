export const formatPhoneNumber = (phone) => {
    if(phone) {
        let num = phone.toString();
        let number = "+" + num.substr(0, 3) + " (" + num.substr(3, 2) + ") " + num.substr(5, 3) + " " + num.substr(8, 2) + " " + num.substr(10,2);
        return number;
    } else {
        return "No phone number"
    };
};

export const contactsCount = (obj) => {
    if(obj) {
        if(Object.keys(obj).length) {
            return Object.keys(obj).length;
        } else {
            return "";
        };
    } else {
        return "";
    };
};

export const namePreview = user => {
    let firstName, lastName;
    if(user.firstName.length) {
        firstName = user.firstName.substr(0, 1).toUpperCase();
    } else {
        firstName = "";
    };
    if(user.lastName.length) {
        lastName = user.lastName.substr(0, 1).toUpperCase();
    } else {
        lastName = "";
    };
    return firstName + lastName;
};

export const capitalizeFirstLetter = string => {
    if(string.length) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return "";
    };
};