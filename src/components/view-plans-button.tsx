"use client";

import { Button } from "@/components/ui/button";

export default function ViewPlansButton() {
  const handleClick = () => {
    document.querySelector('[data-value="plans"]')?.click();
  };

  return <Button onClick={handleClick}>View Available Plans</Button>;
}
