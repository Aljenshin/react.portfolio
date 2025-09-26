import React from 'react';
import { Card, SectionTitle, Pill } from '../components/SharedComponents';
import { WorkExperienceData } from '../types';

interface WorkExperienceProps {
  workExperience: WorkExperienceData[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ workExperience }) => {

  return (
    <Card>
      <SectionTitle title="Work Experience" subtitle="My professional journey and career progression" />
      <div className="space-y-8">
        {workExperience.map((work, index) => (
          <div key={index} className="border-l-4 border-brand-500 pl-6">
            <h3 className="font-semibold text-xl text-white">{work.title} – {work.company}</h3>
            <p className="text-slate-400 text-sm">{work.period}</p>
            <p className="text-slate-400 text-sm">{work.location}</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-slate-200">
              {work.description.map((desc, descIndex) => (
                <li key={descIndex}>{desc}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.skills.map((skill, skillIndex) => (
                <Pill key={skillIndex}>{skill}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkExperience;
