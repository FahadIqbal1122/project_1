// Variables
const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "iceberg",
  "jackfruit",
]

const wordDiv = document.getElementById("word-div")
const userInput = document.getElementById("user-input")
const buttonDiv = document.getElementById("button-div")
const timeValue = document.getElementById("time-value")
const scoreValue = document.getElementById("score-value")
const restartButton = document.getElementById("restart-button")

let score = 0
let wordTimer, timer
let wordInterval = 5000
let remainingTime = 60

// functions

// function to create new word
const createWord = () => {
  const word = document.createElement("div")
  word.classList.add("word")
  word.innerText = words[Math.floor(Math.random() * words.length)]
  wordDiv.appendChild(word)
}

// function to start the game
const startGame = () => {
  timeValue.innerText = remainingTime
  scoreValue.innerText = score
  userInput.value = ""
  wordDiv.innerHTML = ""

  wordTimer = setInterval(function () {
    createWord()
  }, wordInterval)

  timer = setInterval(decreaseTime, 1000)
}

// function to check the word matches user input
const checkWord = () => {
  const enteredWord = userInput.value.toLowerCase()
  const wordElements = document.querySelectorAll(".word")

  let wordFound = false
  let wordElement

  for (let i = 0; i < wordElements.length; i++) {
    wordElement = wordElements[i]

    if (wordElement.innerText.toLowerCase() === enteredWord) {
      wordFound = true
      wordElement.remove()
      score++
      scoreValue.innerText = score

      break
    }
  }
  if (wordFound) {
    userInput.value = ""
  }
}

// function to end the game
const endGame = () => {
  clearInterval(wordTimer)
  clearInterval(timer)
  wordDiv.innerText = ""
}

// function to decrease time
const decreaseTime = () => {
  remainingTime--
  timeValue.innerText = remainingTime
  if (remainingTime === 0) {
    endGame()
  }
}

// Event listeners

restartButton.addEventListener("click", () => {
  startGame()
})

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWord()
  }
})

// start the game
startGame()
