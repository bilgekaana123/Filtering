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
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
  prices: [
    {
      value: "",
      label: "Any Price",
    },
    {
      value: "0-20",
      label: "0$ - 20$",
    },
    {
      value: "0-50",
      label: "0$ - 50$",
    },
    {
      value: "50-100",
      label: "0$ - 100$",
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

  function handlePriceChange(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("price", term);
    } else {
      params.delete("price");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const checkedColors = searchParams.get("color")?.split(",") || [];
  const checkedSizes = searchParams.get("size")?.split(",") || [];
  const checkedPrices = searchParams.get("price") || "";

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="hidden lg:block w-64 p-2 ">
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
        <AccordionItem value="colors">
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
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color.label}
              </Label>
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="sizes">
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
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {size.label}
              </Label>
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="prices">
          <AccordionTrigger>Prices</AccordionTrigger>
          <AccordionContent>
            <RadioGroup>
              {SubCategories.prices.map((price) => (
                <div className="flex items-center space-x-2" key={price.value}>
                  <RadioGroupItem
                    value={price.value}
                    id={price.value}
                    checked={checkedPrices === price.value}
                    onClick={() => handlePriceChange(price.value)}
                  />
                  <Label className="font-medium" htmlFor={price.value}>
                    {price.label}
                  </Label>
                </div>
              ))}
              <div className="flex justify-between mt-1"></div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {hasFilters && (
        <div className="mt-6">
          <Link href="/" className="text-red-600 hover:underline">
            Remove All Filters
          </Link>
        </div>
      )}
    </div>
  );
}
