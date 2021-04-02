export const formatPhoneNumber = (phone) => {
    if(phone) {
        let num = phone.toString();
        let number = "+" + num.substr(0, 3) + " (" + num.substr(3, 2) + ") " + num.substr(5, 3) + " " + num.substr(8, 2) + " " + num.substr(10,2);
        return number;
    } else {
        return "No phone number"
    };
};


