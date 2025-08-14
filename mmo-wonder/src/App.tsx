import { useState } from 'react'
import './App.css'
import Hotbar from './Hotbar'
import MainScene from './MainScene'

function App() {

  const [currentAbility, setCurrentAbility] = useState<string | null>(null)

  return (
    <>
      <div className='w-full h-[100vh]'>
        <MainScene currentAbility={currentAbility} />
        <Hotbar onSelectAbility={setCurrentAbility} />
      </div>
    </>
  )
}

export default App
