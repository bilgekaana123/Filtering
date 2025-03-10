"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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

export default function SortBy() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const filter = searchParams.get("sortBy")?.toString();

  function handleSortChange(sortValue: string) {
    /*  setFilter({ sort: sortValue }); */
    if (sortValue === "none") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", sortValue);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden sm:flex sm:ml-4">
        {
          <div className="ml-2 cursor-pointer">
            {filter === "price-desc" ? (
              <label>Price: High to Low</label>
            ) : filter === "price-asc" ? (
              <label>Price: Low to High</label>
            ) : (
              <label>Sort By</label>
            )}
          </div>
        }{" "}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SortOptions.map((options) => (
          <DropdownMenuItem
            key={options.value}
            className="flex flex-col items-center"
          >
            <Button
              className={cn(
                "flex items-center justify-start w-full  p-2 lg:p-4 text-sm",
                {
                  "text-black": options.value === filter,
                  "text-gray-500": options.value !== filter,
                },
              )}
              variant="ghost"
              key={options.name}
              onClick={() => handleSortChange(options.value)}
            >
              {options.name}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
