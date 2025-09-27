import React, { useState } from 'react';
import { Card, SectionTitle, InfoRow } from '../components/SharedComponents';
import { PersonalInfo } from '../data/portfolioData';
import { useMessages } from '../contexts/MessageContext';

interface ContactProps {
  personalInfo: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate a unique conversation ID
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add message to context
    addMessage({
      visitorName: formData.name,
      visitorEmail: formData.email || undefined,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      conversationId
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Contact Information */}
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
        </div>
      </Card>

      {/* Chat System */}
      <Card>
        <SectionTitle title="Send Me a Message" subtitle="I'll get back to you as soon as possible" />
        
        {isSubmitted && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-center mb-6">
            ✅ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
              placeholder="What's this about?"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Tell me about your project, ask questions, or just say hello!"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-brand-500 to-purple-500 text-white font-semibold rounded-lg hover:from-brand-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending Message...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </Card>

      {/* Personal Information */}
      <Card>
        <SectionTitle title="Personal Information" subtitle="More about me" />
        <div className="space-y-3">
          <InfoRow label="Name" value={personalInfo.name} />
          <InfoRow label="Birth Date" value={personalInfo.birthDate} />
          <InfoRow label="Age" value={personalInfo.age} />
          <InfoRow label="Experience" value={personalInfo.experience} />
        </div>
      </Card>
    </div>
  );
};

export default Contact;
