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

// Funzione per calcolare la percentuale
function calcolaPercentuale(count, total) {
  return (count / total) * 100;
}

// Funzione per aggiornare il contatore delle domande
function aggiornaContatoreDomande() {
  const questionCounterElement = document.getElementById("questionCounter");
  questionCounterElement.innerHTML = `QUESTION ${
    currentQuestionIndex + 1
  }<span class="numeroColorato"> / ${totalQuestions}</span>`;
}

// Funzione per avviare il quiz
function avviaQuiz() {
  resettaTimer();
  resettaAnimazione();
  gestioneDomande(questions[currentQuestionIndex]);
  avviaTimer();
}

// Funzione per avviare il timer
function avviaTimer() {
  timerInterval = setInterval(function () {
    if (seconds >= 0) {
      aggiornaVisualizzazioneTimer();
      aggiornaAnimazione();
    } else {
      clearInterval(timerInterval);
      gestisciTimeout();
    }
    seconds--;
  }, 1000);
}

// Funzione per resettare completamente il timer
function resettaTimer() {
  clearInterval(timerInterval);
  seconds = 60;
  aggiornaVisualizzazioneTimer();
}

// Funzione per aggiornare la visualizzazione del timer
function aggiornaVisualizzazioneTimer() {
  const timerText = document.getElementById("timerText");
  timerText.textContent = seconds;
}

// Funzione per aggiornare l'animazione
function aggiornaAnimazione() {
  const progressCircle = document.getElementById("progress-circle");
  const dashOffset = (seconds / 60) * 440;
  progressCircle.style.strokeDashoffset = dashOffset;
}

// Funzione per resettare l'animazione
function resettaAnimazione() {
  const progressCircle = document.getElementById("progress-circle");
  progressCircle.style.strokeDashoffset = 440;
}

// Funzione per gestire il timeout
function gestisciTimeout() {
  verificaRisposta("");
  avviaQuiz();
}

// Funzione per gestire la visualizzazione delle domande e risposte
function gestioneDomande(domanda) {
  const questionContainer = document.getElementById("container");
  questionContainer.innerHTML = "";

  const questionElement = document.createElement("div");
  questionElement.innerHTML = `<p class="stilep">${domanda.question}</p>`;

  const risposte = [...domanda.incorrect_answers, domanda.correct_answer];
  risposte.sort(() => Math.random() - 0.5);

  risposte.forEach((risposta) => {
    const button = document.createElement("button");
    button.classList.add("stileBottoni");
    button.textContent = risposta;
    button.addEventListener("click", () =>
      verificaRisposta(risposta, domanda.correct_answer)
    );
    questionElement.appendChild(button);
  });

  questionContainer.appendChild(questionElement);
  aggiornaContatoreDomande();
}

// Funzione per aggiornare il contatore dei punteggi
function aggiornaContatorePunteggi() {
  const scoreCounterElement = document.getElementById("scoreCounter");

  const percentualeCorrette = calcolaPercentuale(correctCount, totalQuestions);
  const percentualeErrate = calcolaPercentuale(wrongCount, totalQuestions);

  if (currentQuestionIndex === questions.length) {
    localStorage.setItem("percentualeCorrette", percentualeCorrette);
    localStorage.setItem("percentualeErrate", percentualeErrate);
    localStorage.setItem("conteggioCorrette", correctCount);
    localStorage.setItem("conteggioErrate", wrongCount);

    clearInterval(timerInterval);
    window.location.href = `./results.html`;
  }
}

// Funzione per verificare la risposta
function verificaRisposta(rispostaSelezionata, rispostaCorretta) {
  clearInterval(timerInterval);

  const feedbackContainer = document.getElementById("feedbackContainer");
  feedbackContainer.innerHTML = "";

  const feedbackElement = document.createElement("div");

  if (rispostaSelezionata === rispostaCorretta) {
    feedbackElement.textContent = "Correct Answer!";
    feedbackElement.classList.add("correct-feedback");
    correctCount++;
  } else {
    feedbackElement.textContent =
      "Wrong answer, the correct one is: " + rispostaCorretta;
    feedbackElement.classList.add("wrong-feedback");
    wrongCount++;
  }

  feedbackContainer.appendChild(feedbackElement);

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    avviaQuiz();
  } else {
    aggiornaContatorePunteggi();
    window.location.href = "./risultati.html";
  }
  aggiornaContatorePunteggi();
}

// Avvia il quiz quando la pagina è completamente caricata
document.addEventListener("DOMContentLoaded", avviaQuiz);

 // Gestisce l'evento mouseout per prevenire il barare
const quizPageElement = document.getElementById("quizPage");
if (quizPageElement) {
  window.addEventListener("mouseout", function (event) {
    const from = event.relatedTarget || event.toElement;

    if (
      !from ||
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      alert("Non barare, ti stiamo osservando :)");
    }
  });
} 
