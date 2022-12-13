/*
Name: Hritesh Rajanagan
Email: hritesh_rajanagan@student.uml.edu
*/
/*global declaration variables for scoreboard*/
actualScore = 0;
actualTempScore = 0;
wordArray =[];
/*scrabble tiles defined (given code) */
var TilesOfScrabble = [  
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"_", "value":0, "amount":2}
]
/*Immediately generates Tiles*/
$(document).ready(function(){
  generate_tile();
})
/*These 3 functions were extremely annoying and took around 20 hours actually figure out and debugg
I was only able to get this working after using the following link as a reference:
https://stackoverflow.com/questions/50660597/prevent-drop-event-when-its-already-have-child-element-drag-and-drop*/
let offset = [0, 0]
function allowDrop(ev) {
  var t = ev.target;
  while (t !== null && !t.classList.contains("target")) {
    t = t.parentNode;
  }
  if (t && t.childNodes.length > 0) {
    return false;
  }
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData('dragID', ev.target.id)
  offset = [
    ev.target.offsetLeft - ev.clientX,
    ev.target.offsetTop - ev.clientY
  ]
}
function drop(ev) {
  ev.preventDefault()
  const data = ev.dataTransfer.getData('dragID')
  ev.target.appendChild(document.getElementById(data));
  scoreBoard();
}
/*Generate tile function, randomly pulls out tiles and places into container*/
function generate_tile(){
    for(i = 0; i < 7; i++){
        var dragTile = ""; 
        var check = 0;
        while(check != 1){
            var gen = tile_generator();
            if(TilesOfScrabble[gen].amount > 0){
              TilesOfScrabble[gen].amount--;
              check++;
              dragTile = '<img id="' + i + '"class="image_tiles_' + i + '" data-value="' + TilesOfScrabble[gen].value +'" src="./Images/Tiles/Scrabble_Tile_' + TilesOfScrabble[gen].letter + '.jpg" draggable="true" ondragstart="drag(event)" width="73" height="70">';
              $('#t' + i).append(dragTile);
              wordArray[i] = TilesOfScrabble[gen].letter;
            }
        }
    }
}
/*Random Number Generator, whcih generates a random number used to figure out what letter is going to be
printed out on to the container*/
function tile_generator(){
  let randTile = Math.floor(Math.random() * 27);
  return randTile;
}
function scoreBoard(){
  var temp = 0;
  /*temp score that will be adjusted as needed*/
  var tempScore = 0;
  /*final score when next round is clicked*/
  var finalScore = 0;
  /*initializing variables (doubled for doubled words) and array for board slots*/
  var double = 0;
  /*variable to check where in loop we are*/
  var boardCheck = [];
  var word = "";
  boardCheck.push(document.querySelector('#s0'));
  boardCheck.push(document.querySelector('#s1'));
  boardCheck.push(document.querySelector('#s2'));
  boardCheck.push(document.querySelector('#s3'));
  boardCheck.push(document.querySelector('#s4'));
  boardCheck.push(document.querySelector('#s5'));
  boardCheck.push(document.querySelector('#s6'));
  boardCheck.push(document.querySelector('#s7'));
  boardCheck.push(document.querySelector('#s8'));
  boardCheck.push(document.querySelector('#s9'));
  boardCheck.push(document.querySelector('#s10'));
  boardCheck.push(document.querySelector('#s11'));
  boardCheck.push(document.querySelector('#s12'));
  boardCheck.push(document.querySelector('#s13'));
  boardCheck.push(document.querySelector('#s14'));
  var scoreBoard = document.querySelector('.score');
  var wordPrint = document.querySelector('.word');
  /*inner HTML scoreboard for paragraph*/
   for (var i = 0; i < 15; i++) {
    for(var j = 0; j < 7; j++) {
        if (boardCheck[i].contains(document.querySelector('.image_tiles_' + j))){
        if(i == 6 || i == 8) {
          temp = document.querySelector('.image_tiles_' + j).getAttribute('data-value');
          tempScore = parseInt(temp);
          finalScore = finalScore + (tempScore * 2);
        }
        else {
          temp = document.querySelector('.image_tiles_' + j).getAttribute('data-value');
          tempScore = parseInt(temp);
          finalScore = finalScore + tempScore;
        }
        if (i == 2 || i == 12) {
          double = double + 1;
        }
        word = word + wordArray[j];
        wordPrint.innerHTML = "Word: " + word;
      }
    }
  }
  /*doubles the score depending on where tiles are*/
  if(double == 2) {
    var value = parseInt((actualScore + (finalScore * 4)));
    scoreBoard.innerHTML = "Score: " + value;
    actualTempScore = value;
    double = 0;
  } else if(double == 1) {
    var value = parseInt(actualScore + (finalScore * 2));
    scoreBoard.innerHTML = "Score: " + value;
    actualTempScore = value;
    double = 0;
  } else {
    var value = parseInt((actualScore + finalScore));
    scoreBoard.innerHTML = "Score: " + value;
    actualTempScore = value;
    double = 0;
  }
} 
/*clears board, pulls randomized tiles to fill empty spots, and finalizes scores*/
function nextRound() {
  actualScore = actualTempScore;
  var boardCheck = [];
  boardCheck.push(document.querySelector('#s0'));
  boardCheck.push(document.querySelector('#s1'));
  boardCheck.push(document.querySelector('#s2'));
  boardCheck.push(document.querySelector('#s3'));
  boardCheck.push(document.querySelector('#s4'));
  boardCheck.push(document.querySelector('#s5'));
  boardCheck.push(document.querySelector('#s6'));
  boardCheck.push(document.querySelector('#s7'));
  boardCheck.push(document.querySelector('#s8'));
  boardCheck.push(document.querySelector('#s9'));
  boardCheck.push(document.querySelector('#s10'));
  boardCheck.push(document.querySelector('#s11'));
  boardCheck.push(document.querySelector('#s12'));
  boardCheck.push(document.querySelector('#s13'));
  boardCheck.push(document.querySelector('#s14'));
  for (var i = 0; i < 15; i++){
    var parent = document.getElementById("s" + i)
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }
  for (var k = 0; k < 7; k++) {
    $('.image_tiles_' + k).appendTo('#t' + k);
  
  }    
  var totalGaps = 0;
  var scoreBoard = document.querySelector('.score');
  for (var j = 0; j < 7; j++) {
    var gen = tile_generator();
      if (!document.getElementById('t' + j).children.length > 0) {
        if(TilesOfScrabble[gen].amount > 0) {
          TilesOfScrabble[gen].amount--;
        $('#t' + j).append('<img id="' + j + '"class="image_tiles_' + j + '" data-value="' + TilesOfScrabble[gen].value +'" src="./Images/Tiles/Scrabble_Tile_' + TilesOfScrabble[gen].letter + '.jpg" draggable="true" ondragstart="drag(event)" width="73" height="70">');
        wordArray[j] = TilesOfScrabble[gen].letter;
        }
        else {
          var newGen = tile_generator();
          var genLimit = 500;
          while (TilesOfScrabble[newGen].amount == 0) {
            newGen = tile_generator();
            genLimit--;
            if (genLimit == 0) {
              break;
            }
          }
          if (genLimit != 0) {
          $('#t' + j).append('<img id="' + j + '"class="image_tiles_' + j + '" data-value="' + TilesOfScrabble[newGen].value +'" src="./Images/Tiles/Scrabble_Tile_' + TilesOfScrabble[newGen].letter + '.jpg" draggable="true" ondragstart="drag(event)" width="73" height="70">');
          TilesOfScrabble[newGen].amount--;
          wordArray[j] = TilesOfScrabble[newGen].letter;
          }
          if (genLimit == 0 && j == 0) {
            document.querySelector("#nextRound").setAttribute("disabled", "");
            document.querySelector(".score").innerHTML += "You have used all your tiles! Good job! This is your final score!";
          }
        }
      }
   }
}
/*restart game button, reloads the site*/
$(function() {
  $('#newGame').click(function() {
    location.reload();
  });
})
/*go to the next round*/
$(function(){
  $('#nextRound').click(function() {
      nextRound();
  });
})