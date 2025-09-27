import React from 'react';
import { Card, SectionTitle, Pill, TimelineItem, StatsCard } from '../components/SharedComponents';
import { WorkExperienceData } from '../types';

interface WorkExperienceProps {
  workExperience: WorkExperienceData[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ workExperience }) => {
  const getWorkIcon = (title: string) => {
    if (title.toLowerCase().includes('leadman') || title.toLowerCase().includes('foreman')) return '👷‍♂️';
    if (title.toLowerCase().includes('welder')) return '🔧';
    if (title.toLowerCase().includes('technician')) return '⚙️';
    return '💼';
  };

  const getWorkColor = (index: number) => {
    const colors = ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-8">
      {/* Work Experience Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          value={workExperience.length} 
          label="Positions Held" 
          icon="💼"
          color="from-brand-500 to-purple-500"
        />
        <StatsCard 
          value={6} 
          label="Years Total Experience" 
          icon="📅"
          color="from-green-500 to-emerald-500"
        />
        <StatsCard 
          value={3} 
          label="Industries" 
          icon="🏭"
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Timeline View */}
      <Card>
        <SectionTitle title="Professional Timeline" subtitle="My career journey and growth over the years" />
        <div className="space-y-8">
          {workExperience.map((work, index) => (
            <div key={index} className="relative">
              <TimelineItem
                title={`${work.title} at ${work.company}`}
                subtitle={work.location}
                period={work.period}
                description={work.description.join(' • ')}
                isLast={index === workExperience.length - 1}
                icon={getWorkIcon(work.title)}
              />
              
              {/* Skills for this position */}
              <div className="ml-12 mt-4 flex flex-wrap gap-2">
                {work.skills.map((skill, skillIndex) => (
                  <Pill key={skillIndex}>{skill}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Experience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workExperience.map((work, index) => (
          <Card key={index} className="hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                <p className="text-brand-400 font-semibold">{work.company}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm">{work.period}</p>
                <p className="text-slate-400 text-xs">{work.location}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {work.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Skills & Responsibilities</h4>
              <div className="flex flex-wrap gap-2">
                {work.skills.map((skill, skillIndex) => (
                  <Pill key={skillIndex}>{skill}</Pill>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
