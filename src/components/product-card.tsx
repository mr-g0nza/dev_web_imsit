"use client";

import Image from 'next/image';
import type { Wheel } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';

type ProductCardProps = {
  wheel: Wheel;
};

export function ProductCard({ wheel }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={wheel.imageUrl}
            alt={wheel.name}
            data-ai-hint={wheel.imageHint}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold">{wheel.name}</CardTitle>
          <Badge variant="secondary">{wheel.brand}</Badge>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{wheel.size}"</span>
          <span>&bull;</span>
          <span>{wheel.type}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">${wheel.price}</p>
        <Button onClick={() => addToCart(wheel)} size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
