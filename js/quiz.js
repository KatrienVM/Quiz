const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions;
let currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        console.log("answer", answer.text)

        addInput();

        const submitButton = document.querySelector('.submit-button');
        submitButton.addEventListener('click', () => {
            const val = document.getElementById('input-field').value;
            console.log("value", val)
            console.log("answer", answer.text)

            if (val === answer.text) {
                document.body.classList.add('correct')
            }
            else {
                document.body.classList.add('wrong')
            }
        });


        document.getElementById('input-field').addEventListener('input', selectAnswer)
})
}

function addInput() {
    const answerField = document.createElement('input')
    answerField.classList.add('input-field');
    answerField.type = "text";
    answerField.id = 'input-field';
    answerField.value = "1";

    document.body.appendChild(answerField);
    answerButtonsElement.appendChild(answerField)
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer() {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Web Dev Simplified', correct: true },
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'YES!!!', correct: true },
        ]
    }
]