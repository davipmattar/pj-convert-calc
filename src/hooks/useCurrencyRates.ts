import { useState, useEffect } from 'react';
import { Currency } from '@/components/CurrencySelector';

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
  CAD: number;
}

interface CurrencyRatesResponse {
  rates: ExchangeRates;
  lastUpdate: string;
}

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<ExchangeRates>({
    USD: 5.50,
    EUR: 6.00,
    GBP: 7.00,
    CAD: 4.10,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // Usando uma API pública de câmbio - AwesomeAPI que é brasileira e gratuita
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL');
        const data = await response.json();
        
        if (data) {
          const newRates = {
            USD: parseFloat(data.USDBRL?.bid || '5.50'),
            EUR: parseFloat(data.EURBRL?.bid || '6.00'),
            GBP: parseFloat(data.GBPBRL?.bid || '7.00'),
            CAD: parseFloat(data.CADBRL?.bid || '4.10'),
          };
          
          setRates(newRates);
          setLastUpdate(new Date().toLocaleString('pt-BR'));
        }
      } catch (error) {
        console.error('Erro ao buscar cotações:', error);
        // Mantém as taxas padrão em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    
    // Atualiza as cotações a cada 30 segundos
    const interval = setInterval(fetchRates, 30 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { rates, loading, lastUpdate };
};