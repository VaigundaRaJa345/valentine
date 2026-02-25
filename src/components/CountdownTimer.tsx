
"use client";

import { useState, useEffect } from "react";
import { intervalToDuration, isAfter, parseISO, type Duration } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { TARGET_BIRTHDAY } from "@/lib/birthday";

export function CountdownTimer({ isTestMode }: { isTestMode: boolean }) {
    const [timeLeft, setTimeLeft] = useState<Duration | null>(null);
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
                const duration = intervalToDuration({
                    start: now,
                    end: target,
                });
                setTimeLeft(duration);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [isTestMode]);

    if (isBirthday || !timeLeft) return null;

    const TimeUnit = ({ value, label }: { value: number | undefined; label: string }) => (
        <div className="flex flex-col items-center px-3 md:px-6">
            <motion.span
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-5xl font-serif text-primary mb-1"
            >
                {String(value ?? 0).padStart(2, "0")}
            </motion.span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-ink/50 font-sans">
                {label}
            </span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full py-12 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm border-y border-primary/10 relative z-20"
        >
            <h3 className="font-serif italic text-primary/60 text-sm md:text-base mb-6 tracking-wide">
                Countdown to Your Special Day
            </h3>
            <div className="flex divide-x divide-primary/20">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
        </motion.div>
    );
}
