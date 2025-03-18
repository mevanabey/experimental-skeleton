"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/brand/ec/logo-svg";

export const Header = () => {
  return (
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
  );
} 

export default Header;