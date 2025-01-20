// components/ResetFiltersButton.tsx
"use client";

import { Button } from "@/components/ui/button";

interface ResetFiltersButtonProps {
  onClick: () => void;
}

export default function ResetFiltersButton({
  onClick,
}: ResetFiltersButtonProps) {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      Reset Filters
    </Button>
  );
}
