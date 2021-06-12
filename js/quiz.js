const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
// const prevButton = document.getElementById('prev-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.querySelector('.submit-button');
const seeAnswers = document.querySelector('.draft');

let value = 0;
let count = 0;
let shuffledQuestions;
let currentQuestionIndex;
let inputLength = 0;
let questionId = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame() {
    count = 0;
    removeAllChildNodes(seeAnswers);
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setNextQuestion() {
    //TODO: Score logica werkt nog niet

    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
    const nodes = document.querySelectorAll('input');

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('focus', () => {
            nodes[i].classList.add('active');
            nodes[i].style.background = 'green';
        })

        nodes[i].addEventListener('blur', () => {
            nodes[i].classList.remove("active");
            nodes[i].style.background = 'transparent';
        })

        nodes[i].addEventListener('input', inputHandler);
        nodes[i].addEventListener('input', selectAnswer);

        nodes[i].addEventListener('input', () => {

            console.log("correct answer: ", questions[i].answers[0].text)

            if (value !== questions[i].answers[0].text) {
                document.body.classList.add('wrong');
                document.body.classList.remove("correct");
            } else {
                count++;
                document.body.classList.add('correct')
                document.body.classList.remove("wrong");
            }
            score.innerHTML = "score: " + count;
        })

        nodes[i].addEventListener("keyup", function(e) {
            if (e.keyCode === 13 || e.keyCode === 9) {
                e.preventDefault();
                //submitButton.click(selectAnswer);
                writeDown()
            }
        });
    }
    const score = document.querySelector('.score');
    submitButton.addEventListener('click', () => {
        alert("Score: " + count)
    })
    }

function showQuestion() {
    questions.forEach(q => {

        addQuestion(q);
        //let sameFunctions = document.querySelectorAll('.submit-button,.next-btn');
        });
}

function writeDown() {
        const kladblokje = document.createElement('div');
        kladblokje.classList.add('klad');
        kladblokje.innerHTML = value;
        document.body.appendChild(kladblokje);
        seeAnswers.appendChild(kladblokje)

}

function addQuestion (question) {
        const questionField = document.createElement('div');
        questionField.classList.add('question');
        questionField.id = "question" + (questionId++);
        questionField.innerHTML = question.question;
        document.body.appendChild(questionField);
        answerButtonsElement.appendChild(questionField)

        addInput()
}

function addInput() {
    const answerField = document.createElement('input')
    answerField.classList.add('input-field');
    answerField.type = "text";
    answerField.id = "input-field" + (inputLength++);

    document.body.appendChild(answerField);
    answerButtonsElement.appendChild(answerField);

    if(answerField.id === "input-field0") {
        answerField.classList.add('active');
    }
}

const inputHandler = function(e) {
    value = e.target.value;
    console.log("value: ", value);
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    //prevButton.classList.add('hide');

      while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild)
     }
}

function selectAnswer() {
    if (shuffledQuestions.length < currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        // prevButton.classList.remove('hide')
        startButton.classList.remove('hide')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'Typ avond',
        answers: [
            { text: 'avond'},
        ]
    },
    {
        question: 'Typ b',
        answers: [
            { text: 'b'},
        ]
    },
    {
        question: 'Typ c',
        answers: [
            { text: 'c'},
        ]
    }
]