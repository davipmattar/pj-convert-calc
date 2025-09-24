import { PJCalculator } from "@/components/PJCalculator";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-financial-green/5" />
      <div className="relative z-10">
        <PJCalculator />
      </div>
    </main>
  );
};

export default Index;
