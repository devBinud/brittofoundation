import React, { useMemo, useState } from 'react';
import { Landmark, Activity, UserCheck, ShieldAlert, PlusCircle, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import './HospitalDashboard.css';

const HospitalDashboard = () => {
  const { currentUser, donors, bloodRequests, addBloodRequest, fulfillBloodRequest, hospitals } = useAuth();
  
  const myDetails = useMemo(() => {
    return hospitals.find(h => h.name === currentUser.name) || hospitals[0];
  }, [hospitals, currentUser]);

  const [showDemandForm, setShowDemandForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsNeeded: '2',
    urgency: 'Emergency',
    contactPhone: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Filter requests issued by this hospital
  const myRequests = useMemo(() => {
    return bloodRequests.filter(req => req.hospitalName === myDetails.name);
  }, [bloodRequests, myDetails]);

  // Count summaries
  const pendingRequests = myRequests.filter(r => r.status === 'Pending').length;
  const completedRequests = myRequests.filter(r => r.status === 'Fulfilled').length;

  // Filter local donors (living in the same city as the hospital)
  const localDonors = useMemo(() => {
    return donors.filter(d => d.location === myDetails.location);
  }, [donors, myDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateDemand = (e) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setErrors({ patientName: 'Patient name is required' });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      addBloodRequest({
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        unitsNeeded: parseInt(formData.unitsNeeded),
        urgency: formData.urgency,
        contactPhone: formData.contactPhone || myDetails.phone,
        hospitalName: myDetails.name,
        reason: formData.reason || 'Hospital blood inventory restoration'
      });
      setLoading(false);
      setShowDemandForm(false);
      setFormData({
        patientName: '',
        bloodGroup: 'O+',
        unitsNeeded: '2',
        urgency: 'Emergency',
        contactPhone: '',
        reason: ''
      });
      setErrors({});
    }, 1000);
  };

  return (
    <div className="hospital-dashboard animate-fade-in">
      <div className="hosp-intro-row">
        <div>
          <h2>Hospital Portal</h2>
          <div className="hosp-sub-header">
            <span className="badge badge-primary"><Landmark size={12} /> {myDetails.name}</span>
            <span className="location-tag"><MapPin size={12} /> {myDetails.location}, Assam</span>
          </div>
        </div>
        <Button variant="primary" onClick={() => setShowDemandForm(true)}>
          <PlusCircle size={16} /> Issue Blood Demand
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="hosp-metrics-grid mt-4">
        <div className="glass-card metric-item">
          <div className="metric-icon-box req-box">
            <Activity size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Active Demands</span>
            <h3>{pendingRequests} Requests</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box check-box">
            <UserCheck size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Completed Demands</span>
            <h3>{completedRequests} Fulfilled</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box donor-box">
            <MapPin size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Matching Local Donors</span>
            <h3>{localDonors.length} Volunteers</h3>
          </div>
        </div>
      </div>

      {/* Demand creation modal/panel */}
      {showDemandForm && (
        <div className="demand-modal-overlay">
          <div className="demand-modal glass-panel animate-fade-in">
            <h3>Issue Blood Demand</h3>
            <form onSubmit={handleCreateDemand} className="demand-form">
              <div className="form-group">
                <label className="form-label" htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  className="form-input"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient full name"
                />
                {errors.patientName && <span className="error-text">{errors.patientName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="form-select"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="unitsNeeded">Units (Bags)</label>
                  <input
                    type="number"
                    min="1"
                    id="unitsNeeded"
                    name="unitsNeeded"
                    className="form-input"
                    value={formData.unitsNeeded}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="urgency">Urgency</label>
                <select
                  id="urgency"
                  name="urgency"
                  className="form-select"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="Emergency">Emergency (Immediate)</option>
                  <option value="Urgent">Urgent (Within 24 Hours)</option>
                  <option value="Normal">Normal (Stock Restoration)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reason">Medical Description</label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  className="form-input"
                  placeholder="e.g. Anemia therapy, heart bypass surgery"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <Button type="submit" loading={loading}>Submit Demand</Button>
                <Button variant="outline" onClick={() => setShowDemandForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lists split layout */}
      <div className="hosp-split-layout mt-4">
        {/* Active Requests */}
        <div className="glass-panel requests-card flex-1">
          <h3>Your Issued Demands</h3>
          {myRequests.length > 0 ? (
            <div className="demand-items-list mt-3">
              {myRequests.map((req) => (
                <div key={req.id} className="demand-item border-bottom">
                  <div className="demand-item-header">
                    <h5>{req.patientName}</h5>
                    <span className={`badge ${req.status === 'Fulfilled' ? 'badge-success' : 'badge-danger'}`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="demand-item-desc">
                    <span>Group: <strong>{req.bloodGroup}</strong></span>
                    <span>Units: {req.unitsNeeded} Bags</span>
                    <span className="date-tag">{req.date}</span>
                  </div>
                  {req.status === 'Pending' && (
                    <Button variant="outline" size="sm" onClick={() => fulfillBloodRequest(req.id)} className="mt-2">
                      Mark as Fulfilled
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-requests-msg mt-3">You have not issued any blood demands yet.</p>
          )}
        </div>

        {/* Local Donors matching location */}
        <div className="glass-panel donors-match-card flex-1">
          <h3>Local Matching Donors ({myDetails.location})</h3>
          <p className="section-info">Direct contact directory of volunteers located near your facility.</p>
          
          {localDonors.length > 0 ? (
            <div className="donors-match-list mt-3">
              {localDonors.map((donor) => (
                <div key={donor.id} className="match-donor-item border-bottom">
                  <div className="match-donor-header">
                    <h6>{donor.name}</h6>
                    <span className="blood-badge">{donor.bloodGroup}</span>
                  </div>
                  <div className="match-donor-desc">
                    <span className="inst-badge">{donor.institution || 'Private Donor'}</span>
                    <span className="phone-badge"><Phone size={12} /> <a href={`tel:${donor.phone}`}>{donor.phone}</a></span>
                  </div>
                  <div className="match-donor-status">
                    <span className={`availability-text ${donor.available ? 'text-success' : 'text-danger'}`}>
                      {donor.available ? 'Available' : 'Resting'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-donors-msg mt-3">No registered donors listed in your city yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
