import React, { useState, useMemo } from 'react';
import { Search, Filter, FileSpreadsheet, Heart } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import DonorCard from '../../../components/DonorCard/DonorCard';
import Button from '../../../components/Button/Button';
import { exportToCSV } from '../../../utils/helpers';
import './DonorSearch.css';

const DonorSearch = () => {
  const { donors } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  // Extract unique institutions from donors list for filter options
  const groupOptions = useMemo(() => {
    const groups = donors.map(d => d.institution).filter(Boolean);
    return [...new Set(groups)];
  }, [donors]);

  // Filter donor list
  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchesSearch = 
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBlood = bloodGroupFilter ? donor.bloodGroup === bloodGroupFilter : true;
      
      const matchesGroup = groupFilter ? donor.institution === groupFilter : true;

      return matchesSearch && matchesBlood && matchesGroup;
    });
  }, [donors, searchTerm, bloodGroupFilter, groupFilter]);

  const handleExportReport = () => {
    // Format data for clean CSV representation
    const exportData = filteredDonors.map((d, index) => ({
      'S.No': index + 1,
      'Name': d.name,
      'Blood Group': d.bloodGroup,
      'Location': d.location,
      'Institution/Group Tag': d.institution || 'N/A',
      'Contact Phone': d.phone,
      'Email': d.email,
      'Last Donation': d.lastDonation,
      'Status': d.available ? 'Available' : 'Resting'
    }));

    const filename = `Donor_Report_${bloodGroupFilter || 'All'}_${groupFilter ? groupFilter.replace(/\s+/g, '_') : 'All'}.csv`;
    exportToCSV(exportData, filename);
  };

  return (
    <div className="donor-search-panel animate-fade-in">
      <div className="search-header-row">
        <div className="search-title-box">
          <Heart size={20} className="header-icon" />
          <h2>Search Blood Donors</h2>
        </div>
        
        {filteredDonors.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <FileSpreadsheet size={16} /> Export Group Report
          </Button>
        )}
      </div>

      <p className="search-intro">
        Filter the real-time state database of registered volunteers. You can export filtered data into a report for campaign coordination.
      </p>

      {/* Query Bar */}
      <div className="search-controls-card glass-panel">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by donor name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="search-filters-row">
          <div className="filter-select-wrapper">
            <Filter size={14} className="filter-icon" />
            <select
              className="form-select filter-select"
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
            >
              <option value="">All Blood Groups</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrapper">
            <Filter size={14} className="filter-icon" />
            <select
              className="form-select filter-select"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            >
              <option value="">All Institution Groups</option>
              {groupOptions.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      {filteredDonors.length > 0 ? (
        <div className="donors-grid mt-4">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      ) : (
        <div className="no-donors-box glass-panel mt-4">
          <p>No registered blood donors match your search criteria.</p>
          <span className="reset-search-link" onClick={() => {
            setSearchTerm('');
            setBloodGroupFilter('');
            setGroupFilter('');
          }}>Reset All Filters</span>
        </div>
      )}
    </div>
  );
};

export default DonorSearch;
