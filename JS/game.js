// Variables
const horizontal = ["20%", "40%", "60%", "80%"]

const wordDiv = document.getElementById("word-div")
const userInput = document.getElementById("user-input")
const buttonDiv = document.getElementById("button-div")
const timeValue = document.getElementById("time-value")
const scoreValue = document.getElementById("score-value")
const restartButton = document.getElementById("restart-button")
const result = document.getElementById("button-div")
const message = document.getElementById("message")
const theme = document.getElementById("theme")

let score = 0
let wordTimer, timer
let wordInterval = 4000
let time = 0
let wordFound = false

// functions

// function to create new word
const createWord = async () => {
  const response = await axios.get(
    "https://random-word-api.herokuapp.com/word?length=5"
  )
  const apiWord = response.data

  const word = document.createElement("div")
  word.classList.add("word", "falling")
  word.innerText = apiWord[Math.floor(Math.random() * apiWord.length)]
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
  score = 0
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
  }
  if (time === 20) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 3000)
  }
  if (time === 30) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 2500)
  }
  if (time === 40) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 2000)
  }
  if (time === 50) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 1500)
  }
  if (time === 60) {
    clearInterval(wordTimer)
    wordTimer = setInterval(createWord, 1000)
  }
}

// Event listeners

restartButton.addEventListener("click", () => {
  startGame()
  result.style.display = "none"
  time = 0
})

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWord()
  }
})

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
  message.classList.toggle("dark-theme")
  buttonDiv.classList.toggle("dark-theme")
  userInput.classList.toggle("dark-theme")
  restartButton.classList.toggle("dark-theme")
})

// start the game
startGame()
