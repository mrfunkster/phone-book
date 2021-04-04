export const formatPhoneNumber = (phone) => {
    if(phone) {
        let num = phone.toString();
        let number = "+" + num.substr(0, 3) + " (" + num.substr(3, 2) + ") " + num.substr(5, 3) + " " + num.substr(8, 2) + " " + num.substr(10,2);
        return number;
    } else {
        return "No phone number"
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


