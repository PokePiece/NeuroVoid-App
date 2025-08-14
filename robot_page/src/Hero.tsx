import RobotImage from '/robot-image.jpg';

const Hero = () => {
  return (

    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter text-gray-800'>


      <div className="mb-8 p-4 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">

        <img

          src={RobotImage}
          alt="Cute Robot"
          className="w-full max-w-sm h-auto rounded-lg"

          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/400x300/FFD700/000000?text=Image+Not+Found"; }} // Provide a valid fallback path
        />
      </div>

      <h1 className='text-5xl font-extrabold text-blue-700 mb-4 text-center leading-tight tracking-tight'>
        Wheeled Robot
      </h1>


      <p className='text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-8 px-4'>
        Drive the wheeled robot. This interactive app
        features a wheeled robot constructed from geometric shapes.
        Use the keyboard to control its movement and explore a dynamic environment.
      </p>


      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Robot Control System Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10l2 2h10l2-2V7m-2 0H6m2 0H6m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-2 0h-4"></path></svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Modular Architecture</h3>
              <p className="text-gray-600 text-base">Designed for scalability and easy integration of new components, ensuring future-proof development.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Real-time Control</h3>
              <p className="text-gray-600 text-base">Optimized for precise and responsive robot manipulation, crucial for dynamic environments.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v5m3 0h.01M12 15h.01M12 12h.01M12 9h.01M12 6h.01"></path></svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Simulation Integration</h3>
              <p className="text-gray-600 text-base">Seamlessly connects with simulation environments for rigorous testing and accelerated development cycles.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Cross-Platform Compatibility</h3>
              <p className="text-gray-600 text-base">Built to run efficiently on various operating systems, maximizing accessibility and deployment options.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm col-span-1 md:col-span-2">
            <svg className="w-8 h-8 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4"></path></svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Extensible API</h3>
              <p className="text-gray-600 text-base">Provides a flexible API, allowing developers to easily build custom functionalities and interfaces tailored to their specific needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;