import axios from "axios";
import { appBaseUrl } from "../utils/constants";

document.getElementById("search").addEventListener("click", (event) => {
  validateSearchForm(event);
});

function validateSearchForm(event) {
  event.preventDefault();
  searchQuestion();
}
async function searchQuestion(title) {
  try {
    const response = await axios({
      method: "GET",
      baseUrl: appBaseUrl,
      params: { title: title },
      url: `qs/questions?title=${title}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    appendSearchInfo(response.data);
  } catch (error) {
    console.log(error);
  }
}

function appendSearchInfo(question) {
  let questions = "";
  for (let i = 0; i < question.length; i++)
    answers += `
      <div>
      <h3>${question[i].title}</h3>
      <p>${question[i].question}</p>
      `;
  document.getElementById();
}
