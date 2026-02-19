"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DiaryProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Diary({ isOpen, onClose }: DiaryProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] bg-[#fffdf5] rounded-r-lg rounded-l-md shadow-2xl overflow-hidden border-r-4 border-b-4 border-[#d4c5a5]"
                        style={{
                            backgroundImage: "linear-gradient(to right, #e3dac9 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    >
                        {/* Book Spine/Binding Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-gradient-to-r from-[#5c4033] to-[#8b5a2b] shadow-xl z-20 border-r border-[#3e2b22]"></div>

                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 z-30 p-2 text-[#8b5a2b] hover:text-[#5c4033] transition-colors rounded-full hover:bg-[#8b5a2b]/10"
                        >
                            <X size={24} />
                        </button>

                        {/* Content Area */}
                        <div className="flex flex-col h-full pl-10 md:pl-14 pr-6 py-8 md:py-10 relative z-10">
                            <header className="flex justify-center mb-6">
                                <h2 className="font-handwriting text-3xl md:text-5xl text-[#5c4033] border-b-2 border-[#d4c5a5] pb-2 px-8">
                                    Personal Diary
                                </h2>
                            </header>

                            <div className="flex-1 font-handwriting text-xl md:text-2xl text-[#4a3728] leading-loose overflow-y-auto px-2 custom-scrollbar">
                                {/* Content intentionally left blank */}
                            </div>

                            <footer className="text-center mt-4 text-[#8b5a2b]/60 font-serif text-sm italic">
                                ~ A collection of memories ~
                            </footer>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
