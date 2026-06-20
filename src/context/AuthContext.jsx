import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Initial Mock Databases
const DEFAULT_INSTITUTIONS = [
  { id: 'inst-1', name: 'NSS Jorhat Engineering College', type: 'College', location: 'Jorhat', donorCount: 28, points: 280, email: 'nss@jec.edu' },
  { id: 'inst-2', name: 'Rotaract Club Jorhat', type: 'NGO', location: 'Jorhat', donorCount: 45, points: 450, email: 'rotaract.jorhat@gmail.com' },
  { id: 'inst-3', name: 'Gogoi Family Tree', type: 'Family Tree', location: 'Guwahati', donorCount: 12, points: 120, email: 'gogoifamily@gmail.com' },
  { id: 'inst-4', name: 'Guwahati Cycling Community', type: 'Locality', location: 'Guwahati', donorCount: 18, points: 180, email: 'gcc@gmail.com' },
  { id: 'inst-5', name: 'Tata Steel Assam Unit', type: 'Company', location: 'Dibrugarh', donorCount: 22, points: 220, email: 'tata.assam@tatasteel.com' }
];

const DEFAULT_DONORS = [
  { id: 'donor-1', name: 'Pranab Milan Gogoi', email: 'pranab@britto.org', phone: '+91 94350 12345', bloodGroup: 'A+', location: 'Jorhat', institution: 'NSS Jorhat Engineering College', lastDonation: '2026-04-12', available: true },
  { id: 'donor-2', name: 'Abhishek Buragohain', email: 'abhishek@britto.org', phone: '+91 88765 43210', bloodGroup: 'O+', location: 'Jorhat', institution: 'Rotaract Club Jorhat', lastDonation: '2026-05-20', available: true },
  { id: 'donor-3', name: 'Nayanmoni Saikia', email: 'nayan@gmail.com', phone: '+91 99540 98765', bloodGroup: 'B+', location: 'Guwahati', institution: 'Gogoi Family Tree', lastDonation: '2026-03-01', available: false },
  { id: 'donor-4', name: 'Rituparna Baruah', email: 'ritu@gmail.com', phone: '+91 70021 54321', bloodGroup: 'O-', location: 'Guwahati', institution: 'Guwahati Cycling Community', lastDonation: '2026-06-05', available: true },
  { id: 'donor-5', name: 'Kaustav Moni Deka', email: 'kaustav@gmail.com', phone: '+91 91234 56789', bloodGroup: 'AB+', location: 'Dibrugarh', institution: 'Tata Steel Assam Unit', lastDonation: '2025-12-15', available: true },
  { id: 'donor-6', name: 'Priyam Goswami', email: 'priyam@gmail.com', phone: '+91 80112 34567', bloodGroup: 'A-', location: 'Tezpur', institution: 'Rotaract Club Jorhat', lastDonation: '2026-01-10', available: true }
];

const DEFAULT_HOSPITALS = [
  { id: 'hosp-1', name: 'Jorhat Medical College & Hospital (JMCH)', email: 'contact@jmch.org.in', location: 'Jorhat', phone: '0376-2370107', registrationNo: 'H-JRT-2026-09' },
  { id: 'hosp-2', name: 'Guwahati Medical College & Hospital (GMCH)', email: 'info@gmch.asso.in', location: 'Guwahati', phone: '0361-2134567', registrationNo: 'H-GHY-2026-11' },
  { id: 'hosp-3', name: 'Dibrugarh Civil Hospital', email: 'contact@dibrugarhcivil.in', location: 'Dibrugarh', phone: '0373-2321111', registrationNo: 'H-DBR-2026-02' }
];

const DEFAULT_REQUESTS = [
  { id: 'req-1', patientName: 'Biren Sarma', hospitalName: 'Jorhat Medical College & Hospital (JMCH)', bloodGroup: 'O+', unitsNeeded: 2, urgency: 'Emergency', contactPhone: '+91 94351 11223', status: 'Pending', date: '2026-06-18', reason: 'Emergency heart surgery' },
  { id: 'req-2', patientName: 'Meghali Kalita', hospitalName: 'Guwahati Medical College & Hospital (GMCH)', bloodGroup: 'A-', unitsNeeded: 1, urgency: 'Urgent', contactPhone: '+91 88123 44556', status: 'Fulfilled', date: '2026-06-15', reason: 'Severe anemia treatment' }
];

const DEFAULT_COURSES = [
  { id: 'course-1', title: 'Safe Blood Donation & Ethics', description: 'Learn the protocols, safety guidelines, and ethical practices involved in saving lives through blood donation.', instructor: 'Dr. R. K. Borah, Blood Bank Officer JMC', lessonsCount: 6, duration: '2 hours', enrolledCount: 145 },
  { id: 'course-2', title: 'Community Disaster Management & First Aid', description: 'Be equipped with emergency life-saving actions, CPR, wound dressing, and local community disaster coordination.', instructor: 'Pranjal Senapati, Red Cross Assam', lessonsCount: 10, duration: '4.5 hours', enrolledCount: 220 },
  { id: 'course-3', title: 'Eco-Tourism: Sustaining Local Ecosystems', description: 'Understand how local youths can organize eco-friendly homestays, birdwatching tours, and clean campaigns to support eco-tourism in Assam.', instructor: 'Jugal Nath, Environment Activist', lessonsCount: 8, duration: '3.5 hours', enrolledCount: 98 }
];

const DEFAULT_CIVIC_REPORTS = [
  { id: 'civic-1', category: 'Garbage Dumping', location: 'Near JEC Campus, Garmur, Jorhat', description: 'Illegal dumping of plastic waste near the wetland. Needs immediate volunteer clean drive.', reporterName: 'Pranab Milan Gogoi', date: '2026-06-17', status: 'Open', votes: 15 },
  { id: 'civic-2', category: 'Tree Protection', location: 'Kharghuli Hills, Guwahati', description: 'Unauthorized felling of old trees on the hillside, causing potential soil erosion risk.', reporterName: 'Ananya Dutta', date: '2026-06-14', status: 'Under Review', votes: 32 }
];

const DEFAULT_ENROLLMENTS = [
  { studentEmail: 'student@jec.edu', courseId: 'course-1', progress: 60, badgesEarned: [] },
  { studentEmail: 'student@jec.edu', courseId: 'course-3', progress: 100, badgesEarned: ['Eco Guardian'] }
];

export const AuthProvider = ({ children }) => {
  // Load state from local storage or defaults
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('britto_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('britto_donors');
    return saved ? JSON.parse(saved) : DEFAULT_DONORS;
  });

  const [institutions, setInstitutions] = useState(() => {
    const saved = localStorage.getItem('britto_institutions');
    return saved ? JSON.parse(saved) : DEFAULT_INSTITUTIONS;
  });

  const [hospitals, setHospitals] = useState(() => {
    const saved = localStorage.getItem('britto_hospitals');
    return saved ? JSON.parse(saved) : DEFAULT_HOSPITALS;
  });

  const [bloodRequests, setBloodRequests] = useState(() => {
    const saved = localStorage.getItem('britto_requests');
    return saved ? JSON.parse(saved) : DEFAULT_REQUESTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('britto_courses');
    return saved ? JSON.parse(saved) : DEFAULT_COURSES;
  });

  const [civicReports, setCivicReports] = useState(() => {
    const saved = localStorage.getItem('britto_civic_reports');
    return saved ? JSON.parse(saved) : DEFAULT_CIVIC_REPORTS;
  });

  const [enrollments, setEnrollments] = useState(() => {
    const saved = localStorage.getItem('britto_enrollments');
    return saved ? JSON.parse(saved) : DEFAULT_ENROLLMENTS;
  });

  // Sync back to local storage on changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('britto_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('britto_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('britto_donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('britto_institutions', JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem('britto_hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem('britto_requests', JSON.stringify(bloodRequests));
  }, [bloodRequests]);

  useEffect(() => {
    localStorage.setItem('britto_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('britto_civic_reports', JSON.stringify(civicReports));
  }, [civicReports]);

  useEffect(() => {
    localStorage.setItem('britto_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Auth Operations
  const login = (email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authorization matching email or simple default logins:
        // Govt: gov@britto.org
        // Hospital: hospital@jmch.org
        // Institution: nss@jec.edu
        // Donor: pranab@britto.org
        // Student: student@jec.edu
        
        let matchedUser = {
          email: email,
          name: email.split('@')[0].toUpperCase(),
          role: role,
        };

        if (role === 'Government' && email === 'gov@britto.org') {
          matchedUser.name = 'Gov Officer Assam';
        } else if (role === 'Hospital') {
          const match = hospitals.find(h => h.email === email) || hospitals[0];
          matchedUser.name = match.name;
          matchedUser.id = match.id;
        } else if (role === 'Institution') {
          const match = institutions.find(i => i.email === email) || institutions[0];
          matchedUser.name = match.name;
          matchedUser.id = match.id;
        } else if (role === 'Donor') {
          const match = donors.find(d => d.email === email) || donors[0];
          matchedUser.name = match.name;
          matchedUser.id = match.id;
          matchedUser.bloodGroup = match.bloodGroup;
          matchedUser.institution = match.institution;
        } else if (role === 'Student') {
          matchedUser.name = 'Anshuman Saikia';
        }

        setCurrentUser(matchedUser);
        resolve(matchedUser);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Signup Actions
  const registerDonor = (donorData) => {
    const newDonor = {
      id: `donor-${Date.now()}`,
      ...donorData,
      lastDonation: donorData.lastDonation || 'Never',
      available: true
    };
    
    setDonors(prev => [newDonor, ...prev]);

    // Update institution donor counts and points
    if (donorData.institution) {
      setInstitutions(prev => prev.map(inst => {
        if (inst.name === donorData.institution) {
          return {
            ...inst,
            donorCount: inst.donorCount + 1,
            points: inst.points + 10 // 10 points per registered donor
          };
        }
        return inst;
      }));
    }
    return newDonor;
  };

  const registerInstitution = (instData) => {
    const newInst = {
      id: `inst-${Date.now()}`,
      ...instData,
      donorCount: 0,
      points: 0
    };
    setInstitutions(prev => [...prev, newInst]);
    return newInst;
  };

  const registerHospital = (hospData) => {
    const newHosp = {
      id: `hosp-${Date.now()}`,
      ...hospData
    };
    setHospitals(prev => [...prev, newHosp]);
    return newHosp;
  };

  // Blood Request Actions
  const addBloodRequest = (requestData) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      ...requestData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setBloodRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const fulfillBloodRequest = (requestId) => {
    setBloodRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status: 'Fulfilled' };
      }
      return req;
    }));
  };

  // Education Actions
  const enrollInCourse = (courseId, studentEmail) => {
    // Check if already enrolled
    const exists = enrollments.some(e => e.courseId === courseId && e.studentEmail === studentEmail);
    if (!exists) {
      const newEnrollment = {
        studentEmail,
        courseId,
        progress: 0,
        badgesEarned: []
      };
      setEnrollments(prev => [...prev, newEnrollment]);
      
      // Update course count
      setCourses(prev => prev.map(c => {
        if (c.id === courseId) {
          return { ...c, enrolledCount: c.enrolledCount + 1 };
        }
        return c;
      }));
    }
  };

  const updateCourseProgress = (courseId, studentEmail, addProgress) => {
    setEnrollments(prev => prev.map(e => {
      if (e.courseId === courseId && e.studentEmail === studentEmail) {
        const nextProgress = Math.min(100, e.progress + addProgress);
        const badges = [...e.badgesEarned];
        if (nextProgress === 100 && !badges.includes('Course Certified')) {
          badges.push('Course Certified');
        }
        return {
          ...e,
          progress: nextProgress,
          badgesEarned: badges
        };
      }
      return e;
    }));
  };

  // Civic Actions
  const addCivicReport = (reportData) => {
    const newReport = {
      id: `civic-${Date.now()}`,
      ...reportData,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      votes: 1
    };
    setCivicReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const upvoteCivicReport = (reportId) => {
    setCivicReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return { ...r, votes: r.votes + 1 };
      }
      return r;
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      donors,
      institutions,
      hospitals,
      bloodRequests,
      courses,
      civicReports,
      enrollments,
      login,
      logout,
      registerDonor,
      registerInstitution,
      registerHospital,
      addBloodRequest,
      fulfillBloodRequest,
      enrollInCourse,
      updateCourseProgress,
      addCivicReport,
      upvoteCivicReport
    }}>
      {children}
    </AuthContext.Provider>
  );
};
