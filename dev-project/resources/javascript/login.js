import "regenerator-runtime/runtime";
document.getElementById("login-form").addEventListener("submit", (event)=>{
  validateLoginForm(event);
})

function validateLoginForm(event) {
    event.preventDefault()
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let isValid = true;
    if(!emailValidation(mail)){
        document.getElementById("email-err").innerText = "Enter a valid email address"
        isValid = false;
    } 
    if (!passwordValidation(password)){
        document.getElementById("password-err").innerText = "password should be more than 8 characters"
        isValid = false;
    }

    if(isValid){
        const formData = {
          email: mail,
          password: password
        }
        login(formData)
        window.location.replace("main.html");
      }
}

function emailValidation(mail){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}

function passwordValidation(password){
    let passwordLen = password.length
    if (passwordLen == 0 || passwordLen < 8) {
        return false;
    }
    return true;
}

async function login(formData) {
    let data = JSON.stringify(formData);

    try{
        const login = await fetch("http://127.0.0.1:8000/api/v1/users/token/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        const response = await login.json();
        console.log("Success:", response);                 
    } catch (error){
        console.log("Error:", error);
    }
}