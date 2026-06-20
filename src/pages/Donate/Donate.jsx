import React, { useState } from 'react';
import { Heart, Landmark, ShieldCheck, CheckCircle2, DollarSign, Wallet } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Donate.css';

const Donate = () => {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const presets = ['500', '1000', '2500', '5000'];

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setCustomAmount(val);
      setAmount('');
    }
  };

  const getFinalAmount = () => {
    return customAmount || amount || '0';
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(getFinalAmount()) <= 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="donate-page container animate-fade-in">
      <div className="donate-header">
        <h1 className="donate-title">Support Britto Foundation</h1>
        <p className="donate-subtitle">Your donations help us buy blood storage kits, conduct campus donation camps, and run community eco-tourism awareness drives.</p>
      </div>

      <div className="donate-grid">
        {/* Donation Form */}
        <div className="donate-form-card glass-panel">
          {submitted ? (
            <div className="donate-success-box animate-fade-in">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Thank You for Your Donation!</h3>
              <p className="donate-success-summary">
                We have received your mock payment of <strong>₹{getFinalAmount()}</strong> via <strong>{paymentMethod}</strong>.
              </p>
              <p className="success-disclaimer">
                This is a mock transaction. No money was transferred. We appreciate your interest in supporting Britto Foundation!
              </p>
              <Button variant="primary" onClick={() => {
                setSubmitted(false);
                setAmount('1000');
                setCustomAmount('');
                setDonorName('');
                setIsAnonymous(false);
              }}>Make Another Donation</Button>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="donate-form">
              <h3>Choose Contribution Amount</h3>
              
              <div className="presets-row">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`preset-btn ${amount === preset ? 'active' : ''}`}
                    onClick={() => handlePresetClick(preset)}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="custom-amount">Or Enter Custom Amount (₹)</label>
                <input
                  type="text"
                  id="custom-amount"
                  className="form-input"
                  placeholder="Enter other amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                />
              </div>

              <hr className="donate-divider" />

              <h3>Billing Details</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="donor-name">Donor Name</label>
                <input
                  type="text"
                  id="donor-name"
                  className="form-input"
                  placeholder="Enter your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                />
              </div>

              <div className="anonymous-checkbox-row">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous">Make this contribution anonymous</label>
              </div>

              <hr className="donate-divider" />

              <h3>Payment Method</h3>
              <div className="payment-options-grid">
                {['UPI', 'Card', 'NetBanking'].map((method) => (
                  <label key={method} className={`payment-option-label ${paymentMethod === method ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              <Button type="submit" loading={loading} className="donate-submit-btn w-full mt-3">
                Donate ₹{getFinalAmount() || '0'}
              </Button>
            </form>
          )}
        </div>

        {/* Benefits Sidebar */}
        <div className="donate-benefits-panel">
          <div className="glass-card transparency-card">
            <h4><ShieldCheck size={20} className="icon-title" /> 100% Transparency</h4>
            <p>Every rupee donated goes directly towards camp logistics, first-aid materials, and youth certification rewards.</p>
            
            <div className="transparency-pie-mock">
              <div className="pie-item">
                <div className="pie-color camp-color"></div>
                <div className="pie-label-group">
                  <span className="pie-label">Blood Storage & Camps</span>
                  <span className="pie-percent">70%</span>
                </div>
              </div>
              <div className="pie-item">
                <div className="pie-color eco-color"></div>
                <div className="pie-label-group">
                  <span className="pie-label">Eco drives & reports</span>
                  <span className="pie-percent">20%</span>
                </div>
              </div>
              <div className="pie-item">
                <div className="pie-color edu-color"></div>
                <div className="pie-label-group">
                  <span className="pie-label">Education Course incentives</span>
                  <span className="pie-percent">10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card tier-card">
            <h4><Heart size={20} className="icon-title" /> Recognition Tiers</h4>
            <ul className="tier-list">
              <li>
                <span className="badge badge-primary">Silver Patron</span>
                <span className="tier-range">₹500 - ₹2,499</span>
                <p>Receives official foundation e-certificate and badge.</p>
              </li>
              <li>
                <span className="badge badge-secondary">Gold Guardian</span>
                <span className="tier-range">₹2,500 - ₹9,999</span>
                <p>Foundation lapel pin + digital cert + newsletter mention.</p>
              </li>
              <li>
                <span className="badge badge-success">Life Lifeline</span>
                <span className="tier-range">₹10,000+</span>
                <p>Invited to annual award ceremonies as VIP delegates.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
