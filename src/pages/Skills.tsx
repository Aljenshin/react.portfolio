import React from 'react';
import { Card, SectionTitle, Pill, ProgressBar, FeatureCard, StatsCard } from '../components/SharedComponents';
import { PortfolioData } from '../data/portfolioData';

interface SkillsProps {
  skills: PortfolioData['skills'];
  certifications: PortfolioData['certifications'];
}

const Skills: React.FC<SkillsProps> = ({ skills, certifications }) => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: skills.frontend,
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Backend Development',
      skills: skills.backend,
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Development Tools',
      skills: skills.tools,
      icon: '🛠️',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Soft Skills',
      skills: skills.soft,
      icon: '🤝',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Skill proficiency levels
  const skillLevels = [
    { skill: 'React', level: 85, color: 'from-blue-500 to-cyan-500' },
    { skill: 'Laravel', level: 80, color: 'from-red-500 to-pink-500' },
    { skill: 'JavaScript', level: 90, color: 'from-yellow-500 to-orange-500' },
    { skill: 'PHP', level: 85, color: 'from-purple-500 to-indigo-500' },
    { skill: 'Tailwind CSS', level: 88, color: 'from-teal-500 to-cyan-500' },
    { skill: 'MySQL', level: 75, color: 'from-blue-600 to-blue-800' },
    { skill: 'Git', level: 80, color: 'from-orange-600 to-red-600' },
    { skill: 'Node.js', level: 70, color: 'from-green-600 to-green-800' }
  ];

  return (
    <div className="space-y-8">
      {/* Skills Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          value={8} 
          label="Technologies Mastered" 
          icon="⚡"
          color="from-brand-500 to-purple-500"
        />
        <StatsCard 
          value={3} 
          label="Years Experience" 
          icon="💼"
          color="from-green-500 to-emerald-500"
        />
        <StatsCard 
          value={15} 
          label="Skills & Tools" 
          icon="🛠️"
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Skill Proficiency */}
      <Card>
        <SectionTitle title="Skill Proficiency" subtitle="My expertise levels in key technologies" />
        <div className="space-y-6">
          {skillLevels.map((skill, index) => (
            <div key={index} className="animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
              <ProgressBar 
                label={skill.skill}
                percentage={skill.level}
                color={`bg-gradient-to-r ${skill.color}`}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <FeatureCard
            key={index}
            icon={category.icon}
            title={category.title}
            description={`${category.skills.length} technologies including ${category.skills.slice(0, 3).join(', ')}${category.skills.length > 3 ? ' and more...' : ''}`}
            delay={index * 200}
          />
        ))}
      </div>

      {/* Detailed Skills */}
      <Card>
        <SectionTitle title="All Skills & Technologies" subtitle="Complete list of technologies I work with" />
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Pill key={skillIndex}>{skill}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certifications */}
      <Card>
        <SectionTitle title="Certifications & Training" subtitle="Professional certifications and ongoing training" />
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20 hover-lift transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-lg">{cert.title}</h3>
                  <p className="text-slate-300 text-sm mt-1">{cert.organization}</p>
                </div>
                <span className="text-brand-400 text-sm font-medium bg-brand-500/20 px-3 py-1 rounded-full">
                  {cert.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Skills;
