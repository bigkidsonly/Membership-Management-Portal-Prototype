import React, { useState } from 'react';
import { Filter, X, Plus, Tag } from 'lucide-react';
interface FilterOption {
  id: string;
  label: string;
  field: string;
  type: 'text' | 'select' | 'array';
  options?: string[];
}
interface ActiveFilter {
  field: string;
  value: string;
}
interface DirectoryFiltersProps {
  activeFilters: ActiveFilter[];
  onAddFilter: (field: string, value: string) => void;
  onRemoveFilter: (index: number) => void;
  filterOptions: FilterOption[];
}
export function DirectoryFilters({
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  filterOptions
}: DirectoryFiltersProps) {
  const [selectedField, setSelectedField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const handleAddFilter = () => {
    if (selectedField && filterValue) {
      onAddFilter(selectedField, filterValue);
      setSelectedField('');
      setFilterValue('');
    }
  };
  const selectedOption = filterOptions.find(option => option.field === selectedField);
  return <div className="mt-6">
      <div className="mb-2">
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center text-sm font-medium text-gray-700 mb-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
          <Filter className="h-4 w-4 mr-2 text-primary" />
          Advanced Filters
          <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
            {activeFilters.length}
          </span>
          <svg className={`ml-2 h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Active filters */}
        {activeFilters.length > 0 && <div className="flex flex-wrap gap-2 mb-4 mt-3">
            {activeFilters.map((filter, index) => {
          const option = filterOptions.find(opt => opt.field === filter.field);
          return <div key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <Tag className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                  {option?.label}: {filter.value}
                  <button onClick={() => onRemoveFilter(index)} className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none">
                    <X className="h-4 w-4" />
                  </button>
                </div>;
        })}
            {activeFilters.length > 0 && <button onClick={() => {
          // Create a copy of the array to avoid modifying while iterating
          const indices = [...Array(activeFilters.length).keys()];
          // Remove filters from highest index to lowest to avoid shifting issues
          indices.reverse().forEach(index => onRemoveFilter(index));
        }} className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center px-3 py-1.5">
                <X className="h-4 w-4 mr-1" />
                Clear all filters
              </button>}
          </div>}
        {/* Add new filter */}
        {isExpanded && <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Add Filter
            </h4>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Filter by
                </label>
                <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white" value={selectedField} onChange={e => {
              setSelectedField(e.target.value);
              setFilterValue('');
            }}>
                  <option value="">Select a column</option>
                  {filterOptions.map(option => <option key={option.id} value={option.field}>
                      {option.label}
                    </option>)}
                </select>
              </div>
              {selectedField && <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  {selectedOption?.type === 'select' ? <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white" value={filterValue} onChange={e => setFilterValue(e.target.value)}>
                      <option value="">Select {selectedOption.label}</option>
                      {selectedOption.options?.map(option => <option key={option} value={option}>
                          {option}
                        </option>)}
                    </select> : <input type="text" className="block w-full pl-3 pr-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white" placeholder={`Enter ${selectedOption?.label.toLowerCase()}`} value={filterValue} onChange={e => setFilterValue(e.target.value)} />}
                </div>}
              {selectedField && <button onClick={handleAddFilter} disabled={!filterValue} className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${!filterValue ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'} transition-colors`}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Filter
                </button>}
            </div>
          </div>}
      </div>
    </div>;
}