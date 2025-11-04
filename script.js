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
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
    }
    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = "Guess a number 1-" + level;
    guess.placeholder = answer;
    score = 0;
    start = new Date().getTime();
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent= "invalid, guess a number!";
        return;
    }
    score++
    if(userGuess < answer){
        msg.textContent = "too low, try again";
    }
    else if(userGuess > answer){
        msg.textContent = "too high, try again";
    }
    else{
        msg.textContent = "correct " + score + " tries.";
        reset();
        updateScore();
        let end = new Date().getTime();
        let t = (end - start) / 1000;
        tsum += t;
        count ++;

        if (fast == undefined || t < fast){
        fast = t;
        }

        stats.textContent = "Average time: " + (tsum/count).toFixed(2) + " ; Fastest: " + fast.toFixed(2);
        msg.textContent+=" (" + t.toFixed(2) +")" ;
    }

}
function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = false;
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