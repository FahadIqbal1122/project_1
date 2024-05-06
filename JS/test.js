const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
const theme = document.getElementById("theme")
let apiPara = ""

const createParagraph = async () => {
  let response = await axios.get("http://metaphorpsum.com/paragraphs/1/5")
  apiPara = response.data

  paragraphDiv.innerHTML = ""

  let chars = apiPara.split("")
  chars.forEach((char, index) => {
    const span = document.createElement("span")
    span.textContent = char
    span.classList.add("character")
    paragraphDiv.appendChild(span)
  })
}

userInput.addEventListener("input", () => {
  const paraChars = paragraphDiv.querySelectorAll(".character")
  const inputChars = userInput.value.split("")
  let correct = true
  let typedCount = 0

  paraChars.forEach((charSpan, index) => {
    const char = inputChars[index]

    if (char) {
      if (char === charSpan.textContent) {
        charSpan.classList.add("correct")
        charSpan.classList.remove("wrong")
        typedCount++
      } else {
        charSpan.classList.remove("correct")
        charSpan.classList.add("wrong")
        correct = false
      }
    }
  })

  if (typedCount === paraChars.length && correct) {
    getNewParagraph()
  }
})

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
})

createParagraph()

function getNewParagraph() {
  createParagraph()
  userInput.value = ""
}
