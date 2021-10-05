const questions = [
    {
        question: "How many gold meadls has India won in olympics?",
        optionA: "15",
        optionB: "12",
        optionC: "10",
        optionD: "17",
        correctOption: "optionC"
    },

    {
        question: "How far did Neeraj Chopra Javelin travel at the Tokyo Olympics 2021 Finals",
        optionA: "86.77m",
        optionB: "91.04m",
        optionC: "89.27m",
        optionD: "87.58m",
        correctOption: "optionD"
    },

    {
        question: "When was the opening ceremony of the Tokyo Olympics 2021 held?",
        optionA: "23, July, 2021",
        optionB: "20, July, 2021",
        optionC: "27, July, 2021",
        optionD: "25, July, 2021",
        correctOption: "optionA"
    },

    {
        question: "When was the closing ceremony of the Tokyo Olympics 2021 held?",
        optionA: "8, August, 2021",
        optionB: "6, August, 2021",
        optionC: "9, August, 2021",
        optionD: "7, August, 2021",
        correctOption: "optionA"
    },

    {
        question: "How many sports were held in the Tokyo Olympics 2021?",
        optionA: "37",
        optionB: "35",
        optionC: "45",
        optionD: "33",
        correctOption: "optionD"
    },

    {
        question: "Which country won the Tokyo Olympics 2021",
        optionA: "Australlia",
        optionB: "China",
        optionC: "Japan",
        optionD: "USA",
        correctOption: "optionD"
    },

    {
        question: "Which country came at last in the Tokyo Olympics 2021",
        optionA: "Austria",
        optionB: "Syria",
        optionC: "Moldova",
        optionD: "Iceland",
        correctOption: "optionB"
    },

    {
        question: "How many gold medals did USA win overall in the olympics?",
        optionA: "1041",
        optionB: "10057",
        optionC: "1061",
        optionD: "1011",
        correctOption: "optionC"
    },

    {
        question: "Which medal did PV Sindhu get in Tokyo olympics",
        optionA: "Gold",
        optionB: "Sliver",
        optionC: "Bronze",
        optionD: "None",
        correctOption: "optionC"
    },

    {
        question: "Which weight category did Mirabai Chanu participate in?",
        optionA: "59kg",
        optionB: "49kg",
        optionC: "69kg",
        optionD: "Mirabai Chanu did not participate",
        correctOption: "optionB"
    },

    {
        question: "Who did Neeraj Chopra play against in Tokyo Olympics 2021?",
        optionA: "Johannes Vetter",
        optionB: "Keshorn Walcott",
        optionC: "Anderson Peters",
        optionD: "Julius Yego",
        correctOption: "optionA"
    },

    {
        question: "How much weight did Mirabai Chanu lift (in total)",
        optionA: "204",
        optionB: "197",
        optionC: "196",
        optionD: "173",
        correctOption: "optionC"
    },


    {
        question: "Who was the first ever Indian fencer to qualify for The Tokyo Olympics 2021?",
        optionA: "Shilpa Garg",
        optionB: "Pooja Mishra",
        optionC: "Bhavani Devi",
        optionD: "India did not qualify",
        correctOption: "optionC"
    },
]


let shuffledQuestions = []

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index) {
    document.getElementById("score-modal").style.display = "none";
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {

            correctOption = option.labels[0].id
        }
    })


    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++

            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()

    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    document.getElementById("score-modal").style.display = "block";
    let remark = null
    let remarkColor = null


    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}