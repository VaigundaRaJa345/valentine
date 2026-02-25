"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomePopupProps {
    onComplete?: () => void;
}

export function WelcomePopup({ onComplete }: WelcomePopupProps) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    key="welcome-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c1810]/90 backdrop-blur-md p-4"
                >
                    <div
                        className="relative max-w-lg w-full bg-[#f4e4bc] p-8 md:p-12 rounded-sm shadow-[20px_20px_0px_rgba(136,90,137,0.3)] text-center border border-[#885A89]/20"
                    >
                        {/* Subtle Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply pointer-events-none" />

                        <div className="relative z-10 space-y-8">
                            <p className="font-handwriting text-3xl md:text-4xl text-[#885A89] leading-relaxed">
                                "Thank you, Shree.<br />
                                Just wanted you to know—you’ve meant more to my life than you realised."
                            </p>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-8 py-3 bg-[#885A89] text-[#f4e4bc] font-serif text-lg rounded-full hover:bg-[#7c525f] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
