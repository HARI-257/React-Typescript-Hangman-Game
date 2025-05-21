import { useState , useEffect, useCallback} from 'react'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord'
import Keyboard from './Keyboard'
import words from './wordList.json'

function App() {
  const [wordGuess, setWordGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guessedLetters,setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(letter => !wordGuess.includes(letter))

  console.log(wordGuess)


const isLoser = incorrectLetters.length >= 6
const isWinner = wordGuess.split(" ").every(letter => {
  guessedLetters.includes(letter)
})

console.log(isWinner)
const addGuessedLetter= useCallback(
  (letter: string) =>{
    if(guessedLetters.includes(letter)|| isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters,letter])
  },[guessedLetters,isWinner,isLoser]
  )

  useEffect(()=>{

    const handler = (e: KeyboardEvent)=>{
      const key = e.key

      if(!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress',handler)
    return() => {
      document.removeEventListener('keypress',handler)
    }
  },[guessedLetters])



  return (
    <div style={{
      maxWidth:"800px",
      display:"flex",
      flexDirection:"column",
      gap:"2rem",
      margin:"0 auto",
      alignItems:"center"
    }}>
      <div style={{fontSize:"2rem",textAlign:"center"}}>
        {isWinner && "winner Refesh to try again"}
        {isLoser && "Nice try Refesh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses = {incorrectLetters.length}/>
      <HangmanWord reveal = {isLoser} guessedLetters={guessedLetters} wordGuess={wordGuess}/>
      <div style={{alignSelf:"stretch"}}>
           <Keyboard 
           disabled = {isLoser || isWinner}
              activeLetter = {guessedLetters.filter(letter =>{
                wordGuess.includes(letter)
              })}
              inactiveLetters = {incorrectLetters}
              addGuessedLetter={addGuessedLetter}
           />
      </div>
    </div>
  )
}

export default App
