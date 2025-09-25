import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Coffee, CreditCard, QrCode, Heart, ArrowLeft, Copy, ExternalLink, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Donate() {
  const [copied, setCopied] = useState(false);

  const predefinedAmounts = [5, 10, 25];

  

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // QR Code PIX: tenta usar a imagem do /public, com fallback base64
  const fallbackPixQRCode = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCwxMCkiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPgogICAgPHJlY3QgeD0iMTUwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+CiAgICA8cmVjdCB4PSIwIiB5PSIxNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz4KICA8L2c+Cjwvc3ZnPgo=';
  const [qrSrc, setQrSrc] = useState<string>('/qr-pix.png');

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

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Único Card: PIX + Cartão */}
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
                        src={qrSrc}
                        alt="QR Code PIX"
                        className="w-48 h-48 object-contain"
                        onError={() => setQrSrc(fallbackPixQRCode)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      Chave PIX
                    </Badge>
                    <div className="p-3 bg-gray-50 rounded-lg border flex items-start justify-between gap-3">
                      <code className="text-sm font-mono text-gray-700 break-all">
                        00020126670014BR.GOV.BCB.PIX0111008552141800230Muito obrigado pela sua doação5204000053039865802BR5917Davi Pires Mattar6009SAO PAULO62140510m52ozucXq863049653
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={async () => {
                          await navigator.clipboard.writeText('00020126670014BR.GOV.BCB.PIX0111008552141800230Muito obrigado pela sua doação5204000053039865802BR5917Davi Pires Mattar6009SAO PAULO62140510m52ozucXq863049653');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        aria-label={copied ? 'Chave PIX copiada' : 'Copiar chave PIX'}
                      >
                        {copied ? (
                          <span className="inline-flex items-center gap-1 text-green-700">
                            <Check className="h-4 w-4" /> Copiado!
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Copy className="h-4 w-4" /> Copiar
                          </span>
                        )}
                      </Button>
                      <span className="sr-only" aria-live="polite">
                        {copied ? 'Chave PIX copiada para a área de transferência' : ''}
                      </span>
                    </div>
                    <div>
                      <a
                        href="https://nubank.com.br/cobrar/121p6/68d548b4-5ee1-4aba-8f1a-7daf83446378"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-blue hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" /> Pagar via Nubank (Pix)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Seção: Doação via Cartão de Crédito (dentro do mesmo card) */}
                <Separator />
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight text-foreground">
                    <CreditCard className="h-5 w-5 text-amber-600" /> Doação via Cartão de Crédito
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Para doações via cartão de crédito, acesse o link abaixo:
                  </p>
                  <a
                    href="https://link.mercadopago.com.br/pjnagringa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-blue hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" /> Doar com Cartão (Mercado Pago)
                  </a>
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