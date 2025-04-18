
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-6 mt-12 bg-white border-t border-dustyRose">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-softGrey text-sm">
              &copy; {new Date().getFullYear()} Closure. All rights reserved.
            </p>
            <p className="text-softGrey text-sm mt-1">
              A thoughtful space for emotional communication.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
