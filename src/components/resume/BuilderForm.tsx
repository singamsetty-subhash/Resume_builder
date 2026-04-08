"use client";

import React, { useState, useRef } from 'react';
import { ResumeData, Experience, Education, Skill, Certification, Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Sparkles, ChevronLeft, ChevronRight, Check, Search, X, Download, Cloud, Award, Briefcase, FileUp, FileCheck } from 'lucide-react';
import { generateAIBulletPoints } from '@/ai/flows/ai-bullet-point-generator-flow';
import { useToast } from '@/hooks/use-toast';
import { SKILL_CATEGORIES } from '@/lib/skills-data';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [skillSearch, setSkillSearch] = useState('');
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    onChange({ ...data, projects: [...(data.projects || []), newProject] });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      issuer: '',
      date: '',
    };
    onChange({ ...data, certifications: [...(data.certifications || []), newCert] });
  };

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter(c => c.id !== id) });
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange({
      ...data,
      certifications: data.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a certificate smaller than 2MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      updateCertification(id, 'fileName', file.name);
      updateCertification(id, 'fileData', dataUri);
      toast({
        title: "Certificate Uploaded",
        description: `${file.name} has been attached.`,
      });
    };
    reader.readAsDataURL(file);
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

  const toggleSkill = (skillName: string) => {
    const exists = data.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      onChange({
        ...data,
        skills: data.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
      });
    } else {
      onChange({
        ...data,
        skills: [...data.skills, { id: Math.random().toString(), name: skillName, level: 'None' }]
      });
    }
  };

  const filteredSkillSuggestions = skillSearch 
    ? SKILL_CATEGORIES.flatMap(c => c.skills).filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()))
    : [];

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
                        <Briefcase className="h-3.5 w-3.5 text-accent" />
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
                <h2 className="text-2xl font-bold">Personal Projects</h2>
                <p className="text-muted-foreground text-sm">Showcase your side projects and creations.</p>
              </div>
              <Button onClick={addProject} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
            {data.projects?.map((project, idx) => (
              <Card key={project.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Project #{idx + 1}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Project Name</Label>
                      <Input value={project.name} onChange={(e) => updateProject(project.id, 'name', e.target.value)} placeholder="Resume Builder AI" />
                    </div>
                    <div className="space-y-2">
                      <Label>Link (Optional)</Label>
                      <Input value={project.link} onChange={(e) => updateProject(project.id, 'link', e.target.value)} placeholder="github.com/username/project" />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies (Comma separated)</Label>
                      <Input value={project.technologies.join(', ')} onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))} placeholder="React, Next.js, Firebase" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Briefly describe what you built and the impact it had."
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!data.projects || data.projects.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed rounded-3xl text-slate-400">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No projects added yet.</p>
              </div>
            )}
          </div>
        );
      case 3:
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
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Certifications</h2>
                <p className="text-muted-foreground text-sm">Add and upload your professional credentials.</p>
              </div>
              <Button onClick={addCertification} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Cert
              </Button>
            </div>
            {data.certifications?.map((cert, idx) => (
              <Card key={cert.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Certification #{idx + 1}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Certification Name</Label>
                      <Input value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                    </div>
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date Obtained</Label>
                      <Input value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} placeholder="March 2023" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Attachment (Internal Device)</Label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={el => { fileInputRefs.current[cert.id] = el }} 
                        onChange={(e) => handleFileUpload(cert.id, e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-dashed" 
                        onClick={() => fileInputRefs.current[cert.id]?.click()}
                      >
                        {cert.fileName ? <FileCheck className="h-4 w-4 text-emerald-500" /> : <FileUp className="h-4 w-4" />}
                        {cert.fileName ? cert.fileName : 'Select Certificate File'}
                      </Button>
                      {cert.fileName && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="shrink-0 text-slate-400 hover:text-destructive"
                          onClick={() => {
                            updateCertification(cert.id, 'fileName', undefined);
                            updateCertification(cert.id, 'fileData', undefined);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Supports PDF, JPG, PNG (Max 2MB)</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!data.certifications || data.certifications.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed rounded-3xl text-slate-400">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No certifications added yet.</p>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Skills</h2>
                <p className="text-muted-foreground text-sm">Pick from categories or add your own.</p>
              </div>
              <Button onClick={() => onChange({ ...data, skills: [...data.skills, { id: Math.random().toString(), name: '', level: 'None' }]})} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Custom
              </Button>
            </div>

            <Card className="bg-slate-50 border-none shadow-none">
              <CardContent className="p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search skills (e.g. React, Python...)" 
                    className="pl-9 bg-white"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                  {skillSearch && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setSkillSearch('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {skillSearch ? (
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400">Search Results</Label>
                    <div className="flex flex-wrap gap-2">
                      {filteredSkillSuggestions.map(skill => {
                        const isSelected = data.skills.some(s => s.name.toLowerCase() === skill.toLowerCase());
                        return (
                          <Badge 
                            key={skill} 
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer py-1.5 px-3 rounded-full bg-white hover:bg-slate-100"
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                            {isSelected && <Check className="ml-1.5 h-3 w-3" />}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue={SKILL_CATEGORIES[0].name} className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto no-scrollbar bg-transparent h-auto p-0 mb-4 gap-2">
                      {SKILL_CATEGORIES.map(cat => (
                        <TabsTrigger 
                          key={cat.name} 
                          value={cat.name}
                          className="rounded-full px-4 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-white bg-white border"
                        >
                          {cat.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {SKILL_CATEGORIES.map(cat => (
                      <TabsContent key={cat.name} value={cat.name} className="mt-0">
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map(skill => {
                            const isSelected = data.skills.some(s => s.name.toLowerCase() === skill.toLowerCase());
                            return (
                              <Badge 
                                key={skill} 
                                variant={isSelected ? "default" : "outline"}
                                className={`cursor-pointer transition-all hover:scale-105 py-1.5 px-3 rounded-full ${isSelected ? 'bg-primary border-primary text-white' : 'bg-white hover:bg-slate-100'}`}
                                onClick={() => toggleSkill(skill)}
                              >
                                {skill}
                                {isSelected && <Check className="ml-1.5 h-3 w-3" />}
                              </Badge>
                            );
                          })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </CardContent>
            </Card>

            <Separator />

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Selected Skills</Label>
              <div className="grid gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex gap-2 items-center">
                    <Input 
                      value={skill.name} 
                      onChange={(e) => onChange({ ...data, skills: data.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s) })} 
                      placeholder="Skill name" 
                      className="bg-white"
                    />
                    <Button variant="ghost" size="icon" onClick={() => onChange({ ...data, skills: data.skills.filter(s => s.id !== skill.id) })} className="text-destructive shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 6:
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
        );
      case 7:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Check className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Your resume is ready!</h2>
                <p className="text-slate-500 max-w-sm mx-auto">Review your details on the right and hit export when you're set.</p>
              </div>

              <div className="grid gap-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Cloud className="h-8 w-8 text-primary" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">Cloud Backup Enabled</h4>
                      <p className="text-xs text-slate-500">Your progress is automatically saved to your anonymous profile.</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 border rounded-2xl space-y-4">
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-slate-400">Final Checklist</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500" /> Contact info is accurate
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500" /> Experience is impact-focused
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500" /> Template fits your industry
                    </li>
                  </ul>
                </div>
              </div>

              <Button onClick={onNext} className="w-full h-16 text-lg font-bold gap-3 rounded-2xl shadow-xl shadow-primary/20">
                <Download className="h-6 w-6" /> Export as PDF
              </Button>
          </div>
        );
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
          {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className={`h-1.5 w-6 rounded-full transition-all ${s === step ? 'bg-primary w-10' : 'bg-slate-200'}`} />
          ))}
        </div>
        <Button onClick={onNext}>
          {step === 7 ? 'Download PDF' : 'Continue'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
