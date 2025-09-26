import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Education from './pages/Education';
import WorkExperience from './pages/WorkExperience';
import Hobbies from './pages/Hobbies';
import Contact from './pages/Contact';
import { portfolioData } from './data/portfolioData';

const App: React.FC = () => {
  return (
    <Router>
      <Layout personalInfo={portfolioData.personalInfo}>
        <Routes>
          <Route path="/" element={<AboutMe personalInfo={portfolioData.personalInfo} />} />
          <Route path="/skills" element={<Skills skills={portfolioData.skills} certifications={portfolioData.certifications} />} />
          <Route path="/education" element={<Education education={portfolioData.education} />} />
          <Route path="/work" element={<WorkExperience workExperience={portfolioData.workExperience} />} />
          <Route path="/hobbies" element={<Hobbies hobbies={portfolioData.hobbies} />} />
          <Route path="/contact" element={<Contact personalInfo={portfolioData.personalInfo} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
