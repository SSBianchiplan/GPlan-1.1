import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportButtons = ({ data, filename = 'relatorio-financeiro' }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('Relatório Financeiro - GPlan', 14, 22);
    
    // Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 32);
    
    // Table
    const tableData = data.map(item => [
      item.month,
      `R$ ${item.planned?.toLocaleString('pt-BR') || '0'}`,
      `R$ ${item.actual?.toLocaleString('pt-BR') || '0'}`,
      `${((item.actual / item.planned * 100) || 0).toFixed(1)}%`
    ]);
    
    autoTable(doc, {
      head: [['Mês', 'Planejado', 'Realizado', 'Atingimento']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Summary
    const totalPlanned = data.reduce((sum, item) => sum + (item.planned || 0), 0);
    const totalActual = data.reduce((sum, item) => sum + (item.actual || 0), 0);
    const finalY = doc.lastAutoTable.finalY || 40;
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Resumo:', 14, finalY + 10);
    doc.setFontSize(10);
    doc.text(`Total Planejado: R$ ${totalPlanned.toLocaleString('pt-BR')}`, 14, finalY + 18);
    doc.text(`Total Realizado: R$ ${totalActual.toLocaleString('pt-BR')}`, 14, finalY + 25);
    doc.text(`Taxa de Atingimento: ${((totalActual / totalPlanned * 100) || 0).toFixed(1)}%`, 14, finalY + 32);
    
    doc.save(`${filename}.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => ({
        'Mês': item.month,
        'Planejado (R$)': item.planned || 0,
        'Realizado (R$)': item.actual || 0,
        'Atingimento (%)': ((item.actual / item.planned * 100) || 0).toFixed(1),
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório Financeiro');
    
    // Add summary sheet
    const totalPlanned = data.reduce((sum, item) => sum + (item.planned || 0), 0);
    const totalActual = data.reduce((sum, item) => sum + (item.actual || 0), 0);
    
    const summaryData = [
      { 'Métrica': 'Total Planejado', 'Valor': totalPlanned },
      { 'Métrica': 'Total Realizado', 'Valor': totalActual },
      { 'Métrica': 'Taxa de Atingimento (%)', 'Valor': ((totalActual / totalPlanned * 100) || 0).toFixed(1) },
    ];
    
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo');
    
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  return (
    <div className="flex space-x-3">
      <button
        onClick={exportToPDF}
        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        <FileText size={18} />
        <span>Exportar PDF</span>
      </button>
      <button
        onClick={exportToExcel}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Download size={18} />
        <span>Exportar Excel</span>
      </button>
    </div>
  );
};

export default ExportButtons;
