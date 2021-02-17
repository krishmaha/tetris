//Get list items from html
var player1_ul = document.getElementById("player1");
var player2_ul = document.getElementById("player2");
var player3_ul = document.getElementById("player3");
var player4_ul = document.getElementById("player4");
var player5_ul = document.getElementById("player5");
var player6_ul = document.getElementById("player6");
var player7_ul = document.getElementById("player7");
var player8_ul = document.getElementById("player8");
var player9_ul = document.getElementById("player9");
var player10_ul = document.getElementById("player10");

//Get top players & scores from data base. Hard coded below for now
var p1 = 'Player 1 👑: Score';
console.log(typeof p1)
var p2 = 'Player 2 🥈: Score';
var p3 = 'Player 3 🥉: Score';
var p4 = 'Player 4 🏵️: Score';
var p5 = 'Player 5 🏵️ : Score';
var p6 = 'Player 6 🥄: Score';
var p7 = 'Player 7 🥄: Score';
var p8 = 'Player 8 🥄: Score';
var p9 = 'Player 9 🥄: Score';
var p10 = 'Player 10 🥄: Score';

//Assign players & scores to html list
player1_ul.innerHTML=p1;
player2_ul.innerHTML=p2;
player3_ul.innerHTML=p3;
player4_ul.innerHTML=p4;
player5_ul.innerHTML=p5;
player6_ul.innerHTML=p6;
player7_ul.innerHTML=p7;
player8_ul.innerHTML=p8;
player9_ul.innerHTML=p9;
player10_ul.innerHTML=p10;

