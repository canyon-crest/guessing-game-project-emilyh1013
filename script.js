// time
date.textContent = time();
setInterval(function() {
  date.textContent = time();
}, 1000);

//global variables/constants
let score, answer, level, start, fast;
let tsum = 0
let count = 0
const levelArr = document.getElementsByName("level")
const scoreArr = [];

//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

let N = prompt("what is your name?: ");
N = N.charAt(0).toUpperCase() + N.slice(1).toLowerCase();
msg.textContent += ", " + N;

function giveUp(){
    score = level;
    msg.textContent = N + ", the answer was: " + answer + ", your score is: " + score;
    reset();
    updateScore();
    getTime();
}

function time(){
    let d = new Date();
    let D  = d.getDate();
    let end;
    const m = ["January","February","March","April", "May", "June","July", "August", "September", "October","November", "December"];
    let M = m[d.getMonth()];
    let h = d.getHours();
    let min = d.getMinutes();
    let s = d.getSeconds();
    if(D%10 ==1 && D!= 11){
        end = "st";
    }    
    else if(D%10 ==2 && D !=12){
        end = "nd";
    }
    else if(D%10 == 3 && D!= 13){
        end = "rd";
    }
    else{
        end = "th";
    }
    if (min < 10) min = "0" + min;
    if (s < 10) s = "0" + s;
        //concatenate the date and time
        let str = M + " " + D + end + ", " + d.getFullYear() +"; " + h + ":" + min + ":" + s;
        //update here

    return str;
}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpBtn.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
    }
    if(level == 500){
        level = prompt("Enter a number greater than 1: ");
        while ((level <= 1) || isNaN(level)){
            level = prompt("Error. Enter a number greater than 1: ");
        }
    }

    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = N + ", guess a number 1-" + level;
    score = 0;
    start = new Date().getTime();
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent= N + "; invalid, guess a number!";
        return;
    }
    score++
    if(userGuess < answer){
        msg.textContent = N + "; too low, try again";
        if(userGuess >= answer - Math.ceil(Math.floor(Math.sqrt(level))/2)){
            msg.textContent += ". You are hot.";
        }
        else if(userGuess >= answer - Math.floor(Math.sqrt(level))){
            msg.textContent += ". You are warm."
        }
        else{
            msg.textContent += ". You are cold."
        }
    }
    else if(userGuess > answer){
        msg.textContent = N + "; too high, try again";
        if(userGuess <= answer + Math.ceil(Math.floor(Math.sqrt(level))/2)){
            msg.textContent += ". You are hot.";
        }
        else if(userGuess <= answer + Math.floor(Math.sqrt(level))){
            msg.textContent += ". You are warm."
        }
        else{
            msg.textContent += ". You are cold."
        }
    }
    else{
        msg.textContent = N + "; correct in " + score + " tries/try.";
        if(score <= Math.ceil(Math.floor(Math.sqrt(level))/2)){
            msg.textContent += " Your score was good!"
        }
        else if(score <= Math.floor(Math.sqrt(level))) {
            msg.textContent += " Your score was okay."
        }
        else{
            msg.textContent += " Your score was bad. "
        }
        reset();
        updateScore();
        getTime();
    }

}
function getTime(){
    let end = new Date().getTime();
    let t = (end - start) / 1000;
    tsum += t;
    count ++;

    if (fast == undefined || t < fast){
    fast = t;
    }

    stats.textContent = "Average time: " + (tsum/count).toFixed(2) + " ; Fastest: " + fast.toFixed(2);
    msg.textContent+= " (time: " + t.toFixed(2) +")" ;
}
function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.disabled = true;
    playBtn.disabled = false;
    giveUpBtn.disabled = true;
    for(let i=0; i< levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score); // adds current score to array of scores 
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0; 
    scoreArr.sort((a,b) => a-b); //sort ascending
    //leaderboard
    const lb = document.getElementsByName("leaderboard");

    for(let i=0; i<scoreArr.length; i++){
        sum+= scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "average score: " + avg.toFixed(2);

}