import React, { useState, useEffect, useRef } from "react"
import "./App.css"

function App() {
  const presetText =
    "This is a demo of the SpeedyType web app that can be used to test the typing speed algorithm."
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState(true)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const timerRef = useRef(null)

  const handleChange = (event) => {
    const value = event.target.value
    setUserInput(value)

    if (startTime === null) {
      const start = Date.now()
      setStartTime(start)
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - start)
      }, 100)
    }

    setIsCorrect(presetText.startsWith(value))

    if (value === presetText) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const formatTime = (time) => {
    const seconds = (time / 1000).toFixed(2) // Convert to seconds and keep two decimal places
    return `${seconds} seconds`
  }

  const calculateWPM = () => {
    if (elapsedTime > 0) {
      const timeInMinutes = elapsedTime / 60000 // Convert milliseconds to minutes
      const wordsTyped = userInput.length / 5
      return Math.round(wordsTyped / timeInMinutes)
    }
    return 0
  }

  const StartTypingText = () => {
    return (
      <div id="preset-text">
        This is a demo of the SpeedyType web app that can be used to test the
        typing speed algorithm.
      </div>
    )
  }

  const ResetTimerButton = () => {
    return (
      <button
        onMouseDown={() => {
          setStartTime(null)
          setElapsedTime(0)
          setUserInput("")
        }}
      >
        Reset Timer
      </button>
    )
  }

  const github = () => {
    window.open("https://github.com/Styzex/speedyType/tree/main", "_blank")
  }

  return (
    <>
      <h1>Welcome to Speedy Type!</h1>
      <div id="timer">Time: {formatTime(elapsedTime)}</div>
      <div id="preset-text">{presetText}</div>
      <br />
      <textarea
        id="typing-area"
        rows="2"
        cols="50"
        value={userInput}
        onChange={handleChange}
        style={{
          color: isCorrect ? "rgba(100, 108, 255, 1)" : "rgba(211, 67, 89, 1)",
        }}
      />
      <br />
      <p>
        You are this fast <a>{calculateWPM()}</a> words per minute
      </p>
      <ResetTimerButton />
      <button itemType="button" onMouseDown={github}>
        Source Code
      </button>
    </>
  )
}

export default App
