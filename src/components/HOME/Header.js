import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nav from './images/nav.png';
import nav2 from './images/nav2.png';
import ham from './images/hamburger.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  document.addEventListener('touchmove', closeMobileMenu, { passive: true });

  return (
    <>
      <nav
        className={`overflow-visible font-bold text-2xl fixed left-0 right-0 z-50 transition-colors ${
          isScrolled ? 'bg-white text-black shadow-md' : 'bg-green-700 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center space-x-4">
              <img src={nav} alt="nav" className="w-16 h-16" />
              <span className="text-3xl overflow-visible">MYFITDIARY</span>
            </div>
          </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="relative z-50">
              <img src={ham} alt="hamburger" className="w-8 h-8" />
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:flex md:space-x-10 bg-white fixed inset-0 md:relative md:bg-transparent z-40`}
          >
            <div className="flex flex-col md:flex-row md:space-x-10 items-center md:items-end pt-20 md:pt-0">
              <Link
                to="/diet"
                className={`hover:text-gray-900 py-2 block overflow-visible ${
                  isMobileMenuOpen ? 'text-black' : isScrolled ? 'text-black' : 'text-white'
                }`}
                onClick={closeMobileMenu}
              >
                Diets
              </Link>
              <Link
                to="/target"
                className={`hover:text-gray-900 py-2 block overflow-visible ${
                  isMobileMenuOpen ? 'text-black' : isScrolled ? 'text-black' : 'text-white'
                }`}
                onClick={closeMobileMenu}
              >
                Targets
              </Link>
              <Link
                to="/meals"
                className={`hover:text-gray-900 py-2 block overflow-visible ${
                  isMobileMenuOpen ? 'text-black' : isScrolled ? 'text-black' : 'text-white'
                }`}
                onClick={closeMobileMenu}
              >
                Logs
              </Link>
              <Link
                to="/goals"
                className={`hover:text-gray-900 py-2 block overflow-visible ${
                  isMobileMenuOpen ? 'text-black' : isScrolled ? 'text-black' : 'text-white'
                }`}
                onClick={closeMobileMenu}
              >
                Goals
              </Link>
              
            </div>
          </div>
          <img src={nav2} alt="nav" className="hidden md:block w-16 h-16 p-2 mt-2 rounded-sm" />
        </div>
      </nav>
    </>
  );
}
