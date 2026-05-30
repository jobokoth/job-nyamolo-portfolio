const { useState, useEffect, useLayoutEffect, useRef } = React;

// ============================================================
// DATA
// ============================================================

const PROFILE = {
  name: 'Job Nyamolo',
  role: 'Senior Software Engineer & Technical Consultant',
  location: 'Nairobi, Kenya',
  email: 'jobnyamolo@gmail.com',
  phone: '+254 796 152 345',
  github: 'https://github.com/jobokoth',
  linkedin: 'https://linkedin.com/in/jobokoth',
  twitter: 'https://twitter.com/jobnyamolo',
  twitterHandle: '@jobnyamolo',
};

const CASE_STUDIES = [
  {
    id: 'blueflag',
    title: 'Blueflag Digital',
    org: 'Blueflag Digital · Founder & Principal Engineer',
    period: 'Feb 2026 — Present',
    status: 'Current',
    problem:
      'Businesses across healthcare, fintech and media need senior engineering they can trust — systems designed right the first time, delivered fast, without the overhead of a large agency.',
    solution:
      'Founded Blueflag Digital to deliver senior software engineering and technical consulting. I architect and build PHP/Laravel systems end-to-end, pairing 20+ years of delivery experience with AI-augmented development (Claude Code and LLM-assisted workflows) to ship faster without cutting corners on quality or security.',
    role: 'Founder & Principal Engineer — architecture, delivery, client consulting.',
    stack: ['PHP', 'Laravel', 'MySQL', 'AWS', 'Claude Code', 'REST APIs'],
    outcomes: [
      'AI-augmented delivery for faster, higher-quality builds',
      'End-to-end ownership from requirements through deployment',
      'Senior engineering for healthcare, fintech and media clients',
    ],
  },
  {
    id: 'afya',
    title: 'Afya Analytics HMIS',
    org: 'Afya Analytics · Lead Developer',
    period: 'Oct 2025 — Feb 2026',
    status: 'Shipped',
    problem:
      'Healthcare providers in the region needed a modern, configurable Hospital Management Information System that could be deployed across facilities of varying sizes while keeping data sovereignty intact.',
    solution:
      'Leading a small team building HMIS modules and adjacent systems. Setting architecture, code review standards, and the release process. Pairing day-to-day on the harder modules so the design choices stay grounded in real implementation.',
    role: 'Lead Developer — architecture, team mentorship, hands-on backend.',
    stack: ['PHP', 'Laravel 12', 'MySQL', 'REST APIs', 'AWS'],
    outcomes: [
      'Owning the technical direction and team cadence',
      'Established code review + GitHub Actions CI baseline',
      'Hands-on contributor on core modules',
    ],
  },
  {
    id: 'stanbic',
    title: 'Stanbic Bank — Internal Systems & DevOps',
    org: 'Stanbic Bank Kenya Ltd · Software Engineer',
    period: 'Feb 2023 — Sep 2025',
    status: 'Shipped',
    problem:
      'Bank software releases were slow and manual, with regulatory and security overhead that made every deploy a multi-day event. Internal systems also needed continuous upgrades to meet compliance and user expectations.',
    solution:
      'Part of the core team that designed and rolled out modern DevOps processes — branching strategy, automated pipelines, environment promotion — for the bank\'s software solutions. Concurrently developed and upgraded multiple internal systems used across the organisation.',
    role: 'Software Engineer — DevOps tooling, internal systems development.',
    stack: ['PHP', 'Laravel', 'MySQL', 'GitHub Actions', 'GitLab', 'Linux'],
    outcomes: [
      'Reduced deploy friction across multiple internal applications',
      'Standardised branching + release workflow across teams',
      'Shipped upgrades to several long-running internal systems',
    ],
  },
  {
    id: 'viusasa',
    title: 'Viusasa 2.0',
    org: 'Content Aggregation Limited · Systems Developer',
    period: 'Feb 2020 — Jan 2023',
    status: 'Shipped',
    problem:
      'Kenya needed a homegrown video-on-demand platform that could deliver local content reliably and securely to millions of users on inconsistent network conditions, with a CMS the editorial team could actually use.',
    solution:
      'Part of the core team that conceptualised, designed, developed, tested and launched Viusasa 2.0. Built backend services in core PHP + Laravel, designed the database schema, implemented auth and security structures, and wrote the SQL that powered reporting and daily maintenance. Collaborated with stakeholders to define requirements and with third-party vendors on integrations.',
    role: 'Systems Developer — backend, database design, security, reporting.',
    stack: ['Core PHP', 'Laravel', 'MySQL', 'HTML/CSS', 'Bootstrap'],
    outcomes: [
      '3.5M+ users on Kenya\'s most popular VOD platform',
      'Designed + documented the database backing the platform',
      'Optimised queries to keep performance steady at scale',
      'Authored technical manuals used by IT for ongoing maintenance',
    ],
  },
  {
    id: 'collabmed',
    title: 'Collabmed HMIS',
    org: 'Collabmed Solutions Ltd · Systems Developer & Consultant',
    period: 'Nov 2015 — May 2018',
    status: 'Shipped',
    problem:
      'Multiple hospitals needed a unified, web-based hospital management information system that could scale to over 100,000 users while supporting clinical, billing, and administrative workflows.',
    solution:
      'Led a team of developers building a large-scale web-based HMIS on a custom PHP framework. Owned system testing and deployment across multiple hospital sites. Coordinated requirements with clinical and admin stakeholders on the ground.',
    role: 'Team Lead — developer mentorship, system testing, deployment.',
    stack: ['Custom PHP Framework', 'MySQL', 'JavaScript', 'HTML/CSS'],
    outcomes: [
      '100,000+ users across multiple hospitals',
      'Multi-site deployments with site-specific configuration',
      'Led developer team through the full delivery lifecycle',
    ],
  },
];

const ARCHIVE = [
  { name: 'brianjakememorialhosp.org', url: 'https://brianjakememorialhosp.org/', type: 'Healthcare' },
  { name: 'disruptivehq.com', url: 'https://www.disruptivehq.com/', type: 'Corporate' },
  { name: 'blueflag.digital', url: 'https://www.blueflag.digital/', type: 'Agency' },
  { name: 'grayiq.net', url: 'https://grayiq.net/', type: 'SaaS' },
  { name: 'niahealthcare.co.ke', url: 'https://niahealthcare.co.ke/', type: 'Healthcare' },
  { name: 'isols.io', url: 'https://www.isols.io/', type: 'SaaS' },
  { name: 'private-schools.co.ke', url: 'https://www.private-schools.co.ke/', type: 'Directory' },
  { name: 'milestonebadge.co.ke', url: 'https://www.milestonebadge.co.ke/', type: 'eCommerce' },
  { name: 'watchiepro.com', url: 'https://www.watchiepro.com/', type: 'Product' },
  { name: 'feedback-app.blueflag.digital', url: 'https://feedback-app.blueflag.digital', type: 'Web App' },
  { name: 'cakeaholic.co.ke', url: 'https://www.cakeaholic.co.ke/', type: 'eCommerce' },
  { name: 'favourmedicalservices.com', url: 'https://favourmedicalservices.com/version2', type: 'Healthcare' },
  { name: 'oakmont.co.ke', url: 'https://www.oakmont.co.ke/', type: 'Corporate' },
  { name: 'nurseprep360.com', url: 'https://www.nurseprep360.com', type: 'eLearning' },
];

// ============================================================
// COMPONENTS
// ============================================================

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-prompt mono" data-animate>
          $ whoami<span className="caret"></span>
        </div>
        <h1 data-animate data-delay="1">
          Job Nyamolo.<br />
          <span className="accent">Senior dev</span> who<br />
          ships systems that scale.
        </h1>
        <div className="hero-role" data-animate data-delay="2">// Senior Software Engineer · Technical Consultant · Nairobi, KE</div>
        <p className="hero-pitch" data-animate data-delay="3">
          20+ years building <strong>PHP/Laravel</strong> web systems —
          from a video platform with <strong>3.5M users</strong> to a hospital
          information system running across <strong>multiple facilities</strong> for 100k+ staff.
          Today I pair that experience with <strong>AI-augmented development</strong> to ship
          faster, lead small teams, and write the SQL nobody else wants to.
        </p>
        <div className="hero-cta" data-animate data-delay="4">
          <a className="btn btn-primary" href="#work">
            View work <span aria-hidden="true">→</span>
          </a>
          <a className="btn" href="Job_Nyamolo_Resume.pdf" download="Job_Nyamolo_Resume.pdf">
            <span aria-hidden="true">↓</span> Download résumé
          </a>
          <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-meta" data-animate data-delay="5">
          <div className="hero-meta-item">
            <span className="k">// status</span>
            <span className="v green">● Open to remote opportunities</span>
          </div>
          <div className="hero-meta-item">
            <span className="k">// based_in</span>
            <span className="v">Nairobi, Kenya</span>
          </div>
          <div className="hero-meta-item">
            <span className="k">// shipping_since</span>
            <span className="v">2005</span>
          </div>
          <div className="hero-meta-item">
            <span className="k">// stack</span>
            <span className="v">PHP · Laravel · MySQL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> about
        </div>
        <h2 className="section-title" data-animate data-delay="1">A developer who's been around long enough to know what to skip.</h2>
        <div className="about-grid" data-animate data-delay="2">
          <div className="about-text">
            <p>
              I'm a web and systems developer who's spent the last <strong>20+ years</strong> building
              software that real businesses depend on — hospital information systems,
              retail management, video-on-demand, banking internals.
            </p>
            <p>
              I'm strongest in <strong>core PHP and Laravel</strong>, fluent in MySQL,
              and comfortable owning everything from gathering requirements through
              UAT and end-user training. I've led small teams and been an individual
              contributor; both work, and I'm happy in either mode.
            </p>
            <p>
              I'm a good time keeper, I show up to meetings with suggestions instead
              of just opinions, and I leverage past lessons to inform future decisions —
              which is corporate-speak for "I've seen this pattern before and here's
              what bit us last time."
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="n">20+</div>
              <div className="l">Years shipping</div>
            </div>
            <div className="stat-card">
              <div className="n">3.5M</div>
              <div className="l">Users · Viusasa</div>
            </div>
            <div className="stat-card">
              <div className="n">100k+</div>
              <div className="l">Users · HMIS</div>
            </div>
            <div className="stat-card">
              <div className="n">10+</div>
              <div className="l">Teams led / contributed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> skills
        </div>
        <h2 className="section-title" data-animate data-delay="1">The toolkit.</h2>
        <div className="skills-block" data-animate data-delay="2">
          <div className="skills-header mono">
            <div className="skills-dots"><span></span><span></span><span></span></div>
            <span>skills.json</span>
            <span>{`{ }`}</span>
          </div>
          <pre className="skills-body" style={{margin: 0}}><code>
{`{`}<br />
<span className="indent"></span><span className="key">"languages"</span><span className="punct">: [</span><br />
<span className="indent"></span><span className="indent"></span><span className="str">"Core PHP"</span><span className="punct">,</span> <span className="str">"HTML"</span><span className="punct">,</span> <span className="str">"CSS"</span><span className="punct">,</span> <span className="str">"JavaScript"</span><span className="punct">,</span> <span className="str">"SQL"</span><span className="punct">,</span> <span className="str">"Perl"</span><br />
<span className="indent"></span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"frameworks"</span><span className="punct">: [</span><span className="str">"Laravel 6–12"</span><span className="punct">,</span> <span className="str">"Bootstrap"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"cms"</span><span className="punct">: [</span><span className="str">"WordPress (expert)"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"databases"</span><span className="punct">: [</span><span className="str">"MySQL"</span><span className="punct">,</span> <span className="str">"SQL"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"devops"</span><span className="punct">: [</span><span className="str">"GitHub Actions"</span><span className="punct">,</span> <span className="str">"GitLab"</span><span className="punct">,</span> <span className="str">"Git"</span><span className="punct">,</span> <span className="str">"Composer"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"cloud"</span><span className="punct">: [</span><span className="str">"AWS"</span><span className="punct">,</span> <span className="str">"Quick Sight"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="comment">// AI-augmented development — how I ship faster now</span><br />
<span className="indent"></span><span className="key">"ai"</span><span className="punct">: [</span><span className="str">"Claude Code"</span><span className="punct">,</span> <span className="str">"LLM-assisted workflows"</span><span className="punct">,</span> <span className="str">"AI pair programming"</span><span className="punct">,</span> <span className="str">"Prompt engineering"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"systems"</span><span className="punct">: [</span><span className="str">"Linux"</span><span className="punct">,</span> <span className="str">"WHM"</span><span className="punct">,</span> <span className="str">"cPanel"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"tooling"</span><span className="punct">: [</span><span className="str">"PhpStorm"</span><span className="punct">,</span> <span className="str">"Trello"</span><span className="punct">,</span> <span className="str">"Balsamic"</span><span className="punct">,</span> <span className="str">"REST APIs"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="key">"methods"</span><span className="punct">: [</span><span className="str">"Scrum"</span><span className="punct">,</span> <span className="str">"Agile"</span><span className="punct">,</span> <span className="str">"Requirements gathering"</span><span className="punct">,</span> <span className="str">"UAT"</span><span className="punct">],</span><br />
<span className="indent"></span><span className="comment">// soft skills — what teammates actually notice</span><br />
<span className="indent"></span><span className="key">"team"</span><span className="punct">: [</span><span className="str">"Team leadership"</span><span className="punct">,</span> <span className="str">"Communication"</span><span className="punct">,</span> <span className="str">"Mentorship"</span><span className="punct">,</span> <span className="str">"Time keeping"</span><span className="punct">]</span><br />
{`}`}
          </code></pre>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    id: 'build',
    title: 'Custom Web & Systems Development',
    body: 'End-to-end PHP/Laravel applications — hospital systems, fintech internals, content platforms. Architecture, build, testing and deployment, owned start to finish.',
  },
  {
    id: 'consult',
    title: 'Technical Consulting',
    body: 'Architecture reviews, database design, code-quality and DevOps audits. Senior judgment on the decisions that are expensive to get wrong.',
  },
  {
    id: 'ai',
    title: 'AI-Augmented Delivery',
    body: 'Pairing 20+ years of delivery experience with Claude Code and LLM-assisted workflows to ship faster — without trading away quality or security.',
  },
  {
    id: 'lead',
    title: 'Team Leadership & Mentorship',
    body: 'Leading small teams, setting code-review and release standards, and mentoring developers through the full delivery lifecycle.',
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> services
        </div>
        <h2 className="section-title" data-animate data-delay="1">How I can help.</h2>
        <div className="services-grid" data-animate data-delay="2">
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <h3>{s.title}</h3>
              <p className="muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ c }) {
  return (
    <article className="case" data-animate>
      <div className="case-head">
        <div className="case-head-l">
          <h3>{c.title}</h3>
          <div className="org">{c.org}</div>
        </div>
        <div className="case-head-r">
          <span>{c.period}</span>
          <span className="case-status">{c.status}</span>
        </div>
      </div>
      <div className="case-body">
        <div className="case-k">Problem</div>
        <div className="case-v muted">{c.problem}</div>

        <div className="case-k">Solution</div>
        <div className="case-v muted">{c.solution}</div>

        <div className="case-k">My role</div>
        <div className="case-v muted">{c.role}</div>

        <div className="case-k">Stack</div>
        <div className="case-v">
          <div className="case-stack">
            {c.stack.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>

        <div className="case-k">Outcomes</div>
        <div className="case-v">
          <ul className="case-outcomes">
            {c.outcomes.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> selected work
        </div>
        <h2 className="section-title" data-animate data-delay="1">Case studies.</h2>
        <div className="case-list">
          {CASE_STUDIES.map(c => <CaseStudy key={c.id} c={c} />)}
        </div>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section id="archive">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> live project archive
        </div>
        <h2 className="section-title" data-animate data-delay="1">Other things I've built that are still live.</h2>
        <div className="archive" data-animate data-delay="2">
          {ARCHIVE.map((p, i) => (
            <a key={p.url} className="archive-row" href={p.url} target="_blank" rel="noreferrer">
              <span className="archive-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="archive-name">{p.name}</span>
              <span className="archive-type">{p.type}</span>
              <span className="archive-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = '! name required';
    if (!form.email.trim()) e.email = '! email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '! invalid email';
    if (!form.message.trim()) e.message = '! message required';
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    // Open mailto AND show success — user picked "Both"
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Job,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    const mailto = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;

    // Open mail client in a new tab/window so the SPA stays put
    window.location.href = mailto;
    setSubmitted(true);
  }

  function reset() {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  }

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  }

  if (submitted) {
    return (
      <div className="form">
        <div className="form-success">
          <div className="check">✓</div>
          <h4>Mail client opened</h4>
          <p>Your message is queued in your mail app. If nothing opened, drop a line directly to <a href={`mailto:${PROFILE.email}`} style={{color: 'var(--accent)'}}>{PROFILE.email}</a>.</p>
          <button className="btn" style={{marginTop: 20}} onClick={reset}>Send another</button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label>name <span className="req">*</span></label>
        <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ada Lovelace" />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>
      <div className="field">
        <label>email <span className="req">*</span></label>
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="ada@example.com" />
        {errors.email && <div className="err">{errors.email}</div>}
      </div>
      <div className="field">
        <label>subject</label>
        <input value={form.subject} onChange={e => update('subject', e.target.value)} placeholder="Project inquiry" />
      </div>
      <div className="field">
        <label>message <span className="req">*</span></label>
        <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="What are you building?" rows={5} />
        {errors.message && <div className="err">{errors.message}</div>}
      </div>
      <div className="submit-row">
        <span className="form-note">// opens in your mail client</span>
        <button type="submit" className="btn btn-primary">
          Send <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-label mono" data-animate>
          <span className="slash">//</span> contact
        </div>
        <h2 className="section-title" data-animate data-delay="1">Let's talk.</h2>
        <div className="contact-grid" data-animate data-delay="2">
          <div className="contact-info">
            <p>
              Open to senior developer / team lead roles, contract work, and interesting
              systems problems — especially in healthcare, fintech, and media. I respond
              within a day.
            </p>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${PROFILE.email}`}>
                <span className="k">email →</span>
                <span className="v">{PROFILE.email}</span>
              </a>
              <a className="contact-link" href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>
                <span className="k">phone →</span>
                <span className="v">{PROFILE.phone}</span>
              </a>
              <a className="contact-link" href={PROFILE.github} target="_blank" rel="noreferrer">
                <span className="k">github →</span>
                <span className="v">github.com/jobokoth</span>
              </a>
              <a className="contact-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <span className="k">linkedin →</span>
                <span className="v">linkedin.com/in/jobokoth</span>
              </a>
              <a className="contact-link" href={PROFILE.twitter} target="_blank" rel="noreferrer">
                <span className="k">twitter →</span>
                <span className="v">{PROFILE.twitterHandle}</span>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <span>// © {new Date().getFullYear()} Job Nyamolo — built with HTML, CSS, a little React.</span>
          <span>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">github</a>
            {' · '}
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">linkedin</a>
            {' · '}
            <a href="Job_Nyamolo_Resume.pdf" download>résumé.pdf</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// TWEAKS
// ============================================================

const ACCENT_OPTIONS = [
  ['#16a34a', '#22c55e'], // green (default)
  ['#2563eb', '#3b82f6'], // blue
  ['#dc2626', '#ef4444'], // red
  ['#ea580c', '#f97316'], // orange
  ['#0c0a09', '#fafafa'], // mono
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentIdx": 0,
  "density": 1,
  "showStats": true
}/*EDITMODE-END*/;

function App() {
  const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakColor } = window;

  // Tweaks hook is optional — render works without it
  const [t, setTweak] = useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  useEffect(() => {
    const [light, dark] = ACCENT_OPTIONS[t.accentIdx] || ACCENT_OPTIONS[0];
    const root = document.documentElement;
    root.style.setProperty('--accent', light);
    // For dark theme, swap when [data-theme=dark]
    let darkStyle = document.getElementById('__dark-accent');
    if (!darkStyle) {
      darkStyle = document.createElement('style');
      darkStyle.id = '__dark-accent';
      document.head.appendChild(darkStyle);
    }
    darkStyle.textContent = `html[data-theme="dark"] { --accent: ${dark}; }`;
    root.style.setProperty('--density', String(t.density));
  }, [t.accentIdx, t.density]);

  // Runs synchronously before first paint — prevents blank flash for in-viewport elements
  useLayoutEffect(() => {
    const vh = window.innerHeight;
    document.querySelectorAll('[data-animate]').forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < vh && bottom > 0) el.classList.add('visible');
    });
  }, []);

  useEffect(() => {
    // Watch off-screen elements, animate when they scroll into view
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('[data-animate]:not(.visible)').forEach((el) =>
      animObserver.observe(el)
    );

    // Active nav section highlight
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    function updateActiveNav() {
      const scrollPos = window.scrollY + 80;
      let activeId = null;
      document.querySelectorAll('section[id]').forEach((s) => {
        if (s.offsetTop <= scrollPos) activeId = s.id;
      });
      navAnchors.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`);
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    return () => {
      animObserver.disconnect();
      window.removeEventListener('scroll', updateActiveNav);
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Work />
      <Archive />
      <Contact />
      <Footer />

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Theme">
            <TweakColor
              label="Accent color"
              value={t.accentIdx}
              options={ACCENT_OPTIONS.map(o => o[0])}
              onChange={v => setTweak('accentIdx', ACCENT_OPTIONS.findIndex(o => o[0] === v))}
            />
          </TweakSection>
          <TweakSection title="Layout">
            <TweakSlider
              label="Section density"
              value={t.density}
              min={0.6}
              max={1.3}
              step={0.05}
              onChange={v => setTweak('density', v)}
            />
          </TweakSection>
          <TweakSection title="Tips">
            <div style={{fontSize: 12, color: 'var(--fg-muted, #888)', fontFamily: 'var(--mono)'}}>
              // Use ◐ in the nav<br />// to toggle dark mode.
            </div>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
