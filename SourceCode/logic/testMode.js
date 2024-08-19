document.addEventListener("DOMContentLoaded", function () {
  loadTestList();
});

async function fetchFileContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.text();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

async function loadTestList() {
  let lists = [];
  const testListContent = await fetchFileContent("../data/testList.txt");
  if (!testListContent) {
    console.error("Failed to read test list");
    return;
  }
  lists = testListContent.split("\n").filter((line) => line.trim() !== "");

  let content = "";
  lists.forEach((test) => {
    const testName = test.trim().split("_")[1]; // Get the test name
    content += `<li><a href="#" data-test="${test.trim()}">${testName}</a></li>`;
  });
  document.getElementById("test-tabs").innerHTML = content;

  document
    .getElementById("test-tabs")
    .addEventListener("click", function (event) {
      if (event.target && event.target.nodeName === "A") {
        event.preventDefault();
        loadTest(event.target.getAttribute("data-test"));
      }
    });
}

async function loadTest(testName) {
  const filename = `../data/${testName}.txt`; // File name: X_S.txt
  const fileContent = await fetchFileContent(filename);
  if (!fileContent) {
    console.error("Failed to open file:", filename);
    return;
  }
  const title = testName.trim().split("_")[1]; // Get the test name
  let data = [];
  const lines = fileContent.split("\n");
  for (let j = 0; j < lines.length; j++) {
    data.push({ value: lines[j] });
  }

  const testType = testName.split("_")[0]; // Get the type of test (X)
  if (testType === "Number") {
    const fileEval = `../data/${testName}_evaluation.txt`;
    const evaluations = await readEvaluationFile(fileEval);
    if (evaluations) {
      printNumberTest(data, title, evaluations);
    }
  } else if (testType === "YesNo") {
    const choice = await askForChoice(); // Prompt for coin or card choice
    if (choice === "coin") {
      window.open("coin.html", "_blank");
    } else if (choice === "card") {
      window.open("card.html", "_blank");
    } else {
      // If no choice made, return
      return;
    }
    const fileEval = `../data/${testName}_evaluation.txt`;
    const evaluations = await readEvaluationFile(fileEval);
    if (evaluations) {
      printYesNoTest(data, title, evaluations);
    }
  }
}

async function askForChoice() {
  return new Promise((resolve, reject) => {
    const testContent = document.getElementById("test-content");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="tab-content">
        <p>Choose coin or card:</p>
        <button id="coin-btn">Coin</button>
        <button id="card-btn">Card</button>
      </div>
    `;
    testContent.appendChild(modal);

    const coinBtn = document.getElementById("coin-btn");
    const cardBtn = document.getElementById("card-btn");

    coinBtn.addEventListener("click", () => {
      testContent.removeChild(modal);
      resolve("coin");
    });

    cardBtn.addEventListener("click", () => {
      testContent.removeChild(modal);
      resolve("card");
    });
  });
}

async function readEvaluationFile(filename) {
  try {
    const fileContent = await fetchFileContent(filename);
    if (!fileContent) {
      console.error("Failed to open file:", filename);
      return;
    }
    const lines = fileContent.trim().split("\n");
    const numCriteria = parseInt(lines[0]);
    const evaluation = [];
    for (let i = 1; i < lines.length; i++) {
      const evalName = lines[i];
      const [scoreStart, scoreEnd] = lines[i + 1].split("–").map(Number);
      i = i + 1;
      evaluation.push({
        start: scoreStart,
        end: scoreEnd,
        eval: evalName,
      });
    }
    return evaluation;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}
