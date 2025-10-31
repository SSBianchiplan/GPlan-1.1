import React, { useEffect, useState } from 'react';
import { Plus, Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import api from '../services/api';
import { Product, PaginationResponse } from '../types';

const Stock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 20 };
      if (search) {
        params.search = search;
      }

      const response = await api.get<PaginationResponse<Product>>('/stock/products', { params });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.currentStock <= product.minStock) {
      return {
        color: 'text-red-600',
        icon: <AlertTriangle size={18} className="text-red-600" />,
        label: 'Baixo',
      };
    } else if (product.maxStock && product.currentStock >= product.maxStock) {
      return {
        color: 'text-orange-600',
        icon: <TrendingUp size={18} className="text-orange-600" />,
        label: 'Alto',
      };
    }
    return {
      color: 'text-green-600',
      icon: <Package size={18} className="text-green-600" />,
      label: 'Normal',
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600">Gerencie produtos e movimentações</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center">
            <TrendingDown size={20} className="mr-2" />
            Movimentação
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus size={20} className="mr-2" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <input
          type="text"
          placeholder="Buscar produtos por código ou nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
      </div>

      {/* Products List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Carregando...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Código
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoria
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Unidade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estoque Atual
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estoque Mínimo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preço Unit.
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => {
                  const status = getStockStatus(product);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {product.code}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.unit}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {product.currentStock}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.minStock}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          {status.icon}
                          <span className={status.color}>{status.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        R$ {product.unitPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
