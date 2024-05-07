// variables
const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
const theme = document.getElementById("theme")
let timeValue = document.getElementById("time-value")
let wpmValue = document.getElementById("wpm-value")
const restartButton = document.getElementById("restart-button")
const result = document.getElementById("button-div")

let time = 0
let wpm = 0
let apiPara = ""

const startTest = () => {
  // create paragraph function
  const createParagraph = async () => {
    let response = await axios.get("http://metaphorpsum.com/paragraphs/1/5")
    apiPara = response.data
    paragraphDiv.innerHTML = ""

    let chars = apiPara.split("")
    chars.forEach((char) => {
      const span = document.createElement("span")
      span.innerText = char
      span.classList.add("character")
      paragraphDiv.appendChild(span)
    })
  }

  // check paragraph and user input
  userInput.addEventListener("input", () => {
    const paraChars = paragraphDiv.querySelectorAll(".character")
    const inputChars = userInput.value.split("")
    let correct = true
    let typedCount = 0

    paraChars.forEach((charSpan, index) => {
      const char = inputChars[index]

      if (char) {
        if (char === charSpan.innerText) {
          charSpan.classList.add("correct")
          charSpan.classList.remove("wrong")
          typedCount++
        } else if (char !== charSpan.innerText) {
          charSpan.classList.remove("correct")
          charSpan.classList.add("wrong")
          correct = false
        } else if (char === null) {
          charSpan.classList.remove("correct")
          charSpan.classList.remove("wrong")
        }
      }
    })

    if (typedCount === paraChars.length && correct) {
      getNewParagraph()
    }
    splittedWords = userInput.value.split(" ")
    wpm = Math.floor(splittedWords.length / (time / 60))
  })

  createParagraph()

  // create new paragraph if old one is complete and correct
  function getNewParagraph() {
    createParagraph()
    userInput.value = ""
  }
}

// remainig time function
const remainingTime = () => {
  time++
  timeValue.innerText = time
  if (time === 60) {
    clearInterval(testTime)
    wpmValue.innerText = wpm
    endGame()
  }
}
let testTime = setInterval(remainingTime, 1000)

// function to end the test
const endGame = () => {
  showPopup()
  userInput.innerText = ""
  time = 0
  score = 0
}

// show results
const showPopup = () => {
  result.style.display = "block"
  message.innerText = `Test Complete\nYour WPM is \n${wpm}`
}

startTest()

// theme
theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
})
restartButton.addEventListener("click", () => {})
