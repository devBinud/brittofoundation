import React, { useMemo } from 'react';
import { Trophy, Users, Award, ShieldAlert, FileSpreadsheet, MapPin } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import { exportToCSV } from '../../../utils/helpers';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
  const { currentUser, donors, institutions } = useAuth();

  // Find corresponding institution details in global database
  const myDetails = useMemo(() => {
    return institutions.find(i => i.name === currentUser.name) || institutions[0];
  }, [institutions, currentUser]);

  // Find all donors registered under this group name
  const members = useMemo(() => {
    return donors.filter(d => d.institution === myDetails.name);
  }, [donors, myDetails]);

  // Calculate rank
  const rank = useMemo(() => {
    const sorted = [...institutions].sort((a, b) => b.points - a.points);
    return sorted.findIndex(i => i.id === myDetails.id) + 1;
  }, [institutions, myDetails]);

  const handleExportMembers = () => {
    const exportData = members.map((m, index) => ({
      'S.No': index + 1,
      'Member Name': m.name,
      'Blood Group': m.bloodGroup,
      'Phone Number': m.phone,
      'Email Address': m.email,
      'Last Donated': m.lastDonation,
      'Status': m.available ? 'Available' : 'Resting'
    }));

    exportToCSV(exportData, `${myDetails.name.replace(/\s+/g, '_')}_Members_Report.csv`);
  };

  return (
    <div className="institution-dashboard animate-fade-in">
      <div className="dashboard-intro-row">
        <div>
          <h2>Group Admin Panel</h2>
          <div className="inst-sub-header">
            <span className="inst-tag badge badge-primary">{myDetails.type}</span>
            <span className="location-tag"><MapPin size={14} /> {myDetails.location}, Assam</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportMembers} disabled={members.length === 0}>
          <FileSpreadsheet size={16} /> Export Member Sheet
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="inst-metrics-grid mt-4">
        <div className="glass-card metric-item">
          <div className="metric-icon-box points-box">
            <Award size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Impact Points</span>
            <h3>{myDetails.points} XP</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box rank-box">
            <Trophy size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Leaderboard Rank</span>
            <h3>#{rank} in state</h3>
          </div>
        </div>

        <div className="glass-card metric-item">
          <div className="metric-icon-box users-box">
            <Users size={24} />
          </div>
          <div className="metric-text-group">
            <span className="metric-label">Registered Donors</span>
            <h3>{members.length} Members</h3>
          </div>
        </div>
      </div>

      {/* Members List Section */}
      <div className="glass-panel members-list-card mt-4">
        <h3>Registered Members Directory</h3>
        <p className="section-info">
          These volunteers have registered under your institution name. You can use their contact numbers to coordinate emergency blood camps.
        </p>

        {members.length > 0 ? (
          <div className="table-responsive">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Last Donation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td className="member-name-cell">{m.name}</td>
                    <td><span className="blood-type-badge">{m.bloodGroup}</span></td>
                    <td><a href={`tel:${m.phone}`} className="phone-link">{m.phone}</a></td>
                    <td className="email-cell">{m.email}</td>
                    <td>{m.lastDonation}</td>
                    <td>
                      <span className={`badge ${m.available ? 'badge-success' : 'badge-danger'}`}>
                        {m.available ? 'Available' : 'Resting'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-members-msg text-center mt-3">No members have registered under your group yet.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionDashboard;
