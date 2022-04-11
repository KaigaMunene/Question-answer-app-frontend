import "regenerator-runtime/runtime";
import axios from "axios";
import { appBaseUrl } from "../utils/constants";

document.getElementById("login-form").addEventListener("submit", (event) => {
  validateLoginForm(event);
});

function validateLoginForm(event) {
  event.preventDefault();
  const mail = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let isValid = true;
  if (!emailValidation(mail)) {
    document.getElementById("email-err").innerText =
      "Enter a valid email address";
    isValid = false;
  }
  if (!passwordValidation(password)) {
    document.getElementById("password-err").innerText =
      "password should be more than 8 characters";
    isValid = false;
  }

  if (isValid) {
    const formData = {
      email: mail,
      password: password,
    };
    login(formData);
    // window.location.replace("main.html");
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

function passwordValidation(password) {
  let passwordLen = password.length;
  if (passwordLen == 0 || passwordLen < 8) {
    return false;
  }
  return true;
}

async function login(formData) {
  let data = JSON.stringify(formData);

  try {
    const response = await axios({
      method: "POST",
      baseURL: appBaseUrl,
      url: "users/token/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    const token = response.data.access;
    window.localStorage.setItem(
      "user", token
    );
  } catch (error) {
    const errors = error.response.data;
    for (let key in errors) {
      let isValid = true;
      if (key === "email") {
        document.getElementById("email-err").innerText = errors[key];
        isValid = false;
      }
      if (key === "password") {
        document.getElementById("password-err").innerText = errors[key];
        isValid = false;
      }
    }
  }
}
