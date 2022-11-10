const container = document.querySelector(".container");
let points = 0;
let currentLevel = 1;
let currentQuestion = 0;

async function main(currentLevel, currentQuestion) {
    let data = await fetch("/quiz/questionsLvl" + currentLevel + ".json");
    let questions = await data.json();

    createPage(questions[currentQuestion])
}

function createPage(question) {
    let answers = "";
    question.answers.forEach(({answer, correct}) => 
        (answers += `<button class="answerButton" type="button" id="userReponse" onClick="verifyAnswer(${correct})">${answer}</button>`)
    );
    let output = `
            <h2>Points : ${points}</h2>
            <img class="questionImg" src=${question.img} />
            <p>${question.question}</p>
            ${answers}
            `
    container.innerHTML = output;
}

function verifyAnswer(isCorrect) {
    if (isCorrect) {
        points++;
    }

    if (currentQuestion == 0) {
        currentQuestion++;
    } else if (currentLevel < 3) {
        currentLevel++;
        currentQuestion = 0;
    } else {
        container.innerHTML = `
            <h1>Well Played !</h1>
            <h2>Points : ${points}</h2>
            <button class="levelButton" type="button" id="lvl1Button"><a href="/index.html">RESTART</a></button>
            `;
        return;
    }
    main(currentLevel, currentQuestion)
}

