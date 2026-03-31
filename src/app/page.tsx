
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Sparkles, 
  Layout, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  PenTool, 
  Download,
  Users,
  Star,
  Quote
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'landing-hero')?.imageUrl;
  const dashboardImage = PlaceHolderImages.find(img => img.id === 'resume-preview')?.imageUrl;

  return (
    <div className="min-h-screen bg-background text-slate-900 overflow-x-hidden">
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">CV</div>
            <span className="text-2xl font-black tracking-tight text-slate-800">CVForge</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-500">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/builder" className="hidden sm:block">
              <Button variant="ghost" className="rounded-full font-bold">Sign In</Button>
            </Link>
            <Link href="/builder">
              <Button className="rounded-full px-8 shadow-lg shadow-primary/20 font-bold">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="h-4 w-4" /> The Future of Resume Building
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Your Career Deserves <span className="text-primary italic">Better</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Stop fighting with Word documents. Use AI to craft a professional, high-impact resume that gets you through ATS filters and into interviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 w-full group">
                  Build My Free Resume <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <Avatar key={i} className="border-2 border-white ring-2 ring-slate-100 w-10 h-10">
                    <AvatarImage src={`https://picsum.photos/seed/user${i}/100/100`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
                <div className="ml-4 text-sm font-bold text-slate-500">
                  Joined by <span className="text-slate-900">10k+ professionals</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
            <div className="relative mx-auto max-w-6xl p-2 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.6rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <img 
                src={dashboardImage || "https://picsum.photos/seed/cvlanding/1200/800"} 
                alt="App Dashboard" 
                className="rounded-[2rem] w-full"
                data-ai-hint="resume dashboard"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="text-xl font-black text-slate-400">GOOGLE</div>
          <div className="text-xl font-black text-slate-400">AMAZON</div>
          <div className="text-xl font-black text-slate-400">META</div>
          <div className="text-xl font-black text-slate-400">AIRBNB</div>
          <div className="text-xl font-black text-slate-400">STRIPE</div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">Three simple steps to your dream job.</h2>
            <p className="text-slate-500 text-lg">We've streamlined the entire process so you can focus on what matters: the interview.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                icon: PenTool, 
                title: 'Enter Your Data', 
                desc: 'Fill in your experience and skills with our intuitive, guided form. No more formatting headaches.',
                step: '01'
              },
              { 
                icon: Sparkles, 
                title: 'AI Enhancements', 
                desc: 'Let our AI rephrase your responsibilities into powerful, achievement-based bullet points.',
                step: '02'
              },
              { 
                icon: Download, 
                title: 'Download & Apply', 
                desc: 'Pick a template, preview in real-time, and download a high-quality PDF ready for submission.',
                step: '03'
              }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-6 -left-6 text-8xl font-black text-slate-100 z-0">{item.step}</div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Built by recruiters, powered by AI.</h2>
              <p className="text-lg text-slate-500">We understand what hire managers are looking for. Our platform is designed to highlight your strengths effortlessly.</p>
              <ul className="space-y-4 pt-4">
                {[
                  'Applicant Tracking System (ATS) optimized templates',
                  'Context-aware AI bullet point generation',
                  'Real-time live preview of your resume',
                  'Multiple professional design styles'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <CheckCircle2 className="h-6 w-6 text-accent" /> {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: 'Privacy First', desc: 'Your data is encrypted and never sold.', color: 'bg-blue-500' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Go from zero to PDF in under 10 minutes.', color: 'bg-amber-500' },
                { icon: Users, title: 'Collaborative', desc: 'Share your resume with a simple link.', color: 'bg-indigo-500' },
                { icon: Layout, title: 'Customizable', desc: 'Colors, fonts, and layouts at your fingertips.', color: 'bg-teal-500' }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-3xl bg-slate-50 space-y-4 hover:bg-slate-100 transition-colors">
                  <div className={`w-12 h-12 ${feat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <feat.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold">{feat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl lg:text-5xl font-black">Hear from our users</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Success stories from professionals who landed their dream jobs using CVForge.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Senior Product Designer",
                content: "CVForge changed everything. The AI bullet point tool helped me articulate my impact in a way I never could on my own. Landed 3 interviews in a week!",
                avatar: "https://picsum.photos/seed/user5/100/100"
              },
              {
                name: "Marcus Chen",
                role: "Software Engineer",
                content: "The templates are clean, modern, and actually work with ATS. I love how I can switch styles instantly without re-typing anything.",
                avatar: "https://picsum.photos/seed/user6/100/100"
              },
              {
                name: "Elena Rodriguez",
                role: "Marketing Director",
                content: "Fast, intuitive, and professional. It's the best investment I've made in my career transition. Highly recommended for any professional.",
                avatar: "https://picsum.photos/seed/user7/100/100"
              }
            ].map((t, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white h-full">
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <Quote className="h-8 w-8 text-slate-600 rotate-180" />
                  <p className="text-lg leading-relaxed text-slate-300 italic">"{t.content}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">Ready to start your next chapter?</h2>
            <p className="text-xl text-primary-foreground/80 font-medium leading-relaxed">Join thousands of professionals who have built winning resumes with CVForge. It's free to try, and only takes minutes.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-bold w-full shadow-xl hover:scale-105 transition-transform">
                  Create My Resume Now
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-80">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><CheckCircle2 className="h-5 w-5" /> No Credit Card</div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><CheckCircle2 className="h-5 w-5" /> Unlimited Downloads</div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><CheckCircle2 className="h-5 w-5" /> ATS Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-16 border-b">
            <div className="space-y-6 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">CV</div>
                <span className="text-2xl font-black tracking-tight text-slate-800">CVForge</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Empowering job seekers with AI-driven tools to craft professional resumes that land interviews and build careers.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">Product</h5>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-primary transition-colors">Builder</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">AI Assistant</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">Resources</h5>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Career Tips</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">Legal</h5>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm font-medium">© 2024 CVForge. Crafted for careers everywhere.</p>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Users className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
