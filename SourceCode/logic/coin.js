document.getElementById("startButton").addEventListener("click", function () {
  startCoinFlip();
});

document.getElementById("retryButton").addEventListener("click", function () {
  resetCoinFlip();
});

function startCoinFlip() {
  const audio = new Audio("../images/coin-clatter.mp3");
  audio.play();

  const coin = document.getElementById("coin");
  const result = document.getElementById("result");
  const message = document.getElementById("message");
  const startButton = document.getElementById("startButton");
  const retryButton = document.getElementById("retryButton");

  // Ẩn GIF và nút bắt đầu
  startButton.style.display = "none";
  retryButton.style.display = "none";
  result.style.display = "none";
  message.textContent = "";

  // Tạo độ trễ trước khi hiển thị kết quả
  setTimeout(function () {
    // Random chọn head hoặc tail
    const isHeads = Math.random() < 0.5;

    // Cập nhật hình ảnh và thông báo
    if (isHeads) {
      result.src = "../images/heads.png";
      message.textContent = "Head";
    } else {
      result.src = "../images/tails.png";
      message.textContent = "Tail";
    }

    coin.style.display = "none";
    audio.pause();
    // Hiển thị kết quả
    result.style.display = "block";
    retryButton.style.display = "block";
  }, 2500); // Thời gian trễ 1 giây để tạo cảm giác quay đồng xu
}

function resetCoinFlip() {
  const coin = document.getElementById("coin");
  const result = document.getElementById("result");
  const message = document.getElementById("message");
  const startButton = document.getElementById("startButton");
  const retryButton = document.getElementById("retryButton");

  // Hiển thị lại coin.gif và nút bắt đầu
  coin.style.display = "block";
  startButton.style.display = "block";

  // Reset lại trạng thái ban đầu
  result.style.display = "none";
  message.textContent = "";
  retryButton.style.display = "none";
}
// Căn giữa nút Retry
document.getElementById("retryButton").style.margin = "0 auto";
