import React, { useState, useMemo } from 'react';
import { Trophy, Filter, Award, Star, Zap } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import InstitutionCard from '../../../components/InstitutionCard/InstitutionCard';
import './Leaderboard.css';

const Leaderboard = () => {
  const { institutions } = useAuth();
  const [filterType, setFilterType] = useState('');

  // Filter and sort institutions by points
  const sortedInstitutions = useMemo(() => {
    return institutions
      .filter(inst => (filterType ? inst.type === filterType : true))
      .sort((a, b) => b.points - a.points);
  }, [institutions, filterType]);

  // podium mapping: 2nd place on left, 1st place in center, 3rd place on right
  const podium = useMemo(() => {
    const topThree = sortedInstitutions.slice(0, 3);
    const result = [null, null, null]; // [2nd, 1st, 3rd]
    if (topThree[0]) result[1] = topThree[0]; // 1st
    if (topThree[1]) result[0] = topThree[1]; // 2nd
    if (topThree[2]) result[2] = topThree[2]; // 3rd
    return result;
  }, [sortedInstitutions]);

  const listItems = useMemo(() => {
    return sortedInstitutions.slice(3);
  }, [sortedInstitutions]);

  return (
    <div className="leaderboard-panel animate-fade-in">
      <div className="leaderboard-header-row">
        <div className="title-box">
          <Trophy className="header-icon" size={24} />
          <h2>Institution Impact Leaderboard</h2>
        </div>

        {/* Filter controls */}
        <div className="filter-wrapper">
          <Filter size={14} className="filter-icon" />
          <select
            className="form-select filter-select-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="College">Colleges / Schools</option>
            <option value="NGO">NGOs / Welfare</option>
            <option value="Company">Companies / Offices</option>
            <option value="Family Tree">Family Trees</option>
            <option value="Locality">Localities</option>
          </select>
        </div>
      </div>

      <p className="leaderboard-intro">
        Friendly competition to save lives! Institutions accumulate 10 XP points for every registered donor that tags them. Check who leads the rankings this year.
      </p>

      {/* Podium View */}
      {sortedInstitutions.length > 0 && !filterType && (
        <div className="podium-view mt-4">
          {/* Second Place */}
          {podium[0] && (
            <div className="podium-col second-place animate-fade-in">
              <div className="podium-avatar">🥈</div>
              <div className="podium-info">
                <h4>{podium[0].name}</h4>
                <span className="badge badge-secondary">{podium[0].type}</span>
                <p className="podium-points">{podium[0].points} XP</p>
              </div>
              <div className="podium-block step-2">2</div>
            </div>
          )}

          {/* First Place */}
          {podium[1] && (
            <div className="podium-col first-place animate-fade-in">
              <div className="podium-avatar crown-avatar">👑</div>
              <div className="podium-info">
                <h4>{podium[1].name}</h4>
                <span className="badge badge-primary">{podium[1].type}</span>
                <p className="podium-points-gold">{podium[1].points} XP</p>
              </div>
              <div className="podium-block step-1">1</div>
            </div>
          )}

          {/* Third Place */}
          {podium[2] && (
            <div className="podium-col third-place animate-fade-in">
              <div className="podium-avatar">🥉</div>
              <div className="podium-info">
                <h4>{podium[2].name}</h4>
                <span className="badge badge-secondary">{podium[2].type}</span>
                <p className="podium-points">{podium[2].points} XP</p>
              </div>
              <div className="podium-block step-3">3</div>
            </div>
          )}
        </div>
      )}

      {/* Grid listing */}
      <div className="leaderboard-list mt-4">
        <h3>Rankings Directory</h3>
        <div className="leaderboard-cards-container mt-2">
          {sortedInstitutions.map((inst, idx) => {
            // Render all if filters active, otherwise skip first 3 for podium
            if (!filterType && idx < 3) return null;
            return (
              <InstitutionCard
                key={inst.id}
                institution={inst}
                rank={idx + 1}
              />
            );
          })}
          
          {sortedInstitutions.length === 0 && (
            <p className="no-ranks-msg glass-panel">No institutions registered in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
