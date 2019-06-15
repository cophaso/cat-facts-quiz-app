//set counts to 0
let questionNumber = 0;
let score = 0;

function startQuiz() {
  $('.startPage').on('click', '.startButton', function (event) {
    $('.startPage').remove();
    $('.quizForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
}

$(createQuiz);