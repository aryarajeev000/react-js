import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(15)
  //let counter= 15
  const addvalue=()=>{
    //counter=counter+2
    setCounter(counter+2)
    console.log("Clicked :",counter)
  }
  const removevalue=()=>{
    setCounter(counter-2);
    console.log("Clicked :",counter)
  }
  return (
    <>
     <h1>Chai Aur react</h1>
     <h2>Counter value : {counter}</h2>
    
     <button onClick={addvalue}> Add value {counter}</button> <br />
     <button onClick={removevalue}> Remove value {counter}</button>
    </>
  )
}

export default App
