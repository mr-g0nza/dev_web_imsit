"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, User, LogOut } from 'lucide-react';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data
const orders: Order[] = [
  { id: 'ORD123', date: '2023-10-26', total: 500, status: 'Shipped', items: [{ wheel: {id: 'w1', name: 'Vortex R1', brand: 'Momentum', size: 18, type: 'Легкосплавные', price: 250, originalPrice: 250, imageUrl: 'https://picsum.photos/seed/wheel1/400/400', imageHint: 'alloy wheel'}, quantity: 2}] },
  { id: 'ORD124', date: '2023-11-15', total: 1100, status: 'Processing', items: [{ wheel: { id: 'w8', name: 'Velocity V2', brand: 'Velocity', size: 19, type: 'Хром', price: 550, originalPrice: 550, imageUrl: 'https://picsum.photos/seed/wheel8/400/400', imageHint: 'alloy wheel' }, quantity: 2}]},
  { id: 'ORD125', date: '2023-09-02', total: 360, status: 'Delivered', items: [{ wheel: { id: 'w7', name: 'Stark Classic', brand: 'Stark', size: 16, type: 'Стальные', price: 180, originalPrice: 180, imageUrl: 'https://picsum.photos/seed/wheel7/400/400', imageHint: 'white wheel' }, quantity: 2}]},
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
          {orders.length > 0 ? (
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
          ) : (
            <p className="text-muted-foreground text-center">У вас еще нет заказов.</p>
          )}
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

const ProfileSkeleton = () => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-36" />
      </CardContent>
    </Card>
  </div>
);

export default function ProfilePage() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
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
                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} data-ai-hint="person portrait" />}
                <AvatarFallback>{user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.displayName || 'Пользователь'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                <LogOut />
                <span className="sr-only">Выйти</span>
              </Button>
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
