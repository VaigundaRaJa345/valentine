
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomePopupProps {
    onComplete?: () => void;
}

export function WelcomePopup({ onComplete }: WelcomePopupProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        if (onComplete) onComplete();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="welcome-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
                >
                    <div
                        className="relative max-w-lg w-full bg-[#fcf8ef]/50 backdrop-blur-[16px] p-8 md:p-12 rounded-2xl text-center border border-white/40 overflow-hidden"
                        style={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.4)"
                        }}
                    >
                        {/* Glossy Reflection shine */}
                        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-12 pointer-events-none" />

                        {/* Extremely Subtle Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 mix-blend-multiply pointer-events-none" />

                        <div className="relative z-10 space-y-8">
                            <p className="font-handwriting text-3xl md:text-4xl text-[#885A89] leading-relaxed drop-shadow-sm">
                                "Thank you, Shree.<br />
                                Just wanted you to know—you’ve meant more to my life than you realised."
                            </p>

                            <button
                                onClick={handleClose}
                                className="px-10 py-3 bg-[#885A89] hover:bg-[#7c525f] text-[#fcf8ef] font-serif text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
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
