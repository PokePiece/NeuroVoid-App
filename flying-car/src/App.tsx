import './App.css'
import FlyingCar from './sections/FlyingCar'
import Header from './sections/Header'
import VehicleInfo from './sections/VehicleInfo'

function App() {

  return (
    <>
      <Header />
      <div className='flex flex-center text-center justify-center py-3 bg-blue-100 h-[65vh]'>
        <FlyingCar />
      </div>
      <VehicleInfo />
    </>
  )
}

export default App
