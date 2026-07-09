import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // 1. Importar useLocation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 2. Obter a localização atual

  const menuItems = [
    { name: 'Imóveis', path: '/explore-imoveis' },
    { name: 'Publicar Imóvel', path: '/publicar' },
    { name: 'Os meus Imóveis', path: '/meus-imoveis' }
  ];

  // Função auxiliar para verificar se o item está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 bg-white z-50 border-b border-gray-100 px-4 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="font-bold text-xl text-gray-900">ImoCuanza</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-2 text-gray-600 font-medium">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`px-4 py-2 rounded-lg transition ${
                isActive(item.path) 
                  ? 'bg-emerald-100 text-emerald-800' // Estilo ativo
                  : 'hover:bg-gray-100' // Estilo padrão
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button className="ml-2 bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition">
            Perfil
          </button>
        </div>

        {/* Menu Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-lg ${
                  isActive(item.path) ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;