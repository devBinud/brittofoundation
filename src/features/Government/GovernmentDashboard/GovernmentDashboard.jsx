import React, { useMemo, useState } from 'react';
import { Landmark, Activity, Trophy, ShieldCheck, Download, Award, ShieldAlert, BarChart3, Users } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import './GovernmentDashboard.css';

const GovernmentDashboard = () => {
  const { donors, institutions, hospitals, bloodRequests } = useAuth();
  
  // Pending hospital registration requests (mock list)
  const [pendingHospitals, setPendingHospitals] = useState([
    { id: 'p-hosp-1', name: 'Nagaon Civil Hospital', location: 'Nagaon', registrationNo: 'H-NGN-2026-03', email: 'nagaoncivil@gmail.com' }
  ]);

  // Aggregate stats
  const pendingRequestsCount = useMemo(() => {
    return bloodRequests.filter(r => r.status === 'Pending').length;
  }, [bloodRequests]);

  const topInstitution = useMemo(() => {
    if (!institutions.length) return null;
    return [...institutions].sort((a, b) => b.points - a.points)[0];
  }, [institutions]);

  // Group donors count by blood group for statistics rendering
  const bloodGroupStats = useMemo(() => {
    const counts = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 };
    donors.forEach(d => {
      if (counts[d.bloodGroup] !== undefined) counts[d.bloodGroup]++;
    });
    
    // Find maximum count for scale normalization
    const maxVal = Math.max(...Object.values(counts), 1);
    
    return Object.entries(counts).map(([group, count]) => ({
      group,
      count,
      percent: (count / maxVal) * 100
    }));
  }, [donors]);

  const handleApproveHospital = (id) => {
    setPendingHospitals(prev => prev.filter(h => h.id !== id));
    // Simulated notification: in production, this would trigger hospital active boolean update
  };

  return (
    <div className="govt-dashboard animate-fade-in">
      <div className="govt-intro-row">
        <div>
          <h2>Government Health Portal</h2>
          <span className="badge badge-secondary"><Landmark size={12} /> State Health Department, Govt of Assam</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="govt-metrics-grid mt-4">
        <div className="glass-card metric-item">
          <div className="metric-icon-box statewide-box">
            <Activity size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Statewide Requests</span>
            <h3>{pendingRequestsCount} Pending</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box top-inst-box">
            <Trophy size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Top Institution</span>
            <h3>{topInstitution?.name.split(' ').slice(0,2).join(' ') || 'None'}</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box hosp-count-box">
            <Landmark size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Hospitals Enrolled</span>
            <h3>{hospitals.length} Partners</h3>
          </div>
        </div>
      </div>

      {/* Visual Analytics Block */}
      <div className="govt-analytics-layout mt-4">
        {/* Blood Pool Statistics */}
        <div className="glass-panel stats-chart-card flex-1">
          <div className="card-header-icon-group">
            <BarChart3 size={20} className="icon-blue" />
            <h3>Blood Donor Pool Distribution</h3>
          </div>
          <p className="section-info">Live representation of available donors registered by blood group in the state registry.</p>
          
          <div className="bar-chart-container mt-3">
            {bloodGroupStats.map((stat) => (
              <div key={stat.group} className="chart-row">
                <span className="chart-label">{stat.group}</span>
                <div className="chart-bar-outer">
                  <div className="chart-bar-inner" style={{ width: `${stat.percent}%` }}></div>
                </div>
                <span className="chart-value">{stat.count} Donors</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel: Approval List */}
        <div className="glass-panel approvals-card flex-1">
          <div className="card-header-icon-group">
            <ShieldAlert size={20} className="icon-orange" />
            <h3>Hospital Verifications</h3>
          </div>
          <p className="section-info">Pending applications from newly registered medical facilities awaiting government portal access clearance.</p>

          {pendingHospitals.length > 0 ? (
            <div className="approvals-list mt-3">
              {pendingHospitals.map((hosp) => (
                <div key={hosp.id} className="approval-item border-bottom">
                  <div className="approval-details">
                    <h5>{hosp.name}</h5>
                    <div className="approval-sub">
                      <span>ID: {hosp.registrationNo}</span>
                      <span>City: {hosp.location}</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleApproveHospital(hosp.id)}>
                    Approve Access
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-pending-box text-center mt-4">
              <ShieldCheck size={36} className="success-icon" />
              <p className="mt-2">All registered hospital facilities are fully verified.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
