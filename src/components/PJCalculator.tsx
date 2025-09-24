import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, RefreshCw } from 'lucide-react';
import { CurrencySelector, Currency } from './CurrencySelector';
import { SalaryInput } from './SalaryInput';
import { CalculationTable } from './CalculationTable';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';

export const PJCalculator = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [salaryInput, setSalaryInput] = useState('5000');
  const { rates, loading, lastUpdate } = useCurrencyRates();

  const parsedSalary = useMemo(() => {
    const cleaned = salaryInput.replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }, [salaryInput]);

  const exchangeRate = rates[selectedCurrency];

  const calculations = useMemo(() => {
    const salarioBruto = parsedSalary;
    const salarioConvertido = salarioBruto * exchangeRate;
    
    // Taxas conforme especificado
    const taxaConversao = 0.908; // Interpretando como 90.8% (não 0.908%)
    const salarioAposConversao = salarioConvertido * taxaConversao;
    
    const iss = salarioAposConversao * 0.0428; // 4.28%
    const proLabore = 1320.00;
    const inss = proLabore * 0.075; // 7.5% sobre pro-labore
    const contador = 262.33;
    const enderecoFiscal = 39.00;
    const feriasNaoRemuneradas = salarioAposConversao - iss; // Salário convertido - ISS
    const planoSaude = 600.00;

    const totalDeducoes = iss + proLabore + inss + contador + enderecoFiscal + feriasNaoRemuneradas + planoSaude;
    const liquidoMensal = salarioAposConversao - totalDeducoes;
    const liquidoAnual = liquidoMensal * 12;

    return {
      salarioBruto,
      salarioConvertido: salarioAposConversao,
      iss,
      proLabore,
      inss,
      contador,
      enderecoFiscal,
      feriasNaoRemuneradas,
      planoSaude,
      liquidoMensal,
      liquidoAnual,
    };
  }, [parsedSalary, exchangeRate]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Calculadora PJ Moeda Estrangeira
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calcule sua remuneração líquida como Pessoa Jurídica recebendo em moeda estrangeira, 
          com cotações em tempo real e todos os impostos e deduções.
        </p>
        {lastUpdate && (
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            Última atualização: {lastUpdate}
          </Badge>
        )}
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-card backdrop-blur-sm border-brand-blue/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5 text-brand-blue" />
              Dados de Entrada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CurrencySelector
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            />
            
            <SalaryInput
              value={salaryInput}
              onChange={setSalaryInput}
              currency={selectedCurrency}
            />

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Taxa de Câmbio Atual</h3>
              <div className="text-2xl font-bold text-blue-800">
                1 {selectedCurrency} = {exchangeRate.toFixed(4)} BRL
              </div>
              {loading && (
                <div className="text-sm text-blue-600 mt-1">
                  Atualizando cotação...
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <h4 className="font-medium text-foreground">Parâmetros utilizados:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Taxa de conversão: 90,8%</li>
                <li>• ISS: 4,28%</li>
                <li>• Pro-labore: R$ 1.320,00</li>
                <li>• INSS: 7,5% sobre pro-labore</li>
                <li>• Contador: R$ 262,33</li>
                <li>• Endereço fiscal: R$ 39,00</li>
                <li>• Plano de saúde: R$ 600,00</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <CalculationTable
          data={calculations}
          currency={selectedCurrency}
          exchangeRate={exchangeRate}
        />
      </div>

      <footer className="text-center text-sm text-muted-foreground">
        <p>
          Esta calculadora fornece estimativas baseadas em parâmetros padrão. 
          Para orientações específicas sobre sua situação fiscal, consulte um contador qualificado.
        </p>
      </footer>
    </div>
  );
};