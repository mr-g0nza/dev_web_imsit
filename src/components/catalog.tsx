"use client";

import React, { useState, useMemo } from 'react';
import type { Wheel } from '@/lib/types';
import { Filters, type FilterState } from '@/components/filters';
import { ProductCard } from '@/components/product-card';
import { AnimatePresence, motion } from 'framer-motion';

type CatalogProps = {
  allWheels: Wheel[];
  brands: string[];
  sizes: number[];
  types: Wheel['type'][];
};

export function Catalog({ allWheels, brands, sizes, types }: CatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    sizes: [],
    types: [],
    priceRange: [0, 600],
    search: '',
  });

  const filteredWheels = useMemo(() => {
    return allWheels.filter((wheel) => {
      const { brands, sizes, types, priceRange, search } = filters;
      if (brands.length > 0 && !brands.includes(wheel.brand)) return false;
      if (sizes.length > 0 && !sizes.includes(wheel.size)) return false;
      if (types.length > 0 && !types.includes(wheel.type)) return false;
      if (wheel.price < priceRange[0] || wheel.price > priceRange[1]) return false;
      if (search && !wheel.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allWheels, filters]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
        <Filters
          brands={brands}
          sizes={sizes}
          types={types}
          filters={filters}
          setFilters={setFilters}
          resultsCount={filteredWheels.length}
        />
      </aside>
      <main className="lg:col-span-3">
        {filteredWheels.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {filteredWheels.map((wheel, index) => (
                  <motion.div
                    key={wheel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard wheel={wheel} />
                  </motion.div>
                ))}
              </AnimatePresence>
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-lg font-medium text-muted-foreground">Диски не найдены</p>
            <p className="text-sm text-muted-foreground/70">Попробуйте изменить фильтры.</p>
          </div>
        )}
      </main>
    </div>
  );
}
