"use client"

import { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [voteCredits, setVoteCredits] = useState(0)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    // Simulate user data loading
    const userData = localStorage.getItem("footballlore_user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setVoteCredits(parsed.voteCredits || 0)
      setIsPro(parsed.isPro || false)
    }
  }, [])

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem("footballlore_user", JSON.stringify(userData))
  }

  const updateVoteCredits = (credits) => {
    setVoteCredits(credits)
    const userData = { ...user, voteCredits: credits }
    updateUser(userData)
  }

  const updateProStatus = (status) => {
    setIsPro(status)
    const userData = { ...user, isPro: status }
    updateUser(userData)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        voteCredits,
        isPro,
        updateUser,
        updateVoteCredits,
        updateProStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
