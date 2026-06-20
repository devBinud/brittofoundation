import React from 'react';
import { Heart, Users, Landmark, Zap, Shield, Star, ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">

      {/* ── HERO HEADER ── */}
      <section className="about-hero">
        <div className="about-hero-noise" />
        <div className="about-hero-inner container">
          <div className="about-hero-badge">
            <Star size={12} />
            <span>Our Story &amp; Mission</span>
          </div>
          <h1 className="about-hero-title">
            Built on <span className="about-hero-highlight">Purpose</span>,<br />
            Driven by <span className="about-hero-highlight2">People</span>
          </h1>
          <p className="about-hero-sub">
            জীৱন ৰেখাৰ প্ৰতিটো বিন্দুত — At every point of the lifeline, Britto Foundation bridges critical gaps in health, environment, and education across Assam.
          </p>

          {/* Hero Stats Row */}
          <div className="about-stats-row">
            <div className="about-stat-chip">
              <span className="about-stat-num">3+</span>
              <span className="about-stat-lbl">Pillars of Impact</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-chip">
              <span className="about-stat-num">2026</span>
              <span className="about-stat-lbl">Founded in Assam</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-chip">
              <span className="about-stat-num">∞</span>
              <span className="about-stat-lbl">Community Reach</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS MESSAGE ── */}
      <section className="founders-section container">
        <div className="founders-card">
          {/* Decorative accent blobs */}
          <div className="founders-blob founders-blob-1" />
          <div className="founders-blob founders-blob-2" />

          <div className="founders-quote-mark">"</div>

          <div className="founders-top">
            <div className="founders-tag">
              <Zap size={13} />
              <span>Founders' Vision</span>
            </div>
            <h2 className="founders-heading">A Message from Our Founders</h2>
          </div>

          <div className="founders-text">
           <p>
  Britto Foundation was created with a simple belief: everyone deserves access to support, opportunities, and a better future, regardless of their circumstances. We believe real change happens when people come together and help one another.

  <br /><br />

  Every day, we see families facing medical emergencies, students looking for opportunities to learn and grow, and communities dealing with environmental challenges. These experiences inspired us to establish Britto Foundation and work toward meaningful solutions that make a lasting difference.

  <br /><br />

  Our work is focused on three core areas: Healthcare, Education, and Environment.

  <br /><br />

  In healthcare, we support initiatives that help connect patients with critical assistance, promote blood donation, and strengthen community networks so help is available when it is needed most.

  <br /><br />

  In education, we aim to provide learning opportunities, encourage personal development, and help individuals gain the knowledge and skills needed to build a brighter future.

  <br /><br />

  In the area of environment, we promote awareness, responsible practices, and community participation to help protect natural resources and create a healthier world for future generations.

  <br /><br />

  Britto Foundation is more than an organization. It is a community of people who believe that positive change is possible through collective effort. Volunteers, donors, supporters, and partners all play an important role in helping us create a meaningful impact.

  <br /><br />

  We dream of a future where no patient faces an emergency alone, where every person has the chance to learn and succeed, and where communities actively contribute to a cleaner, healthier, and more sustainable environment.

  <br /><br />

  This vision guides everything we do. It brings us together and motivates us to keep moving forward.

  <br /><br />

  <strong>Britto Foundation. Connecting Compassion with Action.</strong>
</p>
          </div>

          <div className="founders-sigs">
            <div className="sig-card">
              <div className="sig-avatar">PG</div>
              <div className="sig-info">
                <span className="sig-name">Pranab Milan Gogoi</span>
                <span className="sig-role">Co-Founder, Britto Foundation</span>
              </div>
            </div>
            <div className="sig-card">
              <div className="sig-avatar">AB</div>
              <div className="sig-info">
                <span className="sig-name">Abhishek Buragohain</span>
                <span className="sig-role">Co-Founder, Britto Foundation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className="pillars-section container">
        <div className="pillars-header">
          <div className="pillars-tag">
            <Shield size={13} />
            <span>What We Stand For</span>
          </div>
          <h2 className="pillars-title">Our Core Pillars</h2>
          <p className="pillars-sub">Three interconnected missions that shape every decision we make.</p>
        </div>

        <div className="pillars-grid">
          {/* Pillar 1 */}
          <div className="pillar-card pillar-blood">
            <div className="pillar-card-glow" />
            <div className="pillar-icon-wrap pillar-icon-blood">
              <Heart size={26} />
            </div>
            <div className="pillar-watermark"><Heart size={120} /></div>
            <div className="pillar-number">01</div>
            <h3 className="pillar-title">Group-Based Blood Donation</h3>
            <p className="pillar-desc">
              We aggregate individual contributions under groups like Colleges, NGOs, Localities, and Family Trees to encourage social responsibility and track group-wise impact.
            </p>
            <div className="pillar-link">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-card pillar-unity">
            <div className="pillar-card-glow" />
            <div className="pillar-icon-wrap pillar-icon-unity">
              <Users size={26} />
            </div>
            <div className="pillar-watermark"><Users size={120} /></div>
            <div className="pillar-number">02</div>
            <h3 className="pillar-title">Social Recognition</h3>
            <p className="pillar-desc">
              Collaborating with local governments to institute annual awards for the highest-contributing communities, driving sustained participation through recognition and honour.
            </p>
            <div className="pillar-link">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-card pillar-govt">
            <div className="pillar-card-glow" />
            <div className="pillar-icon-wrap pillar-icon-govt">
              <Landmark size={26} />
            </div>
            <div className="pillar-watermark"><Landmark size={120} /></div>
            <div className="pillar-number">03</div>
            <h3 className="pillar-title">Public Transparency</h3>
            <p className="pillar-desc">
              Connecting citizens directly with administration bodies through environmental reporting tools and generating blood inventory transparency for hospitals across the region.
            </p>
            <div className="pillar-link">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
