"use client";

import { LayoutDashboardIcon, BellIcon, TablePropertiesIcon, AudioLinesIcon, MapIcon } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { TabList } from "@/components/comp-434";

export default function Dashboard() {

  return (
    <main className="min-h-screen max-w-5xl mx-auto text-foreground bg-zinc-900">
      {/* <Header /> */}

    {/* <div className="rounded-b-xl">
      
    </div> */}

      <div className="px-4 sm:px-8 py-4 sm:py-8 space-y-8">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <div className="bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center">M</div>
            <h2 className="text-2xl sm:text-4xl tracking-tight font-semibold text-neutral-100">
              Hi, Mevan!
            </h2>
          </div>
        </div>
      <Card className="bg-blue-800 border-none shadow-md">
        <CardContent>
          <p className="text-neutral-100 text-xl font-medium">Looks like you don&apos;t have any upcoming trips.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button size="lg">Plan a Trip</Button>
          <Button variant="ghost" className="text-neutral-300">View Previous Trips</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl sm:text-4xl tracking-tight font-semibold text-neutral-100">
          Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
            <CardContent className="p-0 space-y-2">
              <p className="text-md">Best Things to Do</p>
            </CardContent>
            {/* <CardFooter className="flex justify-between p-0">
              <Button variant="ghost" className="p-0">View Previous Trips</Button>
            </CardFooter> */}
          </Card>
          <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
            <CardContent className="p-0 space-y-2">
              <p className="text-md font-medium">Things to Know</p>
              {/* <p className="text-xs">
              From navigating the heat to local phrases and dress codes, we've got all the insider info on what you need to know before visiting Sri Lanka.
              </p> */}
            </CardContent>
            {/* <CardFooter className="flex justify-between p-0">
              <Button variant="ghost" className="p-0">View Previous Trips</Button>
            </CardFooter> */}
          </Card>
          <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
            <CardContent className="p-0 space-y-2">
              <p className="text-md">Visa Requirements</p>
              {/* <p className="text-xs">
                Here’s our guide to navigating the entry requirements for visiting Sri Lanka as a tourist, with information on visa types, costs and how to apply for one.
              </p> */}
            </CardContent>
            {/* <CardFooter className="flex justify-between p-0">
              <Button variant="ghost" className="p-0">View Previous Trips</Button>
            </CardFooter> */}
          </Card>
        </div>
      </div>

    <TabList />

      <div className="fixed bottom-8 inset-x-0 mx-auto w-max h-fit flex items-center gap-8 py-4 px-8 z-[9999]  backdrop-blur-sm rounded-full text-neutral-100 bg-zinc-800">
        <LayoutDashboardIcon />
        <TablePropertiesIcon />
        
          <Drawer onOpenChange={() => console.log('open')}>
            <DrawerTrigger className="relative px-6">
            <AudioLinesIcon />
            <div
              className="absolute inset-x-0 mx-auto -top-6 animate-pulse rounded-full h-18 w-18 bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_#0738e8,_cyan)] flex items-center justify-center"
              style={{
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.5)',
              }}
            >
              <AudioLinesIcon size="32" className="text-white/50" />
            </div>
              {/* <div className="p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full absolute inset-x-0 mx-auto -top-7 shadow-md  w-max h-fit text-white">
                <AudioLinesIcon size="32" />
              </div> */}
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

        <MapIcon />
        <BellIcon />
      </div>
      </div>
    </main>
  );
} 