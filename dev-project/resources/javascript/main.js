import "regenerator-runtime/runtime";
import axios from "axios";

const BASEURL = "http://127.0.0.1:8000/api/v1/qs"
getQuestions();

async function getQuestions(){
  try{
      let response = await axios({
          method: "GET",
          baseURL: BASEURL,
          url: `/questions`,
      })
      appendQuestions(response.data);
  }
  catch (error) {
      console.log(error.message)
  }
}

function appendQuestions(questions){
  let inquiry = ""
  for( let i=0; i<questions.length; i++)
  inquiry +=`
  <div>
  <a href="question.html?id=${questions[i].id}">
  <h1>${questions[i].title}</h1>
  <p>${questions[i].question}</p>
  </a> 
  </div>`;
  document.getElementById("questions").innerHTML = inquiry
}