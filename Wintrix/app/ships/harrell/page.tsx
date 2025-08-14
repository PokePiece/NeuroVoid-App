import React from 'react'

// pages/video.js
export default function page() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Harrell's Top 5 Tips for Wilderness Survival</h1>
      <video
        className="w-full rounded-lg bg-black"
        controls
        autoPlay
        muted
      >
        <source src="/videos/harrell1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
