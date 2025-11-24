import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, User } from 'lucide-react';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

// Mock data, in a real app this would come from an API/session
const isAuthenticated = true; 
const user = {
  name: 'Алекс Райдер',
  email: 'alex.ryder@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
};
const orders: Order[] = [
  { id: 'ORD123', date: '2023-10-26', total: 500, status: 'Shipped', items: [{ wheel: {id: 'w1', name: 'Vortex R1', brand: 'Momentum', size: 18, type: 'Alloy', price: 250, imageUrl: 'https://picsum.photos/seed/wheel1/400/400', imageHint: 'alloy wheel'}, quantity: 2}] },
  { id: 'ORD124', date: '2023-11-15', total: 1100, status: 'Processing', items: [{ wheel: { id: 'w8', name: 'Velocity V2', brand: 'Velocity', size: 19, type: 'Chrome', price: 550, imageUrl: 'https://picsum.photos/seed/wheel8/400/400', imageHint: 'alloy wheel' }, quantity: 2}]},
  { id: 'ORD125', date: '2023-09-02', total: 360, status: 'Delivered', items: [{ wheel: { id: 'w7', name: 'Stark Classic', brand: 'Stark', size: 16, type: 'Steel', price: 180, imageUrl: 'https://picsum.photos/seed/wheel7/400/400', imageHint: 'white wheel' }, quantity: 2}]},
];

const OrderHistory = () => {
    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'default';
            case 'Shipped': return 'secondary';
            case 'Processing': return 'outline';
            default: return 'outline';
        }
    }

    const getStatusText = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'Доставлен';
            case 'Shipped': return 'Отправлен';
            case 'Processing': return 'В обработке';
            default: return status;
        }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package size={22}/> История заказов</CardTitle>
          <CardDescription>Просмотрите ваши прошлые заказы.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 rounded-lg border">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className='text-right'>
                  <Badge variant={getStatusVariant(order.status)}>{getStatusText(order.status)}</Badge>
                  <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
};

const NotAuthenticated = () => (
    <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
            <CardTitle>Получите доступ к своему аккаунту</CardTitle>
            <CardDescription>Войдите или создайте аккаунт, чтобы увидеть свой профиль и историю заказов.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
            <Button asChild>
                <Link href="/login">Войти</Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/signup">Зарегистрироваться</Link>
            </Button>
        </CardContent>
    </Card>
);

export default function ProfilePage() {
  if (!isAuthenticated) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
            <NotAuthenticated />
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Редактировать профиль</Button>
          </CardContent>
        </Card>
        
        <OrderHistory />
      </div>
    </div>
  );
}
