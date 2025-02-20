"use client";
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
  sizes: [
    {
      value: "S",
      label: "S",
    },
    {
      value: "M",
      label: "M",
    },
    {
      value: "L",
      label: "L",
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

  function handleSizeChange(term: string, isChecked: boolean) {
    const params = new URLSearchParams(searchParams);
    const currentSizes = params.get("size")?.split(",") || [];

    let newSizes: string[];
    if (isChecked) {
      newSizes = [...new Set([...currentSizes, term])];
    } else {
      newSizes = currentSizes.filter((c) => c !== term);
    }

    if (newSizes.length > 0) {
      params.set("size", newSizes.join(","));
    } else {
      params.delete("size");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const checkedColors = searchParams.get("color")?.split(",") || [];
  const checkedSizes = searchParams.get("size")?.split(",") || [];

  return (
    <div className="hidden lg:block">
      {/* Categories */}
      <ul className="space-y-4 border-b border-gray-200 pb-6">
        {SubCategories.categories.map((category) => (
          <li key={category.name}>
            <button
              disabled={!category.selected}
              className="text-left disabled:cursor-not-allowed disabled:opacity-60"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <Accordion type="multiple" className="w-full">
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
        <AccordionItem value="item-2">
          <AccordionTrigger>Sizes</AccordionTrigger>
          {SubCategories.sizes.map((size) => (
            <AccordionContent
              className="flex items-center space-x-2"
              key={size.value}
            >
              <Checkbox
                id={size.value}
                checked={checkedSizes.includes(size.value)}
                onCheckedChange={(checked) =>
                  handleSizeChange(size.value, checked as boolean)
                }
              />
              <Label
                htmlFor={size.value}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {size.label}
              </Label>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
