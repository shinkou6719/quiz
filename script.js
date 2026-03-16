import { db } from "./firebase.js";
import { questions } from "./questions.js";

import {
ref,
set,
onValue
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

let playerId = localStorage.getItem("playerId");

if(!playerId){
playerId = "player_" + Math.floor(Math.random()*100000);
localStorage.setItem("playerId", playerId);
}

let currentQuestion = 0;

const questionTitle = document.getElementById("question");
const counter = document.getElementById("counter");
const answersButtons = document.getElementById("answersButtons");

function showQuestion(){

if(questionTitle){
questionTitle.innerText = questions[currentQuestion];
}

if(counter){
counter.innerText =
"Вопрос " + (currentQuestion + 1) + " / " + questions.length;
}

}

showQuestion();


// отправка ответа
window.sendAnswer = function(answer){

set(ref(db, "answers/" + currentQuestion + "/" + playerId),{
answer: answer
});

nextQuestion();

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion < questions.length){

showQuestion();

}else{

if(questionTitle){
questionTitle.innerText = "Спасибо за ответы, киса <3";
}

if(counter){
counter.innerText = "";
}

if(answersButtons){
answersButtons.style.display = "none";
}

}

}


// HOST
const answersDiv = document.getElementById("answers");

if(answersDiv){

onValue(ref(db,"answers"),(snapshot)=>{

const data = snapshot.val();

answersDiv.innerHTML = JSON.stringify(data,null,2);

});

}