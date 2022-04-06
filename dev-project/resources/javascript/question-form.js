import "regenerator-runtime/runtime";
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
  qsInfo(questionData);
}

async function qsInfo(questionData) {
  let data = JSON.stringify(questionData);
  try {
    const question = await axios({
      method: "POST",
      baseURL: appBaseUrl,
      url: "/qs",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const response = await question.json();
    window.location.replace("main.html");
    console.log("Success:", response);
  } catch (error) {
    console.log("Error:", error);
  }
}
