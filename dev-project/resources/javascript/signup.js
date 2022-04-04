import "regenerator-runtime/runtime";
document.getElementById("signup-form").addEventListener("submit", (event)=>{
  validateSignupForm(event);
})

function validateSignupForm(event) {
  event.preventDefault();
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const userName = document.getElementById("username").value;
  const mail = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  
  let isValid = true;
  if (!firstNameValidation(firstName)) {
    document.getElementById("firstname-err").innerText =
      "Enter a valid first name, must be one word";
    isValid = false;
  }

  if (!lastNameValidation(lastName)) {
    document.getElementById("lastname-err").innerText =
      "Enter a valid last name, must be one word";
    isValid = false;
  }
  if (!usernameValidation(userName)) {
    document.getElementById("username-err").innerText =
      "Enter a valid username,shouldn't be less than 6 characters";
    isValid = false;
  }
  if (!emailValidation(mail)) {
    document.getElementById("email-err").innerText =
      "enter a valid email address";
    isValid = false;
  }
  if (!passswordValidation(password)) {
    document.getElementById("password-err").innerText =
      "password should be more than 8 characters";
    isValid = false;
  }
  if (isValid) {
    const formData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: mail,
      password: password,
    };
    signup(formData);
    window.location.replace("login.html");
  }
}

function firstNameValidation(firstName) {
  let letters = /^[a-z ,.'-]+$/i;
  if (firstName.match(letters)) {
    return true;
  } else {
    return false;
  }
}

function lastNameValidation(lastName) {
  let letters = /^[a-z ,.'-]+$/i;
  if (lastName.match(letters)) {
    return true;
  } else {
    return false;
  }
}

function usernameValidation(userName) {
  let name = /^[a-z\d_]{6,16}$/;
  if (userName.match(name)) {
    return true;
  } else {
    return false;
  }
}

function emailValidation(mail) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function passswordValidation(password) {
  let passwordLen = password.length;
  if (passwordLen == 0 || passwordLen < 8) {
    return false;
  }
  return true;
}

async function signup(formData) {
  let data = JSON.stringify(formData);

  try {
    const register = await fetch(
      "http://127.0.0.1:8000/api/v1/users/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
    const response = await register.json();
    console.log("Success:", response);
  } catch (error) {
    console.log("Error:", error);
  }
}
