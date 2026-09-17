/*
  To Do:
    -take care of when the last question is wrong, i.e. disable/enable buttons
    -running total of correct answers and total answers
    -some css signal that answer is correct or incorrect
    -clean up the code. i'm currently doing that
*/
let firstAns = "button2";
let data = [
  {
    question: "In what year was JavaScript invented?",
    button0: "1998",
    button1: "1996",
    button2: "1995",
    correct: "button2"
  },
  {
    question: "What JavaScript data type would someone's name be?",
    button0: "string",
    button1: "number",
    button2: "boolean",
    correct: "button0"
  },
  {
    question: "What JavaScript data type would someone's height be?",
    button0: "string",
    button1: "number",
    button2: "boolean",
    correct: "button1"
  },  
  {
    question: "Which data type allows you to store multiple values in it?",
    button0: "string",
    button1: "array",
    button2: "number",
    correct: "button1"
  }
]

let counter = 0;
let answer = "";
let storage = [];
let numCorrect = 0;
let numTotal = 0;
let x = ''

//answer is the id of the element
function submit(){

  console.log(answer)

  if(answer === ""){
    alert('make a selection')
  }

  //first question of quiz
  else if(counter === 0){
    if(firstAns === answer){
      console.log("correct!");
      right();
    }else{  //wrong answer on first question
      console.log("sorry, wrong answer...")
      wrong();
    }

    //end of quiz
    }else if(answer === data[counter].correct && counter === data.length-1){
      alert("quiz over")
      numCorrect++;
      $('#nextBtn').attr('disabled', true);
      $('#submitBtn').attr('disabled', true);
      $('#againBtn').attr('disabled', false);
      x = answer[answer.length-1]
      $('#border' + x).css('border', '5px solid green');
    }else if(answer !== data[counter].correct && counter === data.length-1){
      alert("quiz over")
      $('#nextBtn').attr('disabled', true);
      $('#submitBtn').attr('disabled', true);
      $('#againBtn').attr('disabled', false);
      x = answer[answer.length-1]
      $('#border' + x).css('border', '5px solid red');
    }
    
    else{  //all other questions besides the first and the last questions
    if(answer === data[counter].correct){
        console.log("correct!")
        right();
      }else{
        console.log("sorry, incorrect...")
        wrong();
      }
  }

  //executes no matter what
  numTotal++;
  counter++;
  $('#correct').html(numCorrect + "/" + numTotal) 
}

//when clicking the radio buttons
function register(value){
  $('#submitBtn').attr('disabled', false);
  answer = value.id;
}

function next(){
  console.log("x is " + x)
    $('#question').html(data[counter].question)
    $('#label0').html("<h2>"+data[counter].button0+"</h2>")
    $('#label1').html("<h2>"+data[counter].button1+"</h2>")
    $('#label2').html("<h2>"+data[counter].button2+"</h2>")
    $('#nextBtn').attr('disabled', true);
    $('#border' + x).css('border','');
    $('input').prop('checked', false);
}

function right(){
  $('#nextBtn').attr('disabled', false);
  $('#submitBtn').attr('disabled', true);
  x = answer[answer.length-1]
  $('#border' + x).css('border', '5px solid green');
  numCorrect++;
}

function wrong(){
  $('#nextBtn').attr('disabled', false);
  $('#submitBtn').attr('disabled', true);
  x = answer[answer.length-1]
  $('#border' + x).css('border', '5px solid red');
}

function playAgain(){
  location.reload()
}
