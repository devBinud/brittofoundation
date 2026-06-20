import React, { useState } from 'react';
import { PlusCircle, ShieldAlert, CheckCircle2, User, Phone, Landmark, MessageSquare } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import { validatePhone } from '../../../utils/validators';
import './BloodRequest.css';

const BloodRequest = () => {
  const { currentUser, bloodRequests, addBloodRequest, fulfillBloodRequest } = useAuth();
  
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsNeeded: '1',
    urgency: 'Urgent',
    contactPhone: '',
    hospitalName: currentUser?.role === 'Hospital' ? currentUser.name : '',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.patientName.trim()) tempErrors.patientName = 'Patient Name is required';
    if (!formData.hospitalName.trim()) tempErrors.hospitalName = 'Hospital Name is required';
    if (!formData.contactPhone.trim()) {
      tempErrors.contactPhone = 'Contact Phone is required';
    } else if (!validatePhone(formData.contactPhone)) {
      tempErrors.contactPhone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.reason.trim()) tempErrors.reason = 'Reason/Medical Condition is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addBloodRequest({
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        unitsNeeded: parseInt(formData.unitsNeeded),
        urgency: formData.urgency,
        contactPhone: formData.contactPhone,
        hospitalName: formData.hospitalName,
        reason: formData.reason
      });
      setFormData({
        patientName: '',
        bloodGroup: 'O+',
        unitsNeeded: '1',
        urgency: 'Urgent',
        contactPhone: '',
        hospitalName: currentUser?.role === 'Hospital' ? currentUser.name : '',
        reason: ''
      });
      setShowForm(false);
    }, 1000);
  };

  const handleFulfill = (reqId) => {
    fulfillBloodRequest(reqId);
  };

  const isEligibleToFulfill = currentUser?.role === 'Hospital' || currentUser?.role === 'Government';

  return (
    <div className="blood-request-panel animate-fade-in">
      <div className="request-header-row">
        <h2>Blood Emergency Requests</h2>
        {!showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <PlusCircle size={16} /> Request Blood
          </Button>
        )}
      </div>

      {showForm && (
        <div className="request-form-card glass-panel animate-fade-in mt-3">
          <form onSubmit={handleSubmit} className="request-form">
            <h3>Emergency Request Form</h3>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="patientName">Patient Name *</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  className={`form-input ${errors.patientName ? 'input-error' : ''}`}
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Patient name"
                />
                {errors.patientName && <span className="error-text">{errors.patientName}</span>}
              </div>

              <div className="form-group flex-1">
                <label className="form-label" htmlFor="hospitalName">Target Hospital *</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  className={`form-input ${errors.hospitalName ? 'input-error' : ''}`}
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="e.g. JMCH, Jorhat"
                  disabled={currentUser?.role === 'Hospital'}
                />
                {errors.hospitalName && <span className="error-text">{errors.hospitalName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="bloodGroup">Blood Group Required *</label>
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
                <label className="form-label" htmlFor="unitsNeeded">Units Needed (Bags) *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  id="unitsNeeded"
                  name="unitsNeeded"
                  className="form-input"
                  value={formData.unitsNeeded}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group flex-1">
                <label className="form-label" htmlFor="urgency">Urgency Level *</label>
                <select
                  id="urgency"
                  name="urgency"
                  className="form-select"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="Normal">Normal (Elective)</option>
                  <option value="Urgent">Urgent (Within 24 hours)</option>
                  <option value="Emergency">Emergency (Immediate)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="contactPhone">Contact Phone Number *</label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  className={`form-input ${errors.contactPhone ? 'input-error' : ''}`}
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9435012345"
                />
                {errors.contactPhone && <span className="error-text">{errors.contactPhone}</span>}
              </div>

              <div className="form-group flex-2">
                <label className="form-label" htmlFor="reason">Medical Reason *</label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  className={`form-input ${errors.reason ? 'input-error' : ''}`}
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g. Heart Surgery, Road Accident"
                />
                {errors.reason && <span className="error-text">{errors.reason}</span>}
              </div>
            </div>

            <div className="form-actions mt-2">
              <Button type="submit" loading={loading}>Submit Request</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Requests Directory */}
      <div className="requests-list mt-4">
        <h3>Active Requests</h3>
        {bloodRequests.length > 0 ? (
          <div className="requests-grid">
            {bloodRequests.map((req) => (
              <div key={req.id} className={`glass-card request-item-card ${req.status === 'Fulfilled' ? 'fulfilled' : ''}`}>
                <div className="request-card-header">
                  <div className="request-patient-details">
                    <User size={18} className="item-icon" />
                    <h4>{req.patientName}</h4>
                  </div>
                  <span className={`badge ${
                    req.status === 'Fulfilled' 
                      ? 'badge-success' 
                      : req.urgency === 'Emergency' 
                        ? 'badge-danger pulse-primary' 
                        : req.urgency === 'Urgent' 
                          ? 'badge-warning' 
                          : 'badge-primary'
                  }`}>
                    {req.status === 'Fulfilled' ? 'Fulfilled' : req.urgency}
                  </span>
                </div>

                <hr className="card-divider" />

                <div className="request-card-details">
                  <div className="detail-item">
                    <span className="label">Blood Group:</span>
                    <span className="val blood-val">{req.bloodGroup}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Units Needed:</span>
                    <span className="val">{req.unitsNeeded} Bags</span>
                  </div>
                  <div className="detail-item">
                    <Landmark size={14} className="detail-icon" />
                    <span className="val">{req.hospitalName}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={14} className="detail-icon" />
                    <a href={`tel:${req.contactPhone}`} className="val phone-link">{req.contactPhone}</a>
                  </div>
                  <div className="detail-item reason-item">
                    <MessageSquare size={14} className="detail-icon" />
                    <span className="val italic">{req.reason}</span>
                  </div>
                </div>

                {req.status === 'Pending' && isEligibleToFulfill && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleFulfill(req.id)}
                    className="w-full mt-3"
                  >
                    <CheckCircle2 size={14} /> Fulfill Demand
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-requests-msg glass-panel">No active blood requests currently listed.</p>
        )}
      </div>
    </div>
  );
};

export default BloodRequest;
