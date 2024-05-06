const Paragraphs = [
  "There were two things that were important to Tracey. The first was her dog. Anyone that had ever met Tracey knew how much she loved her dog. Most would say that she treated it as her child. The dog went everywhere with her and it had been her best friend for the past five years. The second thing that was important to Tracey, however, would be a lot more surprising to most people.",
  "There weren't supposed to be dragons flying in the sky. First and foremost, dragons didn't exist. They were mythical creatures from fantasy books like unicorns. This was something that Pete knew in his heart to be true so he was having a difficult time acknowledging that there were actually fire-breathing dragons flying in the sky above him.",
  "The headphones were on. They had been utilized on purpose. She could hear her mom yelling in the background, but couldn't make out exactly what the yelling was about. That was exactly why she had put them on. She knew her mom would enter her room at any minute, and she could pretend that she hadn't heard any of the previous yelling.",
]

const paragraphDiv = document.getElementById("paragraph")
let userInput = document.getElementById("text-input")
let characters = []
let randomParagraph = Paragraphs[Math.floor(Math.random() * Paragraphs.length)]

const createParagraph = () => {
  paragraphDiv.innerText = randomParagraph

  characters = randomParagraph.split("")
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
