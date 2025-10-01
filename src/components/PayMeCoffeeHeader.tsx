import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';


export const PayMeCoffeeHeader = () => {
  const [donations, setDonations] = useState([
    { name: "Ana M.", amount: 3.00 },
    { name: "João S.", amount: 8.00 },
    { name: "Maria L.", amount: 4.50 },
    { name: "Pedro R.", amount: 7.00 },
    { name: "Carla F.", amount: 3.50 },
    { name: "Rafael T.", amount: 9.00 },
    { name: "Bruna C.", amount: 7.50 },
    { name: "Lucas A.", amount: 2.00 },
    { name: "Fernanda P.", amount: 5.50 },
    { name: "Gustavo N.", amount: 2.00 },
    { name: "Paula D.", amount: 5.00 },
    { name: "Marcos V.", amount: 6.00 },
    { name: "Letícia S.", amount: 4.00 },
    { name: "Rodrigo H.", amount: 7.00 },
    { name: "Camila R.", amount: 6.00 },
    { name: "André F.", amount: 9.00 },
    { name: "Bianca J.", amount: 2.50 },
    { name: "Thiago K.", amount: 10.00 },
    { name: "Patrícia Q.", amount: 1.50 },
    { name: "Felipe W.", amount: 6.50 },
    { name: "Caroline Z.", amount: 3.00 },
    { name: "Renato E.", amount: 8.00 },
    { name: "Juliana M.", amount: 4.00 },
    { name: "Diego B.", amount: 6.00 },
    { name: "Natália G.", amount: 8.50 },
    { name: "Sérgio L.", amount: 3.00 },
    { name: "Eduarda O.", amount: 1.50 },
    { name: "Hugo C.", amount: 4.00 },
    { name: "Mirela X.", amount: 9.50 },
    { name: "Otávio Y.", amount: 7.50 },
  ]);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const scheduleNextDonation = () => {
      const randomInterval = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
      
      return setTimeout(() => {
        setShowAnimation(true);
        setCurrentDonation((prev) => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * donations.length);
          } while (newIndex === prev && donations.length > 1);
          return newIndex;
        });
        
        setTimeout(() => setShowAnimation(false), 3000);
        
        const nextTimeout = scheduleNextDonation();
        return nextTimeout;
      }, randomInterval);
    };

    const timeout = scheduleNextDonation();

    return () => clearTimeout(timeout);
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