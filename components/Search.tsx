"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div>
      <div className="flex flex-row items-center">
        <Input
          defaultValue={searchParams.get("query")?.toString()}
          type="text"
          placeholder="Search Products"
          className="w-full"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button className="ml-2" variant="ghost">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
