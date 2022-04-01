import "regenerator-runtime/runtime";
import axios from "axios";

let questions = []

const BASEURL = "http://127.0.0.1:8000/api/v1";
const id = new URL(location.href).searchParams.get("id");


getQuestion(id);
getAnswers(id);

async function getQuestion(question_id) {
  try {
    const response = await axios({
      method: "GET",
      baseURL: BASEURL,
      url: `/qs/question/${question_id}`,
    });
    console.log(response);
     appendQuestion(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

function appendQuestion(question){
    let questions = `<div>
    <h2>${question.title}</h2>
    <p>${question.question}</p>
    </div>`;
    document.getElementById("question").innerHTML = questions;
}

function getAnswers(question_id){
    axios({
        method: "GET",
        params: { id: id },
        baseURL: BASEURL,
        url: `ans/answers/question/${question_id}`,
      }).then((response) => {
        appendAnswers(response.data);
      });
}

function appendAnswers(answer){
    let answers = "";
    for (let i= 0; i < answer.length; i++)
    answers += `
    <div>
    <p>${answer[i].answer}</p>
    `;
  document.getElementById("answer").innerHTML = answers;
}