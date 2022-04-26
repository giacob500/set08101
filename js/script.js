//selecting all required elements
const startButton = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitButton = infoBox.querySelector(".buttons .quit");
const continueButton = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultsBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeLine = quizBox.querySelector("header .time_line");
const timeText = quizBox.querySelector(".timer .time_left_txt");
const timeCount = quizBox.querySelector(".timer .timer_sec");

// If startQuiz button is clicked
startButton.onclick = ()=>{
    infoBox.classList.add("activeInfo"); // Show info box
}
// If exitQuiz button is clicked
exitButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); // Hide info box
}

// If continueQuiz button is clicked
continueButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); // Hide info box
    quizBox.classList.add("activeQuiz"); // Show quiz box
    showQuestions(0); // Calling showQestions function
    queCounter(1) // Passing 1 parameter to queCounter
    startTimer(25); // Calling startTimer function
    startTimerLine(0); // Calling startTimerLine function
}

let timeValue = 25;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = resultsBox.querySelector(".buttons .restart");
const quit_quiz = resultsBox.querySelector(".buttons .quit");

// If restartQuiz button is clicked
restart_quiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); // Show quiz box
    resultsBox.classList.remove("activeResult"); // Hide result box
    timeValue = 25;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); // Calling showQestions function
    queCounter(que_numb); // Passing que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // clear counterLine
    startTimer(timeValue); // Calling startTimer function
    startTimerLine(widthValue); // Calling startTimerLine function
    timeText.textContent = "Time left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
}

// If quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); // Reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If next question button is clicked
next_btn.onclick = ()=>{
    next_btn.classList.remove("show"); // Hide the next button
    if(que_count < questions.length - 1){ // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuestions(que_count); // Calling showQestions function
        queCounter(que_numb); // Passing que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Calling startTimer function
        startTimerLine(widthValue); // Calling startTimerLine function
        timeText.textContent = "Time left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button       
    } else {
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResultBox(); // Calling showResultBox function
    }
}

// Getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    // Creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // Adding new span tag inside que_tag
    optionList.innerHTML = option_tag; // Adding new div tag inside option_tag

    const option = optionList.querySelectorAll(".option");

    // Set onclick attriute to all available options
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");        
    }
}

// Creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check-circle"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// If user clicked on option
function optionSelected(answer){
    clearInterval(counter); //Clear counter
    clearInterval(counterLine); // Clear counterLine
    let userAns = answer.textContent; //Getting user selected option
    let correctAns = questions[que_count].answer; // Getting correct answer from array
    const allOptions = optionList.children.length; // Getting all option items
    
    if (userAns == correctAns){ // If user selected option is equal to array's correct answer
        userScore++; // Upgrading score value with 1
        answer.classList.add("correct"); // Adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Given correct answers = " + userScore);        
    } else {
        answer.classList.add("incorrect"); // Adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Adding cross icon to correct selected option
        console.log("Answer is Wrong");

        // If the answer is wrong automatically show correct answer
        for (i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns){ // If there is an option which is matched to an array answer
                optionList.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adding tick icon to matched option
                console.log("Automatically select correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled"); // Once user select an option then disabled all options
    }
    next_btn.classList.add("show"); // Show the next button if user selected any option
}

function showResultBox(){
    infoBox.classList.remove("activeInfo"); // Hide the info box
    quizBox.classList.remove("activeQuiz"); // Hide the quiz box
    resultsBox.classList.add("activeResult"); // Show the result box
    const scoreText = resultsBox.querySelector(".score_text");
    if(userScore > 20){// If user scored more than 20
        // Creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congrats! 😎, score: <p>'+ userScore +'</p> / <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 5){ // If user scored more than 5
        let scoreTag = '<span>Nice 😉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // If user scored less than 5
        let scoreTag = '<span>Oops 😳, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // Changing the value of timeCount with time value
        time--; // Decrement the time value
        if (time < 9) { // If timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a 0 before time value
        }
        if(time < 0){ // If timer is less than 0
            clearInterval(counter); // Clear counter
            timeText.textContent = "Time Off"; // Change the time text to time off
            const allOptions = optionList.children.length; // Getting all option items
            let correctAns = questions[que_count].answer; // Getting correct answer from array
            
            for (i = 0; i < allOptions; i++) {  
                if(optionList.children[i].textContent == correctAns){ // If there is an option which is matched to an array answer
                    optionList.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }       
            }
            for (i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled"); // Once user select an option then disabled all options
            }
            next_btn.classList.add("show"); // Show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 49);
    function timer(){
        time ++; // Upgrading time value by 1
        timeLine.style.width = time + "px"; // Increasing width of time_line with px by time value
        if(time > 549){ // If time value is greater than 549
            clearInterval(counterLine); // Clear counterLine
        }
    }
}

function queCounter(index){
    // Creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // Adding new span tag inside bottom_ques_counter
}