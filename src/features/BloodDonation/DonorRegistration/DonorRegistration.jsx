import React, { useState } from 'react';
import { ShieldCheck, Heart, User, MapPin, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { validatePhone, validateBloodGroup } from '../../../utils/validators';
import Button from '../../../components/Button/Button';
import './DonorRegistration.css';

const DonorRegistration = () => {
  const { currentUser, donors, institutions, registerDonor } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if current user is already in the donor list
  const existingDonor = donors.find(d => d.email === currentUser.email);

  const [formData, setFormData] = useState({
    name: existingDonor?.name || currentUser.name || '',
    phone: existingDonor?.phone || '',
    bloodGroup: existingDonor?.bloodGroup || 'O+',
    location: existingDonor?.location || 'Jorhat',
    institution: existingDonor?.institution || '',
    lastDonation: existingDonor?.lastDonation || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!validateBloodGroup(formData.bloodGroup)) {
      tempErrors.bloodGroup = 'Please select a valid blood group';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      registerDonor({
        name: formData.name,
        email: currentUser.email,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        location: formData.location,
        institution: formData.institution,
        lastDonation: formData.lastDonation || 'Never'
      });
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="donor-registration-panel glass-panel animate-fade-in">
      <div className="panel-header">
        <Heart className="panel-icon pulse-primary" size={24} />
        <h2>Donor Registration Status</h2>
      </div>

      {success || existingDonor ? (
        <div className="registration-success-message">
          <ShieldCheck size={48} className="success-icon" />
          <h3>You are Registered as a Donor!</h3>
          <p>
            Your blood group is <strong>{existingDonor?.bloodGroup || formData.bloodGroup}</strong>, and you are donating as part of{' '}
            <strong>{existingDonor?.institution || formData.institution || 'None'}</strong>.
          </p>
          
          <div className="registered-details-card glass-panel">
            <div className="detail-row">
              <User size={16} /> <span>{existingDonor?.name || formData.name}</span>
            </div>
            <div className="detail-row">
              <Phone size={16} /> <span>{existingDonor?.phone || formData.phone}</span>
            </div>
            <div className="detail-row">
              <MapPin size={16} /> <span>{existingDonor?.location || formData.location}, Assam</span>
            </div>
            <div className="detail-row">
              <Calendar size={16} /> <span>Last Donation: {existingDonor?.lastDonation || formData.lastDonation || 'Never'}</span>
            </div>
          </div>

          <p className="success-footer-note">
            Your name is now visible to hospitals and requestors in our secure donor directory. Thank you for your support!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <p className="form-info-text">
            Register your details below. Doing so allows hospitals and local NGOs to view your availability. Tagging an institution will add points to their leaderboard ranking.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="bloodGroup">Blood Group *</label>
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
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="location">City / Location *</label>
              <select
                id="location"
                name="location"
                className="form-select"
                value={formData.location}
                onChange={handleChange}
              >
                {['Jorhat', 'Guwahati', 'Dibrugarh', 'Tezpur', 'Silchar', 'Nagaon', 'Sivasagar'].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="institution">Associate Group / Institution</label>
              <select
                id="institution"
                name="institution"
                className="form-select"
                value={formData.institution}
                onChange={handleChange}
              >
                <option value="">-- No Institution / Private --</option>
                {institutions.map(inst => (
                  <option key={inst.id} value={inst.name}>{inst.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lastDonation">Last Blood Donation Date (If Any)</label>
            <input
              type="date"
              id="lastDonation"
              name="lastDonation"
              className="form-input"
              value={formData.lastDonation}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" loading={loading} className="w-full mt-3">
            Register as Blood Donor
          </Button>
        </form>
      )}
    </div>
  );
};

export default DonorRegistration;
