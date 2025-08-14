import React, { useState, useEffect } from "react"

const keys = ["1","2","3","4","5","6","7","8","9","0","-","="]

export default function Hotbar({onSelectAbility}:{onSelectAbility:React.Dispatch<React.SetStateAction<string | null>>}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const abilities = ["shooting", "melee", "flyingCar", "player"]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = keys.indexOf(e.key)
      if (idx !== -1) {
        setActiveIndex(idx)
        onSelectAbility(abilities[idx] || null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 p-2 rounded-lg">
      {keys.map((key, i) => (
        <div
          key={i}
          className={`w-12 h-12 border-2 rounded flex flex-col items-center justify-center bg-white/10 text-white text-xs select-none
            ${activeIndex === i ? "border-yellow-400" : "border-white"}`}
        >
          <div className="w-5 h-5 rounded-full bg-white mb-1" />
          {key}
        </div>
      ))}
    </div>
  )
}

//Add setting for timeout where active hotkey shows for just a second after new one is clicked