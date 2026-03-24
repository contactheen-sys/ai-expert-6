import React, { useState, useEffect, useRef } from 'react';
import { Rocket, BarChart3, Target, Star, Linkedin, Mail, Menu, X, ArrowLeft, ArrowRight, Calendar, User, Clock, Zap, Phone, TrendingUp, ShieldCheck, ShoppingCart, Search, Megaphone, FileText, Filter, Quote, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'motion/react';

// --- Atmospheric Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = React.useState(false);
  const [cursorText, setCursorText] = React.useState('');

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .group, [data-cursor]');
      if (isInteractive) {
        setIsHovering(true);
        const text = (isInteractive as HTMLElement).getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Refined Single Ring Cursor */}
      <motion.div
        className="size-12 border border-pizza-accent/40 rounded-full fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden backdrop-blur-[2px]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(206, 83, 22, 0.08)' : 'rgba(206, 83, 22, 0.02)',
          borderColor: isHovering ? 'rgba(206, 83, 22, 0.6)' : 'rgba(206, 83, 22, 0.4)',
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-black uppercase tracking-widest text-pizza-accent"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const RevealText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Robert Portrait Component ---

const RobertPortrait = ({ className = "", grayscale = false }: { className?: string, grayscale?: boolean }) => {
  // Permanent, static professional portrait of Robert Mwila 
  // This is a high-quality 'twin' matching the reference (beard, blue blazer, CEO pose).
  const imageUrl = "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop";

  return (
    <div className={`relative overflow-hidden rounded-inherit ${className}`}>
      <img 
        src={imageUrl} 
        alt="Robert Mwila" 
        className={`w-full h-full object-cover ${grayscale ? 'grayscale hover:grayscale-0' : ''} transition-all duration-700`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// --- End Robert Portrait Component ---

type View = 'home' | 'blog' | 'post';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The SMEs Secret to Scale: What is BPO and Why is Everyone Talking About It?',
    excerpt: 'If you feel like you’re running a marathon while carrying a backpack full of bricks, you aren’t alone. Drop the weight and scale.',
    content: `
      > If you feel like you’re running a marathon while carrying a backpack full of bricks, you aren’t alone. In 2026, the "bricks" are the endless emails, the payroll spreadsheets, and the data entry that keep you from doing what you actually love.
      
      Successful business owners have a secret weapon to drop the weight: BPO.
      
      But what does that actually mean? Is it just for giant tech companies with thousand-person call centers? Not anymore. Let’s break down the most misunderstood term in business.
      
      ### 1. The Bakery Analogy: Why You’re Burned Out
      Think of it this way: Imagine you run a successful bakery. You are a master at baking—it’s your passion and why your customers love you. But lately, you’re spending 4 hours a day answering customer emails and another 2 hours struggling with payroll tax math. While you're at the computer, no one is at the oven.
      
      BPO (Business Process Outsourcing) is simply hiring a specialized company to handle the "paperwork" so you can get back to the "baking." It’s about delegating the tasks that are necessary but don't actually grow your brand.
      
      ### 2. The Three Buckets: It’s Not Just "Answering Phones"
      In 2026, BPO has evolved. It generally falls into three categories. Depending on your "headache," you might need one or all of them:
      
      **Front Office (The Voice):** These are the people who talk to your customers. It includes 24/7 Customer Support, Sales, and Tech Support.
      
      **Back Office (The Engine):** These are the people who keep the lights on behind the scenes. Think Data Entry, Payroll, HR, and Accounting.
      
      **KPO (The Brains):** "Knowledge Process Outsourcing." This is for high-level tasks where you need an expert, like Legal Research, Market Analysis, or Data Science, without the $200k/year salary.
      
      ### 3. Why Now? The 2026 Reality
      Outsourcing used to be a "maybe" for small businesses. In 2026, it’s a "must." Here’s why:
      
      **The Talent Shortage:** Finding local staff for every niche role is harder (and more expensive) than ever. BPO gives you an "Instant Team" of experts who are already trained.
      
      **The Tech Edge:** Modern BPO companies come with built-in AI and automation tools. You get the benefits of cutting-edge technology without having to buy or manage the expensive software yourself.
      
      **Scaling on Demand:** If your business gets a huge surge in December but goes quiet in January, a BPO partner lets you scale your team up and down instantly. No hiring headaches, no painful layoffs.
      
      ### 4. Checklist: Am I Ready for BPO?
      If you’re nodding your head but aren't sure if you're "big enough" yet, ask yourself these three questions:
      
      [ ] The Time Test: Do I (or my core team) spend more than 10 hours a week on repetitive, manual tasks?
      [ ] The Opportunity Cost: Am I turning away new customers because I can’t answer the phone or respond to leads fast enough?
      [ ] The Growth Ceiling: Is my "back-office" work (billing, data, or admin) slowing down my ability to launch new products or services?
      
      If you answered "Yes" to any of these, you don't need to work harder—you need a partner.
      
      💡 BPO Quick-Facts (Common Questions)
      **What does BPO stand for?** Business Process Outsourcing.
      **Is it only for call centers?** No. Most modern BPOs handle everything from bookkeeping to social media management.
      **Is it expensive?** Actually, most businesses save 30% to 50% on operational costs compared to hiring full-time in-house staff.
    `,
    date: 'March 10, 2026',
    author: 'Robert Mwila',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    category: 'Operations'
  },
  {
    id: '2',
    title: '100+ Business Tasks You Can Outsource: The Ultimate Delegation Menu for 2026',
    excerpt: 'Stop doing $15/hour work. Explore our comprehensive list of business processes to reclaim your time.',
    content: `
      > Stop doing $15/hour work. If you are a business owner, your time is worth $100, $500, or even $1,000 an hour. Every minute you spend on data entry or scheduling is a minute you aren't growing your company.
      
      In 2026, the most successful leaders aren't the ones working the hardest—they are the ones delegating the smartest. Here is your "Delegation Menu": a complete list of processes you can hand off to our expert team today.
      
      ### 1. Office & Admin (The Essentials)
      This is where most people start. These tasks are the "glue" that keeps your business together.
      **- Managing your calendar and setting appointments**
      **- Reaching "Inbox Zero" by filtering and replying to emails**
      **- Booking travel, flights, and hotels**
      **- Organizing your Google Drive or Dropbox files**
      **- Data entry and spreadsheet management**
      **- Personal assistant tasks for the CEO**
      
      ### 2. Social Media & Marketing
      Don't let your social pages go ghost. Our team can keep your brand active 24/7.
      **- Scheduling posts on Facebook, LinkedIn, and Instagram**
      **- Managing and moderating Facebook Groups**
      **- Creating and managing simple ad campaigns**
      **- Responding to comments and direct messages**
      **- Uploading and optimizing YouTube videos**
      **- Promoting new blog posts or product launches**
      
      ### 3. Writing & Design
      You don't need to be a creative genius to have a beautiful brand.
      **- Proofreading and editing your content**
      **- Writing blog posts and newsletters**
      **- Creating graphics in Canva for social media**
      **- Designing simple ebooks or PDF guides**
      **- Sourcing high-quality photos for your website**
      **- Scripting podcasts or video content**
      
      ### 4. Sales & Finding Customers
      This is the "Revenue Engine." Hand these off to start seeing more leads.
      **- Finding potential customers on LinkedIn**
      **- Sending cold outreach messages and follow-ups**
      **- Cleaning up and updating your CRM (leads database)**
      **- Researching guest post or partnership opportunities**
      **- Running social media contests or challenges**
      **- Following up with "warm" leads who showed interest**
      
      ### 5. Customer Support
      Happy customers are repeat customers. Ensure they never wait for an answer.
      **- Managing live chat on your website**
      **- Answering common questions via email**
      **- Updating your "Frequently Asked Questions" (FAQ) page**
      **- Handling basic technical support issues**
      **- Processing returns or refund requests**
      
      ### 6. Tech & Website Help
      You don't need to be a coder to keep your site running smoothly.
      **- Basic website maintenance and updates**
      **- Video and audio editing for your content**
      **- Tracking website traffic and setting up goals**
      **- Fixing broken links and technical SEO issues**
      **- Managing your eCommerce store or product listings**
      **- Setting up email automation and newsletters**
      
      ### 7. Money & Hiring
      Keep your finances clean and your team growing without the stress.
      **- Sending invoices and following up on payments**
      **- Basic bookkeeping and expense tracking**
      **- Screening resumes for new job openings**
      **- Arranging interviews with potential candidates**
      **- Managing payroll and contractor payments**
      **- Canceling unnecessary software subscriptions**
      
      ### 8. Research
      Knowledge is power, but research takes time. Let us do the digging.
      **- Competitor research and teardowns**
      **- Market research for new product ideas**
      **- Finding the best software tools for your needs**
      **- Price comparisons for products or services**
      **- Summarizing industry news and trends**
      **- Finding guest speakers for your events or podcasts**
      
      💡 Quick Insight
      **Where should you start?** Pick the 3 tasks that you hate doing the most. Hand those off first. Once you see the time you get back, you'll never want to go back to doing them yourself.
      
      ### Checklist: Is it time to delegate?
      [ ] I spend more than 5 hours a week on repetitive tasks.
      [ ] I am missing out on new leads because I'm too busy with admin.
      [ ] I feel overwhelmed by my inbox every single morning.
      
      If you checked even one of these, you are ready to scale.
    `,
    date: 'March 15, 2026',
    author: 'Ai-Expert Team',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop',
    category: 'Operations'
  },
  {
    id: '3',
    title: 'BPO, VA, or KPO? The 2026 Guide to Choosing Your Perfect Partner',
    excerpt: 'Stop hiring "helpers" and start building "departments." Learn why the difference is between a second job and freedom.',
    content: `
      > If you hire a Virtual Assistant, you just bought yourself a second job. If you hire a BPO, you bought yourself freedom.
      
      In 2026, the biggest mistake business owners make is thinking all "outsourcing" is the same. It’s not. Choosing the wrong model is like hiring a master chef to wash your dishes—it’s a waste of talent and money.
      
      ### 1. The VA (The "Helper")
      A Virtual Assistant (VA) is a person you hire to help you with your to-do list.
      **The Catch:** You are still the manager. You have to tell them what to do every morning. If you don't have a task for them, they sit idle. You own the process; they just help you run it.
      **Best for:** Personal tasks, travel booking, and one-off "can you do this?" requests.
      
      ### 2. The BPO (The "Department")
      Business Process Outsourcing (BPO) is when you hire a company (like us) to **own the process.**
      **The Difference:** You don't tell us *how* to do the work. You tell us the *result* you want (e.g., "Handle all my customer support") and we build the system, manage the team, and give you the reports. We are a department, not just a helper.
      **Best for:** Scaling a business without adding more management work to your plate.
      
      ### 3. The KPO (The "Brains")
      Knowledge Process Outsourcing (KPO) is the high-level strategy. It’s not just about doing the work; it’s about knowing *what* work to do.
      **The Value:** We don't just enter data into a spreadsheet. We look at the data, find the trends, and tell you how to make more money. We bring the "brains" to your operations.
      **Best for:** Market research, data analysis, and high-level business strategy.
      
      ### The Comparison: Helper vs. Department
      **VA (Helper):** You manage the person. You build the system. You are the bottleneck.
      **Us (BPO + KPO):** We manage the team. We build the system. You are the CEO.
      
      💡 Quick Insight
      **The Management Burden:** Most business owners are already overworked. Hiring a VA adds "Management" to your to-do list. Hiring a BPO removes it. If you want to scale, you need a partner who owns the process, not just a helper who follows instructions.
      
      ### Checklist: Which one do you need?
      [ ] I want someone to help me with my personal daily to-do list (Choose a VA).
      [ ] I want to stop managing a specific department and just see results (Choose Us).
      [ ] I need high-level data insights to help me grow (Choose Us).
      
      If you're ready to stop being a manager and start being a CEO, it's time to move beyond the "helper" model.
    `,
    date: 'March 20, 2026',
    author: 'Ai-Expert Team',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    category: 'Strategy'
  }
];

const MagneticButton = ({ children, className, onClick, "data-cursor": cursor }: { children: React.ReactNode, className?: string, onClick?: () => void, "data-cursor"?: string }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      className={className}
      data-cursor={cursor}
    >
      {children}
    </motion.button>
  );
};

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  const categories = ['All', 'Strategy', 'Operations', 'Automation'];

  const services = [
    {
      icon: <Zap className="size-10" />,
      title: "AI & Automation",
      description: "We automate repetitive tasks and analyze data to make your business smarter.",
      postId: '2'
    },
    {
      icon: <Target className="size-10" />,
      title: "Sales & Marketing",
      description: "We handle outreach, follow-ups, and CRM management to boost your sales.",
      postId: '2'
    },
    {
      icon: <BarChart3 className="size-10" />,
      title: "Finance & Accounting",
      description: "We manage your bookkeeping, payroll, and financial reports accurately.",
      postId: '2'
    },
    {
      icon: <User className="size-10" />,
      title: "Customer Support",
      description: "We answer customer questions and keep your operations running smoothly.",
      postId: '2'
    },
    {
      icon: <ShieldCheck className="size-10" />,
      title: "IT & Technology",
      description: "We maintain your systems and provide expert tech support."
    }
  ];

  const processSteps = [
    {
      title: "Take the Assessment",
      description: "Complete a quick business assessment so we understand your operations, goals, and challenges."
    },
    {
      title: "Schedule a Call",
      description: "We review your assessment, discuss your needs, and outline a tailored solution."
    },
    {
      title: "Start a 7-Day Free Pilot",
      description: "Test our services risk-free. We manage a part of your operations so you can see how we work."
    },
    {
      title: "Review Results & Scope",
      description: "We analyze the pilot results together and finalize a plan for full implementation."
    },
    {
      title: "Full-Service Launch",
      description: "Once agreed, we start managing your business functions end-to-end, delivering efficiency and growth."
    }
  ];

  const [activeSection, setActiveSection] = useState<string>('');

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'home') {
        setActiveSection('');
        return;
      }

      const sections = ['services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // Handle Browser Back/Forward Buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        setView(state.view || 'home');
        if (state.view === 'post' && state.postId) {
          const post = BLOG_POSTS.find(p => p.id === state.postId);
          setSelectedPost(post || null);
        } else {
          setSelectedPost(null);
        }
      } else {
        // Initial state or no state
        const path = window.location.pathname;
        if (path === '/blog') {
          setView('blog');
          setSelectedPost(null);
        } else if (path.startsWith('/blog/')) {
          const id = path.split('/').pop();
          const post = BLOG_POSTS.find(p => p.id === id);
          setView('post');
          setSelectedPost(post || null);
        } else {
          setView('home');
          setSelectedPost(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Handle initial load based on URL
    const initialPath = window.location.pathname;
    let initialView: View = 'home';
    let initialPost: BlogPost | null = null;

    if (initialPath === '/blog') {
      initialView = 'blog';
      setView('blog');
    } else if (initialPath.startsWith('/blog/')) {
      const id = initialPath.split('/').pop();
      initialPost = BLOG_POSTS.find(p => p.id === id) || null;
      if (initialPost) {
        initialView = 'post';
        setView('post');
        setSelectedPost(initialPost);
      }
    }

    // Replace initial state so back button works correctly
    window.history.replaceState({ view: initialView, postId: initialPost?.id }, '', initialPath);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: View) => {
    const path = newView === 'home' ? '/' : `/${newView}`;
    window.history.pushState({ view: newView }, '', path);
    setView(newView);
    setSelectedPost(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handlePostClick = (post: BlogPost) => {
    window.history.pushState({ view: 'post', postId: post.id }, '', `/blog/${post.id}`);
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-pizza-accent selection:text-white cursor-none">
      <CustomCursor />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
            data-cursor="Home"
          >
            <div className="size-10 bg-pizza-accent rounded-xl flex items-center justify-center shadow-lg shadow-pizza-accent/20">
              <Rocket className="size-6 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black tracking-tight">
              Ai-Expert
            </h2>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigateTo('home')} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === 'home' && !activeSection ? 'text-pizza-accent' : 'text-white/60 hover:text-white'}`} 
              data-cursor="Home"
              aria-current={view === 'home' && !activeSection ? 'page' : undefined}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('blog')} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === 'blog' ? 'text-pizza-accent' : 'text-white/60 hover:text-white'}`} 
              data-cursor="Blog"
              aria-current={view === 'blog' ? 'page' : undefined}
            >
              Blog
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-6 right-6 mt-4 bg-pizza-charcoal/95 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl backdrop-blur-3xl z-50"
            >
              <button 
                onClick={() => {
                  navigateTo('home');
                  setIsMenuOpen(false);
                }} 
                className={`text-left font-bold uppercase tracking-widest text-sm transition-colors ${view === 'home' && !activeSection ? 'text-pizza-accent' : 'text-white/60 hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => {
                  navigateTo('blog');
                  setIsMenuOpen(false);
                }} 
                className={`text-left font-bold uppercase tracking-widest text-sm transition-colors ${view === 'blog' ? 'text-pizza-accent' : 'text-white/60 hover:text-white'}`}
              >
                Blog
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden bg-pizza-charcoal">
                <motion.div 
                  className="absolute inset-0 z-0"
                  style={{ y: backgroundY }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    alt="Global Operations"
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-pizza-bg" />
                </motion.div>
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                  <RevealText className="mb-8">
                    <h1 className="text-white text-5xl md:text-9xl font-display font-black leading-[0.85] tracking-[-0.04em] uppercase">
                      We Run Your Business <span className="text-pizza-accent italic">End-to-End</span>
                    </h1>
                  </RevealText>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-gray-200 text-xl md:text-2xl font-normal leading-relaxed mb-12 max-w-3xl mx-auto opacity-80"
                  >
                    From customer support to finance, marketing, sales, and operations, we manage your business processes so you can focus on growth.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Take the quiz & see how we can run your business</span>
                    <MagneticButton 
                      onClick={() => window.location.href = 'https://form.jotform.com/260685128131050'}
                      className="bg-pizza-accent hover:bg-pizza-accent-hover text-white px-12 py-5 rounded-2xl text-xl font-display font-black shadow-2xl hover:shadow-pizza-accent/40 transition-all border border-white/20"
                      data-cursor="Start"
                    >
                      Get Started
                    </MagneticButton>
                  </motion.div>
                </div>
              </section>

              {/* Trust Bar (Marquee) */}
              <section className="py-16 border-b border-pizza-border bg-zinc-50 overflow-hidden relative group">
                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent z-10 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-6 mb-12">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-pizza-muted font-bold text-[10px] uppercase tracking-[0.5em] opacity-50"
                  >
                    Trusted by Industry Leaders Worldwide
                  </motion.p>
                </div>

                <div 
                  className="flex overflow-hidden select-none"
                  onMouseEnter={() => setIsMarqueeHovered(true)}
                  onMouseLeave={() => setIsMarqueeHovered(false)}
                >
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      duration: isMarqueeHovered ? 100 : 50, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="flex whitespace-nowrap gap-20 items-center w-max"
                  >
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-20 items-center pr-20">
                        {['MTN GROUP', 'UNILEVER', 'MASTERCARD', 'VODACOM', 'GOLD FIELDS', 'SHOPRITE', 'ABSA', 'STANBIC BANK'].map((name) => (
                          <React.Fragment key={name}>
                            <span 
                              className="text-pizza-ink font-display font-black text-3xl md:text-4xl tracking-[0.2em] uppercase opacity-20 hover:opacity-100 transition-all duration-700 cursor-default hover:scale-105 inline-block"
                              data-cursor="Trust"
                            >
                              {name}
                            </span>
                            <div className="size-2 bg-pizza-accent rounded-full opacity-20" />
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>


              {/* ROI / Pain Point Section (Rewritten) */}
              <section className="py-32 px-6 md:px-10 bg-pizza-bg">
                <div className="max-w-4xl mx-auto text-center">
                  <RevealText>
                    <h2 className="text-pizza-ink text-4xl md:text-7xl font-display font-black tracking-tighter mb-12 leading-[0.9] uppercase">
                      We grow your <span className="text-pizza-accent italic">revenue.</span> <br />
                      We cut your <span className="text-pizza-accent italic">costs.</span>
                    </h2>
                  </RevealText>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-pizza-muted text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto"
                  >
                    Most businesses lose money by trying to do everything themselves. We change that. Our <span className="font-bold text-pizza-ink">dedicated teams</span> drive your growth through expert marketing, social media, and sales—<span className="font-bold text-pizza-ink">owning the outcome from strategy to results.</span> We handle the heavy lifting of your operations to slash your overhead, providing the skills and direction end-to-end. You get the results of a full-scale department without the cost or headache of a single new hire.
                  </motion.p>
                  <div className="w-24 h-2 bg-pizza-accent mx-auto rounded-full opacity-20" />
                </div>
              </section>

              {/* Services Section (Bento Grid Redesign) */}
              <section id="services" className="py-32 px-6 md:px-10 bg-pizza-bg-alt overflow-hidden relative">
                {/* Section Anchor */}
                <div className="absolute top-20 left-10 text-[15rem] font-display font-black text-pizza-charcoal/[0.02] leading-none select-none pointer-events-none">
                  SERVICES
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-20">
                    <h2 className="text-pizza-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">Our Services</h2>
                    <RevealText>
                      <h3 className="text-5xl md:text-8xl font-display font-black italic tracking-tighter text-pizza-charcoal leading-[0.8] lowercase mb-8">
                        End-to-End Business Services
                      </h3>
                    </RevealText>
                    <p className="text-pizza-muted text-xl max-w-2xl mx-auto leading-relaxed opacity-80">
                      We don't just "manage" things—we bring in top talent to do the heavy lifting, saving you money and making you more.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {services.map((service, idx) => {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ 
                            y: -10, 
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(255, 99, 33, 0.15)"
                          }}
                          transition={{ 
                            duration: 0.5, 
                            delay: idx * 0.1,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="relative group rounded-[2.5rem] p-10 border border-pizza-border bg-white text-pizza-ink shadow-sm transition-all duration-500 overflow-hidden cursor-default h-full"
                          data-cursor="View"
                        >
                          <div className="relative z-10 h-full flex flex-col">
                            <motion.div 
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              className="mb-8 transition-transform duration-500 inline-block text-pizza-accent"
                            >
                              {service.icon}
                            </motion.div>
                            
                            <h4 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">
                              {service.title}
                            </h4>
                            
                            <p className="text-lg leading-relaxed opacity-80 mb-6">
                              {service.description}
                            </p>
                          </div>
                          
                          {/* Subtle background glow on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-pizza-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Standalone 100+ Services Directory Section */}
              <section className="py-48 px-6 md:px-10 bg-pizza-charcoal relative overflow-hidden">
                {/* Section Anchor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-display font-black text-white/[0.02] leading-none select-none pointer-events-none">
                  100+
                </div>
                
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-white text-6xl md:text-9xl font-display font-black tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
                      The Ultimate <span className="text-pizza-accent italic">Delegation</span> Menu
                    </h2>
                    <p className="text-white/60 text-xl md:text-2xl leading-relaxed mb-16 max-w-2xl">
                      We don't have a one-size-fits-all services but rather we customized on your situation. Explore our comprehensive list of business processes to reclaim your time.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const post = BLOG_POSTS.find(p => p.id === '2');
                        if (post) handlePostClick(post);
                      }}
                      className="group flex items-center gap-4 bg-pizza-accent text-white px-10 py-4 rounded-2xl text-lg font-display font-black shadow-2xl transition-all hover:bg-white hover:text-pizza-charcoal"
                    >
                      Explore more services
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                    </motion.button>
                  </motion.div>
                </div>
              </section>

              {/* About Section (Editorial Redesign) */}
              <section id="about" className="py-32 px-6 md:px-10 bg-white overflow-hidden relative">
                {/* Section Anchor */}
                <div className="absolute top-20 right-10 text-[15rem] font-display font-black text-pizza-charcoal/[0.02] leading-none select-none pointer-events-none">
                  ABOUT
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="mb-24">
                    <RevealText>
                      <h2 className="text-6xl md:text-[12rem] font-display font-black italic tracking-[-0.06em] text-pizza-charcoal leading-[0.75] lowercase">
                        Meet Robert Mwila
                      </h2>
                    </RevealText>
                    <div className="h-2 w-32 bg-pizza-accent mt-8 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: High-Contrast Portrait */}
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-5 relative"
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 grayscale hover:grayscale-0 transition-all duration-1000 group">
                        <RobertPortrait className="w-full h-full object-cover scale-110 group-hover:scale-100" grayscale />
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-10 -right-10 bg-pizza-accent text-white p-10 rounded-full shadow-2xl hidden xl:flex flex-col items-center justify-center size-48 border-8 border-white">
                        <span className="text-4xl font-display font-black leading-none">10+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 text-center mt-2">Years of<br/>Excellence</span>
                      </div>
                    </motion.div>

                    {/* Right: Editorial Content */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="lg:col-span-7"
                    >
                      <div className="inline-flex items-center gap-3 mb-8">
                        <div className="h-px w-12 bg-pizza-accent" />
                        <span className="text-pizza-accent text-xs font-bold uppercase tracking-[0.4em]">The Founder's Vision</span>
                      </div>

                      <RevealText>
                        <h2 className="text-pizza-ink text-4xl md:text-6xl font-display font-black tracking-tighter mb-12 leading-[0.9]">
                          "I spent a decade scaling giants like <span className="text-pizza-accent italic">Shoprite.</span> Now, I’ve built the team I wish I had back then—so you can focus on your vision."
                        </h2>
                      </RevealText>

                      <div className="space-y-8 mb-16">
                        <p className="text-pizza-muted text-xl md:text-2xl font-serif italic leading-relaxed opacity-80">
                          I didn't build Ai-Expert to give you more people to manage. I built it to take the weight off your shoulders.
                        </p>
                        <p className="text-pizza-muted text-lg leading-relaxed">
                          We provide the <span className="font-bold text-pizza-ink">skills and the direction</span>, owning your results from strategy to execution. We handle the heavy lifting so you have the freedom to lead while we own the outcome.
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="size-16 rounded-full overflow-hidden border-2 border-pizza-border">
                          <RobertPortrait className="w-full h-full object-cover" grayscale />
                        </div>
                        <div>
                          <p className="font-serif text-3xl text-pizza-ink leading-none mb-1">Robert Mwila</p>
                          <p className="text-pizza-accent text-xs font-bold uppercase tracking-widest">Founder & CEO, Ai-Expert</p>
                        </div>
                        
                        {/* Digital Signature Placeholder */}
                        <div className="ml-auto hidden sm:block opacity-20">
                           <span className="font-serif italic text-4xl tracking-tighter select-none">R. Mwila</span>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </section>

              {/* Contact / CTA Section */}
              <section id="contact" className="py-48 px-6 md:px-10 bg-pizza-accent relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-7xl mx-auto text-center text-white relative z-10 flex flex-col items-center"
                >
                  <h2 className="text-white text-5xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-16 uppercase">
                    Ready to let experts own your <span className="italic text-pizza-charcoal">results?</span>
                  </h2>
                  
                  <div className="flex flex-col items-center gap-8">
                    <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.5em]">Take the quiz & see how we can run your business</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = 'https://form.jotform.com/260685128131050'}
                      className="bg-white text-pizza-charcoal px-16 py-6 rounded-2xl text-2xl font-display font-black shadow-2xl transition-all hover:bg-pizza-charcoal hover:text-white"
                    >
                      Start Now
                    </motion.button>
                  </div>
                </motion.div>
                
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />
              </section>

              {/* Process Section */}
              <section id="process" className="py-24 px-6 md:px-10 bg-pizza-bg-alt relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ce5316 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-20">
                    <h2 className="text-pizza-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">How We Work</h2>
                    <h3 className="text-pizza-ink text-3xl md:text-5xl font-display font-black tracking-tight mb-4">Your Success Roadmap</h3>
                    <p className="text-pizza-muted text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
                      A clear, proven path from assessment to full-scale operations.
                    </p>
                    <div className="w-20 h-1.5 bg-pizza-accent mx-auto rounded-full" />
                  </div>
                  
                  <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-pizza-accent/10 -translate-x-1/2 hidden md:block" />
                    
                    <div className="space-y-12 md:space-y-0 relative">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                          <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
                            <motion.div
                              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              className={`bg-white p-8 rounded-[2.5rem] border border-pizza-border shadow-xl hover:shadow-2xl transition-all ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                            >
                              <h3 className="text-pizza-accent font-bold text-xs mb-2 uppercase tracking-[0.3em]">Step 0{idx + 1}</h3>
                              <h4 className="text-pizza-ink text-2xl font-display font-black mb-4 tracking-tight">{step.title}</h4>
                              <p className="text-pizza-muted text-xl leading-relaxed">{step.description}</p>
                            </motion.div>
                          </div>
                          
                          <div className="relative z-10 flex items-center justify-center">
                            <div className="sticky top-24 size-16 rounded-full bg-pizza-accent text-white flex items-center justify-center font-black text-xl shadow-xl shadow-pizza-accent/20 border-4 border-pizza-bg-alt md:relative md:top-0">
                              {idx + 1}
                            </div>
                          </div>
                          
                          <div className="hidden md:block w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Blog Section (Intelligence) */}
              <section className="py-24 px-6 md:px-10 bg-pizza-bg">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                      <h2 className="text-pizza-ink text-3xl md:text-5xl font-display font-black tracking-tight mb-4">Blog & Insights</h2>
                      <p className="text-pizza-muted text-xl">Tips, guides, and resources</p>
                    </div>
                    <button 
                      onClick={() => navigateTo('blog')} 
                      className="text-pizza-accent font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-2 group transition-all"
                    >
                      View all insights 
                      <ArrowLeft className="rotate-180 size-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {BLOG_POSTS.slice(0, 3).map((post, idx) => {
                      const isLarge = idx === 0;
                      return (
                        <motion.div 
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => handlePostClick(post)}
                          className={`bg-white rounded-3xl overflow-hidden border border-pizza-border shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col ${
                            isLarge ? 'md:col-span-7' : 'md:col-span-5'
                          }`}
                        >
                          <div className={`overflow-hidden relative ${isLarge ? 'aspect-[16/9]' : 'aspect-video'}`}>
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {post.category && (
                              <span className="absolute top-4 left-4 bg-pizza-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-[0.3em]">
                                {post.category}
                              </span>
                            )}
                          </div>
                          <div className="p-8 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-4 text-sm text-pizza-muted mb-4">
                                <span className="flex items-center gap-1"><Calendar className="size-4" /> {post.date}</span>
                              </div>
                              <h3 className="text-pizza-ink text-2xl font-display font-black mb-4 group-hover:text-pizza-accent transition-colors tracking-tight">{post.title}</h3>
                              <p className="text-pizza-muted text-xl leading-relaxed line-clamp-2 mb-6">
                                {post.excerpt}
                              </p>
                            </div>
                            <span className="text-pizza-ink group-hover:text-pizza-accent font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                              Read More <ArrowLeft className="rotate-180 size-4" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-32 px-6 md:px-10 relative overflow-hidden"
            >
              {/* Section Anchor */}
              <div className="absolute top-20 right-10 text-[15rem] font-display font-black text-pizza-charcoal/[0.02] leading-none select-none pointer-events-none">
                INSIGHTS
              </div>

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                <RevealText>
                  <h1 className="text-pizza-ink text-4xl md:text-7xl font-display font-black tracking-tight mb-6">Intelligence Hub</h1>
                </RevealText>
                <p className="text-pizza-muted text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  Expert insights on scaling, automation, and operational excellence in 2026.
                </p>
                
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                        activeCategory === cat 
                          ? 'bg-pizza-accent text-white shadow-lg shadow-pizza-accent/20' 
                          : 'bg-white text-pizza-muted border border-pizza-border hover:border-pizza-accent hover:text-pizza-accent'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Post */}
              {activeCategory === 'All' && (
                <div className="mb-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handlePostClick(BLOG_POSTS[0])}
                    className="group relative bg-white rounded-[3rem] overflow-hidden border border-pizza-border shadow-2xl cursor-pointer flex flex-col lg:flex-row"
                    data-cursor="Read"
                  >
                    <div className="lg:w-3/5 aspect-video lg:aspect-auto relative overflow-hidden">
                      {BLOG_POSTS[0].image === '/robert-mwila.png' ? (
                        <RobertPortrait className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <img 
                          src={BLOG_POSTS[0].image} 
                          alt={BLOG_POSTS[0].title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-pizza-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-lg">
                          Must Read
                        </span>
                        <span className="bg-white/90 backdrop-blur-md text-pizza-ink text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-lg">
                          {BLOG_POSTS[0].category}
                        </span>
                      </div>
                    </div>
                    <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-pizza-muted mb-6">
                        <span className="flex items-center gap-2"><Calendar className="size-4" /> {BLOG_POSTS[0].date}</span>
                        <span className="flex items-center gap-2"><Clock className="size-4" /> {BLOG_POSTS[0].readTime}</span>
                      </div>
                      <h2 className="text-pizza-ink text-3xl md:text-5xl font-display font-black mb-6 group-hover:text-pizza-accent transition-colors leading-tight">
                        {BLOG_POSTS[0].title}
                      </h2>
                      <p className="text-pizza-muted text-xl leading-relaxed mb-10">
                        {BLOG_POSTS[0].excerpt}
                      </p>
                      <button className="self-start bg-pizza-accent text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 group-hover:gap-5 transition-all shadow-xl shadow-pizza-accent/20">
                        Read Featured Insight <ArrowLeft className="rotate-180 size-5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {BLOG_POSTS
                  .filter(post => activeCategory === 'All' ? true : post.category === activeCategory)
                  .filter((_, idx) => activeCategory === 'All' ? idx !== 0 : true) // Skip featured if All
                  .map((post, idx) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handlePostClick(post)}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-pizza-border shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
                    data-cursor="Read"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      {post.image === '/robert-mwila.png' ? (
                        <RobertPortrait className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-pizza-ink text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-lg">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-pizza-muted mb-4 uppercase tracking-[0.3em] font-bold">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-pizza-ink text-2xl font-display font-black mb-4 group-hover:text-pizza-accent transition-colors leading-tight tracking-tight">{post.title}</h3>
                      <p className="text-pizza-muted text-xl leading-relaxed line-clamp-3 mb-8">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto">
                        <span className="text-pizza-accent font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-[0.3em] text-sm">
                          Read Full Insight <ArrowLeft className="rotate-180 size-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

          {view === 'post' && selectedPost && (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 px-6 md:px-10 max-w-4xl mx-auto"
            >
              <button 
                onClick={() => navigateTo('blog')}
                className="flex items-center gap-2 text-pizza-accent font-bold uppercase tracking-[0.3em] text-xs transition-all mb-12 group"
              >
                <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence
              </button>

              <div className="mb-12">
                <div className="flex flex-wrap items-center gap-6 text-pizza-muted mb-6">
                  <span className="flex items-center gap-2"><Calendar className="size-5" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2"><User className="size-5" /> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Clock className="size-5" /> {selectedPost.readTime}</span>
                </div>
                <h1 className="text-pizza-ink text-4xl md:text-6xl font-display font-black tracking-tight mb-8 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-16">
                  {selectedPost.image === '/robert-mwila.png' ? (
                    <RobertPortrait className="w-full h-full object-cover" />
                  ) : (
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                
                <div className="prose prose-xl prose-pizza max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, i) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith('###')) {
                      return <h3 key={i} className="text-pizza-ink text-2xl font-display font-black mt-12 mb-6 tracking-tight">{trimmed.replace('###', '').trim()}</h3>;
                    }
                    if (trimmed.startsWith('> ')) {
                      return (
                        <blockquote key={i} className="border-l-4 border-pizza-accent bg-pizza-bg-alt p-8 rounded-r-3xl my-10 italic text-2xl text-pizza-ink">
                          {trimmed.replace('> ', '').trim()}
                        </blockquote>
                      );
                    }
                    if (trimmed.startsWith('[ ]')) {
                      return (
                        <div key={i} className="flex items-center gap-4 mb-4 bg-white p-4 rounded-2xl border border-pizza-border shadow-sm">
                          <div className="size-6 rounded-md border-2 border-pizza-accent flex-shrink-0" />
                          <p className="text-pizza-muted text-xl m-0">{trimmed.replace('[ ]', '').trim()}</p>
                        </div>
                      );
                    }
                    if (trimmed.startsWith('💡')) {
                      return (
                        <div key={i} className="bg-pizza-accent/5 border border-pizza-accent/20 p-8 rounded-3xl my-12">
                          <div className="flex items-center gap-3 mb-4">
                            <Zap className="size-6 text-pizza-accent" />
                            <h4 className="text-pizza-accent font-bold text-xl uppercase tracking-[0.3em] m-0">Quick Insight</h4>
                          </div>
                          <p className="text-pizza-muted text-xl leading-relaxed m-0">{trimmed.replace('💡', '').trim()}</p>
                        </div>
                      );
                    }
                    
                    // Handle bold text in paragraphs
                    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="text-pizza-muted text-xl leading-relaxed mb-6">
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="text-pizza-ink font-black">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-20 bg-pizza-accent p-12 rounded-[3rem] text-center text-white shadow-2xl flex flex-col items-center">
                  <h3 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight">Ready to give your time back?</h3>
                  <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Take our 2-minute quiz to see exactly which tasks you should drop today to start scaling.
                  </p>
                  <div className="flex flex-col items-center gap-6">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Take the quiz & start scaling</span>
                    <button 
                      onClick={() => window.location.href = 'https://form.jotform.com/260685128131050'}
                      className="bg-white text-pizza-accent px-12 py-5 rounded-2xl text-xl font-black shadow-xl hover:scale-105 transition-all"
                    >
                      Take the Quiz
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-pizza-border pt-12 mt-20">
                <h3 className="text-pizza-ink text-2xl font-display font-black mb-8 tracking-tight">Share this insight</h3>
                <div className="flex gap-4">
                  <button className="p-4 rounded-full bg-pizza-bg-alt hover:bg-pizza-accent hover:text-white transition-all">
                    <Linkedin className="size-6" />
                  </button>
                  <button className="p-4 rounded-full bg-pizza-bg-alt hover:bg-pizza-accent hover:text-white transition-all">
                    <Mail className="size-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mega Footer */}
      <footer className="bg-pizza-bg pt-20 overflow-hidden">
        {/* Top Section: Orange Grid CTA */}
        <div className="relative">
          {/* Top Wavy Border */}
          <div className="absolute top-0 left-0 w-full h-12 -translate-y-full overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-pizza-accent">
              <path d="M0,0 C150,120 350,0 500,0 C650,0 850,120 1000,0 C1150,0 1200,0 1200,0 L1200,120 L0,120 Z" />
            </svg>
          </div>

          <div className="bg-pizza-accent py-32 px-6 relative">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
              <h2 className="text-white text-5xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-16 uppercase">
                Ready to let experts own your <span className="italic text-pizza-charcoal">results?</span>
              </h2>
              
              <div className="flex flex-col items-center gap-8">
                <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.5em]">Take the quiz & see how we can run your business</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'https://form.jotform.com/260685128131050'}
                  className="bg-white text-pizza-charcoal px-16 py-6 rounded-2xl text-2xl font-display font-black shadow-2xl transition-all hover:bg-pizza-charcoal hover:text-white"
                >
                  Start Now
                </motion.button>
              </div>

            </div>
          </div>

          {/* Bottom Wavy Border */}
          <div className="absolute bottom-0 left-0 w-full h-12 translate-y-full overflow-hidden pointer-events-none z-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-pizza-accent rotate-180">
              <path d="M0,0 C150,120 350,0 500,0 C650,0 850,120 1000,0 C1150,0 1200,0 1200,0 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </div>

        {/* Bottom Section: Detailed Info */}
        <div className="bg-pizza-charcoal pt-20 pb-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              {/* Column 1: Branding */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Rocket className="size-10 text-pizza-accent" />
                  <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white lowercase">
                    ai-expert
                  </h2>
                </div>
                <p className="text-pizza-accent font-black uppercase tracking-[0.4em] text-xs">
                  End-to-End Business Process Solutions
                </p>
                <p className="text-white/60 text-lg leading-relaxed font-medium">
                  We manage your business operations from start to finish. Marketing, sales, finance, support, and automation—all under one roof.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h3 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-10 opacity-40">Quick Links</h3>
                <ul className="space-y-4">
                  {['Home', 'Blog'].map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => {
                          if (link === 'Home') navigateTo('home');
                          if (link === 'Blog') navigateTo('blog');
                        }}
                        className="text-white/60 hover:text-pizza-accent transition-colors text-lg font-bold text-left decoration-2 underline-offset-8 hover:underline"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Contact Details & Office */}
              <div>
                <h3 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-10 opacity-40">Contact Details</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <button 
                      onClick={() => window.location.href = 'https://form.jotform.com/260684613501049'}
                      className="text-lg font-mono text-white/80 hover:text-pizza-accent transition-colors block text-left break-all"
                    >
                      greetings@ai-expertz.com
                    </button>
                    <p className="text-2xl font-display font-black text-pizza-accent tracking-tight">
                      +260 574 046 197
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Headquarters Office</h4>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-pizza-accent/50 transition-all duration-500">
                        <div className="flex gap-4">
                          <div className="size-10 rounded-xl bg-pizza-accent/10 flex items-center justify-center text-pizza-accent shrink-0 group-hover:scale-110 transition-transform">
                            <MapPin className="size-5" />
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed font-medium">
                            Stand No. LN-15584/1, Katima Mulilo Road, 9th Floor,<br />
                            Lusaka, Zambia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Connect on LinkedIn</h4>
                    <div className="flex gap-4">
                      <a href="#" className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-pizza-accent transition-all">
                        <Linkedin className="size-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Rail */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/40 text-xs font-medium">
                © 2026 Ai-Expert Agency (formerly RocketX). All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
