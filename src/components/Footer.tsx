import { Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Website criado por <span className="font-medium text-foreground">Davi Mattar</span></p>
            <p className="mt-1">Caso queira entrar em contato:</p>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/davi-mattar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors group"
            >
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
            
            <a 
              href="mailto:davimattar2@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors group"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              davimattar2@gmail.com
            </a>
          </div>
          
          <p className="text-sm"><Link to="/calculadora-pj" className="text-brand-blue hover:underline">Como funciona a calculadora PJ</Link></p>

          <div className="text-xs text-muted-foreground pt-4">
            <p>
              Esta calculadora fornece estimativas baseadas em parâmetros padrão. 
              Para orientações específicas sobre sua situação fiscal, consulte um contador qualificado.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};