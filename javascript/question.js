import axios from "axios";
import { appBaseUrl } from "../utils/constants";

const id = new URL(location.href).searchParams.get("id");

getQuestion(id);
getAnswers(id);

document.getElementById("answer-form").addEventListener("submit", (event) => {
  validateAnswerForm(event);
});

function validateAnswerForm(event) {
  event.preventDefault();
  const answer = document.getElementById("ans-input").value;

  if (answer == "" || answer == null || answer == undefined) {
    document.getElementById("ans-input-err").innerText = "Answer is missing";
    return false;
  } else {
    const answerData = {
      question_id: id,
      answer: answer,
    };
    answerForm(answerData);
  }
}

async function answerForm(answerData) {
  let data = JSON.stringify(answerData);

  try {
    const register = await axios({
      method: "POST",
      baseURL: appBaseUrl,
      url: "ans/answer/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`
      },
      data,
    });
    const response = register.data;
    if(register.status == 201){
      window.location.replace(`question.html?id=${id}`);
    }

  } catch (error) {
    const errors = error.response.data;
    console.log(errors)
    let isValid = true;
    if (key === "answer"){
      document.getElementById("ans-input-err").textContent = errors[key];
      isValid= false;
    }
  }
}

async function getQuestion(question_id) {
  try {
    const response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `/qs/question/${question_id}`,
    });
    console.log(response);
    appendQuestion(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

function appendQuestion(question) {
  let questions = `<div>
    <h2>${question.title}</h2>
    <p>${question.question}</p>
    </div>`;
  document.getElementById("question").innerHTML = questions;
}

async function getAnswers(question_id) {
  const response = await axios({
    method: "GET",
    baseURL: appBaseUrl,
    url: `ans/answers/question/${question_id}`,
  });
  const answer = response.data;
  appendAnswers(answer);
}

function appendAnswers(answer) {
  let answers = "";
  for (let i = 0; i < answer.length; i++)
    answers += `
    <div>
    <p>${answer[i].answer}</p>
    `;
  document.getElementById("answer").innerHTML = answers;
}
