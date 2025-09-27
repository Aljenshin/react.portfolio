import React from 'react';
import { Card, SectionTitle, FeatureCard, InfoRow } from '../components/SharedComponents';
import { PersonalInfo } from '../data/portfolioData';

interface AboutMeProps {
  personalInfo: PersonalInfo;
}

const AboutMe: React.FC<AboutMeProps> = ({ personalInfo }) => {
  const aboutFeatures = [
    {
      icon: '🎓',
      title: 'Education',
      description: 'Currently pursuing Bachelor in Industrial Technology (BIT) at Cebu Technological University, specializing in Information Technology and web development.'
    },
    {
      icon: '💻',
      title: 'Training',
      description: 'Active Web Developer trainee at Limehills.Tech, continuously enhancing skills in modern web technologies and application development.'
    },
    {
      icon: '🚀',
      title: 'Passion',
      description: 'Committed to continuous learning and developing innovative solutions that make a difference in the technology landscape.'
    },
    {
      icon: '⚡',
      title: 'Expertise',
      description: 'Proficient in HTML, JavaScript, CSS, Tailwind CSS, Laravel, PHP, and React with a strong foundation in both technical and practical skills.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main About Section */}
      <Card>
        <SectionTitle title="About Me" subtitle="Get to know me better" />
        <div className="space-y-6">
          {personalInfo.aboutMe.map((paragraph, index) => (
            <p key={index} className="text-slate-200 leading-relaxed text-lg animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {/* Key Information */}
      <Card>
        <SectionTitle title="Quick Info" subtitle="Essential details about me" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InfoRow label="Full Name" value={personalInfo.name} />
            <InfoRow label="Age" value={personalInfo.age} />
            <InfoRow label="Location" value={personalInfo.location} />
            <InfoRow label="Birth Date" value={personalInfo.birthDate} />
          </div>
          <div className="space-y-4">
            <InfoRow label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
            <InfoRow label="Phone" value={personalInfo.phone} href={`tel:${personalInfo.phone}`} />
            <InfoRow label="Experience" value={personalInfo.experience} />
            <InfoRow label="Current Role" value="Web Developer Trainee" />
          </div>
        </div>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aboutFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index * 150}
          />
        ))}
      </div>

      {/* Personal Values */}
      <Card>
        <SectionTitle title="My Values & Approach" subtitle="What drives me in my work and life" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover-lift transition-all duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Goal-Oriented</h3>
            <p className="text-slate-300 text-sm">I set clear objectives and work systematically to achieve them, ensuring quality results every time.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover-lift transition-all duration-300">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-lg font-semibold text-white mb-2">Continuous Learning</h3>
            <p className="text-slate-300 text-sm">Technology evolves rapidly, and I'm committed to staying updated with the latest trends and best practices.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover-lift transition-all duration-300">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaborative</h3>
            <p className="text-slate-300 text-sm">I believe in the power of teamwork and enjoy working with others to create amazing solutions together.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutMe;
