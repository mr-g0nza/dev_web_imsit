"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from './ui/button';
import { Filter, X } from 'lucide-react';
import type { Wheel } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export type FilterState = {
  brands: string[];
  sizes: number[];
  types: string[];
  priceRange: [number, number];
  search: string;
};

type FiltersProps = {
  brands: string[];
  sizes: number[];
  types: Wheel['type'][];
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  resultsCount: number;
};

export function Filters({ brands, sizes, types, filters, setFilters, resultsCount }: FiltersProps) {
  
  const handleCheckboxChange = (category: 'brands' | 'sizes' | 'types', value: string | number) => {
    setFilters(prev => {
      const list = prev[category] as (string|number)[];
      const newList = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
      return { ...prev, [category]: newList };
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      sizes: [],
      types: [],
      priceRange: [0, 600],
      search: '',
    });
  };

  const activeFilterCount = filters.brands.length + filters.sizes.length + filters.types.length + (filters.search ? 1 : 0) + (filters.priceRange[0] > 0 || filters.priceRange[1] < 600 ? 1 : 0)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"><Filter size={20}/> Фильтры</CardTitle>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="flex gap-2">
            <X size={16}/> Очистить
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Input
            placeholder="Поиск по названию..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        <Accordion type="multiple" defaultValue={['price', 'brand']} className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger>Ценовой диапазон</AccordionTrigger>
            <AccordionContent>
              <div className="px-1">
                <Slider
                  min={0}
                  max={600}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                />
                <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger>Бренд</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand}`} checked={filters.brands.includes(brand)} onCheckedChange={() => handleCheckboxChange('brands', brand)} />
                    <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Размер (дюймы)</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox id={`size-${size}`} checked={filters.sizes.includes(size)} onCheckedChange={() => handleCheckboxChange('sizes', size)} />
                    <Label htmlFor={`size-${size}`} className="font-normal">{size}"</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="type">
            <AccordionTrigger>Тип</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {types.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={`type-${type}`} checked={filters.types.includes(type)} onCheckedChange={() => handleCheckboxChange('types', type)} />
                    <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
