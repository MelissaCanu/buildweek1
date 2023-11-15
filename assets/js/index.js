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

  const domande = [...question.incorrect_answers, question.correct_answer];
  domande.sort(() => Math.random() - 0.5);
  domande.forEach((risposta) => {
    const button = document.createElement("button");
    button.classList.add("stileBottoni");
    button.textContent = risposta;
    button.addEventListener("click", () =>
      checkRisposta(risposta, question.correct_answer)
    );
    questionElement.appendChild(button);
  });
  questionContainer.appendChild(questionElement);
  updateQuestionCounter();
}

///////////////////////////////////////////////////////////////////

let correctCount = 0;
let wrongCount = 0;

function calculatePercentage(count, total) {
  return (count / total) * 100;
}

function updateScoreCounter() {
  const scoreCounterElement = document.getElementById("scoreCounter");

  const correctPercentage = calculatePercentage(
    correctCount,
    currentQuestionIndex
  );
  const wrongPercentage = calculatePercentage(wrongCount, currentQuestionIndex);

  if (currentQuestionIndex === questions.length) {
    const correctPercentage = calculatePercentage(
      correctCount,
      questions.length
    );
    const wrongPercentage = calculatePercentage(wrongCount, questions.length);

    // salva i risultati in un "localStorage"?? che cazzo e'??? per spostarli in un altra pagina html
    localStorage.setItem("correctPercentage", correctPercentage);
    localStorage.setItem("wrongPercentage", wrongPercentage);
    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("wrongCount", wrongCount);

    window.location.href = `./results.html`;
    return;
  }
}

function checkRisposta(rispostaSelezionata, rispostaGiusta) {
  if (rispostaSelezionata === rispostaGiusta) {
    correctCount++;
  } else {
    window.location.href = "./questionario.html";
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

var seconds = 60;
var anglePerSecond = 360 / seconds;
var progressCircle = document.querySelector(".progress-circle");
var circleLength = 2 * Math.PI * parseInt(progressCircle.getAttribute("r"));
var dashOffsetPerSecond = circleLength / seconds;

var timerInterval = setInterval(function () {
  seconds--;

  document.querySelector("text").textContent = seconds;

  var newDashOffset = circleLength - dashOffsetPerSecond * (seconds - 1);
  progressCircle.style.strokeDashoffset = newDashOffset;

  // Calcola e imposta l'opacità in base al tempo rimasto
  var opacity = seconds / 60; // da completamente opaco (1) a completamente trasparente (0)
  progressCircle.style.strokeOpacity = opacity;

  if (seconds <= 0) {
    clearInterval(timerInterval);
    alert("Il tempo è scaduto!");
  }
}, 1000);
