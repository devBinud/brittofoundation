import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trophy, BookOpen, ShieldAlert, Award, ArrowRight, Activity, Users, MapPin, Leaf, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import homepageEducation from '../../assets/images/homepage_education.webp';
import heroHealthcare from '../../assets/images/sliders/britto-registration_hero.png';
import heroEducation from '../../assets/images/sliders/education.webp';
import heroEnvironment from '../../assets/images/sliders/environment_bg.jpg';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: heroHealthcare,
      badge: "Assam’s Life Saving Network",
      badgeClass: "badge-healthcare",
      title: "জীৱন ৰেখাৰ প্ৰতিটো বিন্দুত",
      titleSub: "বৃত্ত ফাউণ্ডেশ্যন",
      subtitle: "At every point of the lifeline — Britto Foundation. Connecting blood donors, matching critical hospital needs, and coordinating emergency response across Assam.",
      primaryText: "Join as a Donor",
      secondaryText: "Learn Our Mission",
      primaryPath: "/login",
      secondaryPath: "/about"
    },
    {
      id: 2,
      image: heroEducation,
      badge: "Skills for Tomorrow",
      badgeClass: "badge-education",
      title: "জ্ঞানেৰে সমৃদ্ধ কৰোঁ আহক",
      titleSub: "বৃত্ত ফাউণ্ডেশ্যন শিক্ষা",
      subtitle: "Fostering community growth with specialized micro-courses covering first aid, blood donation ethics, and local resource management.",
      primaryText: "Browse Courses",
      secondaryText: "Our Mission",
      primaryPath: "/education",
      secondaryPath: "/about"
    },
    {
      id: 3,
      image: heroEnvironment,
      badge: "Guardians of Nature",
      badgeClass: "badge-environment",
      title: "সেউজ আৰু সুন্দৰ অসম",
      titleSub: "বৃত্ত ফাউণ্ডেশ্যন পৰিৱেশ",
      subtitle: "Empower citizens to report ecological hazards, coordinate plastic cleanup drives, and support local community-led eco-tourism.",
      primaryText: "Explore Eco Projects",
      secondaryText: "Report Issue",
      primaryPath: "/environment",
      secondaryPath: "/environment"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="container hero-slide-container">
              {index === currentSlide && (
                <div className="hero-slide-content">
                  <h1 className="hero-title">
                    {slide.title} <br />
                    <span className="text-gradient">{slide.titleSub}</span>
                  </h1>
                  <p className="hero-subtitle">
                    {slide.subtitle}
                  </p>
                  <div className="hero-actions">
                    <button
                      className={`hero-primary-btn ${slide.badgeClass}-btn`}
                      onClick={() => navigate(slide.primaryPath)}
                    >
                      <span>{slide.primaryText}</span>
                      <span className="hero-btn-icon">
                        <ArrowUpRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <button className="slider-control-btn prev-btn" onClick={handlePrev} aria-label="Previous slide">
          <ChevronLeft size={28} />
        </button>
        <button className="slider-control-btn next-btn" onClick={handleNext} aria-label="Next slide">
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators/Dots */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pre">Our Initiatives</span>
            <h2 className="section-title">Core Pillars of Britto Foundation</h2>
            <p className="section-desc">
              We leverage digital tools to coordinate blood donation camps, incentivize community involvement, run education modules, and manage civic reporting.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1: Healthcare */}
            <div
              className="role-card glass-card"
              onClick={() => navigate('/healthcare')}
            >
              {/* Ribbon Badge */}
              <div className="card-ribbon">
                <span className="card-ribbon-text ribbon-red">
                  Popular
                </span>
              </div>

              {/* Watermark Icon */}
              <div className="card-watermark">
                <Heart size={130} />
              </div>

              {/* Content */}
              <h3 className="role-card-title">Healthcare</h3>
              <p className="role-card-desc">
                Search real-time registered blood donors, match critical hospital requirements, and coordinate emergency response across Assam.
              </p>

              <span className="role-card-link blood-link">
                Explore More <ArrowRight size={16} />
              </span>
            </div>

            {/* Feature 2: Education */}
            <div
              className="role-card glass-card"
              onClick={() => navigate('/education')}
            >
              {/* Ribbon Badge */}
              <div className="card-ribbon">
                <span className="card-ribbon-text ribbon-blue">
                  Skills
                </span>
              </div>

              {/* Watermark Icon */}
              <div className="card-watermark">
                <BookOpen size={130} />
              </div>

              {/* Content */}
              <h3 className="role-card-title">Education</h3>
              <p className="role-card-desc">
                Fostering community growth with courses on first aid, blood donation ethics, and local resource management.
              </p>

              <span className="role-card-link education-link">
                Explore More <ArrowRight size={16} />
              </span>
            </div>

            {/* Feature 3: Environment */}
            <div
              className="role-card glass-card"
              onClick={() => navigate('/environment')}
            >
              {/* Ribbon Badge */}
              <div className="card-ribbon">
                <span className="card-ribbon-text ribbon-green">
                  Eco
                </span>
              </div>

              {/* Watermark Icon */}
              <div className="card-watermark">
                <Leaf size={130} />
              </div>

              {/* Content */}
              <h3 className="role-card-title">Environment</h3>
              <p className="role-card-desc">
                Empower citizens to report ecological hazards, coordinate plastic cleanup drives, and support local community-led eco-tourism.
              </p>

              <span className="role-card-link env-link">
                Explore More <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* General Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-container glass-panel">
            <div className="cta-content">
              <h2 className="cta-title">Be the Lifeline of Your Community</h2>
              <p className="cta-subtitle">
                Join Britto Foundation to save lives, support local education, and lead environmental action. Register today as a donor, volunteer, or organization.
              </p>
            </div>
            <div className="cta-actions">
              <Button variant="primary" size="lg" onClick={() => navigate('/login')} className="cta-btn">
                <span>Join Our Mission</span> <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
