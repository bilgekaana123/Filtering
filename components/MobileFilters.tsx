import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

export default function MobileFilters() {
  return (
    <div className="flex lg:hidden">
      <Drawer>
        <DrawerTrigger className="flex items-center rounded-2xl border border-gray-500 py-1 px-3 hover:ring-1 ring-gray-400">
          <div>Filter</div>
          <Filter className="w-4 h-4 ml-2" />
        </DrawerTrigger>
        <DrawerContent className="w-full h-full">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
