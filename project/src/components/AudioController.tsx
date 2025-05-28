import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import useSound from 'use-sound';

const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [play, { stop }] = useSound('src/sounds/background.mp3', {
    volume: 0.5,
    loop: true,
  });

  useEffect(() => {
    play();
    return () => stop();
  }, [play, stop]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      play();
    } else {
      stop();
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default AudioController;