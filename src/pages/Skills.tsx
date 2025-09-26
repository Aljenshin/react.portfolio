import React from 'react';
import { Card, SectionTitle, Pill } from '../components/SharedComponents';
import { PortfolioData } from '../data/portfolioData';

interface SkillsProps {
  skills: PortfolioData['skills'];
  certifications: PortfolioData['certifications'];
}

const Skills: React.FC<SkillsProps> = ({ skills, certifications }) => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: skills.frontend
    },
    {
      title: 'Backend Development',
      skills: skills.backend
    },
    {
      title: 'Development Tools',
      skills: skills.tools
    },
    {
      title: 'Soft Skills',
      skills: skills.soft
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle title="Technical Skills" subtitle="Technologies and tools I work with" />
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Pill key={skillIndex}>{skill}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Certifications & Training" />
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="p-4 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <h3 className="font-semibold text-white">{cert.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{cert.organization} - {cert.period}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Skills;
