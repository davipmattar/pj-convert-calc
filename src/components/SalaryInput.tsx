import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type SalaryPeriod = 'hourly' | 'monthly' | 'yearly';

interface SalaryInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: string;
  period: SalaryPeriod;
  onPeriodChange: (period: SalaryPeriod) => void;
}

export const SalaryInput = ({ value, onChange, currency, period, onPeriodChange }: SalaryInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d.,]/g, '');
    onChange(inputValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="salary" className="text-sm font-medium text-foreground">
          Salário Bruto ({currency})
        </Label>
        <RadioGroup 
          value={period} 
          onValueChange={onPeriodChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hourly" id="hourly" />
            <Label htmlFor="hourly" className="text-sm cursor-pointer">Hora</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="text-sm cursor-pointer">Mensal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yearly" id="yearly" />
            <Label htmlFor="yearly" className="text-sm cursor-pointer">Anual</Label>
          </div>
        </RadioGroup>
      </div>
      <Input
        id="salary"
        type="text"
        placeholder="0,00"
        value={value}
        onChange={handleChange}
        className="text-lg bg-white/80 backdrop-blur-sm border-brand-blue/20 hover:border-brand-blue/40 focus:border-brand-blue transition-colors"
      />
    </div>
  );
};