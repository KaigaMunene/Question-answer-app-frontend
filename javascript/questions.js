import axios from "axios";
import { appBaseUrl } from "../utils/constants";

const id = new URL(location.href).searchParams.get("id");

const cardTemplate = document.getElementById("card-template");
const questionGrid = document.getElementById("question-grid");
const searchInput = document.querySelector("[data-search]");
getQuestions();

async function getQuestions() {
  try {
    const response = await axios({
      method: "GET",
      baseURL: appBaseUrl,
      url: `qs/questions`,
    });
    appendQuestions(response.data);
  } catch (error) {
    return error.message;
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
