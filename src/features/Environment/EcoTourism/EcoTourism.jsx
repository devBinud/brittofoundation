import React, { useState } from 'react';
import { Landmark, Compass, Calendar, ArrowRight, ShieldCheck, Mail, Send } from 'lucide-react';
import Button from '../../../components/Button/Button';
import './EcoTourism.css';

const EcoTourism = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    people: '2',
    notes: ''
  });

  const spots = [
    {
      id: 'spot-1',
      title: 'Majuli River Island Homestays',
      location: 'Majuli, Assam',
      description: 'Experience Mising tribal culture, handloom weaving workshops, and organic farming on the world’s largest river island.',
      cost: '₹1,500/night',
      host: 'Biren Miri & Community'
    },
    {
      id: 'spot-2',
      title: 'Gibbon Forest Wildlife Trails',
      location: 'Mariani, Jorhat',
      description: 'Community-guided birdwatching and canopy walking trails to see endangered Hoolock Gibbons in their natural habitat.',
      cost: '₹800/guide',
      host: 'Mariani Youth Conservation Club'
    },
    {
      id: 'spot-3',
      title: 'Dehing Patkai Rainforest Camping',
      location: 'Digboi, Tinsukia',
      description: 'Eco-campsites managed by local forest-fringe villagers promoting the conservation of the "Amazon of the East".',
      cost: '₹2,200/night',
      host: 'Patkai Eco Volunteers'
    }
  ];

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInquirySubmitted(true);
      setFormData({
        name: '',
        email: '',
        date: '',
        people: '2',
        notes: ''
      });
    }, 1200);
  };

  return (
    <div className="eco-tourism-panel animate-fade-in">
      <div className="eco-header-row">
        <div className="title-box">
          <Compass className="header-icon" size={24} />
          <h2>Community-Led Eco-Tourism</h2>
        </div>
      </div>

      <p className="eco-intro">
        Explore Assam sustainably. These travel experiences are owned, managed, and guided by local youths, ensuring that tourism income directly supports forest conservation and tribal livelihood.
      </p>

      {/* Catalog Grid */}
      <div className="spots-grid mt-4">
        {spots.map((spot) => (
          <div key={spot.id} className="glass-card spot-card">
            <div className="spot-banner-placeholder">
              <Compass size={40} className="banner-icon" />
            </div>

            <div className="spot-details">
              <span className="spot-location">{spot.location}</span>
              <h3 className="spot-title">{spot.title}</h3>
              <p className="spot-desc">{spot.description}</p>
              
              <div className="spot-host-info">
                <span>Managed by: <strong>{spot.host}</strong></span>
                <span className="spot-cost">{spot.cost}</span>
              </div>

              <div className="spot-actions mt-3">
                <Button variant="primary" className="w-full" onClick={() => setSelectedSpot(spot)}>
                  Inquire Booking <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Inquiry Modal */}
      {selectedSpot && (
        <div className="booking-modal-overlay">
          <div className="booking-modal glass-panel animate-fade-in">
            {inquirySubmitted ? (
              <div className="inquiry-success-box text-center">
                <ShieldCheck size={48} className="success-icon" />
                <h3>Booking Inquiry Received</h3>
                <p>
                  Thank you! Your booking inquiry for <strong>{selectedSpot.title}</strong> has been sent to <strong>{selectedSpot.host}</strong>.
                </p>
                <p className="success-footer">They will contact you on your registered email address soon.</p>
                <Button variant="outline" onClick={() => {
                  setSelectedSpot(null);
                  setInquirySubmitted(false);
                }}>Close Dialog</Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="booking-form">
                <h3>Homestay Booking Inquiry</h3>
                <p className="form-subtitle">For: {selectedSpot.title}</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="date">Travel Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="people">No. of Guests</label>
                    <input
                      type="number"
                      min="1"
                      id="people"
                      className="form-input"
                      value={formData.people}
                      onChange={(e) => setFormData(prev => ({ ...prev, people: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">Additional Requests</label>
                  <input
                    type="text"
                    id="notes"
                    className="form-input"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g. food requirements, guided tour details..."
                  />
                </div>

                <div className="form-actions mt-3">
                  <Button type="submit" loading={loading}>
                    <Send size={14} /> Send Inquiry
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedSpot(null)}>Cancel</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoTourism;
