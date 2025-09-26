import React from 'react';
import { Card, SectionTitle, InfoRow } from '../components/SharedComponents';
import { PersonalInfo } from '../data/portfolioData';

interface ContactProps {
  personalInfo: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
  return (
    <Card>
      <SectionTitle title="Get In Touch" subtitle="Let's Work Together" />
      <div className="space-y-6">
        <div className="p-6 rounded-lg bg-brand-500/10 border border-brand-500/20">
          <p className="text-slate-200 text-center">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
          </p>
        </div>
        
        <div className="space-y-4">
          <InfoRow 
            label="📧 Email" 
            value={personalInfo.email} 
            href={`mailto:${personalInfo.email}`} 
          />
          <InfoRow 
            label="📱 Phone" 
            value={personalInfo.phone} 
            href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} 
          />
          <InfoRow 
            label="📍 Location" 
            value={personalInfo.location} 
          />
        </div>

        <div className="mt-8 p-6 rounded-lg bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
          <div className="space-y-3">
            <InfoRow label="Name" value={personalInfo.name} />
            <InfoRow label="Birth Date" value={personalInfo.birthDate} />
            <InfoRow label="Age" value={personalInfo.age} />
            <InfoRow label="Experience" value={personalInfo.experience} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
