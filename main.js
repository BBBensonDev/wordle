let currentWord = words[Math.floor(Math.random() * words.length)];
let availableWords = [...words];

console.log(currentWord);

function updateDisplayedWord() {
  document.getElementById("l1").querySelector("span").textContent = currentWord[0];
  document.getElementById("l2").querySelector("span").textContent = currentWord[1];
  document.getElementById("l3").querySelector("span").textContent = currentWord[2];
  document.getElementById("l4").querySelector("span").textContent = currentWord[3];
  document.getElementById("l5").querySelector("span").textContent = currentWord[4];
}

updateDisplayedWord();

document.getElementById("word").addEventListener("submit", function(event) {
  event.preventDefault();
  const feedback = [];
  for (let i = 1; i <= 5; i++) {
    const radios = document.getElementsByName(`r${i}`);
    for (const radio of radios) {
      if (radio.checked) {
        feedback.push(radio.value);
        break;
      }
    }
  }

  let requiredLetters = []
  let invalidLetters = []
  availableWords = availableWords.filter(word => {
    for (let i = 0; i < 5; i++) {
      const letter = currentWord[i];
      const result = feedback[i];

      if (result === "right") {
        if (word[i] !== letter) {
          return false;
        }
      } else if (result === "wrong") {
        if (word[i] === letter || !word.includes(letter)) {
          requiredLetters.push(letter)
          return false;
        }
      } else if (result === "none") {
        if (word.includes(letter)) {
          invalidLetters.push(letter)
          return false;
        }
      }
    }
    for (let i = 0; i < requiredLetters.length; i++){
      if (!word.split("").includes(requiredLetters[i])){
        return false;
      }
    }
    for (let i = 0; i < invalidLetters.length; i++){
      if (word.split("").includes(invalidLetters[i])){
        return false;
      }
    }
    return true;
  });

  if (availableWords.length > 0) {
    currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    updateDisplayedWord();
    console.log("New guess:", currentWord);
    console.log("Remaining words:", availableWords.length);
  } else {
    console.log("No words left that match the criteria. You might have made a mistake or the word isn't in the list.");
  }

  for (let i = 1; i <= 5; i++) {
    const radios = document.getElementsByName(`r${i}`);
    for (const radio of radios) {
      radio.checked = false;
    }
  }
});

document.getElementById("reset").addEventListener("click", () => {
  window.location.reload()
})