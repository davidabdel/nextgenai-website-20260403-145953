import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Users, Zap, Brain, BarChart3, ChevronLeft } from 'lucide-react';

export const WikiIndex = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const articles = [
    {
      id: 'voice-ai-for-founder-led-sales-orchestration',
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Voice AI for Founder-Led Sales Orchestration',
      desc: 'How to implement technical AI systems that improve speed, margin, and governance.',
      icon: <Brain size={24} />,
      type: 'pillar'
    },
    {
      id: 'agentic-fp-a-for-weekly-cashflow-command',
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Agentic FP&A for Weekly Cashflow Command',
      desc: 'How to implement technical AI systems that improve speed, margin, and governance.',
      icon: <Brain size={24} />,
      type: 'pillar'
    },
    {
      id: 'private-llm-stack-for-regulated-mid-market-teams',
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Private LLM Stack for Regulated Mid-Market Teams',
      desc: 'How to implement technical AI systems that improve speed, margin, and governance.',
      icon: <Brain size={24} />,
      type: 'pillar'
    },
    {
      id: 'ai-revenue-ops-command-centers',
      pill: 'FOUNDERS PLAYBOOK',
      title: 'AI Revenue Ops Command Centers',
      desc: 'How to implement technical AI systems that improve speed, margin, and governance.',
      icon: <Brain size={24} />,
      type: 'pillar'
    },
    {
      id: 'vertical-ai-agents-for-m-a-due-diligence',
      pill: 'TECHNICAL BRIEF',
      title: 'Vertical AI Agents for M&A Due Diligence',
      desc: 'How vertical AI agents are collapsing the due diligence timeline from weeks to hours.',
      icon: <Brain size={24} />,
      type: 'pillar'
    },
    {
      id: 'what-is-an-ai-os',
      pill: 'PILLAR 01',
      title: 'What is an AI Operating System (AI OS)?',
      desc: 'Understand the difference between isolated AI tools and an integrated system that removes the founder bottleneck.',
      icon: <Zap size={24} />,
      type: 'pillar'
    },
    {
      id: 'ceos-guide-to-ai-audits',
      pill: 'PILLAR 02',
      title: "The CEO's Guide to AI Audits",
      desc: 'A step-by-step framework to map exactly where your hours are bleeding and identify high-ROI automation opportunities.',
      icon: <Clock size={24} />,
      type: 'pillar'
    },
    {
      id: 'case-study-logistics-ai',
      pill: 'CASE STUDY',
      title: '$214K Saved in Year One',
      desc: 'A deep dive into how a $12M logistics firm replaced three full-time roles with automated AI layers.',
      icon: <BarChart3 size={24} />,
      type: 'case-study'
    }
  ];

  return (
    <div className="pt-32 pb-20 selection:bg-accent-gold selection:text-bg-primary">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="gradient-mesh opacity-30"></div>
        <div className="container-inner relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-medium tracking-[0.3em] text-accent-gold uppercase mb-6"
          >
            THE ARCHIVE
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8"
          >
            Founder's AI Playbook
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
          >
            The definitive technical and operational library for $5M–$50M founders installing the AI Operating System.
          </motion.p>
        </div>
      </section>

      <section className="container-inner py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => onNavigate(`wiki/${article.id}`)}
              className="bg-bg-card p-10 border border-border group hover:border-accent-gold/40 cursor-pointer transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent-gold group-hover:h-full transition-all duration-500"></div>
              <div className="flex justify-between items-start mb-8">
                <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm ${article.type === 'pillar' ? 'bg-bg-primary text-accent-gold' : 'bg-bg-dark text-text-primary'}`}>
                  {article.pill}
                </span>
                <div className="text-text-muted group-hover:text-accent-gold transition-colors">{article.icon}</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-text-primary transition-colors">{article.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">{article.desc}</p>
              <div className="flex items-center gap-2 text-accent-gold font-bold text-xs tracking-widest uppercase">
                Read Chapter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
          
          <div className="bg-bg-card p-10 border border-border opacity-50 relative overflow-hidden flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm bg-bg-primary text-text-muted">
                COMING SOON
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 mt-8">Scaling to $50M with Layer 04</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The operational framework for using autonomous reporting to drive high-growth founder exits.</p>
            </div>
            <div className="mt-8 text-text-muted font-bold text-xs tracking-widest uppercase">
              Locked
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const WikiArticle = ({ id, onBack }: { id: string; onBack: () => void }) => {
  const content: Record<string, any> = {
    'voice-ai-for-founder-led-sales-orchestration': {
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Voice AI for Founder-Led Sales Orchestration',
      lede: 'A premium operating brief for founders building durable AI leverage.',
      sections: [
        {
          type: 'text',
          content: 'Voice AI for Founder-Led Sales Orchestration is becoming the control layer for founders who need board-level clarity without adding management drag.'
        },
        {
          type: 'text',
          content: 'In a $5M–$50M company, the failure mode is rarely effort. It is fragmented decisions across revenue, hiring, delivery, and finance. A premium AI system should tighten feedback loops, expose constraint metrics, and reduce time-to-decision from days to minutes.'
        },
        {
          type: 'text',
          content: 'The winning pattern is technical but practical: event-level data pipelines, role-aware copilots, and operating rituals that force weekly execution discipline. Founders do not need more dashboards. They need an execution membrane that converts signal into accountable action.'
        },
        {
          type: 'text',
          content: 'If you architect this correctly, you get compounding leverage: fewer status meetings, faster margin correction, and cleaner diligence readiness when capital or acquisition conversations start.'
        },
        {
          type: 'text',
          content: 'Start with the architecture model in [What is an AI Operating System (AI OS)?](/wiki/what-is-an-ai-os) to define system boundaries.'
        },
        {
          type: 'text',
          content: "Then run the baseline assessment from [The CEO's Guide to AI Audits](/wiki/ceos-guide-to-ai-audits) to quantify your first 90-day automation targets."
        }
      ]
    },
    'agentic-fp-a-for-weekly-cashflow-command': {
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Agentic FP&A for Weekly Cashflow Command',
      lede: 'A premium operating brief for founders building durable AI leverage.',
      sections: [
        {
          type: 'text',
          content: 'Agentic FP&A for Weekly Cashflow Command is becoming the control layer for founders who need board-level clarity without adding management drag.'
        },
        {
          type: 'text',
          content: 'In a $5M–$50M company, the failure mode is rarely effort. It is fragmented decisions across revenue, hiring, delivery, and finance. A premium AI system should tighten feedback loops, expose constraint metrics, and reduce time-to-decision from days to minutes.'
        },
        {
          type: 'text',
          content: 'The winning pattern is technical but practical: event-level data pipelines, role-aware copilots, and operating rituals that force weekly execution discipline. Founders do not need more dashboards. They need an execution membrane that converts signal into accountable action.'
        },
        {
          type: 'text',
          content: 'If you architect this correctly, you get compounding leverage: fewer status meetings, faster margin correction, and cleaner diligence readiness when capital or acquisition conversations start.'
        },
        {
          type: 'text',
          content: 'Start with the architecture model in [What is an AI Operating System (AI OS)?](/wiki/what-is-an-ai-os) to define system boundaries.'
        },
        {
          type: 'text',
          content: "Then run the baseline assessment from [The CEO's Guide to AI Audits](/wiki/ceos-guide-to-ai-audits) to quantify your first 90-day automation targets."
        }
      ]
    },
    'private-llm-stack-for-regulated-mid-market-teams': {
      pill: 'FOUNDERS PLAYBOOK',
      title: 'Private LLM Stack for Regulated Mid-Market Teams',
      lede: 'A premium operating brief for founders building durable AI leverage.',
      sections: [
        {
          type: 'text',
          content: 'Private LLM Stack for Regulated Mid-Market Teams is becoming the control layer for founders who need board-level clarity without adding management drag.'
        },
        {
          type: 'text',
          content: 'In a $5M–$50M company, the failure mode is rarely effort. It is fragmented decisions across revenue, hiring, delivery, and finance. A premium AI system should tighten feedback loops, expose constraint metrics, and reduce time-to-decision from days to minutes.'
        },
        {
          type: 'text',
          content: 'The winning pattern is technical but practical: event-level data pipelines, role-aware copilots, and operating rituals that force weekly execution discipline. Founders do not need more dashboards. They need an execution membrane that converts signal into accountable action.'
        },
        {
          type: 'text',
          content: 'If you architect this correctly, you get compounding leverage: fewer status meetings, faster margin correction, and cleaner diligence readiness when capital or acquisition conversations start.'
        },
        {
          type: 'text',
          content: 'Start with the architecture model in [What is an AI Operating System (AI OS)?](/wiki/what-is-an-ai-os) to define system boundaries.'
        },
        {
          type: 'text',
          content: "Then run the baseline assessment from [The CEO's Guide to AI Audits](/wiki/ceos-guide-to-ai-audits) to quantify your first 90-day automation targets."
        }
      ]
    },
    'ai-revenue-ops-command-centers': {
      pill: 'FOUNDERS PLAYBOOK',
      title: 'AI Revenue Ops Command Centers',
      lede: 'A premium operating brief for founders building durable AI leverage.',
      sections: [
        {
          type: 'text',
          content: 'AI Revenue Ops Command Centers is becoming the control layer for founders who need board-level clarity without adding management drag.'
        },
        {
          type: 'text',
          content: 'In a $5M–$50M company, the failure mode is rarely effort. It is fragmented decisions across revenue, hiring, delivery, and finance. A premium AI system should tighten feedback loops, expose constraint metrics, and reduce time-to-decision from days to minutes.'
        },
        {
          type: 'text',
          content: 'The winning pattern is technical but practical: event-level data pipelines, role-aware copilots, and operating rituals that force weekly execution discipline. Founders do not need more dashboards. They need an execution membrane that converts signal into accountable action.'
        },
        {
          type: 'text',
          content: 'If you architect this correctly, you get compounding leverage: fewer status meetings, faster margin correction, and cleaner diligence readiness when capital or acquisition conversations start.'
        },
        {
          type: 'text',
          content: 'Start with the architecture model in [What is an AI Operating System (AI OS)?](/wiki/what-is-an-ai-os) to define system boundaries.'
        },
        {
          type: 'text',
          content: "Then run the baseline assessment from [The CEO's Guide to AI Audits](/wiki/ceos-guide-to-ai-audits) to quantify your first 90-day automation targets."
        }
      ]
    },
    'vertical-ai-agents-for-m-a-due-diligence': {
      pill: 'TECHNICAL BRIEF',
      title: 'Vertical AI Agents for M&A Due Diligence',
      lede: 'How vertical AI agents are collapsing the due diligence timeline from weeks to hours.',
      sections: [
        {
                "type": "text",
                "content": "How vertical AI agents are collapsing the due diligence timeline from weeks to hours by automating the technical and financial audit layers."
        },
        {
                "type": "text",
                "content": "For founders of $10M\u2013$50M companies, the M&A process is often the most significant bottleneck in their career. Traditional due diligence relies on manual reviews of thousands of documents\u2014a process that is slow, expensive, and prone to human error."
        },
        {
                "type": "text",
                "content": "Vertical agents don't just search; they synthesize. They map codebases to technical debt, verify revenue recognition against contracts, and flag operational risks before the first LOI is even signed."
        },
        {
                "type": "text",
                "content": "This is a core component of the [AI Operating System](/wiki/what-is-an-ai-os)."
        },
        {
                "type": "text",
                "content": "Before implementing this, see the [CEO's Guide to AI Audits](/wiki/ceos-guide-to-ai-audits)."
        }
]
    },
    'what-is-an-ai-os': {
      pill: 'PILLAR 01',
      title: 'What is an AI Operating System (AI OS)?',
      lede: 'The difference between 100 tools and one integrated system that removes the founder as the bottleneck.',
      sections: [
        {
          type: 'text',
          content: 'When founders of $5M–$50M companies hear "AI," they often think of ChatGPT, Zapier, or a new piece of software. They buy a tool to solve a specific problem, and then another, and then another.'
        },
        {
          type: 'text',
          content: 'The result? A fragmented stack of software that requires more people to manage, not fewer. An AI Operating System (AI OS) is the infrastructure that connects your team, your data, and your decisions into a single, automated layer.'
        },
        {
          type: 'callout',
          title: 'Layer 01 — COMMAND',
          content: 'The Brain: A central source of truth. Every KPI, team performance metric, and system status is visible in one dashboard. You stop chasing updates and start making decisions based on data, not hope.'
        },
        {
          type: 'callout',
          title: 'Layer 02 — AUTOMATION',
          content: 'The Engine: Work that runs without you. Approvals, reporting, client follow-ups, and scheduling are automated and auditable. We remove the manual handoffs that slow down growth.'
        }
      ]
    },
    'ceos-guide-to-ai-audits': {
      pill: 'PILLAR 02',
      title: "The CEO's Guide to AI Audits",
      lede: 'How to map exactly where your hours are bleeding and identify high-ROI automation opportunities.',
      sections: [
        {
          type: 'text',
          content: 'Most founders doing $10M–$20M a year know they have an efficiency problem. They feel it in the 14-hour workdays, the declining margins, and the constant "check-ins" from staff.'
        },
        {
          type: 'text',
          content: 'AI doesn\'t solve problems; systems do. And before you can build a system, you must conduct an Audit. Specifically, where is the most expensive time in your business being spent?'
        },
        {
          type: 'callout',
          title: 'The 70/30 Rule',
          content: 'In a typical $12M service or logistics company, 30% of all staff time is spent on tasks that are 100% automatable today. This is the "AI Gap."'
        }
      ]
    },
    'case-study-logistics-ai': {
      pill: 'CASE STUDY',
      title: '$214,000 Saved for a $12M Logistics Firm',
      lede: 'How an AI Operating System replaced manual bottlenecks and freed the CEO from the day-to-day operations.',
      sections: [
        {
          type: 'text',
          content: 'The CEO of a $12M logistics firm was working 60-hour weeks. Most of that time was spent reviewing reports, approving invoices, and chasing updates from his team of 25.'
        },
        {
          type: 'text',
          content: 'We architected a custom dashboard (Layer 01) that pulled data automatically from their fleet tracking and CRM software. JD now spends 4 hours a week on operations instead of 40.'
        }
      ]
    }
  };

  const article = content[id] || content['what-is-an-ai-os'];

  return (
    <div className="pt-32 pb-20 selection:bg-accent-gold selection:text-bg-primary min-h-screen">
      <div className="container-inner max-w-3xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-accent-gold font-bold text-[10px] tracking-widest uppercase mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={14} /> Back to Playbook
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[11px] font-medium tracking-[0.3em] text-accent-gold uppercase mb-6 block">{article.pill}</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">{article.title}</h1>
          <p className="text-xl text-text-primary/90 font-medium leading-relaxed mb-12 border-l-2 border-accent-gold/30 pl-8">
            {article.lede}
          </p>

          <div className="space-y-8 text-text-secondary text-lg leading-relaxed">
            {article.sections.map((section: any, i: number) => (
              section.type === 'text' ? (
                <p key={i}>{section.content}</p>
              ) : (
                <div key={i} className="bg-bg-card p-8 border border-border/50 rounded-sm">
                  <h3 className="text-accent-gold font-bold text-sm tracking-widest uppercase mb-4">{section.title}</h3>
                  <p className="text-text-primary text-base">{section.content}</p>
                </div>
              )
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-border flex flex-col items-center text-center">
            <h2 className="text-2xl font-serif font-bold mb-4 text-text-primary">Ready to close the gap?</h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm">Schedule a 30-minute strategy call. We'll show you exactly where AI can cut your overhead.</p>
            <button 
              onClick={() => {
                onBack();
                setTimeout(() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="px-8 py-4 bg-accent-gold text-bg-primary font-bold tracking-widest hover:bg-accent-gold-light transition-all duration-300 shadow-lg"
            >
              BOOK STRATEGY CALL
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
