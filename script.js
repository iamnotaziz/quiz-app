const questions = [
    {
        question: "Que signifie l'acronyme HTML ?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Quelle propriété CSS permet de créer une disposition en grille ?",
        options: [
            "display: flex;",
            "display: block;",
            "display: grid;",
            "display: inline-block;"
        ],
        answer: 2
    },
    {
        question: "Comment déclare-t-on une variable réassignable en JavaScript moderne ?",
        options: [
            "const",
            "let",
            "var_name",
            "define"
        ],
        answer: 1
    },
    {
        question: "Quelle balise HTML5 est utilisée pour structurer le contenu principal d'une page ?",
        options: [
            "<section>",
            "<header>",
            "<main>",
            "<div>"
        ],
        answer: 2
    },
    {
        question: "Quelle méthode JS permet de sélectionner un élément par son identifiant ID ?",
        options: [
            "document.querySelector('#id')",
            "document.getElementById('id')",
            "Les deux réponses précédentes",
            "Aucune de ces réponses"
        ],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const scoreLive = document.getElementById('score-live');
const progressBar = document.getElementById('progress-bar');
const feedbackElement = document.getElementById('feedback');

const finalScoreElement = document.getElementById('final-score');
const resultMessageElement = document.getElementById('result-message');


startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateScoreDisplay();
    showQuestion();
}
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    questionText.textContent = currentQuestion.question;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    feedbackElement.className = 'feedback hidden';
    optionsContainer.innerHTML = '';
}

function selectOption(selectedIndex, correctIndex) {
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Désactiver tous les boutons pour empêcher de cliquer plusieurs fois
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        score++;
        updateScoreDisplay();
        buttons[selectedIndex].classList.add('correct');
        showFeedback("Bravo ! C'est la bonne réponse.", true);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); 
        showFeedback(`Dommage ! La bonne réponse était : "${questions[currentQuestionIndex].options[correctIndex]}"`, false);
    }

    nextBtn.classList.remove('hidden');
}

function showFeedback(message, isCorrect) {
    feedbackElement.textContent = message;
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add(isCorrect ? 'correct' : 'wrong');
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function updateScoreDisplay() {
    scoreLive.textContent = `Score : ${score}`;
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    progressBar.style.width = '100%';

    finalScoreElement.textContent = score;

    if (score === questions.length) {
        resultMessageElement.textContent = "Parfait ! Vous avez maîtrisé toutes les questions ! 🎉";
    } else if (score >= 3) {
        resultMessageElement.textContent = "Bien joué ! Beau travail. 👍";
    } else {
        resultMessageElement.textContent = "N'hésitez pas à réviser et retenter votre chance ! 💪";
    }
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    startQuiz();
}
