function validateSignupForm(event) {
    event.preventDefault();
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const userName = document.getElementById("username").value;
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (firstNameValidation(firstName) == "" || lastNameValidation(lastName) == "" || usernameValidation(userName) == "" || emailValidation(mail) == "" || passswordValidation(password) == "") {
        return false;
    }

    else {
        alert("successfully signed up");
        return true;
    }
}

function firstNameValidation(firstName) {
    let letters = /^[a-z ,.'-]+$/i
    if (firstName.match(letters)) {
        return true;
    }
    else {
        document.getElementById("firstname-err").innerText = "Enter a valid first name, must be one word"
        return false;
    }
}

function lastNameValidation(lastName) {
    let letters = /^[a-z ,.'-]+$/i
    if (lastName.match(letters)) {
        return true;
    }
    else {
        document.getElementById("lastname-err").innerText = "Enter a valid last name, must be one word"
        return false;
    }
}

function usernameValidation(userName) {
    let name = /^[a-z\d_]{6,16}$/
    if (userName.match(name)) {
        return true;
    }
    else {
        document.getElementById("username-err").innerText = "Enter a valid username,shouldn't be less than 6 characters"
        return false;
    }
}

function emailValidation(mail) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return true;
    }
    else {
        document.getElementById("email-err").innerText = "enter a valid email address"
        return false;
    }
}

function passswordValidation(password) {
    let passwordLen = password.length
    if (passwordLen == 0 || passwordLen < 8) {
        document.getElementById("password-err").innerText = "password should be more than 8 characters"
        return false;
    }
    return true;
}