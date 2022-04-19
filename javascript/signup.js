import axios from "axios";
import { appBaseUrl } from "../utils/constants";

document.getElementById("signup-form").addEventListener("submit", (event) => {
  validateSignupForm(event);
});

function validateSignupForm(event) {
  event.preventDefault();
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const userName = document.getElementById("username").value;
  const mail = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  resetErrors();

  let isValid = true;
  if (!firstNameValidation(firstName)) {
    document.getElementById("firstname-err").textContent =
      "Enter a valid first name, must be one word";
    isValid = false;
  }

  if (!lastNameValidation(lastName)) {
    document.getElementById("lastname-err").textContent =
      "Enter a valid last name, must be one word";
    isValid = false;
  }
  if (!usernameValidation(userName)) {
    document.getElementById("username-err").textContent =
      "Enter a valid username,shouldn't be less than 6 characters";
    isValid = false;
  }
  if (!emailValidation(mail)) {
    document.getElementById("email-err").textContent =
      "enter a valid email address";
    isValid = false;
  }
  if (!passswordValidation(password)) {
    document.getElementById("password-err").textContent =
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
    const response = await axios({
      method: "POST",
      baseURL: appBaseUrl,
      url: "users/register/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    if (response.status == 201) {
      window.location.replace("./login.html");
    }
  } catch (error) {
    const errors = error.response.data;
    console.log(errors)

    for (let key in errors) {
      let isValid = true;
      if (key === "first_name") {
        document.getElementById("firstname-err").textContent = errors[key];
        isValid = false;
      }
      if (key === "last_name") {
        document.getElementById("lastname-err").textContent = errors[key];
        isValid = false;
      }
      if (key === "username") {
        document.getElementById("username-err").textContent = errors[key];
        isValid = false;
      }
      if (key === "email") {
        document.getElementById("email-err").textContent = errors[key];
        isValid = false;
      }
      if (key === "password") {
        document.getElementById("password-err").textContent = errors[key];
        isValid = false;
      }
    }
  }
}
function resetErrors() {
  document.getElementById("firstname-err").textContent = "";
  document.getElementById("lastname-err").textContent = "";
  document.getElementById("username-err").textContent = "";
  document.getElementById("email-err").textContent = "";
  document.getElementById("password-err").textContent = "";
}
