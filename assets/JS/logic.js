let startEl = document.querySelector('#start');
let mainDivEl = document.querySelector('#game');
let highscoreEl = document.querySelector('#highscore');
let highscoreInputEl = document.querySelector('#highscoreInput');
let responseEl = document.querySelector("#response");
let timeEl = document.getElementById('time');
let isGameOn = false;
let scoreArr = [];
let score = 0;
let time = 45;

//function for the checkHighscore
//it also ends game to let player submit highscore
function highscoreLink(){
    if(isGameOn){
        time = -1;
    }else{
        highscoreReview();
    }
}
//create a function to create the start page
function startPage(){
    clearScreen()
    document.body.appendChild(startEl)
    var localHighscores = localStorage.getItem("highscore");
    //if there are highscores in local storage it pushes them in to the score array
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
    //varible to keep track when game is running
    isGameOn = true;
    let questionEl = document.createElement("H1");
    //varible to keep track of question number
    let questionNum = 0;
    //varible for different buttons of the question
    let buttonElArr =[
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON"),
        document.createElement("BUTTON")
    ];
    //create a varible to store the score
    score = 0;
    //create a varible to store questions
    let questions =[
        {question: "Why so JavaScript and Java have similar name",
        answers:[ 
            "JavaScript is a version of Java",
            "JavaScript’s syntax is loosely based on Java",
            "They both originated on the island of Java",
            "None of the above",
        ],
        correct: 1,
        isAnswered: false
        },
        {question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        answers:[ 
            "The Web server",
            "A central machine deep within Netscape’s corporate offices",
            "The User’s machine running a Web browser",
            "None of the above",
        ],
        correct: 2,
        isAnswered: false
        },
        {question: "What are variables used for in JavaScript Programs?",
        answers:[ 
            "Varying randomly",
            "Storing numbers, dates, or other values",
            "Causing high-school algebra flashbacks",
            "None of the above",
        ],
        correct: 1,
        isAnswered: false
        },
        {question: "What should appear at the very end of your JavaScript?",
        answers:[ 
            "The /script tag",
            "The script tag",
            "The END statement",
            "None of the above",
        ],
        correct: 0,
        isAnswered: false
        },
        {question: "How does JavaScript store dates in a date object?",
        answers:[ 
            "The number of seconds since Netscape’s public stock offering.",
            "seconds after January 1st, 1500",
            "days since January 1st,1900",
            "milliseconds since January 1st,1970",
        ],
        correct: 3,
        isAnswered: false
        },
        {question: "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?",
        answers:[ 
            "\“New Text\”?",
            "para1.value=\”New Text\”;",
            "para1.firstChild.nodeValue= \“New Text\”;>",
            "para1.nodeValue=\”New Text\”\;",
        ],
        correct: 1,
        isAnswered: false
        },
        {question: "Which of the following best describes JavaScript?",
        answers:[ 
            "a low-level programming language.",
            "a scripting language precompiled in the browser.",
            "a compiled scripting language.",
            "an object-oriented scripting language.",
        ],
        correct: 3,
        isAnswered: false
        },
        {question: "Which of the following is NOT considered a JavaScript operator?",
        answers:[ 
            "new",
            "this",
            "delete",
            "typeof",
        ],
        correct: 1,
        isAnswered: false
        },
        {question: "JavaScript is interpreted by _________",
        answers:[ 
            "client",
            "server",
            "object",
            "None of the above",
        ],
        correct: 0,
        isAnswered: false
        },
        {question: "Using _______ statement is how you test for a specific condition.",
        answers:[ 
            "Select",
            "If",
            "Switch",
            "For",
        ],
        correct: 1,
        isAnswered: false
        }
    ]
    clearScreen();
    document.body.appendChild(mainDivEl);
    responseEl.innerHTML = "";
    questionEl.innerHTML = "";
    function displayNext(){
        //goes through each question and displays the question
        if((questionNum<questions.length)&&(!questions[questionNum].isAnswered)){
            questionEl.innerHTML = questions[questionNum].question;
            mainDivEl.appendChild(questionEl);
            let answerArr = questions[questionNum].answers;
            //each answer is given its own button and click action
            answerArr.forEach( answer =>{
                let position = answerArr.indexOf(answer);
                buttonElArr[position].innerHTML = answer;
                mainDivEl.appendChild(buttonElArr[position]);
                buttonElArr[position].onclick = function(){
                    document.body.appendChild(responseEl);
                    if(position === questions[questionNum].correct){
                        time += 5;
                        score++;
                        responseEl.innerHTML = "correct! +5 time"; 
                    }else{
                        time -= 10;
                        responseEl.innerHTML = "incorrect! -10 time"
                    }
                    questions[questionNum].isAnswered = true;
                    questionNum++;
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
//fuction to clear the screen of objects
function clearScreen(){
    responseEl.remove()
    startEl.remove();
    highscoreInputEl.remove();
    mainDivEl.remove();
    highscoreEl.remove();
}
//create a highscore input page
function highscoreInput(){
    clearScreen();
    isGameOn = false;
    document.body.appendChild(highscoreInputEl)
    document.body.appendChild(responseEl)
    let scoreEl = document.getElementById('score');
    let submitEl = document.querySelector('#submitBtn')
    scoreEl.innerHTML = score;
    
    submitEl.onclick = submitHighscore;
}
//sort function to sort scores
function sortArr(array){
    scoreArr.sort(sortFunction);
    function sortFunction(a, b){
        if(a[1]===b[1]){
            return 0;
        }else{
            return (b[1] < a[1]) ? -1 : 1;
        }
    }
    return array;
}
//function for when the submit highscore button was pressed
function submitHighscore(event){
    event.preventDefault();
    var NameInput = document.querySelector("input[id='name']").value;
    let scoreInfo = [];
    if(!NameInput){
        window.alert("you must input your name");
        highscoreInput();
    }else{
        scoreInfo.push(NameInput);
        scoreInfo.push(score);
        scoreArr.push(scoreInfo);
        sortArr(scoreArr);
        //store highscores in local storage
        localStorage.setItem("highscore",JSON.stringify(scoreArr));
        highscoreReview();
    }
}
//create a highscore page
function highscoreReview(){
    clearScreen();
    document.body.appendChild(highscoreEl);
    let scoresEl = document.querySelector("#scores")
    //clears the scores on the screen to put a new list on the screen
    scoresEl.innerHTML = "";
    //pulls each element from the array and adds them
    scoreArr.forEach( score =>{
        let postition = scoreArr.indexOf(score);
        let number = `${postition + 1}. ${score[0]} ${score[1]}<br>`;
        scoresEl.innerHTML += number;
    });
    //adds the new list of scores on the screen
    highscoreEl.appendChild(scoresEl);
    //pulls in the buttons from the screen
    let restartBtn = document.querySelector('#restart');
    let clearBtn = document.querySelector('#clear')
    //restarts the gamewhen button is pressed
    restartBtn.onclick = startGame;
    //clears all the high scores
    clearBtn.onclick = function(){
        localStorage.removeItem("highscore");
        scoreArr = [];
        scoresEl.innerHTML = "";
    };
}

startPage();
