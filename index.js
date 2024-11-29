const  hangmanImages= document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const  gameModal =document.querySelector(".game-modal")
const  playAgainBtn =document.querySelector(".play-again")


let currentWord,correctLetter,wrongGuessCount

const maxGuesses = 6

const resetGame = ()=>{

  //Ressetting all game variable and UI elements
  correctLetter=[]
  wrongGuessCount=0
   hangmanImages.src = `pic/hangman-${wrongGuessCount}.svg`
     guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
     keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false)
     wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
    gameModal.classList.remove("show")
}
const getRandomWord = () => {
  //Selecting a random word and hint from the wordList

  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  // console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame()
  
};

const gameOver =(isVictory)=>{
  //After 600ms of game complete showing modal with relevant details
setTimeout(()=>{
  const modalText=isVictory?`You found the word`:`The correct word was:`
  gameModal.querySelector("img").src=`pic/${isVictory?'victory': 'lost'}.gif`
  gameModal.querySelector("h4").innerText=`${isVictory?'Congratulation': 'Game Over !!'}`
  gameModal.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`

  gameModal.classList.add("show")
},300)
}

const initGame = (button, clickedLetter) => {
  //Checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetter.push(letter)
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //If Clicked letter doesn't exists then update the WrongGuessCount and hangman Image
    wrongGuessCount++;
    hangmanImages.src = `pic/hangman-${wrongGuessCount}.svg`
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
//Calling gameOver function if any of these condition meets
  if(wrongGuessCount===maxGuesses)return  gameOver(false)
  if(correctLetter.length===currentWord.length)return  gameOver(true)

};
//Creating keyboard buttons
for (let i = 97; i <= 122; i++) {
  // console.log(String.fromCharCode(i));

  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();

playAgainBtn.addEventListener("click",getRandomWord)
