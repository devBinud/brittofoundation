import React, { useState } from 'react';
import { Phone, MapPin, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import Button from '../Button/Button';
import './DonorCard.css';

const DonorCard = ({ donor }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="glass-card donor-card animate-fade-in">
      <div className="donor-header">
        <div className="donor-avatar">
          {donor.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="donor-title-group">
          <h4 className="donor-name">{donor.name}</h4>
          {donor.institution && (
            <span className="donor-institution badge badge-secondary">
              {donor.institution}
            </span>
          )}
        </div>
        <div className="donor-blood-badge">
          {donor.bloodGroup}
        </div>
      </div>

      <hr className="donor-divider" />

      <div className="donor-details">
        <div className="donor-detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{donor.location}, Assam</span>
        </div>
        <div className="donor-detail-item">
          <Calendar size={16} className="detail-icon" />
          <span>Last Donated: {donor.lastDonation}</span>
        </div>
        <div className="donor-detail-item">
          {donor.available ? (
            <span className="availability-status text-success">
              <CheckCircle2 size={16} className="detail-icon" />
              Available for Donation
            </span>
          ) : (
            <span className="availability-status text-danger">
              <ShieldAlert size={16} className="detail-icon" />
              Not Available (Within 90 Days)
            </span>
          )}
        </div>
      </div>

      <div className="donor-actions">
        {showContact ? (
          <div className="donor-contact-info animate-fade-in">
            <Phone size={14} />
            <a href={`tel:${donor.phone}`} className="phone-number">{donor.phone}</a>
            <span className="email-address">{donor.email}</span>
          </div>
        ) : (
          <Button
            variant={donor.available ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowContact(true)}
            className="w-full"
          >
            <Phone size={14} /> Contact Donor
          </Button>
        )}
      </div>
    </div>
  );
};

export default DonorCard;
