import React, { useMemo } from 'react';
import { BookOpen, User, Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import './Courses.css';

const Courses = () => {
  const { currentUser, courses, enrollments, enrollInCourse } = useAuth();

  const handleEnroll = (courseId) => {
    if (!currentUser) return;
    enrollInCourse(courseId, currentUser.email);
  };

  const getEnrollmentState = (courseId) => {
    if (!currentUser) return 'login-required';
    const isEnrolled = enrollments.some(e => e.courseId === courseId && e.studentEmail === currentUser.email);
    return isEnrolled ? 'enrolled' : 'not-enrolled';
  };

  return (
    <div className="courses-panel animate-fade-in">
      <div className="courses-header-row">
        <div className="title-box">
          <BookOpen className="header-icon" size={24} />
          <h2>Awareness Micro-Courses</h2>
        </div>
      </div>

      <p className="courses-intro">
        Learn how you can protect and empower your community. Enroll in micro-courses on blood bank ethics, emergency response, and community-led eco-tourism Homestays.
      </p>

      {/* Courses Grid */}
      <div className="courses-grid mt-4">
        {courses.map((course) => {
          const enrollState = getEnrollmentState(course.id);
          return (
            <div key={course.id} className="glass-card course-card">
              <div className="course-banner-placeholder">
                <BookOpen size={48} className="banner-icon" />
              </div>

              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                
                <div className="course-metadata">
                  <div className="meta-item">
                    <User size={14} />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="meta-row">
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{course.duration} ({course.lessonsCount} lessons)</span>
                    </div>
                    <span className="badge badge-secondary">{course.enrolledCount} Enrolled</span>
                  </div>
                </div>

                <div className="course-actions mt-3">
                  {enrollState === 'enrolled' ? (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle2 size={16} /> Enrolled
                    </Button>
                  ) : enrollState === 'login-required' ? (
                    <Button variant="primary" className="w-full" onClick={() => window.location.href='/login'}>
                      Sign In to Enroll
                    </Button>
                  ) : (
                    <Button variant="primary" className="w-full" onClick={() => handleEnroll(course.id)}>
                      Enroll Course
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
