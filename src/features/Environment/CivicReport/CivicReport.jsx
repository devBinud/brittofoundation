import React, { useState } from 'react';
import { ShieldAlert, PlusCircle, CheckCircle2, MapPin, Calendar, ThumbsUp, Trash2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import './CivicReport.css';

const CivicReport = () => {
  const { currentUser, civicReports, addCivicReport, upvoteCivicReport } = useAuth();
  
  const [showReportForm, setShowReportForm] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Garbage Dumping',
    location: '',
    description: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.location.trim()) tempErrors.location = 'Specific location is required';
    if (!formData.description.trim()) tempErrors.description = 'Description is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      addCivicReport({
        category: formData.category,
        location: formData.location,
        description: formData.description,
        reporterName: currentUser?.name || 'Anonymous Citizen'
      });
      setLoading(false);
      setShowReportForm(false);
      setFormData({
        category: 'Garbage Dumping',
        location: '',
        description: '',
        photo: null
      });
      setErrors({});
    }, 1000);
  };

  return (
    <div className="civic-report-panel animate-fade-in">
      <div className="report-header-row">
        <div className="title-box">
          <ShieldAlert className="header-icon" size={24} />
          <h2>Civic & Ecological Reports</h2>
        </div>
        {!showReportForm && (
          <Button variant="primary" onClick={() => setShowReportForm(true)}>
            <PlusCircle size={16} /> File Civic Report
          </Button>
        )}
      </div>

      <p className="report-intro">
        Report community environmental issues such as unauthorized tree felling, plastic dumping, or water logging. Local administrators and NGO volunteer groups review these alerts for action.
      </p>

      {/* Form Card */}
      {showReportForm && (
        <div className="report-form-card glass-panel animate-fade-in mt-3">
          <form onSubmit={handleCreateReport} className="report-form">
            <h3>File Local Environmental Alert</h3>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="category">Issue Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Garbage Dumping">Garbage & Plastic Dumping</option>
                  <option value="Tree Protection">Tree Felling / Deforestation</option>
                  <option value="Water Logging">Drainage & Water Logging</option>
                  <option value="Streetlight">Defective Streetlight / Hazard</option>
                  <option value="Other">Other Ecological Concern</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label className="form-label" htmlFor="location">Specific Location / Address *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`form-input ${errors.location ? 'input-error' : ''}`}
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Garmur, near JEC main gate, Jorhat"
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Alert Details & Description *</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue, estimated severity, and if immediate cleanup is required..."
              ></textarea>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-actions mt-2">
              <Button type="submit" loading={loading}>Submit Report</Button>
              <Button variant="outline" onClick={() => setShowReportForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Listing Grid */}
      <div className="reports-listing mt-4">
        <h3>Active Environmental Alerts</h3>
        
        {civicReports.length > 0 ? (
          <div className="reports-grid">
            {civicReports.map((report) => (
              <div key={report.id} className="glass-card report-item-card">
                <div className="card-header-status">
                  <span className="badge badge-secondary">{report.category}</span>
                  <span className={`badge ${report.status === 'Open' ? 'badge-danger' : report.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                    {report.status}
                  </span>
                </div>

                <h4 className="report-title-text">{report.description.substring(0, 50)}...</h4>
                <p className="report-full-desc">{report.description}</p>

                <hr className="divider" />

                <div className="report-metadata-info">
                  <div className="meta-row-item">
                    <MapPin size={14} className="meta-icon" />
                    <span>{report.location}</span>
                  </div>
                  <div className="meta-row-item">
                    <Calendar size={14} className="meta-icon" />
                    <span>Reported by: {report.reporterName} on {report.date}</span>
                  </div>
                </div>

                <div className="card-actions-row mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => upvoteCivicReport(report.id)}
                    className="upvote-btn"
                  >
                    <ThumbsUp size={14} /> Upvote Concern ({report.votes})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reports-msg text-center mt-3">No active civic reports listed currently.</p>
        )}
      </div>
    </div>
  );
};

export default CivicReport;
