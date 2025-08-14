import React, { useEffect, useState } from 'react';
import Chat from '../Chat';
import Discussion from '../Discussion';
import RealtimeOutput from './RealtimeOutput';

const VoidInteract = () => {
  // Read initial state from localStorage, or default to true
  const [showDialogue, setShowDialogue] = useState(() => {
    const storedValue = localStorage.getItem('showDialogue');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  // Read initial state for showLife, default to false
  const [showLife, setShowLife] = useState(() => {
    const storedValue = localStorage.getItem('showLife');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  // Use a single useEffect to save both states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('showDialogue', JSON.stringify(showDialogue));
    localStorage.setItem('showLife', JSON.stringify(showLife));
  }, [showDialogue, showLife]);

  const handleDialogueClick = () => {
    setShowDialogue(true);
    setShowLife(false);
  };

  const handleLifeClick = () => {
    setShowDialogue(false);
    setShowLife(true);
  };

  return (
    <>
      <div className='flex flex-row justify-center pt-3 gap-2 bg-gray-200 pb-3'>
        <div
          className={`flex text-black p-2 border border-black cursor-pointer ${showDialogue ? 'bg-gray-300' : 'bg-white'}`}
          onClick={handleDialogueClick}
        >
          Dialogue
        </div>
        <div
          className={`flex text-black p-2 border border-black cursor-pointer ${showLife ? 'bg-gray-300' : 'bg-white'}`}
          onClick={handleLifeClick}
        >
          Life
        </div>
      </div>
      {showLife && <RealtimeOutput />}
      {showDialogue && (
        <>
          <Chat
            inputPlaceholder='Type message...'
            bodyPlaceholder='Response appears here...'
            title='Chat'
            userTag='webtrix_general'
          />
          <Discussion
            inputPlaceholder='Type message...'
            bodyPlaceholder='Response appears here...'
            title='Executor'
            userTag='void_general'
          />
        </>
      )}
    </>
  );
};

export default VoidInteract;