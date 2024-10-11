let textAreaElement = document.querySelector("textarea");
let charCountElement = document.getElementById("charcount");
let charDisplayElement = document.getElementById("char-display");

function countNumofChar(event) {
  charCountElement.innerText = event.target.textLength;
  if (event.target.textLength > 180) {
    charCountElement.parentElement.classList.add("warning");
  } else {
    charCountElement.parentElement.classList.remove("warning");
  }
}

textAreaElement.addEventListener("input", countNumofChar);
