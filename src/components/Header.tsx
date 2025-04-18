
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-4">
        <div className="flex items-center text-softGrey">
          <Globe className="w-5 h-5 mr-1" />
          <span className="text-sm hidden sm:inline">Available Worldwide</span>
        </div>
        <nav>
          <Link to="/send" className="btn-primary">
            Send a message
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
