"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio("/audio/background.mp3");
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // Attempt to play automatically
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.log("Autoplay prevented by browser, waiting for interaction.");
                // Add a one-time click listener to start audio
                const enableAudio = () => {
                    audio.play();
                    setIsPlaying(true);
                    document.removeEventListener('click', enableAudio);
                };
                document.addEventListener('click', enableAudio);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((err) => {
                    console.error("Audio playback failed:", err);
                });
            }
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={togglePlay}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 transition-colors"
            aria-label={isPlaying ? "Mute music" : "Play music"}
        >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
    );
}
