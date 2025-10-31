import { Package, AlertTriangle } from 'lucide-react';

const Inventory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Package className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Controle de Estoque</h1>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-blue-600" size={20} />
            <p className="text-blue-800">
              Módulo em desenvolvimento. Em breve você poderá gerenciar todo o seu estoque aqui.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">Total de Produtos</h3>
            <p className="text-3xl font-bold text-green-600">247</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">Estoque Baixo</h3>
            <p className="text-3xl font-bold text-orange-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">Valor Total</h3>
            <p className="text-3xl font-bold text-blue-600">R$ 1.2M</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
