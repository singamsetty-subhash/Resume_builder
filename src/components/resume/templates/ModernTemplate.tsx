import React from 'react';
import { ResumeTemplateProps } from '@/lib/types';

export function ModernTemplate({ data }: ResumeTemplateProps) {
  const { contact, experience, education, skills, certifications } = data;

  return (
    <div className="p-12 text-slate-800 h-full flex flex-col">
      <header className="border-b-4 border-primary pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary uppercase">{contact.fullName || 'Your Name'}</h1>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.location && <span>{contact.location}</span>}
          {contact.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10 flex-grow">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-primary border-b border-slate-200 mb-4 pb-1 uppercase tracking-wider">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <span className="text-sm font-medium text-slate-500">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-primary font-medium">{exp.companyName}, {exp.location}</div>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-slate-600 leading-relaxed">
                    {exp.responsibilities.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary border-b border-slate-200 mb-4 pb-1 uppercase tracking-wider">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-sm font-medium text-slate-500">{edu.graduationDate}</span>
                  </div>
                  <div className="text-slate-600 italic">{edu.institution}, {edu.location}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-primary border-b border-slate-200 mb-4 pb-1 uppercase tracking-wider">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-sm text-sm font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary border-b border-slate-200 mb-4 pb-1 uppercase tracking-wider">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <div className="font-bold text-slate-800">{cert.name}</div>
                    <div className="text-slate-500">{cert.issuer}</div>
                    <div className="text-xs text-slate-400 italic">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
