import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, Printer, Search, Filter, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import { exportToCSV } from '../../../utils/helpers';
import './Reports.css';

const Reports = () => {
  const { donors, institutions, bloodRequests } = useAuth();
  
  const [reportType, setReportType] = useState('blood-requests');
  const [cityFilter, setCityFilter] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');

  // Generate dataset based on type
  const reportData = useMemo(() => {
    if (reportType === 'blood-requests') {
      return bloodRequests.filter(req => {
        // filter by blood group if set
        const matchesBlood = bloodGroupFilter ? req.bloodGroup === bloodGroupFilter : true;
        // hospital location filter
        const matchesCity = cityFilter ? req.hospitalName.toLowerCase().includes(cityFilter.toLowerCase()) : true;
        return matchesBlood && matchesCity;
      });
    } else if (reportType === 'donors-registry') {
      return donors.filter(donor => {
        const matchesBlood = bloodGroupFilter ? donor.bloodGroup === bloodGroupFilter : true;
        const matchesCity = cityFilter ? donor.location === cityFilter : true;
        return matchesBlood && matchesCity;
      });
    } else {
      // institution rankings
      return [...institutions]
        .filter(inst => (cityFilter ? inst.location === cityFilter : true))
        .sort((a, b) => b.points - a.points);
    }
  }, [reportType, cityFilter, bloodGroupFilter, donors, institutions, bloodRequests]);

  const handleExportCSV = () => {
    let exportData = [];
    let filename = `Report_${reportType}`;

    if (reportType === 'blood-requests') {
      exportData = reportData.map((r, i) => ({
        'Index': i + 1,
        'Patient': r.patientName,
        'Hospital': r.hospitalName,
        'Blood Group': r.bloodGroup,
        'Units Required': r.unitsNeeded,
        'Urgency': r.urgency,
        'Date': r.date,
        'Status': r.status
      }));
    } else if (reportType === 'donors-registry') {
      exportData = reportData.map((d, i) => ({
        'Index': i + 1,
        'Name': d.name,
        'Blood Group': d.bloodGroup,
        'Location': d.location,
        'Contact Number': d.phone,
        'Email Address': d.email,
        'Associated Institution': d.institution || 'None',
        'Last Donation Date': d.lastDonation
      }));
    } else {
      exportData = reportData.map((inst, i) => ({
        'Rank': i + 1,
        'Group Name': inst.name,
        'Type': inst.type,
        'Location': inst.location,
        'Total Donors Count': inst.donorCount,
        'Total points': inst.points
      }));
    }

    exportToCSV(exportData, `${filename}.csv`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-panel animate-fade-in no-print">
      <div className="reports-header-row">
        <h2>System Reports Generator</h2>
        <div className="reports-actions-group">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer size={16} /> Print Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={reportData.length === 0}>
            <FileSpreadsheet size={16} /> Export CSV
          </Button>
        </div>
      </div>

      <p className="reports-intro">
        Configure report types and apply location/group filters. You can export the resulting table to CSV or print it for offline files.
      </p>

      {/* Selectors and Filters Card */}
      <div className="reports-filter-card glass-panel">
        <div className="selector-field flex-1">
          <label className="form-label">Report Type</label>
          <select
            className="form-select"
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              setBloodGroupFilter('');
            }}
          >
            <option value="blood-requests">Emergency Blood Requests Log</option>
            <option value="donors-registry">Statewide Registered Donors Registry</option>
            <option value="institution-rankings">Institution Performance rankings</option>
          </select>
        </div>

        <div className="filters-row flex-1">
          <div className="filter-item flex-1">
            <label className="form-label">City / Location</label>
            <select
              className="form-select"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {['Jorhat', 'Guwahati', 'Dibrugarh', 'Tezpur', 'Silchar', 'Nagaon', 'Sivasagar'].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {reportType !== 'institution-rankings' && (
            <div className="filter-item flex-1">
              <label className="form-label">Blood Group</label>
              <select
                className="form-select"
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
              >
                <option value="">All Blood Groups</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Reports Display Table */}
      <div className="glass-panel report-output-card mt-4">
        <h3>Report Results ({reportData.length} records)</h3>

        {reportData.length > 0 ? (
          <div className="table-responsive">
            {reportType === 'blood-requests' && (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Blood Group</th>
                    <th>Units Required</th>
                    <th>Urgency</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((r) => (
                    <tr key={r.id}>
                      <td className="bold-cell">{r.patientName}</td>
                      <td>{r.hospitalName}</td>
                      <td><span className="blood-badge">{r.bloodGroup}</span></td>
                      <td>{r.unitsNeeded} Bags</td>
                      <td>
                        <span className={`badge ${r.urgency === 'Emergency' ? 'badge-danger' : r.urgency === 'Urgent' ? 'badge-warning' : 'badge-primary'}`}>
                          {r.urgency}
                        </span>
                      </td>
                      <td>{r.date}</td>
                      <td>
                        <span className={`badge ${r.status === 'Fulfilled' ? 'badge-success' : 'badge-danger'}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reportType === 'donors-registry' && (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Institution</th>
                    <th>Last Donation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((d) => (
                    <tr key={d.id}>
                      <td className="bold-cell">{d.name}</td>
                      <td><span className="blood-badge">{d.bloodGroup}</span></td>
                      <td>{d.location}</td>
                      <td>{d.phone}</td>
                      <td>{d.institution || 'Private'}</td>
                      <td>{d.lastDonation}</td>
                      <td>
                        <span className={`badge ${d.available ? 'badge-success' : 'badge-danger'}`}>
                          {d.available ? 'Available' : 'Resting'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reportType === 'institution-rankings' && (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Institution Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Donors Tagged</th>
                    <th>Impact Score</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((inst, index) => (
                    <tr key={inst.id}>
                      <td className="bold-cell">#{index + 1}</td>
                      <td className="bold-cell">{inst.name}</td>
                      <td><span className="badge badge-secondary">{inst.type}</span></td>
                      <td>{inst.location}</td>
                      <td>{inst.donorCount} Donors</td>
                      <td><span className="points-text">{inst.points} XP</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <p className="no-records-msg text-center mt-3">No matching records found for the selected parameters.</p>
        )}
      </div>

      {/* PRINT-ONLY CSS CONTAINER */}
      <div className="print-only-container">
        <h2>BRITTO FOUNDATION SYSTEM REPORT</h2>
        <p>Generated on: {new Date().toLocaleDateString()}</p>
        <p>Report Category: {reportType.toUpperCase().replace('-', ' ')}</p>
        <hr />
        {/* Render a simple table for printers (unaffected by glassmorphic styling) */}
        <table className="print-table">
          <thead>
            <tr>
              <th>Record Details</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, idx) => (
              <tr key={idx}>
                <td>{JSON.stringify(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
