import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

export interface Parameters {
  taxaConversao: number;
  iss: number;
  proLabore: number;
  inss: number;
  contador: number;
  enderecoFiscal: number;
  planoSaude: number;
  temFeriasRemuneradas: boolean;
}

interface ParametersEditorProps {
  parameters: Parameters;
  onParametersChange: (parameters: Parameters) => void;
}

export const ParametersEditor = ({ parameters, onParametersChange }: ParametersEditorProps) => {
  const handleDecimalInput = (key: keyof Parameters, value: string) => {
    // Remove tudo exceto dígitos
    const digits = value.replace(/[^\d]/g, '');
    
    if (digits === '') {
      return 0;
    }
    
    // Converte para decimal (cada dígito representa centavos)
    return parseFloat(digits) / 100;
  };

  const handlePercentageInput = (key: keyof Parameters, value: string) => {
    // Remove tudo exceto dígitos
    const digits = value.replace(/[^\d]/g, '');
    
    if (digits === '') {
      return 0;
    }
    
    // Converte para decimal (percentual com 4 casas decimais para permitir entrada como 15055 = 1.5055%)
    return parseFloat(digits) / 10000;
  };

  const handleChange = (key: keyof Parameters, value: string | boolean | number) => {
    if (key === 'temFeriasRemuneradas') {
      onParametersChange({
        ...parameters,
        [key]: value as boolean,
      });
    } else {
      onParametersChange({
        ...parameters,
        [key]: value as number,
      });
    }
  };

  const formatInput = (value: number, isPercentage = false, isCurrency = false) => {
    if (isPercentage) {
      return (value * 100).toLocaleString('pt-BR', { 
        minimumFractionDigits: 3, 
        maximumFractionDigits: 3 
      });
    }
    if (isCurrency) {
      return value.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }
    return value.toFixed(2);
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-brand-blue/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Settings className="h-5 w-5 text-brand-blue" />
          Parâmetros Editáveis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="taxaConversao" className="text-sm font-medium">
              Taxa de Conversão (%)
            </Label>
            <Input
              id="taxaConversao"
              type="text"
              value={formatInput(parameters.taxaConversao, true)}
              onChange={(e) => {
                const newValue = handlePercentageInput('taxaConversao', e.target.value);
                handleChange('taxaConversao', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="0,908"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iss" className="text-sm font-medium">
              ISS (%)
            </Label>
            <Input
              id="iss"
              type="text"
              value={formatInput(parameters.iss, true)}
              onChange={(e) => {
                const newValue = handlePercentageInput('iss', e.target.value);
                handleChange('iss', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="4,280"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proLabore" className="text-sm font-medium">
              Pro-labore (R$)
            </Label>
            <Input
              id="proLabore"
              type="text"
              value={formatInput(parameters.proLabore, false, true)}
              onChange={(e) => {
                const newValue = handleDecimalInput('proLabore', e.target.value);
                handleChange('proLabore', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="1.320,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inss" className="text-sm font-medium">
              INSS sobre Pro-labore (%)
            </Label>
            <Input
              id="inss"
              type="text"
              value={formatInput(parameters.inss, true)}
              onChange={(e) => {
                const newValue = handlePercentageInput('inss', e.target.value);
                handleChange('inss', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="7,500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contador" className="text-sm font-medium">
              Contador (R$)
            </Label>
            <Input
              id="contador"
              type="text"
              value={formatInput(parameters.contador, false, true)}
              onChange={(e) => {
                const newValue = handleDecimalInput('contador', e.target.value);
                handleChange('contador', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="262,33"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enderecoFiscal" className="text-sm font-medium">
              Endereço Fiscal (R$)
            </Label>
            <Input
              id="enderecoFiscal"
              type="text"
              value={formatInput(parameters.enderecoFiscal, false, true)}
              onChange={(e) => {
                const newValue = handleDecimalInput('enderecoFiscal', e.target.value);
                handleChange('enderecoFiscal', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="39,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planoSaude" className="text-sm font-medium">
              Plano de Saúde (R$)
            </Label>
            <Input
              id="planoSaude"
              type="text"
              value={formatInput(parameters.planoSaude, false, true)}
              onChange={(e) => {
                const newValue = handleDecimalInput('planoSaude', e.target.value);
                handleChange('planoSaude', newValue);
              }}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
              placeholder="600,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feriasRemuneradas" className="text-sm font-medium">
              Tem Férias Remuneradas?
            </Label>
            <div className="flex items-center space-x-2 h-10">
              <Switch
                id="feriasRemuneradas"
                checked={parameters.temFeriasRemuneradas}
                onCheckedChange={(checked) => handleChange('temFeriasRemuneradas', checked)}
              />
              <span className="text-sm text-muted-foreground">
                {parameters.temFeriasRemuneradas ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};