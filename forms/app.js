let textAreaElement = document.querySelector("textarea");
let charCountElement = document.getElementById("charcount");

function countNumofChar(event) {
  charCountElement.innerText = event.target.textLength;
}

textAreaElement.addEventListener("input", countNumofChar);
