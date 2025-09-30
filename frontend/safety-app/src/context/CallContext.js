import React, { createContext, useState, useContext } from 'react'

const CallContext = createContext()

export const CallProvider = ({ children }) => {
  const [isCallVisible, setCallVisible] = useState(false)
  const [callerName, setCallerName] = useState('Mom')

  const triggerFakeCall=(name = 'Mom') => {
    setCallerName(name);
    setCallVisible(true);
  }

  const hideFakeCall = () => {
    setCallVisible(false);
  }

 

  return <CallContext.Provider value={{isCallVisible,callerName,triggerFakeCall,hideFakeCall}}>{children}</CallContext.Provider>
}


export const useCall = () => {
  return useContext(CallContext);
}