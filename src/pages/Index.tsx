import { PJCalculator } from "@/components/PJCalculator";
import { PayMeCoffeeHeader } from "@/components/PayMeCoffeeHeader";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://tramponagringa.com.br/" />
      </Helmet>
      <PayMeCoffeeHeader />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-financial-green/5 pointer-events-none -z-10" />
      <div className="relative z-10">
        <PJCalculator />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
