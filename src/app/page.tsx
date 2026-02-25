"use client";

import { useState, Suspense } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Confession } from "@/components/Confession";
import { FinalSection } from "@/components/FinalSection";
import { WelcomePopup } from "@/components/WelcomePopup";
import { CountdownTimer } from "@/components/CountdownTimer";
import { BirthdayEffect } from "@/components/BirthdayEffect";
import { isBirthdayOrAfter } from "@/lib/birthday";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const [showContent, setShowContent] = useState(false);
  const searchParams = useSearchParams();
  const isTestMode = searchParams.get("test") === "bday";
  const isBirthday = isBirthdayOrAfter(isTestMode);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <WelcomePopup onComplete={() => setShowContent(true)} />

      {showContent && (
        <>
          {isBirthday && <BirthdayEffect />}
          <AudioPlayer />

          {!isBirthday && <CountdownTimer isTestMode={isTestMode} />}

          <Hero />

          <div className="relative z-10">
            <Story />
          </div>

          <Confession />

          <FinalSection />
        </>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  );
}
