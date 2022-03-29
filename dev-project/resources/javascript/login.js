function validateLoginForm(event) {
    event.preventDefault()
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(emailValidation(mail) == "" || passwordValidation(password) == ""){
        return false;
    }

    else {
        alert("Successfully logged in");
        return true;
    }
}

function emailValidation(mail){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return true;
    }
    else {
        document.getElementById("email-err").innerText = "Enter a valid email address"
        return false;
    }
}

function passwordValidation(password){
    let passwordLen = password.length
    if (passwordLen == 0 || passwordLen < 8) {
        document.getElementById("password-err").innerText = "password should be more than 8 characters"
        return false;
    }
    return true;
}