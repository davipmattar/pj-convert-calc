import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Coffee, CreditCard, QrCode, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    email: ''
  });

  const predefinedAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numericValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (numericValue > 0) {
      setSelectedAmount(numericValue);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // QR Code PIX simulado (base64 de um QR code genérico)
  const pixQRCode = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCwxMCkiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPgogICAgPHJlY3QgeD0iMTUwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+CiAgICA8cmVjdCB4PSIwIiB5PSIxNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz4KICA8L2c+Cjwvc3ZnPgo=';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a calculadora
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="h-8 w-8 text-amber-600" />
              <h1 className="text-3xl font-bold text-foreground">
                Apoie este projeto
              </h1>
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua doação ajuda a manter esta calculadora gratuita e sempre atualizada para todos os usuários.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cartão de Crédito */}
            <Card className="bg-gradient-card backdrop-blur-sm border-brand-blue/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-brand-blue" />
                  Doação via Cartão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Seleção de Valor */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Escolha o valor</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className="text-sm"
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customAmount" className="text-sm">Valor personalizado</Label>
                    <Input
                      id="customAmount"
                      type="text"
                      placeholder="R$ 0,00"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-800 font-medium">
                      Valor selecionado: {formatCurrency(selectedAmount)}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Dados do Cartão */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={cardData.email}
                      onChange={(e) => setCardData({...cardData, email: e.target.value})}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="NOME COMPLETO"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white">
                  Doar {formatCurrency(selectedAmount)}
                </Button>
              </CardContent>
            </Card>

            {/* PIX */}
            <Card className="bg-gradient-card backdrop-blur-sm border-brand-blue/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-brand-blue" />
                  Doação via PIX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Escaneie o QR Code abaixo com seu app do banco
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-xl border-2 border-dashed border-gray-300">
                      <img 
                        src={pixQRCode} 
                        alt="QR Code PIX" 
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      Chave PIX
                    </Badge>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <code className="text-sm font-mono text-gray-700">
                        davimattar2@gmail.com
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Você pode copiar a chave PIX acima para fazer a transferência manualmente
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Valores sugeridos:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {predefinedAmounts.map((amount) => (
                      <div key={amount} className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-800">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Após fazer o PIX, envie o comprovante para 
                    <br />
                    <a href="mailto:davimattar2@gmail.com" className="underline font-medium">
                      davimattar2@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer da página de doação */}
          <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              Obrigado pelo seu apoio! 🙏
            </h3>
            <p className="text-sm text-blue-700">
              Toda doação, por menor que seja, faz a diferença para manter este projeto funcionando.
              Você está ajudando milhares de pessoas a calcular seus impostos de forma gratuita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}