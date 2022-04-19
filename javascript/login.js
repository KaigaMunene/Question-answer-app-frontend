import axios from "axios";
import { appBaseUrl } from "../utils/constants";

// refreshToken();

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
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    window.localStorage.setItem("user", accessToken);
    window.localStorage.setItem("refresh", refreshToken);
    // if (response.status == 200) {
    //   window.location.replace("./questions.html");
    // }
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

async function refreshToken() {
  const response = await axios({
    method: "post",
    baseURL: appBaseUrl,
    url: "users/token/refresh/",
    headers: {
      "Content-Type": "application/json",
    },
    data: localStorage.getItem("refresh"),
  });
  if (response.status == 200) {
    return localStorage.getItem("user");
  }
  console.log(response.data);
}
console.log(refreshToken());
