
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Logo />
      <nav>
        <Link to="/send" className="btn-primary">
          Send a message
        </Link>
      </nav>
    </header>
  );
};

export default Header;
