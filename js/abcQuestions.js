function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex]
}

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {

    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
        alert("correct!");
    }
    else {
        alert("wrong!");
    }

    this.questionIndex++;
}

function Question(text, image, sounds, choices, answer) {
    this.text = text;
    this.image = image;
    this.sounds = sounds;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        var element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionIndex().text;

        var element1 = document.getElementById('sound');
        element1.src = quiz.getQuestionIndex().sounds;
        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById('choice' + i);
            element.innerHTML = choices[i];

            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
}


function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your Scores: " + quiz.score + "</h2>";
    gameOverHTML += "<button type='button' onclick='location.reload()'>Play again!</button>";
    /*gameOverHTML += " <a href='../home.html'><img src='../Images/home-btn.png' width='10' height='20'></a>Home";*/
    gameOverHTML += " <a href='../../CIT261/home.html'>Go Home</a>";
    var element = document.getElementById('quiz');
    element.innerHTML = gameOverHTML;
}


var questions = [
	new Question("What vowel is this?", "../Images/ABC/a.jpg" , "../../CIT261/sounds/ABC/a.ogg", ["a", "e", "o", "u"], "a"),
	new Question("What vowel is this?", "../Images/ABC/e.jpg" , "../../CIT261/sounds/ABC/e.ogg", ["i", "e", "o", "a"], "e"),
    new Question("What vowel is this?", "../Images/ABC/i.jpg" , "../../CIT261/sounds/ABC/i.ogg", ["u", "e", "o", "i"], "i"),
    new Question("What vowel is this?", "../Images/ABC/o.jpg" , "../../CIT261/sounds/ABC/o.ogg", ["e", "i", "o", "u"], "o"),
    new Question("What vowel is this?", "../Images/ABC/u.jpg" , "../../CIT261/sounds/ABC/u.ogg", ["a", "u", "o", "i"], "u"),
];

var quiz = new Quiz(questions);

populate();
