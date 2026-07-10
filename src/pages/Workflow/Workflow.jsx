import {
  Sparkles,
  Home,
  Heart,
  Search,
  Building2,
  Database,
  Users,
  Briefcase,
  UserPlus,
  LogIn,
  Compass
} from 'lucide-react';
import './Workflow.css';

const Workflow = () => {

  const categories = [
    {
      title: "Core Platform",
      badgeColor: "rgba(var(--primary-rgb), 0.1)",
      textColor: "var(--primary)",
      actions: [
        { name: 'Home', desc: 'Return to the landing homepage and overview.', icon: Home },
        { name: 'About Ziv Foundation (formerly Britto Foundation)', desc: 'Learn about our core pillars, vision, and team.', icon: Heart }
      ]
    },
    {
      title: "Discovery & Search",
      badgeColor: "rgba(var(--secondary-rgb), 0.1)",
      textColor: "var(--secondary)",
      actions: [
        { name: 'Search Blood Donors', desc: 'Locate and coordinate with nearby verified blood donors.', icon: Search },
        { name: 'Search Hospitals', desc: 'Lookup regional healthcare clinics and partner facilities.', icon: Building2 },
        { name: 'Search Blood Banks', desc: 'Check real-time blood stock counts and inventory updates.', icon: Database },
        { name: 'Search Communities', desc: 'View active donor groups and localities ranking.', icon: Users },
        { name: 'Search Organizations', desc: 'Explore institutional partners and non-profit collaborators.', icon: Briefcase }
      ]
    },
    {
      title: "Gateway Portals",
      badgeColor: "rgba(217, 119, 6, 0.1)",
      textColor: "var(--accent)",
      actions: [
        { name: 'Register Account', desc: 'Create a new account as a donor, hospital, or student.', icon: UserPlus },
        { name: 'Secure Login', desc: 'Access your specialized dashboard and tracking portal.', icon: LogIn }
      ]
    }
  ];

  const registrationSteps = [
    {
      title: "Verification",
      actions: [
        { name: 'Mobile Number', desc: 'Provide a valid mobile number for identification.' },
        { name: 'OTP Verification', desc: 'One-Time Password verification for security.' }
      ]
    },
    {
      title: "Personal Details",
      actions: [
        { name: 'Name', desc: 'Full name as per official records.' },
        { name: 'Gender', desc: 'Select gender designation.' },
        { name: 'Date of Birth', desc: 'DOB for age verification.' }
      ]
    },
    {
      title: "Address & Region",
      actions: [
        { name: 'Current Address', desc: 'Present residential address.' },
        { name: 'Permanent Address', desc: 'Permanent residential address.' },
        { name: 'District', desc: 'Native or administrative district.' },
        { name: 'Area', desc: 'Local neighborhood or sector.' }
      ]
    },
    {
      title: "Account Creation",
      actions: [
        { name: 'Account Created', desc: 'Account successfully provisioned in the database.' },
        { name: 'Result', desc: 'User Account Created' }
      ]
    }
  ];

  const dashboardSteps = [
    {
      title: "After Login",
      actions: [
        { name: 'Dashboard', desc: 'Main landing panel for authenticated members.' },
        { name: 'Home', desc: 'Return to public ecosystem view.' },
        { name: 'Search Blood', desc: 'Lookup blood donor records.' },
        { name: 'Request Blood', desc: 'Submit emergency blood requests.' },
        { name: 'Communities', desc: 'View regional donor circles.' },
        { name: 'Notifications', desc: 'Real-time alerts and messages.' },
        { name: 'Profile', desc: 'Manage personal settings and role request status.' },
        { name: 'Settings', desc: 'System configuration and preferences.' }
      ]
    },
    {
      title: "Membership Status",
      actions: [
        { name: 'At this stage', desc: 'User = Registered Member' },
        { name: 'Note', desc: '• Not yet a donor.' },
        { name: 'Note', desc: '• Not yet a volunteer.' }
      ]
    }
  ];

  const donorSteps = [
    {
      title: "User Clicks",
      actions: [
        { name: 'Become Blood Donor', desc: 'Initiate registration request from the dashboard.' }
      ]
    },
    {
      title: "Fill Details",
      actions: [
        { name: 'Blood Group', desc: 'Select blood type (A+, A-, B+, etc.).' },
        { name: 'Weight', desc: 'Provide body weight (for safety eligibility).' },
        { name: 'Last Donation Date', desc: 'Date of last donation to track eligibility interval.' },
        { name: 'Availability', desc: 'Toggle active or inactive status.' },
        { name: 'Preferred Donation Locations', desc: 'Select preferred areas or healthcare facilities.' },
        { name: 'Associated With', desc: 'Specify association: Individual, Educational Institution, NGO, Hospital, Blood Bank, Corporate.' },
        { name: 'Emergency Contact', desc: 'Add primary emergency contact details.' }
      ]
    },
    {
      title: "Submit & Activate",
      actions: [
        { name: 'Submit', desc: 'Submit details for validation.' },
        { name: 'Now', desc: 'Donor Status = Active' }
      ]
    }
  ];

  const donorDashboardSteps = [
    {
      title: "Navigation Options",
      actions: [
        { name: 'Donor Dashboard', desc: 'Personal panel displaying donor stats.' },
        { name: 'My Blood Group', desc: 'Verified donor blood type display.' },
        { name: 'Availability', desc: 'Active/inactive donor status toggle.' },
        { name: 'Donation History', desc: 'Log of previous blood donations.' },
        { name: 'Certificates', desc: 'Downloadable certificates of appreciation.' },
        { name: 'Badges', desc: 'Ecosystem achievement and rank badges.' },
        { name: 'Incoming Requests', desc: 'List of matching blood requests.' },
        { name: 'Reviews', desc: 'Feedback from healthcare facilities.' },
        { name: 'Next Eligible Donation Date', desc: 'Countdown calendar for when user can donate again.' }
      ]
    }
  ];

  const requestBloodSteps = [
    {
      title: "Request Form Details",
      actions: [
        { name: 'Patient Name', desc: 'Full name of the recipient.' },
        { name: 'Blood Group Needed', desc: 'Specific blood type requested.' },
        { name: 'Units Required', desc: 'Number of blood bags/units needed.' },
        { name: 'Hospital', desc: 'Destination healthcare facility.' },
        { name: 'District', desc: 'Target administrative district.' },
        { name: 'Area', desc: 'Local neighborhood or sector.' },
        { name: 'Required Date', desc: 'Target date or urgency window.' },
        { name: 'Contact Person', desc: 'Name of coordinator or guardian.' },
        { name: 'Phone Number', desc: 'Contact number for coordination.' },
        { name: 'Remarks', desc: 'Additional clinical or situational notes.' }
      ]
    },
    {
      title: "Action Outcomes",
      actions: [
        { name: 'Submit', desc: 'Submit requests to start the matching engine.' }
      ]
    }
  ];

  const matchingEngineSteps = [
    {
      title: "System Matching Pipeline",
      actions: [
        { name: 'Matching Blood Group', desc: 'Finds donors with compatible blood types.' },
        { name: 'Matching District', desc: 'Filters matched donors within proximity.' },
        { name: 'Available Donors', desc: 'Identifies ready and eligible donors.' }
      ]
    }
  ];

  const donorNotificationSteps = [
    {
      title: "Notification Payload",
      actions: [
        { name: 'Emergency Blood Request', desc: 'High-priority request banner alert.' },
        { name: 'Patient', desc: 'Recipient name.' },
        { name: 'Blood Group', desc: 'Blood group requested.' },
        { name: 'Location', desc: 'Patient region.' },
        { name: 'Hospital', desc: 'Destination facility.' }
      ]
    },
    {
      title: "Interactive Actions",
      actions: [
        { name: '[Accept]', desc: 'Accept donation invitation.' },
        { name: '[Decline]', desc: 'Decline donation invitation.' },
        { name: '[Busy]', desc: 'Mark status as temporarily occupied.' }
      ]
    }
  ];

  const donorAcceptsSteps = [
    {
      title: "Post-Acceptance Steps",
      actions: [
        { name: 'Requester Receives Notification', desc: 'Immediate notification to requestor.' },
        { name: 'Donor Contact Shared', desc: 'Contact number shared with requester.' },
        { name: 'Requester Contact Shared', desc: 'Requester contact shared with donor.' }
      ]
    },
    {
      title: "Final Communication",
      actions: [
        { name: 'Now', desc: 'Now both communicate directly.' }
      ]
    }
  ];

  const bloodDonationSteps = [
    {
      title: "Physical Location Examples",
      actions: [
        { name: 'Hospital', desc: 'Direct donation at verified hospitals.' },
        { name: 'Blood Donation Camp', desc: 'Regional camps and drives.' },
        { name: 'Blood Bank', desc: 'Partner blood bank storage units.' },
        { name: 'Direct Arrangement', desc: 'Individual arrangements between parties.' }
      ]
    },
    {
      title: "Platform Role",
      actions: [
        { name: 'Note', desc: 'Ziv Foundation (formerly Britto Foundation) acts as the bridge.' }
      ]
    }
  ];

  const confirmationSteps = [
    {
      title: "Requester Validation",
      actions: [
        { name: 'Did you receive blood?', desc: 'Confirmation alert sent to requester (YES / NO).' }
      ]
    },
    {
      title: "Donor Validation",
      actions: [
        { name: 'Did you donate blood?', desc: 'Confirmation alert sent to donor (YES / NO).' }
      ]
    },
    {
      title: "Outcome if both say YES",
      actions: [
        { name: 'Result', desc: 'Donation Completed' }
      ]
    }
  ];

  const reviewSteps = [
    {
      title: "Requester Reviews Donor",
      actions: [
        { name: 'Rating', desc: '⭐⭐⭐⭐⭐ (5 Stars)' },
        { name: 'Feedback tag', desc: 'Life Saver' },
        { name: 'Feedback tag', desc: 'Reached On Time' },
        { name: 'Feedback tag', desc: 'Very Supportive' }
      ]
    },
    {
      title: "Donor Reviews Requester",
      actions: [
        { name: 'Rating', desc: '⭐⭐⭐⭐⭐ (5 Stars)' },
        { name: 'Feedback tag', desc: 'Genuine Request' },
        { name: 'Feedback tag', desc: 'Good Coordination' }
      ]
    }
  ];

  const recognitionSteps = [
    {
      title: "Automatic Pipeline",
      actions: [
        { name: 'Donation History', desc: '+1 increment on profile status.' },
        { name: 'Badge Updated', desc: 'Donor tier and badges recalculated.' },
        { name: 'Certificate Generated', desc: 'Appreciation certificate PDF created.' },
        { name: 'Timeline Updated', desc: 'Dynamic public/private log update.' },
        { name: 'Thank You Notification', desc: 'Automated notification sent to donor.' },
        { name: 'Next Eligible Date Calculated', desc: 'Cooldown timer set for next donation eligibility.' }
      ]
    }
  ];

  const communitySteps = [
    {
      title: "System Communities (Auto)",
      actions: [
        { name: 'Examples', desc: 'Assam Engineering College, GMCH, XYZ NGO, ABC Blood Bank.' },
        { name: 'Note', desc: 'Users join automatically through profile association.' }
      ]
    },
    {
      title: "Personal Communities",
      actions: [
        { name: 'Examples', desc: 'Family, Office Team, Hostel Group, Local Club.' }
      ]
    },
    {
      title: "Community Flow",
      actions: [
        { name: 'Step A', desc: 'Create Community' },
        { name: 'Step B', desc: 'Generate Code' },
        { name: 'Step C', desc: 'Share Code' },
        { name: 'Step D', desc: 'Members Join' }
      ]
    }
  ];

  const searchSteps = [
    {
      title: "Search Criteria Filters",
      actions: [
        { name: 'Blood Group', desc: 'Filter matching compatibility.' },
        { name: 'District', desc: 'Filter by administrative district.' },
        { name: 'Area', desc: 'Filter by local area or sector proximity.' },
        { name: 'Organization', desc: 'Filter by corporate or group association.' },
        { name: 'Educational Institution', desc: 'Filter by college or university.' },
        { name: 'NGO', desc: 'Filter by non-profit partner groups.' },
        { name: 'Hospital', desc: 'Filter by registered medical centers.' },
        { name: 'Blood Bank', desc: 'Filter by storage facilities and stock.' },
        { name: 'Community', desc: 'Filter by active member communities.' }
      ]
    }
  ];

  const profileSteps = [
    {
      title: "Profile Sections",
      actions: [
        { name: 'Profile', desc: 'Main public/private card view.' },
        { name: 'Personal Information', desc: 'Full profile and contact details.' },
        { name: 'Blood Information', desc: 'Blood group and health status markers.' },
        { name: 'Donation History', desc: 'List of past physical donations.' },
        { name: 'Certificates', desc: 'Earned donor appreciation certificates.' },
        { name: 'Badges', desc: 'Earned donor ranks and achievement badges.' },
        { name: 'Reviews', desc: 'Ecosystem ratings and feedback.' },
        { name: 'Communities', desc: 'Member-created or auto-associated groups.' },
        { name: 'Associated Organizations', desc: 'Corporate, NGO, or university affiliations.' }
      ]
    }
  ];

  const adminPanelSteps = [
    {
      title: "Administrative Control Actions",
      actions: [
        { name: 'Manage Users', desc: 'Suspend, activate, or update user permissions.' },
        { name: 'View Blood Requests', desc: 'Audit and track platform blood request listings.' },
        { name: 'Manage Hospitals', desc: 'Approve and verify hospital registration requests.' },
        { name: 'Manage Blood Banks', desc: 'Approve and verify regional blood bank inventory.' },
        { name: 'Manage Organizations', desc: 'Approve and verify corporate/NGO partner credentials.' },
        { name: 'Manage Communities', desc: 'Audit and oversee user-created communities.' },
        { name: 'View Reports', desc: 'Generate system-wide donor activity and query statistics.' },
        { name: 'Handle Fake Requests', desc: 'Flag and remove spam or unauthorized request listings.' },
        { name: 'Resolve Disputes', desc: 'Moderate requester/donor review complaints.' },
        { name: 'Manage Badges', desc: 'Update system badges, tier requirements, and icons.' },
        { name: 'Manage Certificates', desc: 'Oversee appreciation templates and metadata.' }
      ]
    },
    {
      title: "Platform Rules",
      actions: [
        { name: 'Note', desc: 'Admin does NOT approve every request (matching is fully automated).' }
      ]
    }
  ];

  return (
    <div className="workflow-page">
      {/* ── COMPACT HERO SECTION ── */}
      <section className="workflow-hero">
        <div className="workflow-hero-noise" />
        <div className="workflow-hero-inner container">
          <div className="workflow-badge">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Interactive Blueprint v1.2</span>
          </div>
          <h1 className="workflow-hero-title">
            Ecosystem <span className="workflow-hero-highlight">Workflow & Architecture</span>
          </h1>
          <p className="workflow-hero-sub">
            Explore the visitor journey, search tools, and registration workflows that drive the Ziv Foundation (formerly Britto Foundation) ecosystem.
          </p>
        </div>
      </section>

      {/* ── MAIN WORKFLOW GRID ── */}
      <section className="workflow-container container">
        <div className="workflow-steps-stack">
          
          {/* STEP 1 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 1</div>
                <h2 className="step-title">
                  Visitor Arrives <span className="step-status"> - Public Access</span>
                </h2>
              </div>

              <p className="step-description">
                When a visitor lands on the Ziv Foundation platform (formerly Britto Foundation platform), they have immediate public access to key resources. Hover or click on the actions below to explore:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {categories.map((cat, catIdx) => (
                  <div key={catIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {cat.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* STEP 2 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 2</div>
                <h2 className="step-title">
                  Registration <span className="step-status"> - Common Entry</span>
                </h2>
              </div>

              <p className="step-description">
                Common registration workflow for everyone. Input details sequentially to establish a verified profile:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {registrationSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isResult = action.name === 'Result';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isResult ? (
                                <span className="node-name" style={{ color: 'var(--primary)' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* STEP 3 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 3</div>
                <h2 className="step-title">
                  First Dashboard <span className="step-status"> - Registered Member</span>
                </h2>
              </div>

              <p className="step-description">
                First dashboard options available immediately after authentication:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {dashboardSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isStage = action.name === 'At this stage';
                        const isNote = action.name === 'Note';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isStage ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : isNote ? (
                                <span className="node-desc" style={{ opacity: 0.8 }}>
                                  {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 has left side only - right side is left empty */}

          </div>

          {/* STEP 4 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 4</div>
                <h2 className="step-title">
                  Become Blood Donor <span className="step-status"> - Active Donor</span>
                </h2>
              </div>

              <p className="step-description">
                Become a blood donor. Fill details and verify eligibility requirements to activate donor status:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {donorSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isNow = action.name === 'Now';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isNow ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 has left side only - right side is left empty */}

          </div>

          {/* STEP 5 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 5</div>
                <h2 className="step-title">
                  Donor Dashboard <span className="step-status"> - Automatically Appears</span>
                </h2>
              </div>

              <p className="step-description">
                Personalized dashboard for registered and approved blood donors:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {donorDashboardSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 5 has left side only - right side is left empty */}

          </div>

          {/* STEP 6 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 6</div>
                <h2 className="step-title">
                  Request Blood <span className="step-status"> - Any Logged-in User</span>
                </h2>
              </div>

              <p className="step-description">
                Any authenticated user in the ecosystem can submit an emergency blood request:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {requestBloodSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isSubmit = action.name === 'Submit';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isSubmit ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 6 has left side only - right side is left empty */}

          </div>

          {/* STEP 7 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 7</div>
                <h2 className="step-title">
                  Blood Matching Engine <span className="step-status"> - System Process</span>
                </h2>
              </div>

              <p className="step-description">
                System matching pipeline coordinates compatibility checks and location filtering:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {matchingEngineSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 7 has left side only - right side is left empty */}

          </div>

          {/* STEP 8 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 8</div>
                <h2 className="step-title">
                  Donor Notification <span className="step-status"> - SMS / Alert</span>
                </h2>
              </div>

              <p className="step-description">
                Matched eligible donors receive emergency alerts with patient and location details:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {donorNotificationSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isAction = action.name.startsWith('[');
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isAction ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name} {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 8 has left side only - right side is left empty */}

          </div>

          {/* STEP 9 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 9</div>
                <h2 className="step-title">
                  Donor Accepts <span className="step-status"> - Direct Contact</span>
                </h2>
              </div>

              <p className="step-description">
                Accepting an emergency invitation triggers contact sharing and enables direct communication:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {donorAcceptsSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isNow = action.name === 'Now';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isNow ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 9 has left side only - right side is left empty */}

          </div>

          {/* STEP 10 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 10</div>
                <h2 className="step-title">
                  Blood Donation <span className="step-status"> - Physical Event</span>
                </h2>
              </div>

              <p className="step-description">
                Donation happens physically. The platform acts as the bridge connecting both parties:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {bloodDonationSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 10 has left side only - right side is left empty */}

          </div>

          {/* STEP 11 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 11</div>
                <h2 className="step-title">
                  Donation Confirmation <span className="step-status"> - Verification</span>
                </h2>
              </div>

              <p className="step-description">
                Post-donation verification ensures accurate records for both recipient and donor:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {confirmationSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isResult = action.name === 'Result';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isResult ? (
                                <span className="node-name" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.name}: {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 11 has left side only - right side is left empty */}

          </div>

          {/* STEP 12 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 12</div>
                <h2 className="step-title">
                  Review System <span className="step-status"> - Feedback</span>
                </h2>
              </div>

              <p className="step-description">
                Mutual feedback system allows requesters and donors to rate their interaction:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {reviewSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 12 has left side only - right side is left empty */}

          </div>

          {/* STEP 13 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 13</div>
                <h2 className="step-title">
                  Recognition Engine <span className="step-status"> - Gamification</span>
                </h2>
              </div>

              <p className="step-description">
                Ecosystem gamification rewards donor participation and updates metrics automatically:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {recognitionSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 13 has left side only - right side is left empty */}

          </div>

          {/* STEP 14 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 14</div>
                <h2 className="step-title">
                  Communities <span className="step-status"> - Groups</span>
                </h2>
              </div>

              <p className="step-description">
                Users join automatically generated institutional circles or build custom community groups:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {communitySteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 14 has left side only - right side is left empty */}

          </div>

          {/* STEP 15 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 15</div>
                <h2 className="step-title">
                  Search System <span className="step-status"> - Query Filters</span>
                </h2>
              </div>

              <p className="step-description">
                Multi-criteria system filters allow visitors and stakeholders to locate key entities:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {searchSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 15 has left side only - right side is left empty */}

          </div>

          {/* STEP 16 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 16</div>
                <h2 className="step-title">
                  Profile <span className="step-status"> - User Profile</span>
                </h2>
              </div>

              <p className="step-description">
                Main user profile card dashboard details available for every user:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {profileSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              <span className="node-name">{action.name}</span>
                              <span className="node-desc">- {action.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 16 has left side only - right side is left empty */}

          </div>

          {/* STEP 17 ROW */}
          <div className="workflow-step-row">
            <div className="workflow-left-panel">
              <div className="step-card-header">
                <div className="step-tag">Step 17</div>
                <h2 className="step-title">
                  Admin Panel <span className="step-status"> - Separate Login</span>
                </h2>
              </div>

              <p className="step-description">
                Ecosystem administrative dashboard capabilities:
              </p>

              {/* Interactive Timeline Journey */}
              <div className="workflow-timeline">
                <div className="timeline-track" />
                
                {adminPanelSteps.map((section, secIdx) => (
                  <div key={secIdx} className="timeline-section">
                    {/* Category Milestone Header */}
                    <div className="timeline-milestone">
                      <div className="milestone-dot-outer">
                        <div className="milestone-dot" />
                      </div>
                      <h3 className="category-header">
                        {section.title}
                      </h3>
                    </div>

                    {/* Nodes List */}
                    <div className="timeline-nodes">
                      {section.actions.map((action, actionIdx) => {
                        const isNote = action.name === 'Note';
                        return (
                          <div key={actionIdx} className="timeline-node-item">
                            <div className="timeline-node-marker">
                              <div className="node-dot" />
                            </div>
                            <div className="timeline-node-content">
                              {isNote ? (
                                <span className="node-desc" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                  {action.desc}
                                </span>
                              ) : (
                                <>
                                  <span className="node-name">{action.name}</span>
                                  <span className="node-desc">- {action.desc}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </section>
    </div>
  );
};

export default Workflow;
