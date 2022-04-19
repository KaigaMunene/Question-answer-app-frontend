import axios from "axios";
import { appBaseUrl } from "../utils/constants";
document.getElementById("qs-form").addEventListener("submit", (event) => {
  validateQuestionForm(event);
});

function validateQuestionForm(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("qs-input").value;

  const questionData = {
    title: title,
    question: body,
  };
  console.log(questionData);
  console.log(qsInfo(questionData));
}

async function qsInfo(questionData) {
  let data = JSON.stringify(questionData);
  try {
    const question = await axios({
      method: "POST",
      baseURL: appBaseUrl,
      url: "qs/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      data,
    });
    const response = question.data;
    console.log(response);
    if (question.status == 201) {
      window.location.replace("./questions.html");
    }
    if(question.status == 401){

    }
  } catch (error) {
    console.log(error.response.data);
    const errors = error.response.data;
    for (let key in errors) {
      let isValid = true;
      if (key === "title") {
        document.getElementById("title-err").textContent = errors[key];
        isValid = false;
      }
      if (key === "question") {
        document.getElementById("qs-input-err").textContent = errors[key];
        isValid = false;
      }
    }
  }
}

