"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Bot, Loader2 } from 'lucide-react';
import { wheels } from '@/lib/mock-data';
import type { Wheel } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { AnimatePresence, motion } from 'framer-motion';

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Wheel[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setRecommendations([]);

    // AI logic would go here. For now, we simulate a delay and show random wheels.
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomWheels = [...wheels].sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecommendations(randomWheels);
    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bot /> AI Рекомендатор дисков
            </CardTitle>
            <CardDescription>
              Расскажите нам о своем автомобиле и стиле вождения, и наш ИИ подберет для вас идеальные диски.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="car-model">Марка и модель автомобиля</Label>
                  <Input id="car-model" placeholder="например, Toyota Camry 2022" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driving-style">Основной стиль вождения</Label>
                  <Select required>
                    <SelectTrigger id="driving-style">
                      <SelectValue placeholder="Выберите стиль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">Городская езда</SelectItem>
                      <SelectItem value="highway">Поездки по трассе</SelectItem>
                      <SelectItem value="sport">Спортивный стиль</SelectItem>
                      <SelectItem value="offroad">Бездорожье</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Что для вас важнее всего?</Label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[ 'Производительность', 'Долговечность', 'Стиль', 'Бюджет' ].map(priority => (
                     <div key={priority} className="flex items-center space-x-2">
                        <Checkbox id={`priority-${priority.toLowerCase()}`} />
                        <Label htmlFor={`priority-${priority.toLowerCase()}`} className='font-normal'>{priority}</Label>
                     </div>
                  ))}
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Подбираем диски...
                  </>
                ) : (
                  'Получить рекомендации'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {(loading || recommendations.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Наши рекомендации</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3 rounded-lg border p-4">
                      <div className="aspect-square w-full animate-pulse rounded-md bg-muted"></div>
                      <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                   <AnimatePresence>
                    {recommendations.map((wheel, index) => (
                      <motion.div
                        key={wheel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ProductCard wheel={wheel} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
