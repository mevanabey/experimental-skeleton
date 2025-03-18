"use client";

import { 
  Phone, Mail, Calendar, MoreHorizontal, Star, User2Icon, Clock, FileIcon, 
  MessageCircleIcon, PackageIcon, ListTodoIcon, BarChart3Icon,
  UsersIcon, WalletIcon, Settings2Icon, HelpCircleIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { TabList } from "@/components/comp-4345";
import { IconButtonCards } from "@/components/molecules/icon-button-cards";

const CardContainer = ({ children, title }) => (
  <div className="w-full max-w-md mx-auto mb-8">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
    <div className="flex flex-col gap-4">
      {children}
    </div>
  </div>
);

export default function Dashboard() {
  const quickAccessCards = [
    {
      icon: <User2Icon />,
      title: "CRM",
      link: "/crm"
    },
    {
      icon: <UsersIcon />,
      title: "Team",
      link: "/team"
    },
    {
      icon: <BarChart3Icon />,
      title: "Analytics",
      link: "/analytics"
    },
    {
      icon: <WalletIcon />,
      title: "Finance",
      link: "/finance"
    },
    {
      icon: <PackageIcon />,
      title: "Inventory",
      link: "/inventory"
    },
    {
      icon: <WalletIcon />,
      title: "Products",
      link: "/products"
    },
    {
      icon: <WalletIcon />,
      title: "Services",
      link: "/services"
    },
    // {
    //   icon: <TruckIcon />,
    //   title: "Logistics",
    //   link: "/logistics"
    // },
    // {
    //   icon: <BriefcaseIcon />,
    //   title: "Marketing",
    //   link: "/marketing"
    // },
    {
      icon: <ListTodoIcon />,
      title: "Tasks",
      link: "/tasks"
    },
    {
      icon: <MessageCircleIcon />,
      title: "Chats",
      link: "/chats"
    },
    {
      icon: <FileIcon />,
      title: "Files",
      link: "/files"
    },
    // {
    //   icon: <ClipboardListIcon />,
    //   title: "Projects",
    //   link: "/projects"
    // },
    // {
    //   icon: <LayersIcon />,
    //   title: "Resources",
    //   link: "/resources"
    // },
    // {
    //   icon: <LineChartIcon />,
    //   title: "Reports",
    //   link: "/reports"
    // },
    // {
    //   icon: <DatabaseIcon />,
    //   title: "Database",
    //   link: "/database"
    // },
    // {
    //   icon: <ShieldIcon />,
    //   title: "Security",
    //   link: "/security"
    // },
    // {
    //   icon: <GaugeIcon />,
    //   title: "Performance",
    //   link: "/performance"
    // },
    {
      icon: <Settings2Icon />,
      title: "Settings",
      link: "/settings"
    },
    {
      icon: <HelpCircleIcon />,
      title: "Help",
      link: "/help"
    }
  ];

  return (
    <main className="min-h-screen max-w-5xl mx-auto text-foreground ">
      {/* <Header /> */}

    {/* <div className="rounded-b-xl">
      
    </div> */}

      <div className="px-4 sm:px-8 py-4 sm:py-8 space-y-12">
        <div className="sticky top-16 flex gap-4">
          <div className="flex gap-2 items-center justify-between">
            <TabList />
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

        <IconButtonCards 
          cards={quickAccessCards}
        />

        <CardContainer title="Design 1: Compact Cards with Icons">
          {[1, 2].map(id => (
            <div key={`compact-${id}`} className="bg-background border-zinc-700/20 shadow-md text-zinc-200 rounded-lg shadow-sm p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">John Doe</h4>
                  <p className="text-sm text-gray-500">Marketing Director, Acme Inc.</p>
                </div>
                <button 
                  onClick={() => {}} 
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {<Star size={18} className="fill-yellow-400 text-yellow-400" />}
                </button>
              </div>
              
              <div className="mt-2 flex gap-4">
                <div className="flex items-center text-xs text-gray-600">
                  <Clock size={14} className="mr-1" />
                  <span>2d ago</span>
                </div>
                <div className="flex items-center text-xs text-blue-600">
                  <span className="bg-blue-100 px-2 py-0.5 rounded-full">Lead</span>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                <div className="flex gap-3">
                  <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Phone size={16} />
                  </button>
                  <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Mail size={16} />
                  </button>
                  <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Calendar size={16} />
                  </button>
                </div>
                <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </CardContainer>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-4xl tracking-tight font-semibold text-neutral-100">
            Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
              <CardContent className="p-0 space-y-2">
                <p className="text-md">Best Things to Do</p>
              </CardContent>
            </Card>
            <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
              <CardContent className="p-0 space-y-2">
                <p className="text-md font-medium">Things to Know</p>
              </CardContent>
            </Card>
            <Card className="p-4 gap-4 bg-zinc-800 border-zinc-700/80 shadow-md text-zinc-200">
              <CardContent className="p-0 space-y-2">
                <p className="text-md">Visa Requirements</p>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </main>
  );
} 