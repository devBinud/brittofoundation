import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';

// Public Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Donate from '../pages/Donate/Donate';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NewsArticles from '../pages/NewsArticles/NewsArticles';
import Healthcare from '../pages/Healthcare/Healthcare';
import HealthcareForm from '../pages/Healthcare/HealthcareForm';
import Education from '../pages/Education/Education';
import Environment from '../pages/Environment/Environment';

// Feature Dashboards & Workflows
import DonorRegistration from '../features/BloodDonation/DonorRegistration/DonorRegistration';
import DonorSearch from '../features/BloodDonation/DonorSearch/DonorSearch';
import BloodRequest from '../features/BloodDonation/BloodRequest/BloodRequest';
import InstitutionDashboard from '../features/Institution/InstitutionDashboard/InstitutionDashboard';
import InstitutionRegistration from '../features/Institution/InstitutionRegistration/InstitutionRegistration';
import Leaderboard from '../features/Institution/Leaderboard/Leaderboard';
import HospitalDashboard from '../features/Hospital/HospitalDashboard/HospitalDashboard';
import HospitalRegistration from '../features/Hospital/HospitalRegistration/HospitalRegistration';
import GovernmentDashboard from '../features/Government/GovernmentDashboard/GovernmentDashboard';
import Reports from '../features/Government/Reports/Reports';
import Courses from '../features/Education/Courses/Courses';
import StudentDashboard from '../features/Education/StudentDashboard/StudentDashboard';
import CivicReport from '../features/Environment/CivicReport/CivicReport';
import EcoTourism from '../features/Environment/EcoTourism/EcoTourism';

import { useAuth } from '../hooks/useAuth/useAuth';

// A dynamic router element redirecting "/dashboard" directly to the corresponding home panel based on logged in role
const DashboardHomeRedirect = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return <Navigate to="/login" replace />;
  
  switch (currentUser.role) {
    case 'Government':
      return <Navigate to="/dashboard/government" replace />;
    case 'Hospital':
      return <Navigate to="/dashboard/hospital" replace />;
    case 'Institution':
      return <Navigate to="/dashboard/institution" replace />;
    case 'Donor':
      return <Navigate to="/dashboard/donor-registration" replace />;
    case 'Student':
      return <Navigate to="/dashboard/student" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Visitor Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="donate" element={<Donate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="news" element={<NewsArticles />} />
          <Route path="healthcare" element={<Healthcare />} />
          <Route path="healthcare/register" element={<HealthcareForm />} />
          <Route path="education" element={<Education />} />
          <Route path="environment" element={<Environment />} />
          
          {/* General Registrations */}
          <Route path="register-institution" element={<InstitutionRegistration />} />
          <Route path="register-hospital" element={<HospitalRegistration />} />
        </Route>

        {/* Dashboard Private Portal Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomeRedirect />} />
          
          {/* Donor Routes */}
          <Route path="donor-registration" element={<DonorRegistration />} />
          <Route path="donor-search" element={<DonorSearch />} />
          <Route path="blood-request" element={<BloodRequest />} />

          {/* Institution Routes */}
          <Route path="institution" element={<InstitutionDashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />

          {/* Hospital Routes */}
          <Route path="hospital" element={<HospitalDashboard />} />

          {/* Government Routes */}
          <Route path="government" element={<GovernmentDashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="civic-report" element={<CivicReport />} />

          {/* Student Routes */}
          <Route path="student" element={<StudentDashboard />} />
          <Route path="courses" element={<Courses />} />
          
          {/* Eco Tourism */}
          <Route path="eco-tourism" element={<EcoTourism />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
