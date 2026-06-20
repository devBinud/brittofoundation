import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Healthcare.css';
import mapBg from '../../assets/images/background/map.jpg';
import breadcrumbsBg from '../../assets/images/background/breadcrumbs.jpg';

const HealthcareForm = () => {
  const [searchParams] = useSearchParams();
  const roleName = searchParams.get('role') || 'Healthcare Participant';

  // Handle specific renaming for blood request
  const displayRoleTitle = roleName === 'Request Blood' ? 'Requestor Registration Form' : roleName;

  // Get a simplified role name for the headers
  const displayRole = roleName === 'Request Blood' ? 'Requestor' : roleName.replace('Register as ', '').replace('Become a ', '');

  // Determine role key for matching data
  let roleKey = 'Donor';
  if (roleName.toLowerCase().includes('request')) roleKey = 'Request';
  else if (roleName.toLowerCase().includes('volunteer')) roleKey = 'Volunteer';
  else if (roleName.toLowerCase().includes('doctor')) roleKey = 'Doctor';
  else if (roleName.toLowerCase().includes('hospital')) roleKey = 'Hospital';
  else if (roleName.toLowerCase().includes('bank')) roleKey = 'BloodBank';

  // Custom step-by-step instructions for each role
  const stepsData = {
    Donor: [
      {
        title: 'Verify Eligibility',
        desc: 'Ensure you meet age, weight, and general health guidelines before initiating a blood donation request.'
      },
      {
        title: 'Submit Blood details',
        desc: 'Specify your blood group and local district to populate the active donor registry.'
      },
      {
        title: 'Respond to Demands',
        desc: 'Receive alerts when local hospitals or patient relatives request matching emergency lifeline assistance.'
      }
    ],
    Request: [
      {
        title: 'Detail Urgent Request',
        desc: 'Provide patient blood type, required units, hospital POC, and doctor certification details.'
      },
      {
        title: 'Verification Check',
        desc: 'Our administrative coordinators confirm request parameters to maintain high matching integrity.'
      },
      {
        title: 'Match local Donors',
        desc: 'The database searches for active matched contacts, alerting local donors immediately.'
      }
    ],
    Volunteer: [
      {
        title: 'Online Application',
        desc: 'Fill out your contact details, skillset, and preference areas across NGO projects.'
      },
      {
        title: 'Induction Call',
        desc: 'Attend a short orientation call to learn volunteer standards and join local coordinators.'
      },
      {
        title: 'Active Engagement',
        desc: 'Coordinate blood camps, teaching programs, or ecological drives and earn impact certificates.'
      }
    ],
    Doctor: [
      {
        title: 'Provide Credentials',
        desc: 'Register with your MCI/Medical Council number, location details, and specialization area.'
      },
      {
        title: 'Establish Guidelines',
        desc: 'Assist our medical board in setting rules for emergency blood request validation.'
      },
      {
        title: 'Supervise Campaigns',
        desc: 'Lead local student medical camps, write health reports, and supervise NGO sanitization drives.'
      }
    ],
    Hospital: [
      {
        title: 'Submit Registration',
        desc: 'Provide hospital name, registration license copy, address, and medical supervisor details.'
      },
      {
        title: 'Access secure Dashboard',
        desc: 'Enable direct hospital stock-level posting and direct coordinate demands with blood banks.'
      },
      {
        title: 'Coordinate Shipments',
        desc: 'Initiate bulk blood bank transfers and post direct urgent patient requests.'
      }
    ],
    BloodBank: [
      {
        title: 'License Upload',
        desc: 'Provide state storage licensing details, administrative Poc, and refrigeration specifications.'
      },
      {
        title: 'Inventory Syncing',
        desc: 'Connect your inventory system to publish active stock parameters on the donor search.'
      },
      {
        title: 'Streamline Supply Chain',
        desc: 'Provide hospital supply chain handoffs and coordinate storage levels dynamically.'
      }
    ]
  };

  const steps = stepsData[roleKey] || stepsData.Donor;

  // Set colors dynamically to match original card colors
  const themeColors = {
    Donor: '#e11d48',
    Request: '#f97316',
    Volunteer: '#16a34a',
    Doctor: '#2563eb',
    Hospital: '#7c3aed',
    BloodBank: '#0891b2'
  };
  const roleColor = themeColors[roleKey] || 'var(--primary)';

  return (
    <div className="healthcare-form-page animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Banner with Custom breadcrumbs.jpg Background */}
      <div className="form-header-banner" style={{
        backgroundImage: `linear-gradient(135deg, #1e1b4b 0%, #090d16 100%), url(${breadcrumbsBg})`,
        backgroundBlendMode: 'multiply',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: '2.5rem 0',
        color: '#ffffff',
        borderBottom: '1px solid var(--border)',
        textAlign: 'left'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.65rem' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontFamily: "var(--font-heading)", 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {displayRoleTitle}
          </h1>
          
          {/* Modern Breadcrumbs */}
          <div className="breadcrumbs" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.825rem', 
            fontFamily: 'var(--font-sans)', 
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 500,
            margin: 0
          }}>
            <Link to="/" className="breadcrumb-banner-link">Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to="/healthcare" className="breadcrumb-banner-link">Healthcare</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span className="breadcrumb-banner-current">{displayRoleTitle}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area with Map Background */}
      <div className="form-content-area">
        <div className="glass-panel" style={{ 
          padding: '3rem 2.5rem', 
          borderRadius: '16px', 
          textAlign: 'left', 
          maxWidth: '520px', 
          width: '100%', 
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            letterSpacing: '0.12em', 
            color: roleColor, 
            textTransform: 'uppercase', 
            display: 'block', 
            marginBottom: '0.50rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Registration Portal
          </span>
          
          <h2 style={{ 
            fontFamily: "var(--font-heading)", 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            margin: '0 0 0.75rem 0',
            letterSpacing: '-0.02em'
          }}>
            Register as {displayRole}
          </h2>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.95rem', 
            lineHeight: '1.5',
            fontFamily: 'var(--font-sans)',
            margin: '0 0 2rem 0'
          }}>
            Follow this simple three-step process to complete your registration and verify your portal credentials with the Britto Foundation team.
          </p>
          
          {/* Stepper timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', marginTop: '1rem' }}>
            {/* Connector Line */}
            <div style={{
              position: 'absolute',
              left: '17px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              backgroundColor: 'var(--border)',
              zIndex: 1
            }} />

            {steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', gap: '1.25rem', zIndex: 2, position: 'relative' }}>
                {/* Stepper Circle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: `2.5px solid ${roleColor}`,
                  color: roleColor,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {index + 1}
                </div>

                {/* Step Texts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.15rem' }}>
                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    margin: 0,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--font-sans)'
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => alert('This registration workflow will be fully integrated in the next release.')}
            style={{ 
              marginTop: '2.5rem', 
              backgroundColor: roleColor, 
              color: '#fff', 
              border: 'none', 
              padding: '0.85rem', 
              borderRadius: '8px', 
              fontWeight: 700, 
              fontSize: '0.95rem',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-heading)',
              boxShadow: `0 4px 14px ${roleColor}25`,
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
            onMouseOut={(e) => e.currentTarget.style.opacity = 1}
          >
            Start Registration Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthcareForm;
