import React, { useState, useRef, useEffect, useCallback } from 'react';

// Keep all your manual imports
// ... (Your Lofi imports remain the same) ...

const lofiTracks = [
    { name: "chill-lofi-ambient-373046", src: "/music/LoFi/lofi1.mp3" },
    { name: "good-night-lofi-cozy-chill-music-160166", src: "/music/LoFi/lofi2.mp3" },
    { name: "chillhop-lofi-beats-37304", src: "/music/LoFi/lofi3.mp3" },
    { name: "lofi-girl-lofi-ambient-music-365952", src: "/music/LoFi/lofi4.mp3" },
    { name: "rainy-lofi-city-lofi-music-33274", src: "/music/LoFi/lofi5.mp3" },
    { name: "lofi-295209", src: "/music/LoFi/lofi6.mp3" },
    { name: "spring-lofi-vibes-lofi-music-340019", src: "/music/LoFi/lofi7.mp3" },
    { name: "lofi-ambient-music-373048", src: "/music/LoFi/lofi8.mp3" },
    { name: "lofi-background-music-326931", src: "/music/LoFi/lofi9.mp3" },
    { name: "lofi-girl-lofi-hiphop-beats-328177", src: "/music/LoFi/lofi10.mp3" },
    { name: "coffee-lofi-chill-lofi-music-332738", src: "/music/LoFi/lofi11.mp3" },
    { name: "coffee-lofi-lofi-music-340017", src: "/music/LoFi/lofi12.mp3" },
    { name: "lofi-girl-309226", src: "/music/LoFi/lofi13.mp3" },
    { name: "lofi-rain-lofi-music-332732", src: "/music/LoFi/lofi14.mp3" },
    { name: "breathe-chill-lofi-beats-362644", src: "/music/LoFi/lofi15.mp3" },
    { name: "lofi-background-music-361051", src: "/music/LoFi/lofi16.mp3" },
    { name: "lofi-girl-lofi-background-music-361058", src: "/music/LoFi/lofi17.mp3" },
    { name: "lofi-coffee-332824", src: "/music/LoFi/lofi18.mp3" },
    { name: "lofi-lofi-song-345371", src: "/music/LoFi/lofi19.mp3" },
    { name: "ocean-lofi-vibes-lofi-music-340023", src: "/music/LoFi/lofi20.mp3" },
    { name: "lofi-girl-lofi-hiphop-beats-328178", src: "/music/LoFi/lofi21.mp3" },
    { name: "coverless-book-lofi-186307", src: "/music/LoFi/lofi22.mp3" },
    { name: "lofi-music-hip-hop-295207", src: "/music/LoFi/lofi23.mp3" },
    { name: "autumn-chill-lofi-365946", src: "/music/LoFi/lofi24.mp3" },
    { name: "lofi-lofi-music-345370", src: "/music/LoFi/lofi25.mp3" },
    { name: "lofi-ambient-music-356059", src: "/music/LoFi/lofi26.mp3" },
    { name: "quiet-night-lofi-332744", src: "/music/LoFi/lofi27.mp3" },
    { name: "lofi-chill-315216", src: "/music/LoFi/lofi28.mp3" },
    { name: "lofi-relax-lofi-345374", src: "/music/LoFi/lofi29.mp3" },
    { name: "lofi-2-312707", src: "/music/LoFi/lofi30.mp3" },
    { name: "lofi-girl-lofi-hiphop-beats-328180", src: "/music/LoFi/lofi31.mp3" },
    { name: "whispering-vinyl-loops-lofi-beats-281193", src: "/music/LoFi/lofi32.mp3" },
    { name: "lofi-song-330550", src: "/music/LoFi/lofi33.mp3" },
    { name: "lofi-background-music-365956", src: "/music/LoFi/lofi34.mp3" },
    { name: "lofi-hiphop-music-361050", src: "/music/LoFi/lofi35.mp3" },
    { name: "wave-of-you-relaxing-lofi-305565", src: "/music/LoFi/lofi36.mp3" },
    { name: "lofi-background-music-337568", src: "/music/LoFi/lofi37.mp3" },
    { name: "lofi-girl-326932", src: "/music/LoFi/lofi38.mp3" },
    { name: "90x27s-lofi-city-lofi-music-332737", src: "/music/LoFi/lofi39.mp3" },
    { name: "lofi-girl-lofi-hiphop-beats-326959", src: "/music/LoFi/lofi40.mp3" },
    { name: "lofi-streets-312705", src: "/music/LoFi/lofi41.mp3" },
    { name: "chill-lofi-ambient-music-344109", src: "/music/LoFi/lofi42.mp3" },
    { name: "ambient-lofi-340022", src: "/music/LoFi/lofi43.mp3" },
    { name: "whispered-dreams-chill-lofi-365954", src: "/music/LoFi/lofi44.mp3" },
    { name: "honey-chill-lofi-309227", src: "/music/LoFi/lofi45.mp3" },
    { name: "lofi-lofi-music-3453701", src: "/music/LoFi/lofi46.mp3" },
    { name: "quiet-night-lofi-332744", src: "/music/LoFi/lofi47.mp3" },
    { name: "ocean-lofi-vibes", src: "/music/LoFi/lofi48.mp3" },
    { name: "lofi-ambient", src: "/music/LoFi/lofi49.mp3" },
    { name: "chillhop-lofi-beats", src: "/music/LoFi/lofi50.mp3" },
];


const LoFi = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentTrack = lofiTracks[currentTrackIndex];
    const audioRef = useRef<HTMLAudioElement>(null);

    const playNext = useCallback(() => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % lofiTracks.length);
        setIsPlaying(true); // Keep playing when moving to the next track
    }, []);

    const playPrevious = useCallback(() => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + lofiTracks.length) % lofiTracks.length);
        setIsPlaying(true); // Keep playing when moving to the previous track
    }, []);

    const handleTrackChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentTrackIndex(Number(event.target.value));
        setIsPlaying(true); // Start playing when a new track is selected from dropdown
    }, []);

    // --- NEW: Effect to handle playing/pausing based on `isPlaying` state ---
    // This effect runs only when `isPlaying` changes.
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.play().catch(error => {
                    console.log("Play was prevented. User may need to interact first.", error);
                    setIsPlaying(false); // If play fails, update state
                });
            } else {
                audio.pause();
            }
        }
    }, [isPlaying]); // Dependency: only run when isPlaying changes

    // --- NEW: Effect to handle track changes (loading new source and restarting if playing) ---
    // This effect runs only when `currentTrack.src` changes.
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            // Load the new source whenever the track changes
            audio.load();
            // If already playing, attempt to play the new track immediately
            if (isPlaying) {
                audio.play().catch(error => {
                    console.log("Autoplay of new track was prevented. User may need to interact first.", error);
                    // It's possible that when a new track loads, autoplay might be blocked
                    // even if `isPlaying` is true. In such cases, we update `isPlaying`
                    // to reflect that the audio is not actually playing.
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrack.src]); // Dependency: only run when the track source changes

    // --- Effect for handling `ended` event listener ---
    // This effect only attaches/detaches the event listener.
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => {
                playNext(); // Automatically play the next track
            };
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [playNext]); // Dependency: playNext (memoized with useCallback)

    const togglePlayPause = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying); // Just toggle the state, the useEffect will handle actual playback
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-black'>LoFi Player</h1>

            <div className="text-center bg-white p-6 rounded shadow-lg mt-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Now Playing: {currentTrack.name}</h2>

                <audio controls className='w-full max-w-md' ref={audioRef}>
                    <source src={currentTrack.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <div className="mt-4 space-x-4">
                    <button
                        onClick={playPrevious}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className={`font-bold py-2 px-4 rounded ${isPlaying ? 'bg-orange-500 hover:bg-orange-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={playNext}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>

                <div className="mt-6">
                    <label htmlFor="track-select" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Track:
                    </label>
                    <select
                        id="track-select"
                        value={currentTrackIndex}
                        onChange={handleTrackChange}
                        className="block text-black w-full max-w-xs mx-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {lofiTracks.map((track, index) => (
                            <option key={index} value={index}>
                                {track.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default LoFi;