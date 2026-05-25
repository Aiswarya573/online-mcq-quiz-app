let currentQuestions = [];

async function loadQuiz() {
    const topic = document.getElementById("topic").value;

    const response = await fetch(`https://online-mcq-quiz-app.onrender.com/quiz/python?utm_source=chatgpt.com${topic}`);
    currentQuestions = await response.json();

    const container = document.getElementById("quiz-container");
    const result = document.getElementById("result");

    container.innerHTML = "";
    result.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        let questionHTML = `
            <div class="question-box">
                <h3>${index + 1}. ${q.question}</h3>
        `;

        q.options.forEach(option => {
            questionHTML += `
                <label class="option">
                    <input type="radio" name="q${index}" value="${option}">
                    ${option}
                </label>
            `;
        });

        questionHTML += `</div>`;
        container.innerHTML += questionHTML;
    });

    container.innerHTML += `
        <button onclick="submitQuiz()">Submit Quiz</button>
    `;
}

function submitQuiz() {
    let score = 0;

    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("result").innerHTML =
        `Your Score: ${score} / ${currentQuestions.length}`;
}