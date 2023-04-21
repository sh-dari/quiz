const questions = [
    {
        question: "Вопрос 1",
        answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        correct: ['1']
    },
    {
        question: "Вопрос 2",
        answers: ["Ответ 1", "Ответ 2", "Ответ 3"],
        correct: ['2', '3']
    },
    {
        question: "Вопрос 3",
        answers: ["Ответ 1", "Ответ 2", "Ответ 3"],
        correct: ['1']
    },
    {
        question: "Вопрос 4",
        answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        correct: ['2']
    },
    {
        question: "Вопрос 5",
        answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        correct: ['4']
    }
]

//Главный экран
const mainSection = document.querySelector('.main');
const startButton = document.querySelector('.main__button');
const mainLine = document.querySelector('.content__line');
const mainHeader = document.querySelector('.body__header');

//Экран вопроса
const questionSection = document.querySelector('.question');
const answerContainer = questionSection.querySelector('.question__items');
const answerButton = questionSection.querySelector('.question__button');
const question = questionSection.querySelector('.question__header');

//Экран результата
const resultSection = document.querySelector('.result');
const resultButton = resultSection.querySelector('.result__button');
const resultResumeBad = resultSection.querySelector('.result__resume_bad');
const resultResumeGood = resultSection.querySelector('.result__resume_good');
const resultPoint = resultSection.querySelector('.result__point');
const resultPersent = resultSection.querySelector('.result__persent');
const resultNumbers = resultSection.querySelector('.result__numbers_current');
const resultBest = resultSection.querySelector('.result__info_best');
const resultPersentBest = resultSection.querySelector('.result__persent_best');
const resultText = resultSection.querySelector('.result__text_curent');

//Текущий результат
let score = 0;
//Текущий индекс вопроса
let currentQuestionIndex = 0;
//Предыдущие результаты
let previousResults = [];

//Возвращает разметку ответа
const getTemplate = () => {
    const answerElement = document
      .querySelector('#answer-template')
      .content
      .querySelector('.question__item')
      .cloneNode(true);
    return answerElement;
}

//Выбор ответа
const chooseAnswer = (evt) => {
    evt.target.classList.toggle('question__item_active');
}

//Очистка контейнера для ответов
const cleanContainer = () => {
    answerContainer.innerHTML = '';
}

//Проверка успешности результатов
const checkResults = () => {
    if (score / questions.length < 0.8) {
        resultNumbers.classList.remove('green');
        resultResumeGood.classList.add('display-none');
        resultResumeBad.classList.remove('display-none');
    } else {
        resultNumbers.classList.add('green');
        resultResumeBad.classList.add('display-none');
        resultResumeGood.classList.remove('display-none');
    }
}

//Окно лучшего результата
const showBestResult = () => {
    if (previousResults.length > 1) {
        const maxValue = Math.max(...previousResults);
        resultBest.classList.remove('display-none');
        resultPersentBest.textContent = `${maxValue / questions.length * 100}%`;
    }
}

//Окно результатов
const showResults = () => {
    previousResults.push(score);
    mainHeader.classList.add('display-none');
    resultPoint.textContent = `${score}/${questions.length}`;
    resultPersent.textContent = `${score / questions.length * 100}%`;
    resultText.textContent = `Результаты ${previousResults.length}-й попытки`;
    checkResults();
    showBestResult();
}

//Проверка последний ли вопрос
const nextQuestion = () => {
    if (currentQuestionIndex !== questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        questionSection.classList.add('display-none');
        resultSection.classList.remove('display-none');
        showResults();
    }
}

//Проверка верен ли ответ
const checkAnswer = () => {
    const answers = document.querySelectorAll('.question__item_active');
    if (answers.length == 0) {
        return
    }
    const userAnswersId = Array.from(answers).map(item => item.id);
    if (userAnswersId.toString() === questions[currentQuestionIndex].correct.toString()) {
        score++;
    }
    cleanContainer();
    nextQuestion();
}

//Показывает новый вопрос
const showQuestion = () => {
    mainSection.classList.add('display-none');
    mainLine.classList.add('display-none');
    resultBest.classList.add('display-none');
    questionSection.classList.remove('display-none');
    question.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((item, id) => {
        const answerElement = getTemplate();
        answerElement.textContent = item;
        answerElement.id = id + 1;
        answerContainer.append(answerElement);
        answerElement.addEventListener('click', chooseAnswer);
    });
}

//Заново запускает тест
const updateTest = () => {
    score = 0;
    currentQuestionIndex = 0;
    resultSection.classList.add('display-none');
    showQuestion();
}

startButton.addEventListener('click', showQuestion);
answerButton.addEventListener('click', checkAnswer);
resultButton.addEventListener('click', updateTest);