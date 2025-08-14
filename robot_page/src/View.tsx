// components/View.tsx
'use client';

// Define your download URLs here. REPLACE THESE WITH YOUR ACTUAL HOSTED FILE URLs!
// Example URLs from GitHub Releases or Google Cloud Storage:
const WINDOWS_DOWNLOAD_URL = "https://github.com/PokePiece/robot/releases/download/v1.0.0/RobotPoke_Windows.zip";
const MACOS_DOWNLOAD_URL = "https://github.com/PokePiece/robot/releases/download/v1.0.0/RobotPoke_Mac.app.zip";
const LINUX_DOWNLOAD_URL = "https://github.com/PokePiece/robot/releases/download/v1.0.0/RobotPoke_Linux.zip";

const View = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter text-gray-800'>

      {/* Left Section: GitHub Repo Info */}
      <div className="w-full md:w-1/2 p-8 mb-8 md:mb-0 md:mr-4 bg-white rounded-xl shadow-lg border border-blue-200 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Explore the Code on GitHub
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-md">
          The full source code for the Robot Control System is available on GitHub.
          It's licensed under the MIT License, encouraging open collaboration and use.
          We welcome contributions and appreciate any feedback you can provide to help us improve!
        </p>
        <a
          href="https://github.com/PokePiece/Robot-Control-System"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.499.09.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.953 0-1.09.39-1.98.102-2.671-.09-.252-.364-1.268.086-2.653 0 0 .81-.268 2.647 1.024A9.333 9.333 0 0112 6.865c.85.004 1.705.115 2.504.337 1.837-1.292 2.647-1.024 2.647-1.024.45 1.385.176 2.401.087 2.653.39.69.407 1.58.407 2.671 0 3.84-2.339 4.69-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Visit GitHub Repo
        </a>
      </div>

      {/* Right Section: Download Buttons */}
      <div className="w-full md:w-1/2 p-8 bg-white rounded-xl shadow-lg border border-blue-200 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Download the Robot Application
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-md">
          Get the interactive Wheeled Robot application for your operating system.
          Explore the dynamic environment and control your robot today!
        </p>
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          {/* Windows Download Button */}
          <a
            href={WINDOWS_DOWNLOAD_URL}
            download
            className='w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-center text-lg focus:outline-none focus:ring-4 focus:ring-blue-300'
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Windows
          </a>

          {/* macOS Download Button */}
          <a
            href={MACOS_DOWNLOAD_URL}
            download
            className='w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-center text-lg focus:outline-none focus:ring-4 focus:ring-blue-300'
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for macOS
          </a>

          {/* Linux Download Button */}
          <a
            href={LINUX_DOWNLOAD_URL}
            download
            className='w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-center text-lg focus:outline-none focus:ring-4 focus:ring-blue-300'
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Linux
          </a>
        </div>
      </div>
    </div>
  );
};

export default View;
