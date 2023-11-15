const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
let correctCount = 0;
let wrongCount = 0;
let seconds = 60;
let timerInterval;
let progressCircle;
let circleLength;

function calculatePercentage(count, total) {
  return (count / total) * 100;
}

function updateQuestionCounter() {
  const questionCounterElement = document.getElementById("questionCounter");
  questionCounterElement.innerHTML =
    `Question ${currentQuestionIndex + 1}` +
    `<span id="numeroColorato">/${totalQuestions}<span>`;
}

function questionario(question) {
  const questionContainer = document.getElementById("container");
  questionContainer.innerHTML = "";

  const questionElement = document.createElement("div");
  questionElement.innerHTML = `<p class="stilep">${question.question}<p>`;
  
  progressCircle = document.querySelector(".progress-circle");

  circleLength = 2 * Math.PI * parseInt(progressCircle.getAttribute("r"));
  
  const domande = [...question.incorrect_answers, question.correct_answer];
  domande.sort(() => Math.random() - 0.5);
  domande.forEach((risposta) => {
    const button = document.createElement("button");
    button.classList.add("stileBottoni");
    button.textContent = risposta;
    button.addEventListener("click", () =>
      checkAnswer(risposta, question.correct_answer),
    );
    questionElement.appendChild(button);
  });

  questionContainer.appendChild(questionElement);
  updateQuestionCounter();

  startTimer();
}

function startTimer() {
  seconds = 60;

  // Imposta l'offset iniziale al massimo per avere un cerchio pieno
  progressCircle.style.strokeDashoffset = 0;

  // Cancella l'intervallo precedente (se presente)
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    seconds--;

    document.querySelector("text").textContent = seconds;

    // Calcola e imposta l'offset in base al tempo rimasto
    var newDashOffset = (60 - seconds) * (circleLength / 60);
    progressCircle.style.strokeDashoffset = newDashOffset;

    // Calcola e imposta l'opacità in base al tempo rimasto
    var opacity = seconds / 60; // da completamente opaco (1) a completamente trasparente (0)
    progressCircle.style.strokeOpacity = opacity;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}


function handleTimeout() {
  checkAnswer(""); 
}

function updateScoreCounter() {
  const scoreCounterElement = document.getElementById("scoreCounter");

  const correctPercentage = calculatePercentage(correctCount, totalQuestions);
  const wrongPercentage = calculatePercentage(wrongCount, totalQuestions);

  if (currentQuestionIndex === questions.length) {
    localStorage.setItem("correctPercentage", correctPercentage);
    localStorage.setItem("wrongPercentage", wrongPercentage);
    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("wrongCount", wrongCount);

    clearInterval(timerInterval); 
    window.location.href = `./results.html`;
    return;
  }
}

function checkAnswer(selectedAnswer, correctAnswer) {
  clearInterval(timerInterval);

  if (selectedAnswer === correctAnswer) {
    correctCount++;
  } else {
    wrongCount++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    questionario(questions[currentQuestionIndex]);
  } else {
    updateScoreCounter();
    window.location.href = "./results.html";
  }
  updateScoreCounter();
}

questionario(questions[currentQuestionIndex]);
