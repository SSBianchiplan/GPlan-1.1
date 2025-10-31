import { Link } from 'react-router-dom';
import { Home, DollarSign, Package, FileCheck, ShoppingCart, Search, Bell, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Planejamento Financeiro', path: '/financial-planning', icon: DollarSign },
    { name: 'Estoque', path: '/inventory', icon: Package },
    { name: 'Auditorias', path: '/audits', icon: FileCheck },
    { name: 'Pedidos', path: '/orders', icon: ShoppingCart },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">GPlan</div>
            <div className="text-sm opacity-90">Sistema de Planejamento</div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md hover:bg-blue-700 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>

            {/* User */}
            <button className="p-2 rounded-md hover:bg-blue-700 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Buscar funcionalidades, relatórios, dados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-blue-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
