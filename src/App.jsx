import { useState ,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {

  const[length,setLength]=useState(8)
  const[number,setNumber]=useState(false)
  const[character,setCharacter]=useState(false)
  const[password,setPassword]=useState("")

  const passRef=useRef(null)
  const passwordTocopy=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str+="0123456789"
    if(character) str+="!@#^&*()_+';~`?$%"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,character])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,character])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-2 '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-8'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passRef}/>

        <button className='outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0'
        onClick={passwordTocopy}>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 '>
          <input type="range"
          min={6}
          max={40}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{
            setNumber((prev)=>!prev)
          }} />  
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={number}
          id="characterInput"
          onChange={()=>{
            setCharacter((prev)=>!prev)
          }} />  
          <label htmlFor="characterInput">Character</label>
        </div>  
      </div>
    </div>
    </>
  )
}
export default App
