import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialChart = ({ data, type = 'line', title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planejado" />
            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Realizado" />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="planned" fill="#3b82f6" name="Planejado" />
            <Bar dataKey="actual" fill="#10b981" name="Realizado" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
