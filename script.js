import { db } from "./firebase.js";
import { questions } from "./questions.js";

import {
ref,
set,
onValue
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

let playerName = localStorage.getItem("playerName");

function saveName(){

const input = document.getElementById("nameInput");

playerName = input.value;

localStorage.setItem("playerName", playerName);

document.getElementById("nameBlock").style.display = "none";

}

if(playerName){

const block = document.getElementById("nameBlock");

if(block){
block.style.display = "none";
}

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

if(!data) return;

// сортируем вопросы чтобы новые были сверху
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
player + " → " + answer;

block.appendChild(row);

}

answersDiv.appendChild(block);

}

});

}