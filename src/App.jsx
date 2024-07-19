import './App.css'

function App() {
  let time = 10; // This is in seconds
  let chars = 93; // Amount of characters you type
  // keep at the end of the calculation otherwise it will break the whole app
  let wpm = Math.round((chars/5)/(time/60));

  return (
    <>
      <h1>Welcome to Speedy Type!</h1>
      <form>This is a demo of the SpeedyType web app that can be used to test the typing speed algorithm.</form>
      <p>You are this fast <a>{wpm}</a> words per minute</p>
      <button onMouseDown={window.location.href=""}>Source Code</button>
    </>
  )
}

export default App
