const images = ["../images/1.png", "../images/2.png", "../images/3.png"];
const upImages = [
  "../images/up1.png",
  "../images/up2.png",
  "../images/up3.png",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomResultIndex() {
  return Math.floor(Math.random() * 3); // Trả về một số ngẫu nhiên từ 0 đến 2
}

function displayImages() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  shuffle(images);
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.setAttribute("data-index", index);
    img.addEventListener("click", selectImage);
    imageContainer.appendChild(img);
  });
}

function selectImage(event) {
  const selectedIndex = event.target.getAttribute("data-index");
  const result = document.getElementById("result");
  const resultIndex = randomResultIndex();
  const upImg = document.createElement("img");
  upImg.src = upImages[resultIndex];
  upImg.style.margin = "0 auto";
  result.innerHTML = "";
  result.appendChild(upImg);
  document.getElementById("restartBtn").style.display = "block";
  document.querySelectorAll(".images img").forEach((img) => {
    img.style.display = "none";
  });
}

function restart() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("restartBtn").style.display = "none";
  document.querySelectorAll(".images img").forEach((img) => {
    img.style.display = "inline-block";
  });
  displayImages();
}

displayImages();
document.getElementById("restartBtn").addEventListener("click", restart);
