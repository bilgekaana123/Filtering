"use client";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FiltersM from "./FiltersM";

export default function MobileFilters() {
  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger
          asChild
          className="flex items-center rounded-2xl border border-gray-500 py-1 px-3 hover:ring-1 ring-gray-400:width"
        >
          <Button variant="outline">
            Filter
            <Filter className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="w-full  h-full">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <FiltersM />
          </SheetHeader>
          <SheetFooter className="w-full mt-4">
            <SheetClose asChild>
              <Button type="submit">Filter Products</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
