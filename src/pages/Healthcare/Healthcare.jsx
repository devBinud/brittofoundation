import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, HeartHandshake, Users, Stethoscope, Hospital, ArrowRight, ArrowDown } from 'lucide-react';
import './Healthcare.css';

const Healthcare = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      id: 'donor',
      title: 'Become a Donor',
      desc: 'Donate blood and save lives. Your one donation can bring hope and save three different lives.',
      icon: <Droplet />,
      ribbonText: 'Popular',
      ribbonClass: 'ribbon-red',
      path: '/login?role=Donor',
    },
    {
      id: 'request',
      title: 'Request Blood',
      desc: "Looking for blood for yourself or a loved one? Submit a request and we'll help you find a blood donor.",
      icon: <HeartHandshake />,
      ribbonText: 'Urgent',
      ribbonClass: 'ribbon-orange',
      path: '/login?role=Donor',
    },
    {
      id: 'volunteer',
      title: 'Become a Volunteer',
      desc: 'Give your time, spread awareness, and help us build a stronger, greener and healthier community.',
      icon: <Users />,
      ribbonText: 'New',
      ribbonClass: 'ribbon-green',
      path: '/login?role=Student',
    },
    {
      id: 'doctor',
      title: 'Register as Doctor',
      desc: 'Join our network of trusted and verified doctors and help save more lives.',
      icon: <Stethoscope />,
      ribbonText: 'Verified',
      ribbonClass: 'ribbon-blue',
      path: '/login?role=Donor',
    },
    {
      id: 'hospital',
      title: 'Register Hospital',
      desc: 'Partner with us to streamline blood requests and support patient care.',
      icon: <Hospital />,
      ribbonText: 'Partner',
      ribbonClass: 'ribbon-purple',
      path: '/register-hospital',
    },
    {
      id: 'bloodbank',
      title: 'Register Blood Bank',
      desc: 'Be a part of our network to store, manage and supply life-saving blood.',
      icon: <Hospital />,
      ribbonText: 'Network',
      ribbonClass: 'ribbon-cyan',
      path: '/login?role=Hospital',
    },
  ];

  const handleScrollToRoles = () => {
    const section = document.getElementById('roles-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="healthcare-page animate-fade-in">
      {/* Hero Section */}
      <section className="healthcare-hero-section">
        <div className="container healthcare-hero-container">
          <div className="healthcare-hero-left">
            <span className="welcome-badge">Welcome to Britto Foundation®</span>

            <h1 className="healthcare-hero-title">
              Three Pillars<br />
              <span className="text-gradient">One Platform</span>
            </h1>

            <p className="healthcare-hero-subtitle">
              Join our global community and be a part of a mission that brings hope, healing and life.
            </p>

            <button className="scroll-down-btn" onClick={handleScrollToRoles}>
              Register Below <ArrowDown size={16} className="bounce-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles-section" className="roles-section">
        <div className="container">
          <div className="roles-header">
            <span className="roles-pre-title">CHOOSE YOUR ROLE</span>
            <h2 className="roles-title">Register and Make a Difference</h2>
          </div>

          <div className="roles-grid">
            {roleCards.map((card) => (
              <div
                key={card.id}
                className="role-card glass-card"
                onClick={() => navigate(`/healthcare/register?role=${encodeURIComponent(card.title)}`)}
              >
                {/* Ribbon Badge */}
                <div className="card-ribbon">
                  <span className={`card-ribbon-text ${card.ribbonClass}`}>
                    {card.ribbonText}
                  </span>
                </div>

                {/* Watermark Icon */}
                <div className="card-watermark">
                  {card.icon}
                </div>

                {/* Content */}
                <h3 className="role-card-title">{card.title}</h3>
                <p className="role-card-desc">{card.desc}</p>

                <span className={`role-card-link ${card.id}-link`}>
                  Register Now <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Healthcare;
