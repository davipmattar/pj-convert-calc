import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PayMeCoffeeHeader = () => {
  const [donations, setDonations] = useState([
    { name: "Ana M.", amount: 5.00 },
    { name: "João S.", amount: 12.50 },
    { name: "Maria L.", amount: 8.00 },
    { name: "Pedro R.", amount: 15.00 },
    { name: "Carla F.", amount: 6.50 },
  ]);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnimation(true);
      setCurrentDonation((prev) => (prev + 1) % donations.length);
      
      setTimeout(() => setShowAnimation(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [donations.length]);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600" />
            <span className="text-amber-800 font-medium">
              Gostou da calculadora? 
            </span>
            <Link
              to="/donate"
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer inline-block"
            >
              ☕ Pay me a Coffee
            </Link>
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