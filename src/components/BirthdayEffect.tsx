
"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export function BirthdayEffect() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Party paper effect (shapes like rectangles, triangles, circles)
        const scalar = 2.5;
        const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });
        const square = confetti.shapeFromPath({ path: 'M0 0 L10 0 L10 10 L0 10z' });
        const colors = ['#885A89', '#B08D55', '#D8BFD8', '#f4e4bc', '#ff7eb9', '#7afcff', '#feff9c'];

        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 35,
            spread: 360,
            ticks: 80,
            zIndex: 100,
            shapes: [triangle, square],
            colors,
            scalar
        };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 25 * (timeLeft / duration); // Reduced from 50
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 500); // Increased from 250 for less frequent bursts

        // Auto-close overlay text after 3 seconds
        const closeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(closeTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center bg-white/10 backdrop-blur-[4px]"
                >
                    <div className="text-center">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.3 }}
                            className="font-handwriting text-6xl md:text-8xl text-primary drop-shadow-2xl"
                        >
                            Happy Birthday!
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="font-serif italic text-xl md:text-2xl text-ink mt-4"
                        >
                            Wishing you a day full of love and magic ✨
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
