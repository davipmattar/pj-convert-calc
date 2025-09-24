import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, RefreshCw } from 'lucide-react';
import { CurrencySelector, Currency } from './CurrencySelector';
import { SalaryInput } from './SalaryInput';
import { CalculationTable } from './CalculationTable';
import { ParametersEditor, Parameters } from './ParametersEditor';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';

export const PJCalculator = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [salaryInput, setSalaryInput] = useState('5000');
  const [parameters, setParameters] = useState<Parameters>({
    taxaConversao: 0.00908, // 0.908%
    iss: 0.0428, // 4.28%
    proLabore: 1320.00,
    inss: 0.075, // 7.5%
    contador: 262.33,
    enderecoFiscal: 39.00,
    planoSaude: 600.00,
  });
  const { rates, loading, lastUpdate } = useCurrencyRates();

  const parsedSalary = useMemo(() => {
    const cleaned = salaryInput.replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }, [salaryInput]);

  const exchangeRate = rates[selectedCurrency];

  const calculations = useMemo(() => {
    const salarioBruto = parsedSalary;
    const salarioConvertido = salarioBruto * exchangeRate;
    
    // Aplicar taxa de conversão
    const salarioAposConversao = salarioConvertido * parameters.taxaConversao;
    
    const iss = salarioAposConversao * parameters.iss;
    const proLabore = parameters.proLabore;
    const inss = proLabore * parameters.inss; // % sobre pro-labore
    const contador = parameters.contador;
    const enderecoFiscal = parameters.enderecoFiscal;
    const feriasNaoRemuneradas = salarioAposConversao - iss; // Salário convertido - ISS
    const planoSaude = parameters.planoSaude;

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
  }, [parsedSalary, exchangeRate, parameters]);

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

      <div className="grid lg:grid-cols-3 gap-8">
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
          </CardContent>
        </Card>

        <ParametersEditor
          parameters={parameters}
          onParametersChange={setParameters}
        />

        <CalculationTable
          data={calculations}
          currency={selectedCurrency}
          exchangeRate={exchangeRate}
          parameters={parameters}
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