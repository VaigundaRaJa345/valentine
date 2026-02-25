
"use client";

import { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parseISO, isAfter } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { TARGET_BIRTHDAY } from "@/lib/birthday";
import { Heart } from "lucide-react";

export function CountdownTimer({ isTestMode }: { isTestMode: boolean }) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        if (isTestMode) {
            setIsBirthday(true);
            return;
        }

        const target = parseISO(TARGET_BIRTHDAY);

        const updateTimer = () => {
            const now = new Date();
            if (isAfter(now, target)) {
                setIsBirthday(true);
                setTimeLeft(null);
            } else {
                const totalSeconds = differenceInSeconds(target, now);
                const days = Math.floor(totalSeconds / (24 * 3600));
                const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = Math.floor(totalSeconds % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [isTestMode]);

    if (isBirthday || !timeLeft) return null;

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center px-4">
            <motion.span
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl md:text-4xl font-handwriting text-primary"
            >
                {String(value).padStart(2, "0")}
            </motion.span>
            <span className="text-[10px] uppercase tracking-widest text-ink/40 font-serif -mt-1">
                {label}
            </span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 flex flex-col items-center justify-center animate-float mb-8"
        >
            {/* Vintage Paper Background */}
            <div className="bg-paper shadow-2xl p-6 relative transform -rotate-1 border border-ink/10 max-w-xs w-full mx-4 rounded-sm">
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-white/40 backdrop-blur-[2px] -rotate-2 flex items-center justify-center text-[10px] text-ink/40 tracking-[0.2em] font-serif uppercase border border-ink/5 shadow-sm">
                    Coming Soon
                </div>

                <h3 className="font-handwriting text-primary text-xl mb-4 text-center">
                    Birthday Countdown
                </h3>

                <div className="flex justify-center gap-2">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hrs" />
                    <TimeUnit value={timeLeft.minutes} label="Min" />
                    <TimeUnit value={timeLeft.seconds} label="Sec" />
                </div>

                {/* Decorative corner flourish */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 opacity-10">
                    <Heart className="w-full h-full text-ink" />
                </div>
            </div>
        </motion.div>
    );
}
