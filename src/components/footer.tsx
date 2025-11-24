import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <Car className="mr-2 h-6 w-6 text-primary" />
            <span className="text-lg font-bold">WheelDeals</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WheelDeals. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
