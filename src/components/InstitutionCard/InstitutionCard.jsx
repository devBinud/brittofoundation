import React from 'react';
import { Award, Users, Trophy, ChevronRight } from 'lucide-react';
import './InstitutionCard.css';

const InstitutionCard = ({ institution, rank, onClick }) => {
  const getBadgeColor = (r) => {
    if (r === 1) return 'gold-rank';
    if (r === 2) return 'silver-rank';
    if (r === 3) return 'bronze-rank';
    return 'normal-rank';
  };

  const getInstitutionIcon = (type) => {
    switch (type) {
      case 'College':
        return '🎓';
      case 'NGO':
        return '🤝';
      case 'Company':
        return '🏢';
      case 'Family Tree':
        return '🌳';
      default:
        return '📍';
    }
  };

  return (
    <div className={`glass-card inst-card animate-fade-in ${rank <= 3 ? 'top-three' : ''}`} onClick={onClick}>
      <div className="inst-rank-section">
        {rank && (
          <div className={`inst-rank-badge ${getBadgeColor(rank)}`}>
            {rank <= 3 ? <Trophy size={18} /> : <span>#{rank}</span>}
          </div>
        )}
      </div>

      <div className="inst-info-section">
        <div className="inst-header">
          <span className="inst-type-icon">{getInstitutionIcon(institution.type)}</span>
          <div className="inst-title-group">
            <h4 className="inst-name">{institution.name}</h4>
            <span className="inst-type badge badge-secondary">{institution.type}</span>
          </div>
        </div>
      </div>

      <div className="inst-stats-section">
        <div className="inst-stat">
          <Users size={16} className="inst-stat-icon" />
          <div className="inst-stat-values">
            <span className="inst-stat-num">{institution.donorCount}</span>
            <span className="inst-stat-label">Donors</span>
          </div>
        </div>

        <div className="inst-stat">
          <Award size={16} className="inst-stat-icon accent-icon" />
          <div className="inst-stat-values">
            <span className="inst-stat-num inst-points">{institution.points}</span>
            <span className="inst-stat-label">Points</span>
          </div>
        </div>
      </div>
      
      {onClick && (
        <div className="inst-arrow">
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
};

export default InstitutionCard;
