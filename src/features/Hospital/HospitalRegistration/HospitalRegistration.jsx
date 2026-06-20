import React, { useState } from 'react';
import { Landmark, ShieldCheck, Mail, Phone, Lock, FileText } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { validateEmail, validatePhone, validatePassword } from '../../../utils/validators';
import Button from '../../../components/Button/Button';
import './HospitalRegistration.css';

const HospitalRegistration = () => {
  const { registerHospital } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    email: '',
    phone: '',
    location: 'Jorhat',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = 'Hospital Name is required';
    if (!formData.registrationNo.trim()) tempErrors.registrationNo = 'Registration Number is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      registerHospital({
        name: formData.name,
        registrationNo: formData.registrationNo,
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      });
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="hosp-registration-panel glass-panel animate-fade-in">
      <div className="panel-header">
        <Landmark className="panel-icon" size={24} />
        <h2>Register Hospital Partner</h2>
      </div>

      {success ? (
        <div className="registration-success-message text-center">
          <ShieldCheck size={48} className="success-icon" />
          <h3>Hospital Registered Successfully!</h3>
          <p>
            <strong>{formData.name}</strong> is now registered on our platform under registration number <strong>{formData.registrationNo}</strong>.
          </p>
          <p className="success-desc">
            You can now log in using your credentials to issue urgent blood demands, browse local donor matches, and update inventory requests.
          </p>
          <Button variant="outline" onClick={() => {
            setSuccess(false);
            setFormData({
              name: '',
              registrationNo: '',
              email: '',
              phone: '',
              location: 'Jorhat',
              password: ''
            });
          }}>Register Another Hospital</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <p className="form-info-text">
            Register your medical facility. Hospital partner accounts can request blood directly, verify emergency requests, and query active local donors.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Hospital Name *</label>
            <div className="input-with-icon">
              <Landmark size={16} className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input icon-indent ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jorhat Mission Hospital"
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="registrationNo">Govt Registration Number *</label>
              <div className="input-with-icon">
                <FileText size={16} className="input-icon" />
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  className={`form-input icon-indent ${errors.registrationNo ? 'input-error' : ''}`}
                  value={formData.registrationNo}
                  onChange={handleChange}
                  placeholder="e.g. HOSP-JRT-4029"
                />
              </div>
              {errors.registrationNo && <span className="error-text">{errors.registrationNo}</span>}
            </div>

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
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="email">Hospital Email *</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input icon-indent ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. contact@hosp.org"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="phone">Emergency Helpline *</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className={`form-input icon-indent ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Helpline Password *</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input icon-indent ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose dashboard password"
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <Button type="submit" loading={loading} className="w-full mt-3">
            Register Hospital
          </Button>
        </form>
      )}
    </div>
  );
};

export default HospitalRegistration;
