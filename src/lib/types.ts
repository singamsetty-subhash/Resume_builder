export type ContactInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
};

export type Experience = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
};

export type Skill = {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'None';
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export type ResumeData = {
  contact: ContactInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  templateId: string;
};

export type ResumeTemplateProps = {
  data: ResumeData;
};
