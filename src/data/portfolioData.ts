import { WorkExperienceData, EducationData, Hobby } from '../types';

export interface PersonalInfo {
  name: string;
  title: string;
  age: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  birthDate: string;
  profileImage?: string;
  aboutMe: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperienceData[];
  education: EducationData[];
  hobbies: Hobby[];
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    soft: string[];
  };
  certifications: {
    title: string;
    organization: string;
    period: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Aljen A. Mondarte",
    title: "Web Developer • Laravel • React • Tailwind CSS",
    age: "23 Years Old",
    experience: "3+ Years Experience",
    location: "Pulpogan, Consolacion, Cebu",
    email: "aljen.mondarte@gmail.com",
    phone: "0915 945 4127",
    birthDate: "October 5, 2001",
    profileImage: "/tuxedo.v1.png",
    aboutMe: [
      "I am a passionate and dedicated individual currently pursuing a Bachelor in Industrial Technology (BIT) at Cebu Technological University. With a strong foundation in both technical and practical skills, I am actively training in Information Technology, specializing in web development and application creation.",
      "At the same time, I am currently training as a Web Developer at Limehills.Tech, where I continue to enhance my skills and gain practical experience in building modern web applications.",
      "My journey in technology has equipped me with expertise in modern web technologies including HTML, JavaScript, CSS, Tailwind CSS, Laravel, PHP, and React. I am committed to continuous learning and developing innovative solutions that make a difference."
    ]
  },
  workExperience: [
    {
      title: 'Leadman & Foreman',
      company: 'Circuit Solutions Inc.',
      period: '2022–2025',
      location: 'Ortigas Center, Pasig – Current Position',
      description: [
        'Promoted from Leadman to Foreman, demonstrating leadership and management skills.',
        'Oversaw team operations and project execution.',
        'Successfully managed complex projects and coordinated with multiple stakeholders.'
      ],
      skills: ['Leadership', 'Management', 'Project Coordination']
    },
    {
      title: 'Welder',
      company: 'Scheirman Construction',
      period: '2021–2022',
      location: 'Mandaue, Cebu',
      description: [
        'Specialized in Shielded Metal Arc Welding (SMAW) NC II.',
        'Contributed to construction projects with precision and technical expertise.',
        'Developed strong attention to detail and quality control.'
      ],
      skills: ['SMAW NC II', 'Precision', 'Quality Control']
    },
    {
      title: 'Basic Technician',
      company: 'SM Consolacion Cebu (Aya\'s Company)',
      period: '2019–2020',
      location: 'Consolacion, Cebu',
      description: [
        'Provided technical support and maintenance services.',
        'Strengthened problem-solving and customer service skills.',
        'Gained valuable experience troubleshooting systems and equipment.'
      ],
      skills: ['Technical Support', 'Problem Solving', 'Customer Service']
    }
  ],
  education: [
    {
      degree: 'Bachelor in Industrial Technology (BIT)',
      school: 'Cebu Technological University',
      period: '2022–Present',
      location: 'Carmen Campus, Cebu',
      description: 'Focus on Information Technology. Currently training in web development, application creation, and modern programming technologies.',
      skills: ['Industrial Technology', 'IT', 'Web Development']
    },
    {
      degree: 'Senior High School',
      school: 'Consolacion National High School (Day Class)',
      period: '2019–2020',
      location: 'Consolacion, Cebu',
      description: 'Strand: Accountancy, Business, and Management (ABM). Strong foundation in business principles, finance, and analytical thinking.'
    },
    {
      degree: 'Senior High School',
      school: 'Consolacion NHS Day Class',
      period: '2018–2019',
      location: 'Consolacion, Cebu',
      description: 'Strand: ABM. Enhanced analytical and problem-solving skills through academic projects.'
    },
    {
      degree: 'Secondary Education',
      school: 'Pulpogan National High School',
      period: '2014–2018',
      location: 'Pulpogan, Consolacion, Cebu',
      description: 'Built a strong academic foundation. Active participation in school activities and competitions.',
      skills: ['Academic Excellence', 'Leadership', 'Life Skills']
    },
    {
      degree: 'Primary Education',
      school: 'Consolacion Central School',
      period: '2008–2014',
      location: 'Consolacion, Cebu',
      description: 'Developed creativity, social skills, and love for learning.'
    }
  ],
  hobbies: [
    {
      title: 'Gaming',
      description: 'Bloodstrike, Dota 2, Rainbow Six Siege, Call of Duty Warzone, Far Cry (1-6).',
      tags: ['FPS', 'Strategy']
    },
    {
      title: 'Manga & Anime',
      description: 'I love reading manga/manhwa and watching anime. It\'s my perfect stress reliever.',
      tags: ['Manga', 'Anime']
    },
    {
      title: 'Motorcycle Riding',
      description: 'Passionate about rides to the mountains (pa-bukid) for adventure and freedom.',
      tags: ['Adventure', 'Freedom']
    },
    {
      title: 'Music',
      description: 'Post Malone, Charlie Puth, Enrique Iglesias, Maroon 5, Nickelback, Green Day (21 Guns), Shawn Mendes.',
      tags: ['Pop', 'Rock']
    },
    {
      title: 'Mountain Adventures',
      description: 'Fresh air and escape from city life, perfect for motorcycle rides.',
      tags: ['Nature', 'Adventure']
    },
    {
      title: 'Stress Relief',
      description: 'Gaming, reading manga, and riding help clear my mind.',
      tags: ['Balance', 'Wellness']
    }
  ],
  skills: {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Responsive Design'],
    backend: ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Database Design'],
    tools: ['Git', 'VS Code', 'npm', 'Webpack', 'PostCSS', 'Node.js'],
    soft: ['Leadership', 'Project Management', 'Problem Solving', 'Team Collaboration', 'Communication']
  },
  certifications: [
    {
      title: 'SMAW NC II (Shielded Metal Arc Welding)',
      organization: 'Scheirman Construction',
      period: '2021-2022'
    },
    {
      title: 'Web Development Training',
      organization: 'Limehills.Tech',
      period: 'Current'
    }
  ]
};
