import React from 'react';
import { Card, SectionTitle } from '../components/SharedComponents';
import { PersonalInfo } from '../data/portfolioData';

interface AboutMeProps {
  personalInfo: PersonalInfo;
}

const AboutMe: React.FC<AboutMeProps> = ({ personalInfo }) => {
  return (
    <Card>
      <SectionTitle title="About Me" />
      {personalInfo.aboutMe.map((paragraph, index) => (
        <p key={index} className="text-slate-200 leading-relaxed mt-4 first:mt-0">
          {paragraph}
        </p>
      ))}
    </Card>
  );
};

export default AboutMe;
