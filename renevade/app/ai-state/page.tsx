'use client';

import AICanvasWrapper from '@/components/AICanvasWrapper';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/AICanvasWrapper'), {
    ssr: false,
});

export default function Page() {
    return (
        <main className="w-screen h-screen overflow-hidden relative">
            <AICanvasWrapper />


        </main>
    );
}

