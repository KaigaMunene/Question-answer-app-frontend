import "regenerator-runtime/runtime";
import axios from "axios";
document.getElementById("qs-form").addEventListener("submit", (event) => {
  validateQuestionForm(event);
});

function validateQuestionForm(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("qs-input").value;

  if (title == "" || title == null || title == undefined) {
    document.getElementById("title-err").innerText = "title is missing";
    return false;
  }

  if (body == "" || body == null || body == undefined) {
    document.getElementById("qs-input-err").innerText = "body is missing";
    return false;
  } else {
    const questionData = {
      title: title,
      question: body,
    };
    qsInfo(questionData);
  }
}

async function qsInfo(questionData) {
  let data = JSON.stringify(questionData);
  try {
    const question = await axios("http://127.0.0.1:8000/api/v1/qs/", {
      method: "POST",
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
