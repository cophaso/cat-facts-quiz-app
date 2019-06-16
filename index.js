//set counts to 0
let questionNumber = 0;
let score = 0;

//removes the start page and increments question number
function startQuiz() {
  $('form').submit(function (event) {
    event.preventDefault();
    renderQuestion();
    incrementQuestionNum();
  });
}

function generateQuiz() {
  if (questionNumber < STORE.length) {
    return `
    <form>
    <div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <fieldset>
    <label class="answer choice-${STORE[questionNumber].answers[0]}">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answer choice-${STORE[questionNumber].answers[1]}">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answer choice-${STORE[questionNumber].answers[2]}">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answer choice-${STORE[questionNumber].answers[3]}">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </div>
    </form>`;
} else {
    renderScorePage();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

function renderQuestion() {
  $('.quizForm').html(generateQuiz());
}

function incrementQuestionNum() {
  questionNumber ++;
  $('.questionNumber').text(questionNumber);
}

function incrementScore() {
  score ++;
  $('.currentScore').text(score);
}

//user selects answer on submit run user feedback
function selectAnswer() {
  $('.quizForm').on('click','.submitButton', function (event) {
    event.preventDefault();
    $('.quizForm').html(generateFeedback());
  });
}

function generateFeedback(){
    let answer = $('input:checked').val();
    let correctAnswer = `${STORE[questionNumber-1].correct}`;
    if (answer === correctAnswer) {
      incrementScore();
      return `<form>
              <div class="feedback-page">
              <h2>Purr-fect! ${STORE[questionNumber-1].correct} is correct!</h2>
              <img class="feedbackImage" src="images/success_cat.jpg" alt="Happy cat with eyes closed laying on a blanket">
              <button type="submit" class="nextButton">Fur-ward</button>
              </div>
              </form>`;
    } 
    else {
      return `<form>
              <section class="feedback-page">
              <h2>You have cat to be kitten me right meow! The correct answer was ${STORE[questionNumber-1].correct} </h2>
              <img class="feedbackImage" src="images/wrong_cat_1.jpg" alt="Hissing black cat">
              <button type="submit" class="nextButton">Fur-ward</button>
              </section>
              </form>`
    }
}

function updateScore() {
  changeScore();
  $('.score').text(score);
}

function renderNextQuestion() {
  $('.quizForm').on('click', '.nextButton', function(event){
    event.preventDefault();
    if (questionNumber >= 10){
      renderScorePage();
    }
    else {
      renderQuestion();
      incrementQuestionNum();
    }
});
}

function renderScorePage(){
  $('quizForm').html(`<section class="final-page">
  <h2>Final Score: $('.currentScore').text(score) out of 10</h2>
  <p>It’s meow or never!</p>
  <button class="restartButton">Play Again?</button>
</section>`)
}

function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}


//run quiz functions
function createQuiz() {
  startQuiz();
  selectAnswer();
  renderNextQuestion();
}

$(createQuiz);