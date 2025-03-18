"use client";

import { 
  User2Icon, FileIcon, 
  MessageCircleIcon, PackageIcon, ListTodoIcon, BarChart3Icon,
  UsersIcon, WalletIcon, Settings2Icon, HelpCircleIcon, 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { IconButtonCards } from "@/components/molecules/icon-button-cards";
import { MobileCardWithDialog } from "@/components/molecules/cards-with-dialog"

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

<div className="grid gap-4 md:grid-cols-2">
        {/* CRM Contact Card */}
        <div>
          <h2 className="text-lg font-semibold mb-2">CRM Contact</h2>
          <MobileCardWithDialog
            title="John Doe"
            subtitle="CEO at Acme Inc."
            description="Last contacted 3 days ago regarding the new product launch"
            image="/placeholder.svg?height=40&width=40"
            initials="JD"
            status="in-progress"
            timestamp="Updated 2 hours ago"
            tags={["Client", "VIP"]}
            isSelectable={true}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            expandable={true}
            type="crm"
            detailData={{
              email: "john.doe@acme.com",
              phone: "+1 (555) 123-4567",
              company: "Acme Inc.",
              address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
              lastContacted: "3 days ago",
              nextFollowUp: "Tomorrow at 2:00 PM",
              notes:
                "John is interested in our enterprise plan. He needs a proposal by next week. His company is expanding to Europe and needs our services for their international team.",
            }}
            expandedContent={
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="col-span-2">john.doe@acme.com</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="col-span-2">+1 (555) 123-4567</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="col-span-2">Acme Inc.</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Project/Task Card */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Project Task</h2>
          <MobileCardWithDialog
            title="Redesign Homepage"
            subtitle="Website Revamp Project"
            description="Update the homepage with new branding and improve mobile responsiveness"
            status="in-progress"
            priority="high"
            progress={65}
            timestamp="Due in 2 days"
            tags={["Design", "Frontend"]}
            isSelectable={true}
            expandable={true}
            type="task"
            detailData={{
              assignedTo: "Sarah Johnson",
              startDate: "Mar 10, 2025",
              dueDate: "Mar 20, 2025",
              description:
                "The homepage needs a complete overhaul to match our new brand guidelines. Focus on improving the mobile experience while maintaining the desktop functionality. Collaborate with the marketing team to ensure all key messages are prominently displayed.",
              subtasks: [
                { id: 1, title: "Research competitors", completed: true },
                { id: 2, title: "Create wireframes", completed: true },
                { id: 3, title: "Design mockups", completed: false },
                { id: 4, title: "Implement responsive layout", completed: false },
                { id: 5, title: "Test on multiple devices", completed: false },
                { id: 6, title: "Get stakeholder approval", completed: false },
              ],
            }}
            expandedContent={
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Assigned to:</span>
                  <span className="col-span-2">Sarah Johnson</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Start date:</span>
                  <span className="col-span-2">Mar 10, 2025</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">End date:</span>
                  <span className="col-span-2">Mar 20, 2025</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Inventory Item Card */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Inventory Item</h2>
          <MobileCardWithDialog
            title="Wireless Headphones"
            subtitle="SKU: WH-2023-BLK"
            description="Noise-cancelling wireless headphones with 30-hour battery life"
            image="/placeholder.svg?height=40&width=40"
            status="on-hold"
            priority="medium"
            timestamp="Updated yesterday"
            tags={["Electronics", "Audio"]}
            onEdit={() => {}}
            onDelete={() => {}}
            expandable={true}
            type="inventory"
            detailData={{
              sku: "WH-2023-BLK",
              stock: "24 units",
              price: "$149.99",
              cost: "$89.99",
              margin: "40%",
              warehouse: "Warehouse B",
              aisle: "12",
              shelf: "C3",
              bin: "45",
              description:
                "Premium noise-cancelling wireless headphones with 30-hour battery life. Features include Bluetooth 5.0, touch controls, and voice assistant compatibility. Available in black, white, and blue.",
              history: [
                { date: "Mar 15, 2025", action: "Stock count", quantity: "+2", user: "Alex Kim" },
                { date: "Mar 10, 2025", action: "Shipment received", quantity: "+30", user: "Jamie Lee" },
                { date: "Mar 5, 2025", action: "Order fulfilled", quantity: "-5", user: "Taylor Wong" },
                { date: "Feb 28, 2025", action: "Order fulfilled", quantity: "-3", user: "Taylor Wong" },
              ],
            }}
            expandedContent={
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">In stock:</span>
                  <span className="col-span-2">24 units</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="col-span-2">$149.99</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="col-span-2">Warehouse B, Shelf 12</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Product/Service Card */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Product</h2>
          <MobileCardWithDialog
            title="Premium Subscription"
            subtitle="$29.99/month"
            description="Access to all premium features including advanced analytics and priority support"
            status="completed"
            priority="low"
            timestamp="Last updated Mar 15, 2025"
            tags={["Subscription", "Featured"]}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            expandable={true}
            type="product"
            detailData={{
              price: "$29.99/month",
              category: "Subscription",
              created: "Jan 15, 2025",
              updated: "Mar 15, 2025",
              customers: "1,245",
              revenue: "$37,324.55",
              growth: "+12.5%",
              churn: "2.3%",
              description:
                "Our Premium Subscription plan offers businesses of all sizes access to our complete suite of tools. With advanced analytics, priority support, and unlimited exports, this plan is perfect for growing teams that need powerful insights and reliable service.",
              features: [
                "Advanced analytics with custom reports",
                "Priority 24/7 support via phone and email",
                "Unlimited data exports in multiple formats",
                "Up to 25 user accounts",
                "API access with 10,000 requests/day",
                "White-label reporting options",
                "Custom integrations with your existing tools",
              ],
            }}
            expandedContent={
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Features:</span>
                  <span className="col-span-2">Advanced analytics, Priority support, Custom exports</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Customers:</span>
                  <span className="col-span-2">1,245 active</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="col-span-2">$37,324.55 monthly</span>
                </div>
              </div>
            }
          />
        </div>

      </div>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-4xl tracking-tight font-semibold text-neutral-100">
            Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 gap-4 bg-background border-zinc-700/80 shadow-md text-zinc-200">
              <CardContent className="p-0 space-y-2">
                <p className="text-md">Best Things to Do</p>
              </CardContent>
            </Card>
            <Card className="p-4 gap-4 bg-background border-zinc-700/80 shadow-md text-zinc-200">
              <CardContent className="p-0 space-y-2">
                <p className="text-md font-medium">Things to Know</p>
              </CardContent>
            </Card>
            <Card className="p-4 gap-4 bg-background border-zinc-700/80 shadow-md text-zinc-200">
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