const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
const theme = document.getElementById("theme")
let characters = []
let apiPara = ""

const createParagraph = async () => {
  let response = await axios.get("http://metaphorpsum.com/paragraphs/1/5")
  apiPara = response.data
  paragraphDiv.innerText = apiPara
  let arr = apiPara.split("").map((value) => {
    return `<span class='characters'${value}<span>`
  })
  arr.forEach((element) => {
    paragraphDiv.innerHTML += element + " "
  })
}

userInput.addEventListener("input", () => {
  let characters = document.querySelectorAll(".characters")
  characters = Array.from(characters)

  let userInputCharacters = userInput.value.split("")

  characters.forEach((char, index) => {
    if (char.innerText == userInputCharacters[index]) {
      console.log("correct")
      element.classList.add("correct")
    }
  })
})

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
})

createParagraph()
