import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SOUNDS = [
  { name: 'White Noise', url: 'https://actions.google.com/sounds/v1/ambiences/forest_ambient.ogg' },
  { name: 'Rain', url: 'https://actions.google.com/sounds/v1/weather/rain_on_roof_loop.ogg' },
  { name: 'Ocean', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
  { name: 'Cafe', url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' }
];

export default function WhiteNoise() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (sound: string) => {
    if (playing === sound) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(sound);
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
      setPlaying(sound);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{volume}%</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SOUNDS.map((sound) => (
          <button
            key={sound.name}
            onClick={() => handlePlay(sound.url)}
            className={`p-4 rounded-lg flex items-center justify-center space-x-2 ${
              playing === sound.url
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {playing === sound.url ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}