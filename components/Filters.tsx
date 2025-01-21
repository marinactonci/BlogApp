"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResetFiltersButton from "@/components/ResetFiltersButton";

interface FiltersProps {
  allCategories: { id: number; name: string }[];
}

export default function Filters({ allCategories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values from the URL
  const author = searchParams.get("author") || "";
  const title = searchParams.get("title") || "";
  const categories = searchParams.get("categories") || "";
  const sort = searchParams.get("sort") || "desc";

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when filters are applied
    newSearchParams.set("page", "1");

    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }

    router.push(`/?${newSearchParams.toString()}`);
  };

  // Handle category checkbox changes
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const categoryIds = categories
      ? categories.split(",").map((id) => id.trim())
      : [];
    let updatedCategoryIds;
    if (checked) {
      updatedCategoryIds = [...categoryIds, categoryId];
    } else {
      updatedCategoryIds = categoryIds.filter((id) => id !== categoryId);
    }
    handleFilterChange("categories", updatedCategoryIds.join(","));
  };

  // Handle reset filters
  const handleResetFilters = () => {
    router.push("/");
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search by Author */}
      <div>
        <Input
          name="author"
          placeholder="Search by author..."
          value={author}
          onChange={(e) => handleFilterChange("author", e.target.value)}
        />
      </div>

      {/* Search by Title */}
      <div>
        <Input
          name="title"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
        />
      </div>

      {/* Filter by Categories */}
      <div>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                name="categories"
                value={category.id.toString()}
                checked={categories.split(",").includes(category.id.toString())}
                onCheckedChange={(checked) =>
                  handleCategoryChange(
                    category.id.toString(),
                    checked as boolean
                  )
                }
              />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <Select
          name="sort"
          value={sort}
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Filters Button */}
      <div className="flex gap-2">
        <ResetFiltersButton onClick={handleResetFilters} />
      </div>
    </div>
  );
}
