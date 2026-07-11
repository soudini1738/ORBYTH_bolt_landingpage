import { useEffect, useState, useRef } from 'react';
import { useInView } from './hooks/useInView';

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconFlow() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="12" cy="20" r="8" stroke="#7A6B47" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="20" r="8" stroke="#D1C4A9" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="8" stroke="#7A6B47" strokeWidth="1.5" fill="rgba(209,196,169,0.25)" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="#7A6B47" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="20" x2="20" y2="10" stroke="#7A6B47" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="28" y2="24" stroke="#D1C4A9" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="#7A6B47" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="9" y="6" width="22" height="28" rx="2" stroke="#7A6B47" strokeWidth="1.5" fill="none" />
      <line x1="14" y1="15" x2="26" y2="15" stroke="#D1C4A9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="26" y2="21" stroke="#D1C4A9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="27" x2="20" y2="27" stroke="#7A6B47" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────

function Kicker({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs tracking-widest uppercase font-medium text-bronze mb-4"
      style={{ letterSpacing: '0.18em' }}>
      {children}
    </span>
  );
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  as?: keyof JSX.IntrinsicElements;
}

function AnimatedSection({ children, className = '', delay = '', as: Tag = 'div' }: AnimatedSectionProps) {
  const { ref, inView } = useInView(0.12);
  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} ${delay} ${className}`}
    >
      {children}
    </Tag>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-serif text-bronze text-xl md:text-2xl tracking-wide font-semibold"
          style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}>
          Orbyth
        </a>
        <a
          href="#audit"
          className="text-sm font-medium border border-bronze text-bronze px-5 py-2.5 rounded-sm hover:bg-bronze hover:text-paper transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bronze"
        >
          Talk To ORBYTH
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-paper grid-texture" aria-label="Hero">
      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(252,251,248,0.7) 100%)' }} />

      <div className="relative max-w-content mx-auto px-6 md:px-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl">
          <AnimatedSection>
            <Kicker>AI Automation for Operational Teams</Kicker>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-1">
            <h1 className="font-serif text-ink leading-tight mb-8"
              style={{ fontSize: 'clamp(42px, 6vw, 76px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Your team is capable. Your systems are slowing them down.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-2">
            <p className="text-stone max-w-[600px] mb-12 leading-relaxed"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: '1.7' }}>
              Most businesses don't have an AI problem. They have a process problem. We build practical automation
              systems that remove the manual work, connect the disconnected, and give your team time back — without
              disrupting what already works.
            </p>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-3">
            <a
              href="#audit"
              className="inline-block bg-bronze text-paper text-sm font-medium px-8 py-4 rounded-sm hover:bg-bronze-dark transition-colors duration-200 tracking-wide"
            >
              Talk To ORBYTH
            </a>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold opacity-60" />
    </section>
  );
}

// ── Who This Is For ───────────────────────────────────────────────────────────

function WhoFor() {
  const fits = [
    'You run a logistics, transport, or operations-heavy business',
    'You\'re a founder or operator who wants clarity before committing to anything',
    'You have manual processes that feel like they should already be automated',
    'You\'re curious about AI but skeptical of vendor promises',
    'You want a second opinion on where automation actually makes sense in your business',
  ];

  const notFits = [
    'You\'re looking for a quick fix or a magic button',
    'You\'re running a hobby project or early-stage experiment with no real workflows yet',
    'You want a tool recommendation without understanding your own process first',
    'You need something built and deployed tomorrow',
  ];

  return (
    <section className="py-28 md:py-36 bg-paper" aria-labelledby="who-heading">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <AnimatedSection className="mb-16">
          <Kicker>A Good Fit</Kicker>
          <h2 id="who-heading" className="font-serif text-ink"
            style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: '1.2', letterSpacing: '-0.015em' }}>
            Built for operators, not experimenters.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Is for */}
          <AnimatedSection delay="fade-up-delay-1">
            <div className="rounded-sm p-8 md:p-10 h-full"
              style={{ backgroundColor: 'rgba(209,196,169,0.15)', border: '1px solid rgba(209,196,169,0.5)' }}>
              <h3 className="font-serif text-ink text-lg mb-6 font-medium">This is for you if:</h3>
              <ul className="space-y-4" role="list">
                {fits.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-bronze" aria-hidden="true" />
                    <span className="text-stone leading-relaxed text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Right: Not for */}
          <AnimatedSection delay="fade-up-delay-2">
            <div className="rounded-sm p-8 md:p-10 h-full"
              style={{ backgroundColor: 'rgba(252,251,248,0.8)', border: '1px solid rgba(209,196,169,0.3)' }}>
              <h3 className="font-serif text-ink text-lg mb-6 font-medium">This probably isn't for you if:</h3>
              <ul className="space-y-4" role="list">
                {notFits.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 flex-shrink-0 text-stone text-sm leading-none font-light" aria-hidden="true">—</span>
                    <span className="text-stone leading-relaxed text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Understand the current systems',
    body: 'We start by listening. We map how your team works today — the tools, the handoffs, the workarounds — before suggesting anything.',
  },
  {
    number: '02',
    title: 'Identify bottlenecks and waste',
    body: 'We look for the friction: the tasks that repeat, the steps that break, the time that disappears. We name them clearly.',
  },
  {
    number: '03',
    title: 'Design practical systems and automations',
    body: 'We propose solutions that fit your actual environment — not theoretical best practices. Everything is explained in plain language.',
  },
  {
    number: '04',
    title: 'Decide together what makes sense',
    body: 'You stay in control. We present options, explain trade-offs, and move only when you\'re confident. No pressure, no lock-in.',
  },
];

function HowItWorks() {
  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: 'rgba(209,196,169,0.08)' }} aria-labelledby="process-heading">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <AnimatedSection className="mb-6">
          <Kicker>The Process</Kicker>
          <h2 id="process-heading" className="font-serif text-ink mb-4"
            style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: '1.2', letterSpacing: '-0.015em' }}>
            Straightforward from the first conversation.
          </h2>
        </AnimatedSection>
        <AnimatedSection delay="fade-up-delay-1" className="mb-16 md:mb-20">
          <p className="text-stone max-w-xl leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: '1.75' }}>
            No jargon. No black boxes. Just a clear look at how your business actually runs — and where automation can help.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const delays = ['', 'fade-up-delay-1', 'fade-up-delay-2', 'fade-up-delay-3'];
            return (
              <AnimatedSection key={step.number} delay={delays[i]}>
                <div className="bg-paper rounded-sm p-8 md:p-10 h-full"
                  style={{ border: '1px solid rgba(209,196,169,0.45)' }}>
                  <span className="font-serif text-bronze font-semibold text-3xl mb-5 block"
                    style={{ letterSpacing: '-0.02em' }}>
                    {step.number}
                  </span>
                  <h3 className="font-serif text-ink text-xl mb-4 font-medium leading-snug">{step.title}</h3>
                  <p className="text-stone leading-relaxed text-[15px]">{step.body}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Credibility ───────────────────────────────────────────────────────────────

const signals = [
  {
    icon: <IconFlow />,
    label: 'Automations in Production',
    text: 'Systems we\'ve designed are running in live business environments — handling real volume, real data, real decisions.',
  },
  {
    icon: <IconClock />,
    label: 'Time Returned to Teams',
    text: 'The measure of good automation isn\'t complexity — it\'s how many hours your team gets back each week to focus on work that matters.',
  },
  {
    icon: <IconDoc />,
    label: 'Clarity Before Commitment',
    text: 'Every engagement starts with a free audit. You\'ll have a clear picture of your options before any decision is made.',
  },
];

function Credibility() {
  return (
    <section className="py-28 md:py-36 bg-paper" aria-labelledby="credibility-heading">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <AnimatedSection className="mb-16 md:mb-20">
          <Kicker>Why It Works</Kicker>
          <h2 id="credibility-heading" className="font-serif text-ink"
            style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: '1.2', letterSpacing: '-0.015em' }}>
            Trust built through process, not promises.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {signals.map((sig, i) => {
            const delays = ['', 'fade-up-delay-1', 'fade-up-delay-2'];
            return (
              <AnimatedSection key={sig.label} delay={delays[i]}>
                <div className="rounded-sm p-8 md:p-10 h-full"
                  style={{ backgroundColor: 'rgba(209,196,169,0.12)', border: '1px solid rgba(209,196,169,0.45)' }}>
                  <div className="mb-6">{sig.icon}</div>
                  <h3 className="font-serif text-ink text-lg mb-3 font-medium leading-snug">{sig.label}</h3>
                  <p className="text-stone text-[15px] leading-relaxed">{sig.text}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Free Audit ────────────────────────────────────────────────────────────────

const auditBullets = [
  'A map of your current workflow friction points',
  'An honest assessment of where automation adds real value',
  'Specific opportunities ranked by effort and impact',
  'No sales pitch — just a clear, useful conversation',
];

function FreeAudit() {
  return (
    <section
      id="audit"
      className="py-28 md:py-36"
      style={{ backgroundColor: 'rgba(209,196,169,0.1)' }}
      aria-labelledby="audit-heading"
    >
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <AnimatedSection className="mb-8">
            <Kicker>Start Here</Kicker>
            <h2 id="audit-heading" className="font-serif text-ink"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
              Book a free workflow audit.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-1" className="mb-10">
            <p className="text-stone leading-relaxed mb-5"
              style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: '1.8' }}>
              In a single conversation, we review how your business currently operates — your workflows, your tools,
              your team's time. We identify where automation is realistic, where it isn't, and what the actual
              opportunity looks like for your specific situation.
            </p>
            <p className="text-stone leading-relaxed"
              style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: '1.8' }}>
              You'll leave with a clear picture of what's possible. Whether or not we work together after that is
              entirely up to you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-2" className="mb-10">
            <h3 className="font-serif text-ink text-lg mb-5 font-medium">What you get from the audit:</h3>
            <ul className="space-y-3" role="list">
              {auditBullets.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-bronze" aria-hidden="true" />
                  <span className="text-stone leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay="fade-up-delay-3">
            <a
              href="mailto:hello@orbyth.com"
              className="inline-block bg-bronze text-paper text-sm font-medium px-8 py-4 rounded-sm hover:bg-bronze-dark transition-colors duration-200 tracking-wide"
            >
              Book Your Free Audit
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ── What Happens Next ─────────────────────────────────────────────────────────

const nextSteps = [
  {
    n: '1',
    title: 'A short intro call',
    body: 'We schedule a 30-minute call at a time that works for you. No preparation needed.',
  },
  {
    n: '2',
    title: 'We listen first',
    body: 'We ask about your business, your team, and the problems you\'re trying to solve. No pitch, no agenda.',
  },
  {
    n: '3',
    title: 'You receive clear recommendations',
    body: 'Within a few days, we share a written summary of what we found and what we\'d suggest — in plain language.',
  },
  {
    n: '4',
    title: 'You decide what to do next',
    body: 'There\'s no obligation. You can take the recommendations and act on them yourself, or we can talk about working together. Either way is fine.',
  },
];

function WhatNext() {
  return (
    <section className="py-28 md:py-36 bg-paper" aria-labelledby="next-heading">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <AnimatedSection className="mb-16">
          <Kicker>After You Reach Out</Kicker>
          <h2 id="next-heading" className="font-serif text-ink"
            style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: '1.2', letterSpacing: '-0.015em' }}>
            Here's exactly what to expect.
          </h2>
        </AnimatedSection>

        <div className="space-y-6 max-w-2xl">
          {nextSteps.map((step, i) => {
            const delays = ['', 'fade-up-delay-1', 'fade-up-delay-2', 'fade-up-delay-3'];
            return (
              <AnimatedSection key={step.n} delay={delays[i]}>
                <div className="flex gap-6 md:gap-8 items-start py-6"
                  style={{ borderBottom: i < nextSteps.length - 1 ? '1px solid rgba(209,196,169,0.5)' : 'none' }}>
                  <span className="font-serif text-bronze font-semibold text-4xl flex-shrink-0 w-8 leading-none mt-1"
                    style={{ letterSpacing: '-0.03em' }}>
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-ink text-xl mb-2 font-medium">{step.title}</h3>
                    <p className="text-stone leading-relaxed text-[15px]">{step.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="py-28 md:py-36 grid-texture relative overflow-hidden"
      style={{ backgroundColor: 'rgba(209,196,169,0.13)' }}
      aria-labelledby="cta-heading">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(252,251,248,0.4) 0%, transparent 100%)' }} />
      <div className="relative max-w-content mx-auto px-6 md:px-10 text-center">
        <AnimatedSection className="mb-6">
          <h2 id="cta-heading" className="font-serif text-ink mx-auto"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: '1.2', letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Ready to see what's possible?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay="fade-up-delay-1" className="mb-10">
          <p className="text-stone mx-auto max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: '1.75' }}>
            Start with a free audit. No commitment, no pressure — just a clear conversation about your business.
          </p>
        </AnimatedSection>
        <AnimatedSection delay="fade-up-delay-2">
          <a
            href="mailto:hello@orbyth.com"
            className="inline-block bg-bronze text-paper text-sm font-medium px-10 py-4 rounded-sm hover:bg-bronze-dark transition-colors duration-200 tracking-wide"
          >
            Talk To ORBYTH
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-paper py-12 md:py-16" style={{ borderTop: '1px solid rgba(209,196,169,0.5)' }}>
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="font-serif text-bronze text-xl font-semibold"
              style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}>
              Orbyth
            </span>
            <p className="text-stone text-sm mt-1 leading-relaxed">
              Practical AI systems for operational businesses.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <a
              href="mailto:hello@orbyth.com"
              className="text-bronze text-sm hover:text-bronze-dark transition-colors duration-200 underline underline-offset-4 decoration-bronze/40"
            >
              hello@orbyth.com
            </a>
            <p className="text-stone text-xs">© 2025 ORBYTH. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoFor />
        <HowItWorks />
        <Credibility />
        <FreeAudit />
        <WhatNext />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
