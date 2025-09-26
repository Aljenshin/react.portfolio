import React from 'react';
import { Card, SectionTitle, Pill } from '../components/SharedComponents';
import { EducationData } from '../types';

interface EducationProps {
  education: EducationData[];
}

const Education: React.FC<EducationProps> = ({ education }) => {

  return (
    <Card>
      <SectionTitle title="Education" subtitle="My academic journey and continuous learning path" />
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-brand-500 pl-4">
            <h3 className="font-semibold text-lg text-white">{edu.degree} – {edu.school}</h3>
            <p className="text-slate-400">{edu.period}</p>
            {edu.location && <p className="text-slate-400">{edu.location}</p>}
            {edu.description && (
              <p className="text-slate-200 mt-2">{edu.description}</p>
            )}
            {edu.skills && (
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.skills.map((skill, skillIndex) => (
                  <Pill key={skillIndex}>{skill}</Pill>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Education;
