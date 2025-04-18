
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-buttonPrimary hover:text-buttonHover transition-colors duration-300">
      <Heart className="w-6 h-6" />
      <span className="font-medium text-xl">Closure</span>
    </Link>
  );
};

export default Logo;
