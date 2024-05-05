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
const result = document.getElementById("button-div")
const message = document.getElementById("message")

let score = 0
let wordTimer, timer
let wordInterval = 5000
let remainingTime = 30
let wordFound = false

// functions

// function to create new word
const createWord = () => {
  const word = document.createElement("div")
  word.classList.add("word", "falling")
  word.innerText = words[Math.floor(Math.random() * words.length)]
  wordDiv.appendChild(word)

  // Animation logic
  word.style.position = "absolute"
  word.style.top = "0"
  word.style.animation = "fall 5s ease-in-out"

  word.addEventListener("animationend", () => {
    word.remove()
    endGame()
  })
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

// function to end the game
const endGame = () => {
  clearInterval(wordTimer)
  clearInterval(timer)
  wordDiv.innerText = ""
  showPopup()
}

// function to check the word matches user input
const checkWord = () => {
  const enteredWord = userInput.value.toLowerCase()
  const wordElements = document.querySelectorAll(".word")

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

// function to decrease time
const decreaseTime = () => {
  remainingTime--
  timeValue.innerText = remainingTime
  if (remainingTime === 0) {
    endGame()
  }
}
// show results
function showPopup() {
  result.style.display = "block"
  message.innerText = `GAME OVER\nYour score is \n${score}`
}

// Event listeners

restartButton.addEventListener("click", () => {
  startGame()
  result.style.display = "none"
  remainingTime = 30
})

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWord()
  }
})

// start the game
startGame()
