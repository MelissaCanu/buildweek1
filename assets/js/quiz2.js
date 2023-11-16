const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "Chi sei?",
      correct_answer: "Tuo Padre",
      incorrect_answers: [
        "Tuo Nonno",
        "Tuo Zio",
        "Pasquale",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Come si risponde a dei testimoni di Geova che ti stanno citofonando",
      correct_answer: "Dai direttamente fuoco alla casa perche' ormai sanno dove abiti",
      incorrect_answers: ["Sono Ateo", "Non mi piace Geova", "Gli butti in testa il secchio del'umido"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Egidio e' tipo la persona meno perfettina del mondo",
      correct_answer: "Falso",
      incorrect_answers: ["Vero"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Melissa fa cagare come Leader",
      correct_answer: "Falso",
      incorrect_answers: ["Vero"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Federico De Ambrosis quanto ama scrivere Pippo Pluto?",
      correct_answer: "E' tipo il suo unico credo",
      incorrect_answers: ["Normale", "Abbastanza", "Troppo"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "Dove e' nato Sanam?",
      correct_answer: "L'ha generato il male in persona per disturbare la quiete pubblica",
      incorrect_answers: [
        "Africa",
        "India",
        "Boh, e' spuntato cosi a caso",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Fra lobbia fa parte di quale lobby?",
      correct_answer: "Gattari",
      incorrect_answers: ["Ku Klux Klan", "Apple-Fag", "Illuminati"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "Quante lauree ha Giovanazzi",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Javascript e' la cosa piu' facile del mondo",
      correct_answer: "Falso",
      incorrect_answers: ["Vero"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Quanto si e' pentito Mario di aver detto che Javascript e' bello?",
      correct_answer: "Non abbastanza",
      incorrect_answers: ["Poco", "Per niente", "Jakarta"],
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
  }<span class="numeroColorato"> / ${totalQuestions}</span>`;;
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

  