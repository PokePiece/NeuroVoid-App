'use client';

import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/CanvasWrapper'), {
    ssr: false,
});

export default function Page() {
    return (
        <main className="w-screen h-screen overflow-hidden relative">
            <CanvasWrapper />

            {/* Overlay HTML */}
            
        </main>
    );
}


/*
<div className="mt-10 bg-gray-500 text-black border-gray-300 p-10 m-10 pb-20 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl mb-3">From Heaven Brought Down</h3>
          <p>The Webmatrix connects the world. Envision a future where you don't think; you go.</p>
        </div>

*/