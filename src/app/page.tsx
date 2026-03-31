import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Layout, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">CV</div>
          <span className="text-2xl font-black tracking-tight text-slate-800">CVForge</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#templates" className="hover:text-primary transition-colors">Templates</a>
          <Link href="/builder">
            <Button variant="outline" className="rounded-full px-6">Sign In</Button>
          </Link>
          <Link href="/builder">
            <Button className="rounded-full px-6 shadow-xl shadow-primary/25">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-bounce">
            <Sparkles className="h-4 w-4" /> AI-Powered Builder
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
            Build a Resume That <span className="text-primary">Gets You Hired</span>.
          </h1>
          <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Craft a professional, eye-catching resume in minutes with our guided builder and AI assistant. Export as a high-quality PDF, ready for your dream job.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Link href="/builder">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 w-full sm:w-auto group">
                Create My Resume <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/builder">
              <Button size="lg" variant="ghost" className="h-16 px-8 rounded-2xl text-lg font-bold text-slate-600 hover:bg-slate-200 w-full sm:w-auto">
                View Templates
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
             <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
               <CheckCircle2 className="h-5 w-5 text-accent" /> No Credit Card Required
             </div>
             <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
               <CheckCircle2 className="h-5 w-5 text-accent" /> Expert AI Tips
             </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative bg-white p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 animate-in fade-in slide-in-from-right-10 duration-1000">
            <img 
              src="https://picsum.photos/seed/cvlanding/800/600" 
              alt="Resume Builder Preview" 
              className="rounded-2xl w-full"
              data-ai-hint="resume dashboard"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-white py-32 border-y">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-slate-900">Why use CVForge?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to craft a standout resume that highlights your unique skills and achievements.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: FileText, 
                title: 'Guided Information Entry', 
                desc: 'Step-by-step guidance ensures you never miss critical details that recruiters look for.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: Sparkles, 
                title: 'AI Bullet Points', 
                desc: 'Turn basic duties into impactful achievements with our intelligent rephrasing engine.',
                color: 'bg-teal-50 text-teal-600'
              },
              { 
                icon: Layout, 
                title: 'Modern Templates', 
                desc: 'Choose from a variety of professionally designed layouts that pass ATS checks with ease.',
                color: 'bg-purple-50 text-purple-600'
              },
              { 
                icon: ShieldCheck, 
                title: 'Privacy Focused', 
                desc: 'Your data stays with you. We prioritize security and privacy for all your sensitive information.',
                color: 'bg-rose-50 text-rose-600'
              },
              { 
                icon: Layout, 
                title: 'Live Preview', 
                desc: 'See exactly how your resume looks as you type. Real-time changes, instant feedback.',
                color: 'bg-orange-50 text-orange-600'
              },
              { 
                icon: FileText, 
                title: 'Professional PDF Export', 
                desc: 'Download your resume in high-fidelity PDF format, perfectly formatted for any application.',
                color: 'bg-indigo-50 text-indigo-600'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">CV</div>
            <span className="text-2xl font-black tracking-tight">CVForge</span>
          </div>
          <div className="flex gap-8 text-slate-400 font-medium">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-slate-500 text-sm">© 2024 CVForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}