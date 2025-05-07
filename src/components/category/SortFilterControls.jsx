import { useState } from 'react'
import { HiFilter, HiSortAscending, HiSortDescending } from 'react-icons/hi'

function SortFilterControls({ onSortChange, activeSort }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const sortOptions = [
    { value: 'date-desc', label: 'Newest First', icon: <HiSortDescending /> },
    { value: 'date-asc', label: 'Oldest First', icon: <HiSortAscending /> },
    { value: 'title-asc', label: 'Title A-Z', icon: <HiSortAscending /> },
    { value: 'title-desc', label: 'Title Z-A', icon: <HiSortDescending /> }
  ]
  
  const handleSortChange = (option) => {
    onSortChange(option)
    setIsOpen(false)
  }
  
  const getActiveSortLabel = () => {
    const option = sortOptions.find(option => option.value === activeSort)
    return option ? option.label : 'Sort By'
  }

  return (
    <div className="relative">
      {/* Mobile Version */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm w-full"
        >
          <HiFilter className="text-dark-600" />
          <span className="font-medium">{getActiveSortLabel()}</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`flex items-center space-x-2 w-full text-left p-4 hover:bg-dark-50 transition-colors ${
                  activeSort === option.value ? 'bg-primary-50 text-primary-700' : 'text-dark-700'
                }`}
              >
                <span className="text-dark-400">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Desktop Version */}
      <div className="hidden md:flex space-x-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeSort === option.value 
                ? 'bg-primary-100 text-primary-700 font-medium' 
                : 'bg-white text-dark-700 hover:bg-dark-50'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SortFilterControls