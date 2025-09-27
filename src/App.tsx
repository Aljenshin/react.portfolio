import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Education from './pages/Education';
import WorkExperience from './pages/WorkExperience';
import Hobbies from './pages/Hobbies';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { portfolioData } from './data/portfolioData';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <AboutMe personalInfo={portfolioData.personalInfo} />
              </Layout>
            } />
            <Route path="/skills" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <Skills skills={portfolioData.skills} certifications={portfolioData.certifications} />
              </Layout>
            } />
            <Route path="/education" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <Education education={portfolioData.education} />
              </Layout>
            } />
            <Route path="/work" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <WorkExperience workExperience={portfolioData.workExperience} />
              </Layout>
            } />
            <Route path="/hobbies" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <Hobbies hobbies={portfolioData.hobbies} />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout personalInfo={portfolioData.personalInfo}>
                <Contact personalInfo={portfolioData.personalInfo} />
              </Layout>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;
