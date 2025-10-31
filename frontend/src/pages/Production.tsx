import React, { useEffect, useState } from 'react';
import { Plus, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { ProductionOrder, PaginationResponse } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Production: React.FC = () => {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = { limit: 20 };
      if (filter !== 'all') {
        params.status = filter.toUpperCase();
      }

      const response = await api.get<PaginationResponse<ProductionOrder>>('/production/orders', { params });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'IN_PROGRESS':
        return <Clock size={18} className="text-blue-600" />;
      case 'CANCELLED':
        return <AlertCircle size={18} className="text-red-600" />;
      default:
        return <Calendar size={18} className="text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Pendente',
      IN_PROGRESS: 'Em Andamento',
      COMPLETED: 'Concluído',
      CANCELLED: 'Cancelado',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      URGENT: 'bg-red-100 text-red-800',
      HIGH: 'bg-orange-100 text-orange-800',
      NORMAL: 'bg-blue-100 text-blue-800',
      LOW: 'bg-gray-100 text-gray-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planejamento de Produção</h1>
          <p className="text-gray-600">Gerencie ordens de produção e cronogramas</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Nova Ordem
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex gap-2">
          {['all', 'pending', 'in_progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Todos' : getStatusLabel(status.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Carregando...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma ordem de produção encontrada
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Número
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Produto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantidade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Prioridade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Data Prevista
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.product?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {format(new Date(order.scheduledDate), 'dd/MM/yyyy', { locale: ptBR })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span>{getStatusLabel(order.status)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Production;
