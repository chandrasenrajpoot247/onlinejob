
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogIn, Search, Home } from 'lucide-react';

const Header: React.FC = () => {
  const { settings, isAdmin } = useApp();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 border-b gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: settings.primaryColor }}>
                {settings.siteName}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                {settings.slogan}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search Vacancy..." 
                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: settings.primaryColor + '40' }}
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>
            <Link 
              to={isAdmin ? "/admin" : "/login"} 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: settings.secondaryColor }}
            >
              <LogIn className="w-4 h-4" /> {isAdmin ? "Dashboard" : "Admin Login"}
            </Link>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="hidden md:flex items-center justify-center py-3 gap-8 overflow-x-auto text-sm font-bold uppercase tracking-wide">
          <Link to="/" className="hover:text-blue-700 flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <a href="#" className="hover:text-blue-700">Latest Jobs</a>
          <a href="#" className="hover:text-blue-700">Results</a>
          <a href="#" className="hover:text-blue-700">Admit Card</a>
          <a href="#" className="hover:text-blue-700">Answer Key</a>
          <a href="#" className="hover:text-blue-700">Syllabus</a>
          <a href="#" className="hover:text-blue-700">Admission</a>
          <a href="#" className="hover:text-blue-700">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
