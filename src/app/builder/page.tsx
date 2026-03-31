"use client";

import React, { useState, useEffect } from 'react';
import { BuilderForm } from '@/components/resume/BuilderForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowLeft, Monitor, Smartphone, Layout } from 'lucide-react';
import Link from 'next/link';

const INITIAL_DATA: ResumeData = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      current: true,
      responsibilities: [
        'Led a team of 10 developers to build a scalable microservices architecture.',
        'Reduced deployment time by 40% using CI/CD pipelines and Kubernetes.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      graduationDate: 'May 2018',
    },
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Next.js', level: 'Expert' },
    { id: '4', name: 'Node.js', level: 'Intermediate' },
  ],
  templateId: 'modern',
};

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [step, setStep] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPrinting, setIsPrinting] = useState(false);

  // Auto-save logic can be added here
  
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const steps = [
    { name: 'Contact', icon: FileText },
    { name: 'Experience', icon: Layout },
    { name: 'Education', icon: Layout },
    { name: 'Skills', icon: Layout },
    { name: 'Template', icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="no-print h-16 border-b bg-white/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">CV</div>
            <h1 className="text-xl font-bold tracking-tight">CVForge</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex bg-slate-100 rounded-lg p-1 mr-4">
            <Button 
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('desktop')}
              className="px-3"
            >
              <Monitor className="h-4 w-4 mr-2" /> Desktop
            </Button>
            <Button 
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('mobile')}
              className="px-3"
            >
              <Smartphone className="h-4 w-4 mr-2" /> Mobile
            </Button>
          </div>
          <Button onClick={handlePrint} className="gap-2">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Form Section */}
        <div className="no-print w-full md:w-[450px] lg:w-[550px] border-r bg-white flex flex-col shadow-xl z-10 shrink-0">
          <div className="p-6 flex-grow overflow-hidden flex flex-col">
             <nav className="mb-6 flex justify-between px-2 overflow-x-auto gap-4 no-scrollbar">
                {steps.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setStep(idx)}
                    className={`flex flex-col items-center gap-1 group transition-all shrink-0`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${idx === step ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 text-slate-400 group-hover:border-slate-300'}`}>
                      {idx < step ? <FileText className="h-5 w-5" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${idx === step ? 'text-primary' : 'text-slate-400'}`}>{s.name}</span>
                  </button>
                ))}
             </nav>
             <div className="flex-grow overflow-hidden">
               <BuilderForm 
                data={data} 
                onChange={setData} 
                step={step} 
                onNext={() => step < 4 ? setStep(step + 1) : handlePrint()}
                onPrev={() => setStep(Math.max(0, step - 1))}
              />
             </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`flex-grow bg-slate-100 flex items-center justify-center p-4 md:p-8 overflow-y-auto print:p-0 print:bg-white transition-all duration-500 ${viewMode === 'mobile' ? 'max-w-2xl mx-auto' : ''}`}>
          <div className="relative animate-in fade-in zoom-in-95 duration-700">
             <ResumePreview data={data} scale={viewMode === 'mobile' ? 0.4 : 0.8} />
          </div>
        </div>
      </main>

      {/* Hidden container for full-size print */}
      <div className="hidden print:block absolute inset-0 bg-white">
        <ResumePreview data={data} scale={1} />
      </div>
    </div>
  );
}