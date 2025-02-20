"use client";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SubCategories = {
  categories: [
    {
      name: "T-Shirts",
      selected: true,
      href: "#",
    },
    {
      name: "SweatShirts",
      href: "#",
      selected: false,
    },
    {
      name: "Jeans",
      href: "#",
      selected: false,
    },
  ],
  colors: [
    {
      value: "white",
      label: "White",
    },
    {
      value: "biege",
      label: "Biege",
    },
    {
      value: "blue",
      label: "Blue",
    },
    {
      value: "yellow",
      label: "Yellow",
    },
    {
      value: "green",
      label: "Green",
    },
    {
      value: "purple",
      label: "Purple",
    },
  ],
};

export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleColorChange(term: string, isChecked: boolean) {
    const params = new URLSearchParams(searchParams);
    const currentColors = params.get("color")?.split(",") || [];

    let newColors: string[];
    if (isChecked) {
      newColors = [...new Set([...currentColors, term])];
    } else {
      newColors = currentColors.filter((c) => c !== term);
    }

    // Update or remove the color parameter
    if (newColors.length > 0) {
      params.set("color", newColors.join(","));
    } else {
      params.delete("color");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const checkedColors = searchParams.get("color")?.split(",") || [];

  return (
    <div className="hidden lg:block">
      {/* Categories */}
      <ul className="space-y-1 border-b border-gray-200 pb-6">
        {SubCategories.categories.map((category) => (
          <li key={category.name}>
            <Button
              disabled={!category.selected}
              variant="ghost"
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Colors</AccordionTrigger>
          {SubCategories.colors.map((color) => (
            <AccordionContent
              className="flex items-center space-x-2"
              key={color.value}
            >
              <Checkbox
                id={color.value}
                checked={checkedColors.includes(color.value)}
                onCheckedChange={(checked) =>
                  handleColorChange(color.value, checked as boolean)
                }
              />
              <Label
                htmlFor={color.value}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color.label}
              </Label>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
