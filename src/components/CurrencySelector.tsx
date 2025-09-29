import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Euro, PoundSterling } from "lucide-react";

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD';

interface CurrencySelectorProps {
  value: Currency;
  onValueChange: (value: Currency) => void;
}

const currencies = [
  { value: 'USD' as Currency, label: 'Dólar Americano (USD)', icon: DollarSign },
  { value: 'EUR' as Currency, label: 'Euro (EUR)', icon: Euro },
  { value: 'GBP' as Currency, label: 'Libra Esterlina (GBP)', icon: PoundSterling },
  { value: 'CAD' as Currency, label: 'Dólar Canadense (CAD)', icon: DollarSign },
];

export const CurrencySelector = ({ value, onValueChange }: CurrencySelectorProps) => {
  const selectedCurrency = currencies.find(c => c.value === value);
  const Icon = selectedCurrency?.icon || DollarSign;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Moeda de Recebimento
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-brand-blue/20 hover:border-brand-blue/40 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => {
            const CurrencyIcon = currency.icon;
            return (
              <SelectItem key={currency.value} value={currency.value}>
                <div className="flex items-center gap-2">
                  <CurrencyIcon className="h-4 w-4" />
                  {currency.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};