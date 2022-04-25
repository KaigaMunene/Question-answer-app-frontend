import axios from "axios";
import { appBaseUrl } from "../utils/constants";

const id = new URL(location.href).searchParams.get("id");

const cardTemplate = document.getElementById("card-template");
const questionGrid = document.getElementById("question-grid");
const searchInput = document.querySelector("[data-search]");
getQuestions();

searchInput.addEventListener("input", async (e) => {
  const value = e.target.value;
  try {
    const response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `qs/questions`,
      params: { title: value },
    });
    console.log("search results", response.data);
    if(value != 0 ){
      window.location.replace(`./searched_questions.html`)
  }}catch (error) {
    console.log(error.message);
  }
});

async function getQuestions() {
  try {
    const response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `qs/questions`,
    });
    appendQuestions(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

const appendQuestions = (questions) => {
  qsInfo = questions.map((question) => {
    const questionCard = cardTemplate.cloneNode(true);
    questionCard.querySelector("[data-title]").textContent = question.title;
    questionCard.querySelector("[data-question]").textContent =
      question.question;
    questionCard.addEventListener("click", () => {
      window.location = `/pages/question.html?id=${question.id}`;
    });
    questionGrid.append(questionCard);
    return {
      title: question.title,
      question: question.question,
      element: questionCard,
    };
  });
};
