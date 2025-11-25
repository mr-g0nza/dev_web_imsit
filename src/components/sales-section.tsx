"use client";

import type { Wheel } from "@/lib/types";
import { ProductCard } from "./product-card";
import { Flame } from "lucide-react";

type SalesSectionProps = {
    wheels: Wheel[];
};

export function SalesSection({ wheels }: SalesSectionProps) {
  return (
    <section>
        <div className="mb-6 flex items-center gap-2">
             <Flame className="h-7 w-7 text-destructive" />
            <h2 className="text-2xl font-bold tracking-tight">Горячие предложения</h2>
        </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wheels.map((wheel) => (
          <ProductCard key={wheel.id} wheel={wheel} />
        ))}
      </div>
    </section>
  );
}
