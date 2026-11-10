import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const URL = "https://tramponagringa.com.br/calculadora-pj";

const CalculadoraPJ = () => (
  <main className="min-h-screen bg-background">
    <Helmet>
      <title>Calculadora PJ: como calcular o líquido recebendo do exterior</title>
      <meta name="description" content="Entenda como a calculadora PJ calcula ISS, INSS sobre pró-labore, contador, câmbio e férias para quem recebe em dólar, euro ou libra." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Calculadora PJ: como calcular o líquido recebendo do exterior" />
      <meta property="og:description" content="ISS, INSS, contador, câmbio e férias: veja como o valor líquido do PJ na gringa é calculado." />
      <meta property="og:url" content={URL} />
    </Helmet>
    <article className="container mx-auto px-4 py-10 max-w-3xl space-y-8 text-foreground">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue">
        <ArrowLeft className="h-4 w-4" /> Voltar para a calculadora
      </Link>
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Calculadora PJ para quem recebe do exterior</h1>
        <p className="text-muted-foreground">
          A Calculadora PJ na Gringa mostra quanto sobra por mês e por ano para quem trabalha como Pessoa Jurídica
          no Brasil e recebe em Dólar americano, Dólar canadense, Euro ou Libra.
        </p>
        <Link to="/" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
          Abrir a calculadora
        </Link>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">O que entra no cálculo</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Salário bruto</strong> por hora, mês ou ano (por hora considera 160 horas mensais).</li>
          <li><strong className="text-foreground">Câmbio</strong> com cotação atualizada e taxa de conversão (padrão 0,908%).</li>
          <li><strong className="text-foreground">ISS</strong> sobre o valor convertido (padrão 4,28%).</li>
          <li><strong className="text-foreground">INSS</strong> de 7,5% sobre o pró-labore (padrão R$ 1.320,00). O pró-labore não é descontado do salário.</li>
          <li><strong className="text-foreground">Contador</strong> (padrão R$ 262,33), <strong className="text-foreground">endereço fiscal</strong> (R$ 39,00) e <strong className="text-foreground">plano de saúde</strong> (R$ 600,00).</li>
          <li><strong className="text-foreground">Férias não remuneradas</strong>: um mês sem receita por ano, se você não tiver férias pagas.</li>
        </ul>
        <p className="text-muted-foreground">Todos os valores podem ser editados para refletir a sua situação.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Como o valor líquido é calculado</h2>
        <p className="text-muted-foreground">
          Salário convertido = salário bruto × cotação × (1 − taxa de conversão). O líquido anual é
          (salário convertido − ISS − INSS − contador − endereço fiscal − plano de saúde) × 12, menos as férias
          não remuneradas quando aplicável. O líquido mensal é o anual dividido por 12.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Como usar o resultado</h2>
        <p className="text-muted-foreground">
          Use o valor líquido para comparar propostas internacionais, negociar seu salário e planejar o orçamento.
          Os números são estimativas: confirme alíquotas e regime tributário com um contador.
        </p>
      </section>
    </article>
    <Footer />
  </main>
);

export default CalculadoraPJ;
