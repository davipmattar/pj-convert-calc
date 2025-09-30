import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CalculationData {
  salarioBruto: number;
  salarioConvertido: number;
  iss: number;
  proLabore: number;
  inss: number;
  contador: number;
  enderecoFiscal: number;
  feriasNaoRemuneradas: number;
  planoSaude: number;
  liquidoMensal: number;
  liquidoAnual: number;
}

interface CalculationTableProps {
  data: CalculationData;
  currency: string;
  exchangeRate: number;
  parameters: {
    taxaConversao: number;
    iss: number;
    proLabore: number;
    inss: number;
    contador: number;
    enderecoFiscal: number;
    planoSaude: number;
    temFeriasRemuneradas: boolean;
  };
}

export const CalculationTable = ({ data, currency, exchangeRate, parameters }: CalculationTableProps) => {
  const formatCurrency = (value: number, isForeign = false) => {
    if (isForeign) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
      }).format(value);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const rows = [
    { 
      label: "Valor Bruto Salário (mensal)", 
      value: formatCurrency(data.salarioBruto, true), 
      type: "foreign" as const,
      description: `Salário em ${currency}`
    },
    { 
      label: "Salário Convertido", 
      value: formatCurrency(data.salarioConvertido), 
      type: "converted" as const,
      description: `Taxa: ${exchangeRate.toFixed(4)} (${currency}/BRL) × ${(parameters.taxaConversao * 100).toFixed(3)}%`
    },
    { 
      label: `ISS (${(parameters.iss * 100).toFixed(2)}%)`, 
      value: `- ${formatCurrency(data.iss)}`, 
      type: "deduction" as const,
      description: "Imposto Sobre Serviços"
    },
    { 
      label: `INSS (${(parameters.inss * 100).toFixed(1)}% do pro-labore)`, 
      value: `- ${formatCurrency(data.inss)}`, 
      type: "deduction" as const,
      description: "Previdência Social"
    },
    { 
      label: "Contador", 
      value: `- ${formatCurrency(data.contador)}`, 
      type: "deduction" as const,
      description: "Serviços contábeis"
    },
    { 
      label: "Endereço Fiscal", 
      value: `- ${formatCurrency(data.enderecoFiscal)}`, 
      type: "deduction" as const,
      description: "Domicílio fiscal"
    },
    // Só mostrar férias não remuneradas se a pessoa NÃO tem férias remuneradas
    ...(parameters.temFeriasRemuneradas ? [] : [{ 
      label: "Férias não Remuneradas", 
      value: `- ${formatCurrency(data.feriasNaoRemuneradas)}`, 
      type: "deduction" as const,
      description: "Provisionamento para férias"
    }]),
    { 
      label: "Plano de Saúde", 
      value: `- ${formatCurrency(data.planoSaude)}`, 
      type: "deduction" as const,
      description: "Assistência médica"
    },
  ];

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-brand-blue/20 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-blue" />
          Detalhamento dos Cálculos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row, index) => (
          <div 
            key={index}
            className="flex justify-between items-center py-3 px-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors border border-white/30"
          >
            <div className="flex-1">
              <div className="font-medium text-foreground">{row.label}</div>
              <div className="text-sm text-muted-foreground">{row.description}</div>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${
                row.type === 'foreign' ? 'text-brand-blue' :
                row.type === 'converted' ? 'text-brand-blue-dark' :
                'text-red-600'
              }`}>
                {row.value}
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center py-4 px-4 rounded-lg bg-gradient-success text-white shadow-elevated">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold text-lg">Valor Líquido Mensal</span>
            </div>
            <div className="font-bold text-xl">{formatCurrency(data.liquidoMensal)}</div>
          </div>
          
          <div className="flex justify-between items-center py-4 px-4 rounded-lg bg-gradient-primary text-white shadow-elevated">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold text-lg">Valor Líquido Anual</span>
            </div>
            <div className="font-bold text-xl">{formatCurrency(data.liquidoAnual)}</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800">
            <strong>Observação:</strong> Os cálculos são estimativos e podem variar conforme a legislação local. 
            Consulte sempre um contador para orientações específicas.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};