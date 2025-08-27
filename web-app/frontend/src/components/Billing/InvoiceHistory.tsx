import React, { useState } from 'react';
import { FileText, Download, Eye, ChevronLeft, ChevronRight, Filter, List, CreditCard, Search, ArrowUpDown, Calendar } from 'lucide-react';
interface Invoice {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  paidDate: string | null;
  dueDate: string;
}
interface InvoiceHistoryProps {
  invoices: Invoice[];
  onPayInvoice?: (invoice: Invoice) => void;
}
export function InvoiceHistory({
  invoices,
  onPayInvoice
}: InvoiceHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  // Get unique invoice types for filter dropdown
  const invoiceTypes = [...new Set(invoices.map(invoice => invoice.type))];
  // Filter invoices based on type, status and search
  const filteredInvoices = invoices.filter(invoice => {
    // Type filter
    const matchesType = typeFilter === 'all' || invoice.type === typeFilter;
    // Status filter
    const matchesStatus = statusFilter === 'all' || statusFilter === 'paid' && invoice.status === 'paid' || statusFilter === 'unpaid' && (invoice.status === 'unpaid' || invoice.status === 'pending' || invoice.status === 'overdue');
    // Search filter
    const matchesSearch = searchTerm === '' || invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });
  // Sort invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === 'dueDate') {
      return sortDirection === 'asc' ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    return 0;
  });
  // Paginate invoices
  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
  const currentInvoices = sortedInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  // Reset to first page when filters or items per page change
  const handleFilterChange = (type: string, value: string) => {
    setCurrentPage(1);
    if (type === 'type') {
      setTypeFilter(value);
    } else if (type === 'status') {
      setStatusFilter(value);
    }
  };
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const getStatusBadge = (status: string, dueDate: string) => {
    const today = new Date(2025, 7, 26); // August 26, 2025
    const due = new Date(dueDate);
    if (status === 'paid') {
      return <span className="px-2.5 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium shadow-sm">
          Paid
        </span>;
    } else if (status === 'pending') {
      return <span className="px-2.5 py-1 text-xs rounded-full bg-amber-100 text-amber-800 font-medium shadow-sm">
          Pending
        </span>;
    } else if (status === 'unpaid') {
      if (due < today) {
        return <span className="px-2.5 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium shadow-sm">
            Overdue
          </span>;
      } else {
        return <span className="px-2.5 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-medium shadow-sm">
            Unpaid
          </span>;
      }
    }
    return null;
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-bold text-primary flex items-center tracking-tight">
          <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          Invoice History
        </h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" placeholder="Search invoices..." value={searchTerm} onChange={handleSearchChange} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary w-full sm:w-64 shadow-sm hover:shadow transition-shadow duration-200" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-5 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center">
          <Filter className="w-4 h-4 text-primary mr-2" />
          <select value={typeFilter} onChange={e => handleFilterChange('type', e.target.value)} className="text-sm border-0 bg-transparent focus:ring-0 text-gray-700 font-medium cursor-pointer">
            <option value="all">All Types</option>
            {invoiceTypes.map(type => <option key={type} value={type}>
                {type}
              </option>)}
          </select>
        </div>
        <div className="flex items-center">
          <Filter className="w-4 h-4 text-primary mr-2" />
          <select value={statusFilter} onChange={e => handleFilterChange('status', e.target.value)} className="text-sm border-0 bg-transparent focus:ring-0 text-gray-700 font-medium cursor-pointer">
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div className="flex items-center ml-auto">
          <List className="w-4 h-4 text-primary mr-2" />
          <select value={itemsPerPage} onChange={e => handleItemsPerPageChange(Number(e.target.value))} className="text-sm border-0 bg-transparent focus:ring-0 text-gray-700 font-medium cursor-pointer">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
          </select>
        </div>
      </div>
      {currentInvoices.length > 0 ? <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('date')}>
                    <div className="flex items-center">
                      <span>Date</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('amount')}>
                    <div className="flex items-center">
                      <span>Amount</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('dueDate')}>
                    <div className="flex items-center">
                      <span>Due Date</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInvoices.map(invoice => {
              const isOverdue = invoice.status === 'unpaid' && new Date(invoice.dueDate) < new Date(2025, 7, 26);
              return <tr key={invoice.id} className={`transition-colors ${isOverdue ? hoverRow === invoice.id ? 'bg-red-50' : 'hover:bg-red-50/50 bg-red-50/30' : hoverRow === invoice.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`} onMouseEnter={() => setHoverRow(invoice.id)} onMouseLeave={() => setHoverRow(null)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(invoice.status, invoice.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1.5 text-gray-400 hover:text-primary bg-gray-100 hover:bg-primary/10 rounded-full transition-all duration-200 shadow-sm hover:shadow" title="View Invoice">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-primary bg-gray-100 hover:bg-primary/10 rounded-full transition-all duration-200 shadow-sm hover:shadow" title="Download Invoice">
                            <Download className="w-4 h-4" />
                          </button>
                          {invoice.status === 'unpaid' && onPayInvoice && <button onClick={() => onPayInvoice(invoice)} className={`p-1.5 text-gray-400 ${isOverdue ? 'hover:text-red-600 hover:bg-red-100' : 'hover:text-secondary hover:bg-secondary/10'} bg-gray-100 rounded-full transition-all duration-200 shadow-sm hover:shadow`} title="Pay Invoice">
                              <CreditCard className="w-4 h-4" />
                            </button>}
                        </div>
                      </td>
                    </tr>;
            })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && <div className="flex items-center justify-between mt-5 border-t pt-5">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstInvoice + 1}-
                {Math.min(indexOfLastInvoice, filteredInvoices.length)} of{' '}
                {filteredInvoices.length} invoices
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={`p-2 rounded-lg shadow-sm transition-all duration-200 ${currentPage === 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-primary/5 border border-gray-200 hover:border-primary/20 hover:shadow'}`}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg shadow-sm transition-all duration-200 ${currentPage === totalPages ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-primary/5 border border-gray-200 hover:border-primary/20 hover:shadow'}`}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>}
        </> : <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-lg font-medium text-gray-600 mb-1">
            No invoices found
          </p>
          <p className="text-sm">
            Try adjusting your search or filter criteria
          </p>
        </div>}
    </div>;
}