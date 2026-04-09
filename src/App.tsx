/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { WikiIndex, WikiArticle } from './WikiComponents';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Play, 
  Check, 
  Clock, 
  Users, 
  Link as LinkIcon, 
  RotateCw, 
  LayoutGrid, 
  Zap, 
  Brain, 
  BarChart3,
  ChevronDown,
  Lock,
  ThumbsUp
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-bg-primary/90 backdrop-blur-md py-4 border-b border-border' : 'bg-transparent py-6'}`}>
      <div className=\"container-inner flex justify-between items-center px-6\">
        <div className=\"flex items-center gap-3 cursor-pointer\" onClick={() => onNavigate('home')}>
          <span className=\"font-serif text-2xl font-bold tracking-tight\">NextGenAI</span>
          <div className=\"h-6 w-[1px] bg-border-gold hidden sm:block\"></div>
          <span className=\"text-[10px] uppercase tracking-[0.2em] text-text-secondary hidden sm:block\">Institute</span>
        </div>

        <div className=\"hidden md:flex items-center gap-8\">
          <button 
            onClick={() => onNavigate('wiki')}
            className={`text-sm font-medium tracking-wide transition-all duration-300 ${currentPage.startsWith('wiki') ? 'text-accent-gold' : 'text-text-secondary hover:text-accent-gold'}`}
          >
            WIKI
          </button>
          <button 
            onClick={scrollToCTA}
            className=\"px-6 py-2 border border-accent-gold text-accent-gold text-sm font-medium tracking-wide hover:bg-accent-gold hover:text-bg-primary transition-all duration-300\"
          >
            Book a Call
          </button>
        </div>

        <button className=\"md:hidden text-accent-gold\" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className=\"fixed inset-0 bg-bg-primary z-[60] flex flex-col items-center justify-center gap-8\"
          >
            <button className=\"absolute top-6 right-6 text-accent-gold\" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <span className=\"font-serif text-4xl font-bold\" onClick={() => onNavigate('home')}>NextGenAI</span>
            <button 
              onClick={() => onNavigate('wiki')}
              className=\"text-lg font-medium tracking-widest text-accent-gold\"
            >
              WIKI
            </button>
            <button 
              onClick={scrollToCTA}
              className=\"px-10 py-4 border border-accent-gold text-accent-gold text-lg font-medium tracking-widest\"
            >
              BOOK A CALL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="gradient-mesh"></div>
      <div className="noise-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[1px] w-8 bg-accent-gold"></div>
          <span className="text-[11px] font-medium tracking-[0.2em] text-accent-gold uppercase">
            For Founders Doing $5M–$50M / Year
          </span>
          <div className="h-[1px] w-8 bg-accent-gold"></div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8"
        >
          You're the smartest person <br />
          in your business. <br />
          <span className="text-accent-gold text-4xl md:text-6xl mt-4 block">That's the problem.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          When everything runs through you, the business can't scale past you. 
          We install an AI Operating System that removes you as the bottleneck — in 30 days. 
          <span className="text-text-primary font-medium"> No CTO needed.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
        >
          <button 
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-accent-gold text-bg-primary font-medium flex items-center gap-2 hover:bg-accent-gold-light transition-all duration-300"
          >
            Book Your Strategy Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-accent-gold font-medium gold-underline py-2">
            See How It Works
          </button>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="w-full border-y border-border py-4 overflow-hidden bg-bg-secondary/50 backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 text-[13px] text-text-secondary font-medium tracking-wide">
              <span className="flex items-center gap-2"><span className="text-accent-gold">★★★★★</span> Trusted by 40+ founders</span>
              <span>·</span>
              <span>$214K average first-year saving</span>
              <span>·</span>
              <span>Systems live in 23 days</span>
              <span>·</span>
              <span>No CTO required</span>
              <span>·</span>
              <span>40+ companies installed</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image (Desktop only) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden lg:block absolute bottom-0 right-0 h-[90vh] w-[45%] z-0"
      >
        <div className="relative h-full w-full">
          <img 
            src="/assets/hero-founder.png" 
            alt="Founder looking out window" 
            className="h-full w-full object-cover object-left"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 25%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent"></div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-text-muted">Scroll to explore</span>
        <ChevronDown size={16} className="text-text-muted" />
      </div>
    </section>
  );
};

const Problem = () => {
  const cards = [
    {
      icon: <Users size={24} />,
      title: "You're the de facto CTO",
      body: "Every tool decision lands on your desk. You didn't start a company to evaluate software."
    },
    {
      icon: <LinkIcon size={24} />,
      title: "You've tried the tools. Nothing stuck.",
      body: "ChatGPT, Zapier, the consultant who promised ROI. Still running on spreadsheets and group chats."
    },
    {
      icon: <RotateCw size={24} />,
      title: "Your team is busy, not productive.",
      body: "Heads down, always on, never ahead. Busy-work dressed up as operations."
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-[120px] md:text-[200px] font-serif font-bold text-[#1A1A1A] select-none z-0">01</div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6 block">01 / THE SITUATION</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              You know AI matters. <br />
              <span className="text-text-secondary">Nobody owns it.</span>
            </h2>
            <p className="text-text-secondary text-lg mb-12 leading-relaxed max-w-xl">
              You've tried ChatGPT. You hired a VA who "knows AI." You sat through three demos. 
              Nothing changed. Meanwhile your payroll keeps growing and your margins keep shrinking.
            </p>

            <div className="space-y-6">
              {cards.map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="bg-bg-card p-8 border-l-4 border-accent-gold group hover:bg-bg-card-hover transition-all duration-300"
                >
                  <div className="text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border">
              <img 
                src="/assets/problem-founder.png" 
                alt="Operational overwhelm" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-accent-gold/20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  const steps = [
    {
      num: "01",
      title: "AUDIT",
      desc: "We map exactly where your hours are bleeding. A structured deep-dive into your workflows, team, and tools. We find the leaks."
    },
    {
      num: "02",
      title: "ARCHITECT",
      desc: "We design your custom AI stack. No off-the-shelf nonsense. Built around your business, your team, your margins."
    },
    {
      num: "03",
      title: "INSTALL",
      desc: "We build it. You don't touch a line of code. Every automation, dashboard, and workflow — live and tested."
    },
    {
      num: "04",
      title: "TRAIN",
      desc: "Your team runs it independently in one week. Full documentation. Handover sessions. We're done when you don't need us."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-bg-primary to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6 block">02 / THE SOLUTION</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Four steps. One operating layer.</h2>
        <div className="flex items-center gap-2 text-accent-gold mb-20">
          <Clock size={16} />
          <span className="text-sm font-medium">Average time from kickoff to live system: 23 days.</span>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connecting line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] border-t border-dashed border-accent-gold/30 -z-0"></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="relative z-10"
            >
              <div className={`text-6xl font-serif font-bold mb-6 ${i === 0 ? 'text-accent-gold-light' : 'text-accent-gold'}`}>{step.num}</div>
              <h3 className="text-xl font-bold mb-4 tracking-widest text-text-primary">{step.title}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed opacity-100">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 relative h-[400px] w-full overflow-hidden rounded-sm border border-border">
          <img 
            src="https://picsum.photos/seed/strategy-desk/1600/400" 
            alt="Strategy desk" 
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary"></div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold">See it in action.</h2>
      </div>
      
      <div 
        onClick={() => setIsPlaying(true)}
        className="relative max-w-4xl mx-auto aspect-video bg-[#161616] border border-[#C9A84C]/40 rounded-sm overflow-hidden group cursor-pointer"
        style={{ boxShadow: '0 0 40px rgba(201,168,76,0.08)' }}
      >
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
              <div className="w-16 h-16 rounded-full border-2 border-[#C9A84C] flex items-center justify-center bg-bg-primary/40 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                <Play size={28} className="text-accent-gold fill-accent-gold ml-1" />
              </div>
              <p className="text-text-secondary font-medium tracking-wide">2-minute walkthrough of a live AI OS install</p>
            </div>
            <div className="absolute inset-0 bg-accent-gold/5 group-hover:bg-accent-gold/10 transition-colors duration-500"></div>
          </>
        ) : (
          <video 
            src="https://assets.cdn.filesafe.space/Mf8u8bZ4PRZbFQBuWPoH/media/69d73204ebf1a60843596e8f.mp4" 
            controls 
            autoPlay 
            className="w-full h-full"
          />
        )}
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-serif font-bold text-accent-gold/5 select-none pointer-events-none">"</div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-12 text-text-primary"
        >
          "We replaced three full-time roles and saved $214,000 in the first year. I now spend 4 hours a week on operations instead of 40."
        </motion.p>

        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="w-[60px] h-[60px] rounded-full bg-[#1C1C1C] border border-accent-gold flex items-center justify-center">
            <span className="font-serif text-[20px] font-bold text-accent-gold">JD</span>
          </div>
          <span className="text-text-secondary text-[14px] font-medium tracking-wide">— CEO, $12M Logistics Company</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-bg-card p-6 border border-red-900/30 text-left">
            <span className="text-[11px] font-bold tracking-[0.15em] text-red-500 uppercase mb-6 block">BEFORE</span>
            <ul className="space-y-4">
              {[
                "3 FTEs handling reporting and approvals",
                "Owner reviewing 40+ items per week manually",
                "Margins declining 3% year over year"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary text-[14px]">
                  <X size={16} className="text-red-900 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-card p-6 border border-accent-gold/30 text-left">
            <span className="text-[11px] font-bold tracking-[0.15em] text-accent-gold uppercase mb-6 block">AFTER</span>
            <ul className="space-y-4">
              {[
                "Reporting fully automated — reviewed in 15 min",
                "Owner decision load down 70%",
                "Freed $214K reinvested into growth"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-primary text-[14px] font-medium">
                  <Check size={16} className="text-accent-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Calculator = () => {
  const [employees, setEmployees] = useState(25);
  const [salary, setSalary] = useState(75000);

  const monthlyGap = (employees * salary * 0.30) / 12;
  const annualGap = monthlyGap * 12;

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6 block">03 / YOUR NUMBER</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">What is manual work <br /> costing you right now?</h2>
          <p className="text-text-secondary">Move the sliders. See your number.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-bg-card p-8 md:p-12 border border-accent-gold/20 rounded-sm">
          <div className="space-y-12 mb-16">
            <div>
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-widest">Number of Employees</label>
                <span className="text-4xl font-serif font-bold text-accent-gold">{employees}</span>
              </div>
              <input 
                type="range" min="5" max="200" value={employees} 
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full h-1 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-widest">Average Annual Salary</label>
                <span className="text-4xl font-serif font-bold text-accent-gold">${salary.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="30000" max="200000" step="5000" value={salary} 
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="w-full h-1 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
              />
            </div>
          </div>

          <div className="text-center p-8 bg-bg-primary/50 border border-border mb-8">
            <span className="text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase mb-4 block">YOUR MONTHLY AI GAP</span>
            <div className="text-5xl md:text-6xl font-mono font-bold text-accent-gold mb-2">
              ${Math.round(monthlyGap).toLocaleString()} <span className="text-xl text-text-muted">/ mo</span>
            </div>
            <div className="text-text-secondary text-sm font-medium tracking-wide">
              Annual Projection: <span className="text-text-primary">${Math.round(annualGap).toLocaleString()} / yr</span>
            </div>
          </div>

          <p className="text-center text-text-muted text-xs italic mb-10">
            We calculate based on 30% of time spent on automatable tasks — the industry standard.
          </p>

          <button 
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-5 bg-accent-gold text-bg-primary font-bold tracking-widest hover:bg-accent-gold-light transition-all duration-300"
          >
            SEE IF WE CAN CLOSE THIS GAP →
          </button>
          
          <p className="text-center mt-6 text-text-muted text-sm italic">
            Most clients recover their full investment in under 6 weeks.
          </p>
        </div>
      </div>
    </section>
  );
};

const Stack = () => {
  const layers = [
    {
      num: "01",
      title: "COMMAND",
      subtitle: "One source of truth",
      desc: "Every KPI, every team, every system — visible in one dashboard. You stop chasing updates and start making decisions.",
      icon: <LayoutGrid size={24} />
    },
    {
      num: "02",
      title: "AUTOMATION",
      subtitle: "Work that runs without you",
      desc: "Approvals, reporting, follow-ups, scheduling. Automated and auditable. No more manual handoffs or people-dependent processes.",
      icon: <Zap size={24} />
    },
    {
      num: "03",
      title: "KNOWLEDGE",
      subtitle: "Your business brain, documented",
      desc: "SOPs, decisions, tribal knowledge — captured and searchable. New hires onboard in days, not months. Nothing leaves when people do.",
      icon: <Brain size={24} />
    },
    {
      num: "04",
      title: "REPORTING",
      subtitle: "Decisions in minutes, not meetings",
      desc: "Weekly reports generated automatically. You get the signal, not the noise. Stop being the last person to know what's happening.",
      icon: <BarChart3 size={24} />
    }
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6 block">04 / THE STACK</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-20">What gets installed <br /> inside your business.</h2>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-0">
            {layers.map((layer, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="group py-12 border-b border-border flex flex-col md:flex-row gap-8 md:items-center hover:border-accent-gold/40 transition-colors duration-500"
              >
                <div className="text-4xl font-serif font-bold text-text-muted group-hover:text-accent-gold transition-colors duration-500">{layer.num}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent-gold">{layer.icon}</span>
                    <h3 className="text-xl font-bold tracking-widest">LAYER {layer.num} — {layer.title}</h3>
                  </div>
                  <p className="text-accent-gold text-sm font-medium mb-4">{layer.subtitle}</p>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-md">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="sticky top-32 hidden lg:block">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border bg-bg-card">
              <img 
                src="/assets/stack-operator.png" 
                alt="AI powered operations" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section className="py-32 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[11px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6 block">05 / OUR PHILOSOPHY</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">We build independence, <br /> not dependency.</h2>
        
        <div className="text-text-secondary text-lg leading-relaxed space-y-8 mb-20 max-w-3xl mx-auto">
          <p>
            Most consultants build you a system only they can maintain. That keeps them billable and keeps you stuck.
          </p>
          <p className="text-text-primary font-medium">
            We hand you the keys. Your team runs it. We're done when you don't need us anymore. 
            That's the only engagement we're proud of.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase mb-8 block">WHAT WE DON'T DO</span>
            <ul className="space-y-6">
              {[
                "Lock you into proprietary software",
                "Sell you retainers you don't need",
                "Create complexity only we can solve"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-text-secondary">
                  <X size={18} className="text-red-900 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent-gold uppercase mb-8 block">WHAT YOU GET</span>
            <ul className="space-y-6">
              {[
                "A system your team owns and operates",
                "Full documentation and training included",
                "One point of contact, start to finish"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-text-primary font-medium">
                  <Check size={18} className="text-accent-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Urgency = () => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const target = 784;

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <section className="py-32 bg-bg-primary text-center">
      <motion.div 
        onViewportEnter={() => setHasStarted(true)}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6"
      >
        <span className="text-[12px] font-medium tracking-[0.2em] text-accent-gold uppercase mb-12 block">THE COST OF WAITING TODAY</span>
        <p className="text-text-secondary text-lg mb-8">Every day you wait costs you approximately</p>
        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="text-[96px] font-mono font-bold text-accent-gold leading-none">
            ${count.toLocaleString()}
          </div>
          <span className="font-sans text-[18px] font-medium text-text-secondary">per day</span>
        </div>
        <div className="max-w-[500px] mx-auto">
          <p className="text-text-secondary text-[16px] leading-relaxed">
            That's what businesses who've already installed AI are saving every single day.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const ThankYouPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-bg-card border border-accent-gold/30 p-12 text-center overflow-hidden"
          >
            <div className="gradient-mesh opacity-30"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full border border-accent-gold flex items-center justify-center mx-auto mb-8 bg-accent-gold/10">
                <ThumbsUp size={32} className="text-accent-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Thank You.</h2>
              <div className="h-[1px] w-12 bg-accent-gold mx-auto mb-8"></div>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                Your strategy call request has been received. Our team will review your details and reach out within 24 hours to finalize the schedule.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-accent-gold text-bg-primary font-bold tracking-widest hover:bg-accent-gold-light transition-all duration-300"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FinalCTA = ({ onShowSuccess }: { onShowSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    revenue: '$5M – $10M',
    staff: '',
    email: '',
    phone: '',
    bottleneck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/Mf8u8bZ4PRZbFQBuWPoH/webhook-trigger/58bd5ced-651d-4f54-bd68-f9500121030f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onShowSuccess();
        setFormData({
          fullName: '',
          companyName: '',
          revenue: '$5M – $10M',
          staff: '',
          email: '',
          phone: '',
          bottleneck: ''
        });
      } else {
        console.error('Submission failed');
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="final-cta" className="pt-[140px] pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 relative z-10">Every week you wait, <br /> your competitors catch up.</h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          30-minute strategy call. No pitch deck. No fluff. We'll show you exactly where AI can cut your overhead — or we'll tell you it can't.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-bg-card p-8 md:p-12 border border-accent-gold/30 rounded-sm relative z-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors" 
                placeholder="John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Company Name</label>
              <input 
                required
                type="text" 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors" 
                placeholder="Acme Corp" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Annual Revenue</label>
              <select 
                value={formData.revenue}
                onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors appearance-none"
              >
                <option>$5M – $10M</option>
                <option>$10M – $20M</option>
                <option>$20M – $50M</option>
                <option>$50M+</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Number of Staff</label>
              <input 
                required
                type="number" 
                value={formData.staff}
                onChange={(e) => setFormData({...formData, staff: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors" 
                placeholder="25" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors" 
                placeholder="john@company.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted">Phone Number</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors" 
                placeholder="+1 (555) 000-0000" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted">Biggest operational bottleneck</label>
            <textarea 
              required
              rows={3} 
              value={formData.bottleneck}
              onChange={(e) => setFormData({...formData, bottleneck: e.target.value})}
              className="w-full bg-bg-primary border-b border-border p-3 text-text-primary focus:border-accent-gold outline-none transition-colors resize-none" 
              placeholder="Describe your main challenge..."
            ></textarea>
          </div>

          <button 
            disabled={isSubmitting}
            className={`w-full py-5 bg-accent-gold text-bg-primary font-bold tracking-widest hover:bg-accent-gold-light transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.1)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'SENDING...' : 'BOOK MY STRATEGY CALL →'}
          </button>

          <div className="flex items-center justify-center gap-2 text-text-muted text-[11px]">
            <Lock size={12} />
            <span>No commitment. No tech knowledge required. Response within 24 hours.</span>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-[#060606] border-t border-border-gold/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl font-bold tracking-tight">NextGenAI</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-text-secondary">Institute</span>
        </div>
        
        <p className="text-text-muted text-xs">
          © 2025 NextGenAI Institute. All rights reserved.
        </p>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-accent-gold text-sm font-medium gold-underline"
        >
          Book a Call
        </button>
      </div>
    </footer>
  );
};

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [articleId, setArticleId] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/wiki') {
        setCurrentPage('wiki');
        setArticleId('');
      } else if (path.startsWith('/wiki/')) {
        setCurrentPage('wiki-article');
        setArticleId(path.replace('/wiki/', ''));
      } else {
        setCurrentPage('home');
        setArticleId('');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    
    if (page === 'home') {
      setCurrentPage('home');
      setArticleId('');
    } else if (page === 'wiki') {
      setCurrentPage('wiki');
      setArticleId('');
    } else if (page.startsWith('wiki/')) {
      setCurrentPage('wiki-article');
      setArticleId(page.replace('wiki/', ''));
    }
    
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative selection:bg-accent-gold selection:text-bg-primary">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <SectionReveal><Problem /></SectionReveal>
          <SectionReveal><Solution /></SectionReveal>
          <SectionReveal><VideoSection /></SectionReveal>
          <SectionReveal><Testimonial /></SectionReveal>
          <SectionReveal><Calculator /></SectionReveal>
          <SectionReveal><Stack /></SectionReveal>
          <SectionReveal><Philosophy /></SectionReveal>
          <SectionReveal><Urgency /></SectionReveal>
          <SectionReveal><FinalCTA onShowSuccess={() => setShowThankYou(true)} /></SectionReveal>
        </>
      )}

      {currentPage === 'wiki' && (
        <WikiIndex onNavigate={navigateTo} />
      )}

      {currentPage === 'wiki-article' && (
        <WikiArticle id={articleId} onBack={() => navigateTo('wiki')} />
      )}

      <Footer />

      <ThankYouPopup 
        isOpen={showThankYou} 
        onClose={() => setShowThankYou(false)} 
      />
    </div>
  );
}
