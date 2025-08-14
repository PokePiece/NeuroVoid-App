import { useRef } from 'react'; // Import useRef
import LoFi from "@/components/LoFi";

// 1. Define an interface for your music data structure
interface MusicTrack {
  id: string;
  title: string;
  src: string;
}

// 2. Define a type for the audioRefs object
// This ensures that audioRefs.current will be an object where keys are strings (ids)
// and values are either HTMLAudioElement or null (as they start null before mount)
interface AudioRefs {
  [key: string]: HTMLAudioElement | null;
}

// Define your music data as an array of objects
const musicData: MusicTrack[] = [ // Use the MusicTrack interface here
  {
    id: 'chopin',
    title: "Chopin's Ballade in G Minor",
    src: "/music/assets/chopin1.mp3",
  },
  {
    id: 'marling',
    title: "Marling's Ghosts",
    src: "/music/assets/marling1.mp3",
  },
  {
    id: 'horizon',
    title: "Horizon's Can You Feel My Heart",
    src: "/music/assets/horizon1.mp3",
  },
  {
    id: 'cave',
    title: "Cave's Red Right Hand",
    src: "/music/assets/cave1.mp3",
  },
  {
    id: 'chopin_fantasie',
    title: "Chopin's Fantasie Impromptu",
    src: "/music/assets/chopin2.mp3",
  },
  {
    id: 'chopin_wrong_note',
    title: "Chopin's Wrong Note Etude",
    src: "/music/assets/chopin3.mp3",
  },
  {
    id: 'chopin_waltz',
    title: "Chopin's Waltz in C# Minor",
    src: "/music/assets/chopin4.mp3",
  },
  {
    id: 'pharrell_music',
    title: 'William\s\' Happy',
    src: '/music/assets/williams1.mp3'
  }
];

const App = () => {
  // Create a single ref object to hold all audio refs
  // 3. Provide the type argument to useRef
  const audioRefs = useRef<AudioRefs>({});

  // Function to play a song once
  // 4. Type the 'id' parameter as string
  const playOnce = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) { // TypeScript now knows 'audio' is HTMLAudioElement | null
      audio.loop = false; // Ensure loop is off
      audio.play();
    }
  };

  // Function to loop a song
  // 5. Type the 'id' parameter as string
  const playLoop = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.loop = true; // Set loop to true
      audio.play();
    }
  };

  // Function to pause a song (useful for stopping loops if needed)
  // 6. Type the 'id' parameter as string
  const pauseSong = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
    }
  };

  return (
    <section className='min-h-screen bg-gray-100 p-4' id='music'>
      <div className="flex flex-col items-center justify-start">
        <div className="text-center w-full max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-8 mt-4 text-black">Music</h1>

          {/* Dynamic Music Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800"></h2>
            <div className="space-y-4">
              {musicData.map((song: MusicTrack) => ( // 7. Optionally, type the 'song' parameter
                <div key={song.id}> {/* Key prop is essential for list rendering */}
                  <h2 className="text-lg text-gray-700 mb-2">{song.title}</h2>
                  <audio
                    // 8. Type the 'el' parameter in the ref callback
                    ref={(el: HTMLAudioElement | null) => { audioRefs.current[song.id] = el; }} // Now returns void
                    controls
                    className="w-full bg-white p-2 rounded shadow"
                  >
                    <source src={song.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="flex justify-center space-x-4 mt-2">
                    <button
                      onClick={() => playOnce(song.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => playLoop(song.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Loop
                    </button>
                    <button
                      onClick={() => pauseSong(song.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Pause
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LoFi Component Section */}
          <div className="">
            <LoFi />
          </div>

        </div>
      </div>
    </section>
  );
};

export default App;