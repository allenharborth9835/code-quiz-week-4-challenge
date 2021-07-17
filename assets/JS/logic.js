
var startBtn = document.createElement("BUTTON");
startBtn.innerHTML = "start game";
var headerEl = document.createElement("H1");
headerEl.innerHTML = "take the code quizz";
var phraseEl = document.createElement("P");
phraseEl.innerHTML = "find out how you compare to your freinds"
var mainDivEl = document.createElement("div")
var score = 0;
let time = 45;
let timeEl = document.getElementById('time');

//create a function to create the start page
function startPage(){
    document.body.appendChild(mainDivEl)
    mainDivEl.appendChild(headerEl);
    mainDivEl.appendChild(phraseEl);
    mainDivEl.appendChild(startBtn);
    startBtn.onclick = startGame;
}
function submitHighscore(event){
    event.preventDefault();
    highscoreReview();
}

//create function to create game
function startGame(){
    var i = 0;
    var questionEl = document.createElement("H3");
    var responseEl = document.createElement("P");
    var responseDiv = document.createElement("footer");
    var buttonElArr =[
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON")
    ];
    //create a varible to store
    score = 0;
    //create a varible to store questions
    var questions =[
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
    headerEl.remove();
    phraseEl.remove();
    startBtn.remove();

    document.body.appendChild(mainDivEl);
    document.body.appendChild(responseDiv);

    function displayNext(){   
        if((i<questions.length)&&(!questions[i].isAnswered)){
            questionEl.innerHTML = questions[i].question;
            mainDivEl.appendChild(questionEl);
            var answerArr = questions[i].answers;
            answerArr.forEach( answer =>{
                var position = answerArr.indexOf(answer);
                buttonElArr[position].innerHTML = answer;
                mainDivEl.appendChild(buttonElArr[position]);
                buttonElArr[position].onclick = function(){
                    if(position === questions[i].correct){
                        time += 5;
                        score++;
                        responseEl.innerHTML = "correct! +5 time";
                        responseDiv.appendChild(responseEl); 
                    }else{
                        time -= 10;
                        responseEl.innerHTML = "incorrect! -10 time";
                        responseDiv.appendChild(responseEl);
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
    var timerInterval = setInterval(function(){
        if(time > -1){
            timeEl.innerHTML = time;
            time--;
        }else{
            questionEl.remove();
            for(var i = 0; i < 4;i++){
                buttonElArr[i].remove();
            }
            mainDivEl.remove();
            clearInterval(timerInterval);
            time=45;
            timeEl.innerHTML = time;
            highscoreInput();
        }
    }, 1000);
}

//create a highscore input page
function highscoreInput(){
    var scoreEl = document.createElement("P");
    scoreEl.innerHTML = `your highscore was ${score}`;
    var promptEl = document.createElement("P");
    var formEl = document.createElement("FORM")
    promptEl.innerHTML = "enter your intials"
    var inputEl = document.createElement('input');
    inputEl.setAttribute("type","text");
    inputEl.setAttribute("maxLength", "3");
    var submitEl = document.createElement("BUTTON");
    submitEl.innerHTML = "submit";

    document.body.appendChild(mainDivEl);
    document.body.appendChild(formEl);

    mainDivEl.appendChild(scoreEl);
    mainDivEl.appendChild(formEl);
    formEl.appendChild(promptEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
    submitEl.onclick = submitHighscore;
}
//create a highscore page
function highscoreReview(){
    var highscore = document.createElement("div");
    var header = document.createElement("H1");
    header.innerHTML = "Highscores"
    mainDivEl.remove();
    document.body.appendChild(highscore);
    highscore.appendChild(header);

}
//create function to store data
//create funtion to load data
startPage();

