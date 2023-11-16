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
  
    clearInterval(timerInterval);
  
    timerInterval = setInterval(function () {
      seconds--;
  
      document.querySelector("text").textContent = seconds;
  
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
  
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = "";
  
    const feedbackElement = document.createElement("div");
  
    if (selectedAnswer === correctAnswer) {
      feedbackElement.textContent = "Correct answer!",
      feedbackElement.classList.add("correct-feedback"),
      correctCount++;
    } else {
      feedbackElement.textContent = "Wrong answer. The correct answer was: " + correctAnswer,
      feedbackElement.classList.add("wrong-feedback"),
      wrongCount++;
    }
  
    feedbackContainer.appendChild(feedbackElement);
  
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
  
  const quizPageElement = document.getElementById("quizPage");
  /*
  if (quizPageElement) {
    window.addEventListener("mouseout", function (event) {
      const from = event.relatedTarget || event.toElement;
  
  if (!from || (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
      alert("We merdina non barare, ti osservo :)");
    }
   });
  }
  */
  