import { Coffee } from 'lucide-react';

export const PayMeCoffeeHeader = () => {

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600" />
            <span className="text-amber-800 font-medium">
              Gostou da calculadora? 
            </span>
            <button
              onClick={() => window.open('/donate', '_blank', 'noopener,noreferrer')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer"
              aria-label="Abrir página de doação em nova aba"
              type="button"
            >
              ☕ Pay me a Coffee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};