import React from 'react';
import { ResumeTemplateProps } from '@/lib/types';

export function ClassicTemplate({ data }: ResumeTemplateProps) {
  const { contact, experience, education, skills, certifications } = data;

  return (
    <div className="p-12 text-zinc-900 bg-white">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold border-b-2 border-zinc-300 pb-2 mb-2">{contact.fullName || 'Professional Name'}</h1>
        <div className="flex justify-center divide-x divide-zinc-300 text-sm">
          {contact.location && <span className="px-3">{contact.location}</span>}
          {contact.phone && <span className="px-3">{contact.phone}</span>}
          {contact.email && <span className="px-3">{contact.email}</span>}
          {contact.website && <span className="px-3">{contact.website}</span>}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-zinc-800 mb-3 italic">Professional Experience</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <div className="font-bold">{exp.companyName}</div>
                <div className="text-sm italic">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <div className="italic text-sm">{exp.jobTitle}</div>
                <div className="text-xs text-zinc-600">{exp.location}</div>
              </div>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {exp.responsibilities.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-zinc-800 mb-3 italic">Education</h2>
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div className="text-sm">
                <span className="font-bold">{edu.institution}</span>, {edu.location}. <span className="italic">{edu.degree}</span>
              </div>
              <div className="text-sm italic">{edu.graduationDate}</div>
            </div>
          ))}
        </div>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-zinc-800 mb-3 italic">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div className="text-sm">
                  <span className="font-bold">{cert.name}</span>, <span className="italic">{cert.issuer}</span>
                </div>
                <div className="text-sm italic">{cert.date}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold border-b border-zinc-800 mb-3 italic">Skills</h2>
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Technical Proficiency:</span> {skills.map(s => s.name).join(', ')}
        </p>
      </section>
    </div>
  );
}
