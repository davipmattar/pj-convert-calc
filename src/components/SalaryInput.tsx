import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SalaryInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: string;
}

export const SalaryInput = ({ value, onChange, currency }: SalaryInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d.,]/g, '');
    onChange(inputValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="salary" className="text-sm font-medium text-foreground">
        Salário Bruto ({currency})
      </Label>
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