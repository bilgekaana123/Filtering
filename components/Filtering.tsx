"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SortOptions = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Price: Low to High",
    value: "price-asc",
  },
  {
    name: "Price: High to Low",
    value: "price-desc",
  },
] as const;

export default function Filtering() {
  const [filter, setFilter] = useState({ sort: "none" });

  console.log(filter);

  return (
    <div className="mx-auto p-8 max-w-6xl">
      <div className="flex flex-row justify-between border border-gray-300 rounded-md p-2">
        <h1 className="text-semibold text-3xl">Products</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            Sort By
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center">
            {SortOptions.map((options) => (
              <Button
                className={cn(
                  "flex items-center justify-start w-full  p-2 lg:p-4 text-sm",
                  {
                    "text-black": options.value === filter.sort,
                    "text-gray-400": options.value !== filter.sort,
                  },
                )}
                variant="ghost"
                key={options.name}
                onClick={() =>
                  setFilter((prev) => ({ ...prev, sort: options.value }))
                }
              >
                {options.name}
              </Button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
