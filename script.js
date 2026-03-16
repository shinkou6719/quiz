import { db } from "./firebase.js";
import { questions } from "./questions.js";

import {
ref,
set,
onValue
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

let playerName = localStorage.getItem("playerName");
let currentQuestion = 0;

const questionTitle = document.getElementById("question");
const counter = document.getElementById("counter");
const answersButtons = document.getElementById("answersButtons");

if(!playerName){

if(questionTitle) questionTitle.style.display = "none";
if(counter) counter.style.display = "none";
if(answersButtons) answersButtons.style.display = "none";

}

function showQuestion(){

if(questionTitle){
questionTitle.innerText = questions[currentQuestion];
}

if(counter){
counter.innerText =
"Вопрос " + (currentQuestion + 1) + " / " + questions.length;
}

}

function saveName(){

const input = document.getElementById("nameInput");

playerName = input.value;

if(!playerName) return;

localStorage.setItem("playerName", playerName);

document.getElementById("nameBlock").style.display = "none";

if(questionTitle) questionTitle.style.display = "block";
if(counter) counter.style.display = "block";
if(answersButtons) answersButtons.style.display = "block";

showQuestion();

}

window.saveName = saveName;


if(playerName){

const block = document.getElementById("nameBlock");

if(block){
block.style.display = "none";
}

const input = document.getElementById("nameInput");

if(input){
input.value = playerName;
}

if(questionTitle) questionTitle.style.display = "block";
if(counter) counter.style.display = "block";
if(answersButtons) answersButtons.style.display = "block";

showQuestion();

}


// отправка ответа
window.sendAnswer = function(answer){

set(ref(db, "answers/" + currentQuestion + "/" + playerName),{
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


// HOST компактный вывод ответов

const answersDiv = document.getElementById("answers");

if (answersDiv) {

answersDiv.style.fontSize = "13px";
answersDiv.style.lineHeight = "1.3";
answersDiv.style.maxHeight = "80vh";
answersDiv.style.overflowY = "auto";

onValue(ref(db,"answers"),(snapshot)=>{

const data = snapshot.val();

answersDiv.innerHTML = "";

const title = document.createElement("h2");
title.innerText = "Ответы игроков";

title.style.fontSize = "16px";
title.style.marginBottom = "10px";

answersDiv.appendChild(title);

if(!data) return;

const sortedQuestions = Object.keys(data).sort((a,b)=>b-a);

for(const questionIndex of sortedQuestions){

const block = document.createElement("div");

block.style.marginBottom = "15px";

const title = document.createElement("div");

title.style.fontWeight = "600";
title.style.fontSize = "14px";

title.innerText =
"Вопрос " + (parseInt(questionIndex)+1) + ": " +
questions[questionIndex];

block.appendChild(title);

for(const player in data[questionIndex]){

const answer = data[questionIndex][player].answer;

const row = document.createElement("div");

row.style.fontSize = "13px";
row.style.marginLeft = "8px";

row.innerText =
player + ": " + answer;

block.appendChild(row);

}

answersDiv.appendChild(block);

}

});

}