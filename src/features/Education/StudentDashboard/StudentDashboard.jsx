import React, { useMemo } from 'react';
import { BookOpen, Trophy, Award, CheckCircle2, Play, Flame } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import Button from '../../../components/Button/Button';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { currentUser, courses, enrollments, updateCourseProgress } = useAuth();

  // Find enrollments for current student email
  const myEnrollments = useMemo(() => {
    return enrollments.filter(e => e.studentEmail === currentUser.email);
  }, [enrollments, currentUser]);

  // Map enrollments to their full course info
  const enrolledCoursesList = useMemo(() => {
    return myEnrollments.map(e => {
      const courseInfo = courses.find(c => c.id === e.courseId) || {};
      return {
        ...e,
        ...courseInfo
      };
    });
  }, [myEnrollments, courses]);

  // Aggregate badges earned across all enrolled courses
  const earnedBadges = useMemo(() => {
    const badges = [];
    myEnrollments.forEach(e => {
      e.badgesEarned.forEach(b => {
        if (!badges.includes(b)) badges.push(b);
      });
    });
    return badges;
  }, [myEnrollments]);

  const handleStudyNextLesson = (courseId) => {
    // Add 20% progress when user clicks "study next lesson"
    updateCourseProgress(courseId, currentUser.email, 20);
  };

  return (
    <div className="student-dashboard animate-fade-in">
      <div className="student-intro-row">
        <div>
          <h2>Student Portal</h2>
          <p className="student-sub">Track your health awareness and civic action course progress.</p>
        </div>
      </div>

      {/* Grid split: Enrolled Courses vs Earned Badges */}
      <div className="student-layout mt-4">
        {/* Left column: Courses list */}
        <div className="glass-panel enrolled-courses-card flex-2">
          <h3>Your Enrolled Courses</h3>
          
          {enrolledCoursesList.length > 0 ? (
            <div className="enrolled-courses-list mt-3">
              {enrolledCoursesList.map((course) => (
                <div key={course.id} className="enrolled-course-item border-bottom">
                  <div className="course-item-header">
                    <h4>{course.title}</h4>
                    <span className="badge badge-secondary">{course.progress}% Completed</span>
                  </div>
                  <p className="instructor-tag">Instructor: {course.instructor}</p>
                  
                  {/* Progress Bar */}
                  <div className="course-progress-container mt-2">
                    <div className="course-progress-outer">
                      <div className="course-progress-inner" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="course-item-actions mt-3">
                    {course.progress === 100 ? (
                      <span className="completed-tag text-success">
                        <CheckCircle2 size={16} /> Course Completed!
                      </span>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={() => handleStudyNextLesson(course.id)}>
                        <Play size={12} /> Resume Next Lesson (+20%)
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-courses-msg mt-3 text-center">You have not enrolled in any courses yet.</p>
          )}
        </div>

        {/* Right column: Badges / Certifications */}
        <div className="glass-panel badges-card flex-1">
          <div className="card-header-icon-group">
            <Trophy size={20} className="icon-gold" />
            <h3>Your Achievements</h3>
          </div>
          <p className="section-info">Complete courses to earn certificates and badges issued by local administration.</p>

          <div className="badges-grid mt-3">
            {/* Eco Guardian Badge (pre-loaded or earned) */}
            <div className={`badge-item-box ${earnedBadges.includes('Eco Guardian') ? 'earned' : 'locked'}`}>
              <div className="badge-icon">🌳</div>
              <div className="badge-text-group">
                <h5>Eco Guardian</h5>
                <p>{earnedBadges.includes('Eco Guardian') ? 'Earned' : 'Locked'}</p>
              </div>
            </div>

            {/* Course Certified Badge */}
            <div className={`badge-item-box ${earnedBadges.includes('Course Certified') ? 'earned' : 'locked'}`}>
              <div className="badge-icon">🎓</div>
              <div className="badge-text-group">
                <h5>Course Certified</h5>
                <p>{earnedBadges.includes('Course Certified') ? 'Earned' : 'Locked'}</p>
              </div>
            </div>

            {/* Donor Badge */}
            <div className="badge-item-box locked">
              <div className="badge-icon">❤️</div>
              <div className="badge-text-group">
                <h5>First Donation</h5>
                <p>Locked (Donate Blood)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
