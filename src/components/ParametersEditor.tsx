import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export interface Parameters {
  taxaConversao: number;
  iss: number;
  proLabore: number;
  inss: number;
  contador: number;
  enderecoFiscal: number;
  planoSaude: number;
}

interface ParametersEditorProps {
  parameters: Parameters;
  onParametersChange: (parameters: Parameters) => void;
}

export const ParametersEditor = ({ parameters, onParametersChange }: ParametersEditorProps) => {
  const handleChange = (key: keyof Parameters, value: string) => {
    const numericValue = parseFloat(value.replace(',', '.')) || 0;
    onParametersChange({
      ...parameters,
      [key]: numericValue,
    });
  };

  const formatInput = (value: number, isPercentage = false) => {
    if (isPercentage) {
      return (value * 100).toFixed(3);
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
              onChange={(e) => handleChange('taxaConversao', (parseFloat(e.target.value.replace(',', '.')) / 100).toString())}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
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
              onChange={(e) => handleChange('iss', (parseFloat(e.target.value.replace(',', '.')) / 100).toString())}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proLabore" className="text-sm font-medium">
              Pro-labore (R$)
            </Label>
            <Input
              id="proLabore"
              type="text"
              value={formatInput(parameters.proLabore)}
              onChange={(e) => handleChange('proLabore', e.target.value)}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
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
              onChange={(e) => handleChange('inss', (parseFloat(e.target.value.replace(',', '.')) / 100).toString())}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contador" className="text-sm font-medium">
              Contador (R$)
            </Label>
            <Input
              id="contador"
              type="text"
              value={formatInput(parameters.contador)}
              onChange={(e) => handleChange('contador', e.target.value)}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enderecoFiscal" className="text-sm font-medium">
              Endereço Fiscal (R$)
            </Label>
            <Input
              id="enderecoFiscal"
              type="text"
              value={formatInput(parameters.enderecoFiscal)}
              onChange={(e) => handleChange('enderecoFiscal', e.target.value)}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="planoSaude" className="text-sm font-medium">
              Plano de Saúde (R$)
            </Label>
            <Input
              id="planoSaude"
              type="text"
              value={formatInput(parameters.planoSaude)}
              onChange={(e) => handleChange('planoSaude', e.target.value)}
              className="bg-white/80 backdrop-blur-sm border-brand-blue/20"
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-sm text-yellow-800">
            <strong>Dica:</strong> Ajuste os parâmetros conforme sua situação específica. 
            Os valores são atualizados automaticamente na tabela de cálculos.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};