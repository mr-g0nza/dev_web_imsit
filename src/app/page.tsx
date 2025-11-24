import { Catalog } from '@/components/catalog';
import { wheels, brands, sizes, types } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Catalog allWheels={wheels} brands={brands} sizes={sizes} types={types} />
    </div>
  );
}
