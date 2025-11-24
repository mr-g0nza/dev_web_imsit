"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Ваша корзина пуста",
        description: "Добавьте товары в корзину перед оформлением заказа.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would redirect to a payment page.
    console.log("Processing order for a total of:", cartTotal);
    toast({
      title: "Заказ размещен!",
      description: "Спасибо за покупку. Ваш заказ обрабатывается.",
    });
    clearCart();
  };


  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Ваша корзина</h1>
      {cartItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 text-center">
            <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Ваша корзина пуста</h2>
            <p className="mt-2 text-muted-foreground">Похоже, вы еще не добавили ни одного диска.</p>
            <Button asChild className="mt-4">
              <Link href="/">Начать покупки</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map(({ wheel, quantity }) => (
                    <li key={wheel.id} className="flex items-center p-4">
                      <Image
                        src={wheel.imageUrl}
                        alt={wheel.name}
                        data-ai-hint={wheel.imageHint}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="ml-4 flex-grow">
                        <p className="font-semibold">{wheel.name}</p>
                        <p className="text-sm text-muted-foreground">${wheel.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(wheel.id, quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(wheel.id, quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(wheel.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Итог заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Подытог</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Всего</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  Перейти к оформлению
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
