import React from 'react';
import './App.css';
import Die from './die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

// extra credit da implementare:

//contare il tempo che una persona ci mette per svolgere il gioco,
//il numero di roll che ci mette per completare ecc.. e salvare i dati in local storage.

export default function App() {

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {

   const arrayNum = [];
   for(let i=0; i<9; i++) {

    arrayNum.push(generateNewDie())

   }
    return arrayNum
  }

  const [Dice, setDice] = React.useState(allNewDice)

  const [changeDice, setChangeDice] = React.useState(false)
  
  React.useEffect (() => {

    const allHeld = Dice.every(die => die.isHeld)
    const firstValue = Dice[0].value
    const sameValue = Dice.every(die => die.value === firstValue)
    if(allHeld && sameValue) {
      setChangeDice(true)
      console.log("you won")
    }

  },[Dice])

  function rollDice() {
    if (!changeDice) {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die:
      generateNewDie()
    }))
  }
  else {
    setChangeDice(false)
    setDice(allNewDice())
  }
  }

  function holdDice(id) {

    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} :
      die
    }))

  }
  
  const diceElement = Dice.map(die => <Die isHeld = {die.isHeld} key={die.id} value={die.value} holddice={() => holdDice(die.id)}/>)

  return (
    <div className="App">
      <main className="bg-principal">
        {changeDice && <Confetti />}
        <h1 className="title-content">Tenzies</h1>
        <h3 className="subtitle-content">Roll until all dice are the same. Click<br/> each die to freeze it at its current value<br/> between rolls.</h3>
        <div className="die-div">
        {diceElement}
        </div>
        <button className="btn-roll" onClick={rollDice} >{changeDice ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}


