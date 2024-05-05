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
const horizontal = ["20%", "40%", "60%", "80%"]

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
let wordInterval = 4000
let time = 0
let wordFound = false

// functions

// function to create new word
const createWord = () => {
  const word = document.createElement("div")
  word.classList.add("word", "falling")
  word.innerText = words[Math.floor(Math.random() * words.length)]
  word.style.fontSize = "20px"
  word.style.fontWeight = "bolder"

  // Animation logic
  let leftPosition = horizontal[Math.floor(Math.random() * horizontal.length)]
  word.style.left = leftPosition
  word.style.position = "absolute"
  word.style.top = "0"

  wordDiv.appendChild(word)
  word.addEventListener("animationend", () => {
    word.remove()
    endGame()
  })
}

// function to start the game
const startGame = () => {
  timeValue.innerText = time
  scoreValue.innerText = score
  userInput.value = ""
  wordDiv.innerHTML = ""

  wordTimer = setInterval(function () {
    createWord()
  }, wordInterval)

  timer = setInterval(increaseTime, 1000)
}

// function to end the game
const endGame = () => {
  clearInterval(wordTimer)
  clearInterval(timer)
  wordDiv.innerText = ""
  wordInterval = 5000
  showPopup()
  time = 0
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
const increaseTime = () => {
  time++
  timeValue.innerText = time
  levelUp()
}

// show results
const showPopup = () => {
  result.style.display = "block"
  message.innerText = `GAME OVER\nYour score is \n${score}`
}

const levelUp = () => {
  if (time === 10) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 3500)
    console.log(wordInterval)
  }
  if (time === 20) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 3000)
    console.log(wordInterval)
  }
  if (time === 30) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 2500)
    console.log(wordInterval)
  }
  if (time === 40) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 2000)
    console.log(wordInterval)
  }
  if (time === 50) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 1500)
    console.log(wordInterval)
  }
  if (time === 60) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 1000)
    console.log(wordInterval)
  }
}

// Event listeners

restartButton.addEventListener("click", () => {
  startGame()
  result.style.display = "none"
  time = 0
})

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWord()
  }
})

// start the game
startGame()
