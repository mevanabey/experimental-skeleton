import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

export const TabList = () => {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="mb-3 gap-1 bg-transparent">
          <TabsTrigger
            value="tab-1"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          >
            <HouseIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Experiences
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          >
            <PanelsTopLeftIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Hotels
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          >
            <BoxIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Restaurants
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          >
            <BoxIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
            Restaurants
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  );
}

export default TabList;
