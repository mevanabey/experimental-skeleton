"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { LayoutDashboardIcon, BellIcon, TablePropertiesIcon, AudioLinesIcon, MapIcon } from "lucide-react";

export const MainNavigation = () => {
  return (
    <div className="fixed bottom-4 inset-x-0 mx-auto w-max h-fit flex items-center gap-8 py-4 px-8 z-[99] backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-200/80 text-foreground/80 bg-zinc-100 dark:bg-background dark:border-zinc-700/80 dark:text-foreground/80">


    <LayoutDashboardIcon strokeWidth="1.5" />
    <TablePropertiesIcon strokeWidth="1.5" />
    
    <Drawer onOpenChange={() => console.log('open')}>
      <DrawerTrigger className="relative px-6">
        <AudioLinesIcon className="text-white" />
        <div
          className="absolute inset-x-0 mx-auto -top-6 animate-pulse rounded-full h-18 w-18 bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_#0738e8,_cyan)] flex items-center justify-center"
          style={{
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        >
          <AudioLinesIcon size="32" className="text-white/50" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-full bg-blue-800/80 backdrop-blur-lg border-blue-800">
        <DrawerHeader>
          <DrawerTitle className="text-white">Lets plan your first trip together?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          submit
          <DrawerClose>
            cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

    <MapIcon strokeWidth="1.5" />
    <BellIcon strokeWidth="1.5" />
  </div>
  );
};

export default MainNavigation;
