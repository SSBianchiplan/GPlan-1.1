import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationPanel = () => {
  const notifications = [
    {
      type: 'warning',
      message: 'Meta financeira Q4 precisa de atenção',
      time: '2 horas atrás',
    },
    {
      type: 'success',
      message: 'Relatório mensal exportado com sucesso',
      time: '5 horas atrás',
    },
    {
      type: 'info',
      message: '3 novos pedidos pendentes',
      time: '1 dia atrás',
    },
    {
      type: 'error',
      message: 'Estoque baixo: Produto XYZ',
      time: '2 dias atrás',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-600" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Notificações Recentes</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {getIcon(notification.type)}
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm hover:underline">
        Ver todas as notificações
      </button>
    </div>
  );
};

export default NotificationPanel;
