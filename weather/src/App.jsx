import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Weather from './Components/weather'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div><Weather/></div>
    </>
  )
}

export default App
