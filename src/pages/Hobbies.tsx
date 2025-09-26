import React from 'react';
import { Card, SectionTitle, Pill } from '../components/SharedComponents';
import { Hobby } from '../types';

interface HobbiesProps {
  hobbies: Hobby[];
}

const Hobbies: React.FC<HobbiesProps> = ({ hobbies }) => {

  return (
    <Card>
      <SectionTitle title="Hobbies & Interests" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hobbies.map((hobby, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold text-white mb-2">{hobby.title}</h4>
            <p className="text-slate-300 text-sm mb-3">{hobby.description}</p>
            <div className="flex flex-wrap gap-2">
              {hobby.tags.map((tag, tagIndex) => (
                <Pill key={tagIndex}>{tag}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Hobbies;
