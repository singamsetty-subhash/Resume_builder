import React from 'react';
import { ResumeTemplateProps } from '@/lib/types';

export function MinimalTemplate({ data }: ResumeTemplateProps) {
  const { contact, experience, education, skills } = data;

  return (
    <div className="p-16 text-slate-900 font-light tracking-wide">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold mb-4">{contact.fullName || 'YOUR NAME'}</h1>
        <div className="flex gap-4 text-xs uppercase tracking-widest text-slate-500 font-semibold">
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.location && <span>{contact.location}</span>}
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">Experience</h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id} className="grid grid-cols-4 gap-4">
              <div className="text-xs font-bold text-slate-400 mt-1 uppercase">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </div>
              <div className="col-span-3">
                <h3 className="font-bold text-lg leading-none mb-1">{exp.jobTitle}</h3>
                <div className="text-sm font-medium mb-3 text-slate-600">{exp.companyName}</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {exp.responsibilities.map((bullet, idx) => (
                    <li key={idx} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-accent before:rounded-full">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-12">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold">{edu.degree}</h3>
                <div className="text-sm text-slate-600">{edu.institution}</div>
                <div className="text-xs text-slate-400 font-bold uppercase mt-1">{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {skills.map((skill) => (
              <span key={skill.id} className="font-medium text-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}