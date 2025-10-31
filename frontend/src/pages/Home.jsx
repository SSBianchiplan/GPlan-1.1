import { DollarSign, Package, FileCheck, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import DashboardCard from '../components/Home/DashboardCard';
import NotificationPanel from '../components/Home/NotificationPanel';

const Home = () => {
  const modules = [
    {
      title: 'Planejamento Financeiro',
      description: 'Análise financeira completa com gráficos e comparações',
      icon: DollarSign,
      to: '/financial-planning',
      color: 'blue',
      stats: [
        { label: 'Receita Mensal', value: 'R$ 150k' },
        { label: 'Meta Atingida', value: '85%' },
      ],
    },
    {
      title: 'Controle de Estoque',
      description: 'Gestão de produtos e inventário',
      icon: Package,
      to: '/inventory',
      color: 'green',
      stats: [
        { label: 'Produtos', value: '247' },
        { label: 'Estoque Baixo', value: '12' },
      ],
    },
    {
      title: 'Auditorias',
      description: 'Relatórios e auditorias do sistema',
      icon: FileCheck,
      to: '/audits',
      color: 'purple',
      stats: [
        { label: 'Realizadas', value: '45' },
        { label: 'Pendentes', value: '3' },
      ],
    },
    {
      title: 'Pedidos',
      description: 'Gestão de compras e vendas',
      icon: ShoppingCart,
      to: '/orders',
      color: 'orange',
      stats: [
        { label: 'Ativos', value: '28' },
        { label: 'Hoje', value: '5' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo ao GPlan
          </h1>
          <p className="text-gray-600">
            Sistema integrado de planejamento e gestão empresarial
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-800">R$ 450k</p>
              </div>
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% vs mês anterior</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pedidos Ativos</p>
                <p className="text-2xl font-bold text-gray-800">28</p>
              </div>
              <ShoppingCart className="text-blue-600" size={32} />
            </div>
            <p className="text-xs text-blue-600 mt-2">5 novos hoje</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-800">247</p>
              </div>
              <Package className="text-purple-600" size={32} />
            </div>
            <p className="text-xs text-orange-600 mt-2">12 com estoque baixo</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-800">15</p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
            <p className="text-xs text-gray-600 mt-2">Online agora</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Módulos do Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <DashboardCard key={index} {...module} />
              ))}
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
