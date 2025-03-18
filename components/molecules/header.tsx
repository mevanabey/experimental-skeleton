"use client";

import { BellIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="sticky top-0 z-[99] w-full backdrop-blur-xl flex items-center justify-between p-4">
        <div className="bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">M</div>
        <BellIcon strokeWidth="1.5" />
  </div>
  );
};

export default Header;
