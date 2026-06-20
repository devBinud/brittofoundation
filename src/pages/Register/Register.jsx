import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, HeartHandshake, Users, Stethoscope, Hospital, Activity, ArrowRight, ArrowDown } from 'lucide-react';
import registrationHero from '../../assets/britto-registration_hero.png';
import Button from '../../components/Button/Button';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      id: 'donor',
      title: 'Become a Donor',
      desc: 'Donate blood and save lives. Your one donation can bring hope and save three different lives.',
      icon: <Droplet size={28} />,
      colorClass: 'donor-card',
      path: '/login?role=Donor',
    },
    {
      id: 'request',
      title: 'Request Blood',
      desc: "Looking for blood for yourself or a loved one? Submit a request and we'll help you find a blood donor.",
      icon: <HeartHandshake size={28} />,
      colorClass: 'request-card',
      path: '/login?role=Donor',
    },
    {
      id: 'volunteer',
      title: 'Become a Volunteer',
      desc: 'Give your time, spread awareness, and help us build a stronger, greener and healthier community.',
      icon: <Users size={28} />,
      colorClass: 'volunteer-card',
      path: '/login?role=Student',
    },
    {
      id: 'doctor',
      title: 'Register as Doctor',
      desc: 'Join our network of trusted and verified doctors and help save more lives.',
      icon: <Stethoscope size={28} />,
      colorClass: 'doctor-card',
      path: '/login?role=Donor',
    },
    {
      id: 'hospital',
      title: 'Register Hospital',
      desc: 'Partner with us to streamline blood requests and support patient care.',
      icon: <Hospital size={28} />,
      colorClass: 'hospital-card',
      path: '/register-hospital',
    },
    {
      id: 'bloodbank',
      title: 'Register Blood Bank',
      desc: 'Be a part of our network to store, manage and supply life-saving blood.',
      icon: <Hospital size={28} />, // or a different icon if preferred, hospital fits blood bank structure
      colorClass: 'bloodbank-card',
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
    <div className="register-page animate-fade-in">
      {/* Hero Section */}
      <section className="register-hero-section">
        <div className="container register-hero-container">
          <div className="register-hero-left">
            <span className="welcome-badge">Welcome to Britto Foundation®</span>
            <span className="pillars-label">HEALTHCARE | EDUCATION | ENVIRONMENT</span>
            
            <h1 className="register-hero-title">
              Three Pillars<br />
              <span className="text-gradient">One Platform</span>
            </h1>
            
            <p className="register-hero-subtitle">
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
            <span className="roles-heart">❤️</span>
            <h2 className="roles-title">Register and Make a Difference</h2>
            <p className="roles-subtitle">
              Select the option that best describes you and start your journey with us.
            </p>
          </div>

          <div className="roles-grid">
            {roleCards.map((card) => (
              <div key={card.id} className={`role-card glass-card ${card.colorClass}`}>
                <div className="role-icon-container">
                  {card.icon}
                </div>
                <h3 className="role-card-title">{card.title}</h3>
                <p className="role-card-desc">{card.desc}</p>
                <Button 
                  onClick={() => navigate(card.path)} 
                  className="role-card-button"
                >
                  Register Now <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
