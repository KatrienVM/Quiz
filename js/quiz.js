const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.querySelector('.submit-button');
const seeAnswers = document.querySelector('.draft');

let value = 0;
let count = 0;
let shuffledQuestions;
let currentQuestionIndex;

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
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    question.answers.forEach(answer => {

        addQuestion(question);


        const inputField = document.getElementById('input-field');
        const answerInput = document.getElementById('answer-buttons').lastChild;

        let sameFunctions = document.querySelectorAll('.submit-button,.next-btn');

        sameFunctions.forEach(btn => {
            btn.addEventListener('click', () => {

                if (value !== answer.text) {
                    document.body.classList.add('wrong');
                    document.body.classList.remove("correct");
                }
                else {
                    document.body.classList.add('correct')
                    document.body.classList.remove("wrong");
                }
            });
        });

        answerInput.addEventListener('input', inputHandler);

        answerInput.addEventListener("keyup", function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                submitButton.click(selectAnswer);
                writeDown()
            }
        });

        answerInput.addEventListener('input', selectAnswer);
})

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
    questionField.id = "question";
    questionField.innerHTML = question.question;

    document.body.appendChild(questionField);
    answerButtonsElement.appendChild(questionField)

    addInput()
}

function addInput() {
    const answerField = document.createElement('input')
    answerField.classList.add('input-field');
    answerField.type = "text";
    answerField.id = "input-field";

    document.body.appendChild(answerField);
    answerButtonsElement.appendChild(answerField);
}

const inputHandler = function(e) {
    value = e.target.value;
};


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    prevButton.classList.add('hide');

      while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild)
     }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    console.log(selectedButton.value)

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        prevButton.classList.remove('hide')
        startButton.classList.remove('hide')
    }

    // if (selectedButton.value === questions[0].answers[0].text) {
    //     count++;
    // } count--;
    //
    // const score = document.querySelector('.score');
    // score.innerHTML = count.toString();

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
        question: 'Typ avond',
        answers: [
            { text: 'avond', correct: true },
        ]
    },
    {
        question: 'Typ b',
        answers: [
            { text: 'b', correct: true },
        ]
    },
    {
        question: 'Typ c',
        answers: [
            { text: 'c', correct: true },
        ]
    }
]