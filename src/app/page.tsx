import { Catalog } from '@/components/catalog';
import { SalesSection } from '@/components/sales-section';
import { wheels, brands, sizes, types } from '@/lib/mock-data';

export default function Home() {
  const saleWheels = wheels.slice(0, 4).map(wheel => ({
    ...wheel,
    originalPrice: wheel.price,
    price: Math.round(wheel.price * 0.8), // 20% скидка
  }));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <SalesSection wheels={saleWheels} />
      <Catalog allWheels={wheels} brands={brands} sizes={sizes} types={types} />
    </div>
  );
}
