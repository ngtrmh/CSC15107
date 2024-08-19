function printNumberTest(data, title, evaluations) {
  let content = ""; // Initialize content variable

  const titleTest = data[0].value;
  content += `<p><strong>${titleTest}</strong></p>`;

  const numQuestions = parseInt(data[1].value); // Read the number of questions

  let index = 2;
  for (let i = 0; i < numQuestions; i++) {
    const question = data[index++].value; // Read the question
    const numChoices = parseInt(data[index++].value); // Read the number of choices
    content += `<div class="question-block">`;
    content += `<p style="font-size: 16px"><strong>${question}</strong></p>`; // Display the question

    for (let j = 0; j < numChoices; j++) {
      const choice = data[index++].value; // Read each choice
      content += `<p style="font-size: 16px">${choice}</p>`; // Display the choice
    }
    content += `<input type="text" placeholder="Enter your score here" class="score-input" data-question="${question}"/><br/><br/>`; // Input for score
    content += `</div>`;
  }
  content += `<button id="submit-button">Submit</button>`; // Add submit button
  document.getElementById("test-content").innerHTML = content;

  document
    .getElementById("submit-button")
    .addEventListener("click", () => submitAnswers(evaluations));
}

function submitAnswers(evaluations) {
  const answerInputs = document.querySelectorAll(".score-input");
  const answers = [];

  answerInputs.forEach((input) => {
    const answer = parseFloat(input.value) || 0;
    answers.push({ answer });
  });

  addLaplaceNoise(answers);
  displayAnswers(answers, evaluations);
}

function displayAnswers(answers, evaluations) {
  let content = "<h2>Submitted Answers:</h2>";
  answers.forEach((ans) => {
    content += `${ans.answer.toFixed(2)}\t`;
  });

  const totalScore = resultNumberTest(answers);
  content += `<h2>Total Score: ${totalScore.toFixed(2)}</h2>`;

  if (evaluations) {
    const eval = getEvaluation(totalScore, evaluations);
    content += `<h2>Evaluation: ${eval}</h2>`;
  }

  document.getElementById("test-answers").innerHTML = content;
}

function getEvaluation(totalScore, evaluations) {
  for (const { start, end, eval } of evaluations) {
    if (totalScore >= start * 1.0 && totalScore <= end * 1.0) {
      return eval;
    }
  }
  return "Not Evaluated";
}

// Add Laplace noise to each answer
function addLaplaceNoise(data) {
  const b = 0.02;

  data.forEach((item) => {
    const noise = laplace(0, b);
    item.answer += noise;
  });
}

function laplace(mean, scale) {
  const u = Math.random() - 0.5;
  return mean - scale * (u > 0 ? 1 : -1) * Math.log(1 - 2 * Math.abs(u));
}

function resultNumberTest(data) {
  let sum = 0.0;
  data.forEach((item) => {
    sum += item.answer;
  });
  return sum;
}
