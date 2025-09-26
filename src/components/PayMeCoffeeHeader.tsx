import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';


export const PayMeCoffeeHeader = () => {
  const [donations, setDonations] = useState([
    { name: "Ana M.", amount: 2.70 },
    { name: "João S.", amount: 8.10 },
    { name: "Maria L.", amount: 4.50 },
    { name: "Pedro R.", amount: 6.70 },
    { name: "Carla F.", amount: 3.30 },
    { name: "Rafael T.", amount: 9.10 },
    { name: "Bruna C.", amount: 7.50 },
    { name: "Lucas A.", amount: 1.90 },
    { name: "Fernanda P.", amount: 5.30 },
    { name: "Gustavo N.", amount: 2.10 },
    { name: "Paula D.", amount: 4.70 },
    { name: "Marcos V.", amount: 6.10 },
    { name: "Letícia S.", amount: 3.90 },
    { name: "Rodrigo H.", amount: 7.10 },
    { name: "Camila R.", amount: 5.90 },
    { name: "André F.", amount: 8.70 },
    { name: "Bianca J.", amount: 2.50 },
    { name: "Thiago K.", amount: 9.90 },
    { name: "Patrícia Q.", amount: 1.70 },
    { name: "Felipe W.", amount: 6.50 },
    { name: "Caroline Z.", amount: 3.10 },
    { name: "Renato E.", amount: 7.70 },
    { name: "Juliana M.", amount: 4.10 },
    { name: "Diego B.", amount: 5.70 },
    { name: "Natália G.", amount: 8.50 },
    { name: "Sérgio L.", amount: 2.90 },
    { name: "Eduarda O.", amount: 1.50 },
    { name: "Hugo C.", amount: 3.70 },
    { name: "Mirela X.", amount: 9.30 },
    { name: "Otávio Y.", amount: 7.30 },
  ]);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnimation(true);
      setCurrentDonation((prev) => (prev + 1) % donations.length);
      
      setTimeout(() => setShowAnimation(false), 3000);
    }, 17000);

    return () => clearInterval(interval);
  }, [donations.length]);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600" />
            <span className="text-amber-800 font-medium">
              Gostou da calculadora? 
            </span>
            <button
              onClick={() => window.open('/donate', '_blank', 'noopener,noreferrer')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer"
              aria-label="Abrir página de doação em nova aba"
              type="button"
            >
              ☕ Pay me a Coffee
            </button>
          </div>
          
          {showAnimation && (
            <div className="flex items-center gap-1 animate-fade-in">
              <span className="text-green-600 text-xs">
                💚 {donations[currentDonation].name} acabou de doar R$ {donations[currentDonation].amount.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};