"use client";

import React, { useState } from 'react';
import { ResumeData, Experience, Education, Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { generateAIBulletPoints } from '@/ai/flows/ai-bullet-point-generator-flow';
import { useToast } from '@/hooks/use-toast';

interface BuilderFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
  onPrev: () => void;
  step: number;
}

export function BuilderForm({ data, onChange, onNext, onPrev, step }: BuilderFormProps) {
  const { toast } = useToast();
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const updateContact = (field: string, value: string) => {
    onChange({
      ...data,
      contact: { ...data.contact, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      jobTitle: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ['']
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const handleAiImprove = async (exp: Experience) => {
    if (!exp.jobTitle || !exp.companyName) {
      toast({
        title: "Missing Information",
        description: "Please enter Job Title and Company before using AI assistant.",
        variant: "destructive"
      });
      return;
    }

    setAiLoading(exp.id);
    try {
      const result = await generateAIBulletPoints({
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        jobResponsibilities: exp.responsibilities.join('\n'),
      });

      updateExperience(exp.id, 'responsibilities', result.bulletPoints);
      toast({
        title: "Success",
        description: "Impactful bullet points generated!",
      });
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to generate bullet points. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAiLoading(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can employers reach you?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" value={data.contact.fullName} onChange={(e) => updateContact('fullName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={data.contact.email} onChange={(e) => updateContact('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" value={data.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" value={data.contact.location} onChange={(e) => updateContact('location', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/johndoe" value={data.contact.linkedin} onChange={(e) => updateContact('linkedin', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Work Experience</h2>
                <p className="text-muted-foreground text-sm">Add your relevant work history.</p>
              </div>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Work
              </Button>
            </div>
            {data.experience.map((exp, idx) => (
              <Card key={exp.id} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Experience #{idx + 1}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input value={exp.jobTitle} onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)} placeholder="Senior Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={exp.companyName} onChange={(e) => updateExperience(exp.id, 'companyName', e.target.value)} placeholder="Tech Corp" />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" disabled={exp.current} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Key Responsibilities</Label>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 gap-1.5" 
                        disabled={aiLoading === exp.id}
                        onClick={() => handleAiImprove(exp)}
                      >
                        <Sparkles className="h-3.5 w-3.5 text-accent" />
                        {aiLoading === exp.id ? 'Thinking...' : 'AI Improve'}
                      </Button>
                    </div>
                    <Textarea 
                      className="min-h-[120px]"
                      placeholder="• Managed team of 5...&#10;• Increased revenue by..."
                      value={exp.responsibilities.join('\n')}
                      onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n'))}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Education</h2>
                <p className="text-muted-foreground text-sm">Where did you study?</p>
              </div>
              <Button onClick={() => onChange({ ...data, education: [...data.education, { id: Math.random().toString(), degree: '', institution: '', location: '', graduationDate: '' }]})} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </div>
            {data.education.map((edu, idx) => (
              <Card key={edu.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Education #{idx + 1}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) })} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Degree / Certification</Label>
                    <Input value={edu.degree} onChange={(e) => onChange({ ...data, education: data.education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed) })} placeholder="B.S. Computer Science" />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input value={edu.institution} onChange={(e) => onChange({ ...data, education: data.education.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed) })} placeholder="University of California" />
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation Date</Label>
                    <Input value={edu.graduationDate} onChange={(e) => onChange({ ...data, education: data.education.map(ed => ed.id === edu.id ? { ...ed, graduationDate: e.target.value } : ed) })} placeholder="May 2018" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Skills</h2>
                <p className="text-muted-foreground text-sm">List your top technical and soft skills.</p>
              </div>
              <Button onClick={() => onChange({ ...data, skills: [...data.skills, { id: Math.random().toString(), name: '', level: 'None' }]})} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="flex gap-2 items-center">
                      <Input 
                        value={skill.name} 
                        onChange={(e) => onChange({ ...data, skills: data.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s) })} 
                        placeholder="React, Project Management, etc." 
                      />
                      <Button variant="ghost" size="icon" onClick={() => onChange({ ...data, skills: data.skills.filter(s => s.id !== skill.id) })} className="text-destructive shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {data.skills.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No skills added yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
                <h2 className="text-2xl font-bold">Choose a Template</h2>
                <p className="text-muted-foreground text-sm">Pick the style that best fits your career stage.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'modern', name: 'Modern', desc: 'Sleek & Professional', color: 'bg-primary' },
                  { id: 'classic', name: 'Classic', desc: 'Timeless Academic', color: 'bg-zinc-800' },
                  { id: 'minimal', name: 'Minimal', desc: 'Clean & Lightweight', color: 'bg-accent' },
                ].map((tmpl) => (
                  <Card 
                    key={tmpl.id} 
                    className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${data.templateId === tmpl.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => onChange({ ...data, templateId: tmpl.id })}
                  >
                    <div className={`h-24 ${tmpl.color} opacity-80 flex items-center justify-center`}>
                       <Check className={`text-white transition-opacity ${data.templateId === tmpl.id ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{tmpl.name}</CardTitle>
                      <CardDescription>{tmpl.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow pb-24 overflow-y-auto px-1">
        {renderStep()}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 md:relative bg-white/80 backdrop-blur-md border-t p-4 flex justify-between items-center z-10 md:bg-transparent md:border-t-0 md:px-0">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          disabled={step === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 w-6 rounded-full ${s === step ? 'bg-primary' : 'bg-slate-200'}`} />
          ))}
        </div>
        <Button onClick={onNext}>
          {step === 4 ? 'Finish & Download' : 'Continue'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}