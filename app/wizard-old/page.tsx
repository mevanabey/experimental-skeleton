"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { Logo } from "@/components/brand/ec/logo-svg";
import Transcribe from "@/components/functional/transcribe";


export default function ExperienceCeylon() {
  const [section1Complete, setSection1Complete] = useState(false);
  const [section2Complete, setSection2Complete] = useState(false);
  
  useEffect(() => {
    const playSection1 = async () => {
      const audio = new Audio('/audio/1.mp3');
      try {
        await audio.play();
        audio.onended = () => setSection1Complete(true);
      } catch (error) {
        console.log('Audio playback failed:', error);
        setSection1Complete(true); // Continue with animations even if audio fails
      }
    };
    playSection1();
  }, []);

  useEffect(() => {
    if (section1Complete) {
      const playSection2 = async () => {
        const audio = new Audio('/audio/2.mp3');
        try {
          await audio.play();
          audio.onended = () => setSection2Complete(true);
        } catch (error) {
          console.log('Audio playback failed:', error);
          setSection2Complete(true);
        }
      };
      playSection2();
    }
  }, [section1Complete]);

  useEffect(() => {
    if (section2Complete) {
      const playSection3 = async () => {
        const audio = new Audio('/audio/3.mp3');
        try {
          await audio.play();
        } catch (error) {
          console.log('Audio playback failed:', error);
        }
      };
      playSection3();
    }
  }, [section2Complete]);

  return (
    <main className="min-h-screen text-foreground bg-white px-8 bg-gradient-to-b from-blue-700 to-blue-400">
      <motion.div
        className="fixed top-0 w-full flex items-center p-4 z-[9999] bg-transparent backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="">
          {/* <Button variant="outline" className="text-gray-700 hover:text-orange-500 transition-all">Explore All</Button> */}
        </div>
        <div className="flex grow items-center justify-center">
          <Logo className="w-[125px] sm:w-[200px] fill-white" />
        </div>
        <div className="">
          {/* <Button>Log In</Button> */}
        </div>
      </motion.div>
      <div className="relative w-full rounded-xl relative top-24 bg-white/10 border border-white/10 p-16 backdrop-blur-lg min-h-screen">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-semibold text-white mb-8">
            Hello there! Im Sky, you personal travel assistant.
          </h1>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={section1Complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4 mb-16 text-white">
            <h3 className="text-xl font-normal">When is your take off?</h3>
            <button className="w-fit bg-white/30 border shadow-sm text-white px-6 py-2 rounded-full">
              22-30 Oct
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={section2Complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4 mb-16 text-white">
            <h3 className="text-xl font-normal">Great! And how long is your stay? Let me know your trip duration.</h3>
            <button className="w-fit bg-white/30 border shadow-sm text-white px-6 py-2 rounded-full">
              22-30 Oct
            </button>
          </div>
        </motion.section>
        <Transcribe />
        {/* <div className="bg-gradient-to-b from-white/10 to-white/0 absolute backdrop-blur-sm inset-0 top-0 h-24 z-[9999]" /> */}
      </div>
    </main>
  );
} 