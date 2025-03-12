
import { createContext, useState } from "react";

export const Context = createContext()

export const ContextProvider =( props ) => {
  const [input , setInput] = useState("")
  const [recentPrompt , setRecentPrompt] = useState("")
  const [previousPrompt , setPreviousPrompt] = useState([])
  const [showResult , setShowResult] = useState(false)
  const [loading , setLoading] = useState(false)
  const [resultData , setResultData] = useState("")
  const [chatHistory , setChatHistory] = useState([]);
  const onSent = async(prompt) =>{
    
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
     body: prompt !== undefined ?JSON.stringify({prompt }):
          JSON.stringify({prompt: input})
    })
    const response = {response : await res.json() , 
      hasReturned : true
    };
    return response
  }

  const contextValue = {
    previousPrompt , setPreviousPrompt , onSent , 
    setRecentPrompt , recentPrompt , showResult , loading , resultData , input , setInput , setLoading , setShowResult , setResultData ,setChatHistory , chatHistory 

  }

  return (
    <Context.Provider value={contextValue}>
    {props.children}
    </Context.Provider>
  )
}