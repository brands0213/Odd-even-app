
import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
export default function App() {
  

  // UseStates Variables
  const [result, setResult] = useState('Guess The number');
  const [answer, setAnswer] = useState(null);
  const [input, setInput] = useState(null);
  const [random, setRandom] = useState('1-10');
  const [isActive, setIsActive] = useState(false)
  const [disable, setDisable] = useState(false)
  const [disable1, setDisable1] = useState(false)
 

  // Random number generator
  function getRandomNumber(){
     setRandom(Math.floor((Math.random() * 10) + 1));
  }
  

  // Equation and conditions for the random number
  const getAnswer = () => {
    if (random % 2 === 0 && input === 0){
      setAnswer("EVEN")
    } else if (random % 2 === 1 && input === 1) {
      setAnswer("ODD")
    }else{
      setAnswer(undefined)
    }
  }


  // Logic in game 
  const getResult = () => {
    if(random % 2 === 0 && input === 0 && answer === "EVEN"){
      setResult('You Win')
    } else if (random % 2 === 1 && input === 1 && answer === "ODD"){
      setResult('You Win')
    } else if (random === '1-10'){
      setResult('Guess The Number')

    } else if (input === null){
      setResult('Please guess the number first before clicking start')
      setRandom('Error')
  
    }else{
      setResult('You Lose')
    }
    }

    // For Reloading to enable betting again
   function reStart(){
      window.location.reload();

   }


  //  For enabling the play again button
   function activate() {
    setIsActive(true) 
   }



  //  Function Start 
   function start() {
     activate()
     getRandomNumber()
   }

  //  Function for Even
  function Even() {
    setInput(0)
    Swal.fire(
      'Bet Placed!',
      '',
      'success'
    )
    OddDisable()
  }

  //  Function for Odd
  function Odd() {
    setInput(1)
    Swal.fire(
      'Bet Placed!',
      '',
      'success'
      )
      EvenDisable()
  }

  // Disable the Even Button
    
  function EvenDisable(params) {
    setDisable(true)
  }

  // Disable the Odd Button

  function OddDisable(params) {
    setDisable1(true)
  }
  //  To keep track all the changes in getAnswer and getResult
  useEffect(()=>{
    getAnswer()
    getResult()

  })
  
  
  return (

    <div className='App'> 
      <div className="result">{result}</div>
      <div className='randomNum'>{random}</div>

      <div>
      <Button  className='start' variant='success' onClick={()=>start()}>Start</Button>
      
      </div>


      <div className='Buttons'>

      {disable1 ? <Button className="odd" variant='primary' disabled>Odd</Button> 
      :
      <Button className="odd" variant='primary' onClick={()=>Odd()}>Odd</Button>}
     
      {disable ?<Button className="even" variant='danger' disabled>Even</Button>:

      <Button className="even" variant='danger' onClick={()=>Even()}>Even</Button>}

      </div>


      {isActive && <Button className="Restart" id="button" variant='success' onClick={()=>reStart()}>Play Again</Button>} 
  
     
    
      

    </div>
  );
  
  }