import "regenerator-runtime/runtime";
import axios from "axios";
import { appBaseUrl } from "../utils/constants";

getQuestions();

async function getQuestions() {
  try {
    let response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `/qs/questions`,
    });
    appendQuestions(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

function appendQuestions(questions) {
  let inquiry = "";
  for (let i = 0; i < questions.length; i++)
    inquiry += `
  <div>
  <a href="question.html?id=${questions[i].id}">
  <h1>${questions[i].title}</h1>
  </a> 
  </div>`;
  document.getElementById("questions").innerHTML = inquiry;
}
