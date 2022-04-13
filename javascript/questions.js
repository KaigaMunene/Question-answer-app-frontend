import axios from "axios";
import { appBaseUrl } from "../utils/constants";

const id = new URL(location.href).searchParams.get("id");

const cardTemplate = document.getElementById("card-template");
const questionGrid = document.getElementById("question-grid");

getQuestions();

async function getQuestions() {
  try {
    const response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `/qs/questions`,
    });
    console.log(response);
    appendQuestions(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

/* function appendQuestions(questions) {
  let inquiry = "";
  for (let i = 0; i < questions.length; i++)
    inquiry += `
  <div>
  <a href="question.html?id=${questions[i].id}">
  <h1>${questions[i].title}</h1>
  </a>
  </div>`;
  document.getElementById("questions").innerHTML = inquiry;
} */

const appendQuestions = (questions) => {
  questions.forEach((question) => {
    const questionCard = cardTemplate.cloneNode(true);
    questionCard.querySelector("[data-title]").textContent = question.title;
    questionCard.querySelector("[data-question]").textContent =
      question.question;

    questionCard.addEventListener("click", () => {
      window.location = `/pages/question.html?id=${question.id}`;
    });

    questionGrid.append(questionCard);
  });
};
