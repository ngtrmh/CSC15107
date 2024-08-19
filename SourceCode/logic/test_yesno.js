function printYesNoTest(data, title, evaluations) {
  let content = ""; // Initialize content variable
  const titleTest = data[0].value;
  content += `<p><strong>${titleTest}</strong></p>`;
  const numQuestions = parseInt(data[1].value); // Read the number of questions
  let index = 2;
  for (let i = 0; i < numQuestions; i++) {
    const question = data[index++].value; // Read the question
    content += `<div class="question-block">`;
    content += `<p><strong>${question}</strong></p>`; // Display the question
    content += `<p><input type="radio" name="question${i}" value="Yes"> Yes</p>`;
    content += `<p><input type="radio" name="question${i}" value="No"> No</p>`;
    content += `</div>`;
  }
  content += `<button id="submit-button">Submit</button>`; // Add submit button
  document.getElementById("test-content").innerHTML = content;

  document
    .getElementById("submit-button")
    .addEventListener("click", () => submitYesNoAnswers(evaluations));
}

function submitYesNoAnswers(evaluations, title) {
  const answers = [];
  const questionBlocks = document.querySelectorAll(".question-block");

  questionBlocks.forEach((block, index) => {
    const question = block.querySelector("p strong").innerText;
    const answer = block.querySelector(
      `input[name="question${index}"]:checked`
    );
    answers.push({ question, answer: answer ? answer.value : "No answer" });
  });

  displayYesNoAnswers(answers, evaluations);
}

function displayYesNoAnswers(answers, evaluations) {
  let yesCount = 0;
  let noCount = 0;

  let content = "<h2>Submitted Answers:</h2>";
  answers.forEach((ans, index) => {
    content += `<p><strong>Question ${index + 1}:</strong> ${ans.question}</p>`;
    content += `<p><strong>Answer:</strong> ${ans.answer}</p>`;
    if (ans.answer === "Yes") {
      yesCount++;
    } else if (ans.answer === "No") {
      noCount++;
    }
  });

  content += `<h3>Summary:</h3>`;
  content += `<p><strong>Yes:</strong> ${yesCount}</p>`;
  content += `<p><strong>No:</strong> ${noCount}</p>`;

  if (evaluations) {
    const eval = getYesnoEvaluation(yesCount, evaluations);
    content += `<h2>Evaluation: ${eval}</h2>`;
  }

  document.getElementById("test-answers").innerHTML = content;
}

function getYesnoEvaluation(totalYes, evaluations) {
  for (const { start, end, eval } of evaluations) {
    if (totalYes >= start && totalYes <= end) {
      return eval;
    }
  }
  return "Not Evaluated";
}
