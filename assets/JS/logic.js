let startEl = document.querySelector('#start');
let mainDivEl = document.querySelector('#game');
let highscoreEl = document.querySelector('#highscore');
let highscoreInputEl = document.querySelector('#highscoreInput');
let responseEl = document.querySelector("#response");
let timeEl = document.getElementById('time');
let scoreArr = [];
let score = 0;
let time = 45;



//create a function to create the start page
function startPage(){
    highscoreInputEl.remove();
    highscoreEl.remove();
    highscoreEl.remove();
    var localHighscores = localStorage.getItem("highscore");
    if(!(localHighscores===null)){
        localHighscores = JSON.parse(localHighscores);
        localHighscores.forEach(score =>{
            scoreArr.push(score)
        });
    }
    let startBtn = document.querySelector('#startGame')
    startBtn.onclick = startGame;
}
//create function to create game
function startGame(){
    let i = 0;
    let questionEl = document.createElement("H1");
    let buttonElArr =[
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON")
    ];
    //create a varible to store
    score = 0;
    //create a varible to store questions
    let questions =[
        {question: "1",
        answers:[ 
            "1.",
            "2.",
            "3.",
            "4.",
        ],
        correct: 3,
        isAnswered: false
        },
        {question: "2a",
        answers:[ 
            "1.",
            "2.",
            "3.",
            "4.",
        ],
        correct: 2,
        isAnswered: false
        }
    ]
    startEl.remove();
    highscoreEl.remove();
    document.body.appendChild(mainDivEl);
    document.body.appendChild(responseEl);
    responseEl.innerHTML = "";
    function displayNext(){   
        if((i<questions.length)&&(!questions[i].isAnswered)){
            questionEl.innerHTML = questions[i].question;
            mainDivEl.appendChild(questionEl);
            let answerArr = questions[i].answers;
            answerArr.forEach( answer =>{
                let position = answerArr.indexOf(answer);
                buttonElArr[position].innerHTML = answer;
                mainDivEl.appendChild(buttonElArr[position]);
                buttonElArr[position].onclick = function(){
                    if(position === questions[i].correct){
                        time += 5;
                        score++;
                        responseEl.innerHTML = "correct! +5 time"; 
                    }else{
                        time -= 10;
                        responseEl.innerHTML = "incorrect! -10 time"
                    }
                    questions[i].isAnswered = true;
                    i++;
                    displayNext();
                }
            });
        }else{
            time = -1;
        }
    }
    displayNext();
    //create a varible for time
    let timerInterval = setInterval(function(){
        if(time > -1){
            timeEl.innerHTML = time;
            time--;
        }else{
            questionEl.remove();
            for(var i = 0; i < 4;i++){
                buttonElArr[i].remove();
            }
            clearInterval(timerInterval);
            time=45;
            timeEl.innerHTML = time;
            highscoreInput();
        }
    }, 1000);
}
//create a highscore input page
function highscoreInput(){
    responseEl.remove();
    mainDivEl.remove();
    document.body.appendChild(highscoreInputEl)
    document.body.appendChild(responseEl)

    let scoreEl = document.getElementById('score');
    let submitEl = document.querySelector('#submitBtn')
    scoreEl.innerHTML = score;
    
    submitEl.onclick = submitHighscore;
}
function submitHighscore(event){
    event.preventDefault();
    var NameInput = document.querySelector("input[id='name']").value;
    let scoreInfo = [];
    scoreInfo.push(NameInput);
    scoreInfo.push(score);
    console.log(scoreInfo)
    scoreArr.push(scoreInfo);
    localStorage.setItem("highscore",JSON.stringify(scoreArr));
    
    highscoreReview();
}

//create a highscore page
function highscoreReview(){
    
    if(scoreArr >  2){
        
    }
    responseEl.remove()
    startEl.remove();
    highscoreInputEl.remove();
    mainDivEl.remove();
    document.body.appendChild(highscoreEl);
    let scoresEl = document.querySelector("#scores")
    scoresEl.innerHTML = "";
    console.log(scoreArr);
    scoreArr.forEach( score =>{
        let postition = scoreArr.indexOf(score);
        let number = `${postition + 1}. ${score[0]} ${score[1]}<br>`;
        scoresEl.innerHTML += number;
    });
    highscoreEl.appendChild(scoresEl);
    let restartBtn = document.querySelector('#restart');
    let clearBtn = document.querySelector('#clear')
    restartBtn.onclick = startGame;
    clearBtn.onclick = function(){
        localStorage.removeItem("highscore");
        scoreArr = [];
        scoresEl.innerHTML = "";
    };
}
//create function to store data
//create funtion to load data
//create a function to clear data
startPage();

