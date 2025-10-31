import { useEffect, useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import api from '../services/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    activeProductionPlans: 0,
    completedOrders: 0,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load statistics from API
      const [products, plans] = await Promise.all([
        api.get('/inventory/products/'),
        api.get('/planning/production/'),
      ])

      const productList = products.data.results || products.data || []
      const planList = plans.data.results || plans.data || []

      setStats({
        totalProducts: productList.length,
        lowStockProducts: productList.filter(p => p.needs_restock).length,
        activeProductionPlans: planList.filter(p => p.status === 'in_progress').length,
        completedOrders: planList.filter(p => p.status === 'completed').length,
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const productionData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Produção Planejada',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Produção Realizada',
        data: [60, 55, 75, 78, 52, 50],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const inventoryData = {
    labels: ['Matéria Prima', 'Semi-Acabado', 'Produto Acabado'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  const financialData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receita',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Despesa',
        data: [8000, 12000, 10000, 18000, 15000, 20000],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Total de Produtos"
          value={stats.totalProducts}
          color="text-primary-600"
          bgColor="bg-primary-100"
        />
        <StatCard
          icon={AlertTriangle}
          title="Produtos com Estoque Baixo"
          value={stats.lowStockProducts}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />
        <StatCard
          icon={TrendingUp}
          title="Planos em Andamento"
          value={stats.activeProductionPlans}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          icon={CheckCircle}
          title="Pedidos Concluídos"
          value={stats.completedOrders}
          color="text-green-600"
          bgColor="bg-green-100"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Produção - Planejado vs Realizado
          </h2>
          <div className="h-64">
            <Line data={productionData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição de Estoque
          </h2>
          <div className="h-64">
            <Doughnut data={inventoryData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Financeiro - Receita vs Despesa
          </h2>
          <div className="h-64">
            <Bar data={financialData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
