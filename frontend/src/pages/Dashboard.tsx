import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ClipboardList, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';
import api from '../services/api';

interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  activeOrders: number;
  completedOrders: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    activeOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, lowStockRes, ordersRes] = await Promise.all([
        api.get('/stock/products?limit=1'),
        api.get('/stock/products/low-stock'),
        api.get('/production/orders?limit=1'),
      ]);

      setStats({
        totalProducts: productsRes.data.pagination?.total || 0,
        lowStockProducts: lowStockRes.data.length || 0,
        activeOrders: ordersRes.data.pagination?.total || 0,
        completedOrders: 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      link: '/stock',
    },
    {
      title: 'Produtos com Estoque Baixo',
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: 'yellow',
      link: '/stock',
    },
    {
      title: 'Ordens de Produção Ativas',
      value: stats.activeOrders,
      icon: ClipboardList,
      color: 'green',
      link: '/production',
    },
    {
      title: 'Performance',
      value: '95%',
      icon: TrendingUp,
      color: 'purple',
      link: '/',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const colorMap: Record<string, { bg: string; text: string }> = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
            yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
            green: { bg: 'bg-green-100', text: 'text-green-600' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
          };
          const colors = colorMap[card.color] || colorMap.blue;
          
          return (
            <Link
              key={card.title}
              to={card.link}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-full ${colors.bg}`}>
                  <Icon className={colors.text} size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/production"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <ClipboardList className="mx-auto mb-2 text-gray-600" size={32} />
            <p className="font-medium text-gray-900">Nova Ordem de Produção</p>
          </Link>
          <Link
            to="/stock"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Package className="mx-auto mb-2 text-gray-600" size={32} />
            <p className="font-medium text-gray-900">Adicionar Produto</p>
          </Link>
          <Link
            to="/stock"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <TrendingUp className="mx-auto mb-2 text-gray-600" size={32} />
            <p className="font-medium text-gray-900">Movimentação de Estoque</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
