const quizDB = [
    {
      question: 'What is 2 + 2?',
      a: "1",
      b: "4",
      c: "34",
      d: "40",
      ans: "ans2"
        
    },
    {
      question: 'Who is the best player?',
      a: "virat kohli",
      b: "kane williamson",
      c: "hardik pandya",
      d: "rohit sharma",
      ans: "ans1"
    },
    {
      question: 'Is web development fun?',
      a: "kinda",
      b: "yes",
      c: "no",
      d: "idk",
      ans: "ans2"
    },
    {
      question: 'What is 4 * 2?',
      a: "1",
      b: "4",
      c: "6",
      d: "8",
      ans: "ans4"
    }
  ];

  const question = document.querySelector('.question');
  const option1 = document.querySelector('#option1');
  const option2 = document.querySelector('#option2');
  const option3 = document.querySelector('#option3');
  const option4 = document.querySelector('#option4');
  const submit = document.querySelector('#submit');

  const answers = document.querySelectorAll('.answer');

  const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0;

const loadQuestion= () => {

    const questionList = quizDB[questionCount];
    question.innerText = questionList.question;
    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;


}

  loadQuestion();

  const getCheckAnswer = () => {
      let answer;

      answers.forEach((curAnsElem) => {
          if(curAnsElem.checked){
              answer=curAnsElem.id;
          }
          
      });
      return answer;
  };

  const deselectAll = () => {
      answers.forEach((curAnsElem) => curAnsElem.checked = false) ;
  }

  submit.addEventListener('click', () => {
      const checkedAnswer = getCheckAnswer();
      console.log(checkedAnswer);

      if(checkedAnswer === quizDB[questionCount].ans){
          score++;
      };

      questionCount++;
     
      deselectAll();
     
      if(questionCount < quizDB.length){
          loadQuestion();
      }else{
        showScore.innerHTML = `
          <h3> You scored ${score}/${quizDB.length} </h3>
          <button class = ""btn onclick="location.reload()"> Play Again </button>
        
        `;
        showScore.classList.remove('scoreArea');
      }
  });

