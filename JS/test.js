const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
let characters = []

const createParagraph = async () => {
  const response = await axios.get("http://metaphorpsum.com/paragraphs/1/5")
  const apiPara = response.data

  paragraphDiv.innerText = apiPara

  characters = apiPara.split("")
}

createParagraph()

userInput.addEventListener("input", () => {
  inputChars = userInput.value
  let charArray = []
  charArray = inputChars.split("")

  characters.forEach((char, index) => {
    const element = document.querySelector(
      `#paragraph span:nth-child(${index + 1})`
    )
    if (char.innerText === charArray[index]) {
      console.log("correct")
      element.classList.add("correct")
    }
  })
})
