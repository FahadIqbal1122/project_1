// variables
const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
const theme = document.getElementById("theme")
let timeValue = document.getElementById("time-value")
let wpmValue = document.getElementById("wpm-value")
const restartButton = document.getElementById("restart-button")
const result = document.getElementById("button-div")
const mistakeValue = document.getElementById("mistakes-value")
const startButton = document.getElementById("start-button")

let time = 0
let wpm = 0
let mistakes = 0
let apiPara = ""

const startTest = () => {
  timeValue.innerText = ""
  wpmValue.innerText = ""
  mistakeValue.innerText = ""

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

    console.log("Going over paraChars", paraChars)
    paraChars.forEach((charSpan, index) => {
      const char = inputChars[index]
      console.log("charSpan", charSpan)

      if (char && char === charSpan.innerText) {
        charSpan.classList.add("correct")
        charSpan.classList.remove("wrong")
        typedCount++
      } else if (char && char !== charSpan.innerText) {
        charSpan.classList.remove("correct")
        charSpan.classList.add("wrong")
        correct = false
        mistakes++
      } else {
        charSpan.classList.remove("correct")
        charSpan.classList.remove("wrong")
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
  // remainig time function
  const remainingTime = () => {
    time++
    timeValue.innerText = time
    if (time === 60) {
      clearInterval(testTime)
      wpmValue.innerText = wpm
      mistakeValue.innerText = mistakes
      endGame()
    }
  }
  let testTime = setInterval(remainingTime, 1000)
}

// function to end the test
const endGame = () => {
  showPopup()
  userInput.value = ""
  time = 0
  wpm = 0
  mistakes = 0
}

// show results
const showPopup = () => {
  result.style.display = "block"
  message.innerText = `Test Complete\nYour CPM is \n${wpm}\nYour Mistakes:\n${mistakes}`
}

// theme
theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
  restartButton.classList.toggle("dark-theme")
  userInput.classList.toggle("dark-theme")
  result.classList.toggle("dark-theme")
  startButton.classList.toggle("dark-theme")
})

// button to restart test
restartButton.addEventListener("click", () => {
  result.style.display = "none"
  userInput.focus()
  startTest()
})

// button to start the test
startButton.addEventListener("click", () => {
  startTest()
  userInput.focus()
  startButton.disabled = "true"
  startButton.style.display = "none"
})
