import examImg from "@/assets/blog-exam.jpg";
import collegeImg from "@/assets/blog-college.jpg";
import counsellingImg from "@/assets/blog-counselling.jpg";
import studentsImg from "@/assets/feature-students.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  subtopic?: string;
  college?: string;
  state?: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  trending?: boolean;
  content: string[];
};

export type CategorySlug =
  | "engineering-colleges"
  | "entrance-exams"
  | "courses-branches"
  | "career-placements";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "engineering-colleges",
    name: "Engineering Colleges",
    tagline: "Deep-dives into India's top B.Tech destinations",
    description:
      "Honest end-to-end reviews of IITs, NITs, BITS, VIT, SRM, Manipal and every private engineering college worth considering - academics, hostel life, fests, faculty and the honest cons.",
  },
  {
    slug: "entrance-exams",
    name: "Entrance Exams",
    tagline: "JEE, BITSAT, VITEEE, EAMCET and every gateway exam decoded",
    description:
      "Complete prep strategies, syllabus breakdowns, cut-off trends and topper playbooks for every major private and state engineering entrance exam.",
  },
  {
    slug: "courses-branches",
    name: "Courses & Branches",
    tagline: "Pick the right B.Tech branch for the next 4 years",
    description:
      "CSE, ECE, AI/ML, Data Science, Mechanical, Civil - branch-wise curriculum, career scope, placement outlook and the emerging specialisations worth betting on.",
  },
  {
    slug: "career-placements",
    name: "Career & Placements",
    tagline: "Packages, internships, alumni and career pathways",
    description:
      "Real branch-wise packages, top recruiters, internship pipelines, higher studies vs job debates and honest career pathway advice from working alumni.",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const colleges = [
  "All Colleges",
  "BITS Pilani",
  "VIT Vellore",
  "SRM Chennai",
  "Manipal Institute of Technology",
  "Lovely Professional University",
  "KIIT Bhubaneswar",
  "Thapar University",
  "Amity Noida",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "viteee-2026-complete-preparation-guide",
    title: "VITEEE 2026: Complete Preparation Guide & Strategy",
    excerpt:
      "Everything you need to know about VITEEE 2026 - syllabus, pattern, cut-offs, and a week-by-week preparation strategy from toppers.",
    category: "entrance-exams",
    subtopic: "VITEEE",
    college: "VIT Vellore",
    state: "Tamil Nadu",
    author: "Aditi Rao",
    date: "May 18, 2026",
    readTime: "8 min read",
    image: examImg,
    featured: true,
    trending: true,
    content: [
      "VITEEE is one of India's most competitive private engineering entrance exams. Conducted by Vellore Institute of Technology, it opens doors to four VIT campuses across the country.",
      "The 2026 paper is computer-based with sections on Physics, Chemistry, Mathematics/Biology, English, and Aptitude. Each question carries one mark with no negative marking, so attempting every question is the right strategy.",
      "Topper Strategy: Start with NCERT Class 11 and 12 thoroughly. Focus on Mechanics, Electrostatics, Organic Chemistry, Coordinate Geometry, and Calculus - these account for 60% of the paper historically.",
      "In the last 30 days, switch entirely to mock tests and previous year papers. Aim for at least 25 full-length mocks and review every wrong answer in a dedicated error log.",
      "Cut-off Trends: For VIT Vellore CSE, the expected cut-off is around 1-7,000 rank. For mid-tier branches and other campuses, ranks up to 50,000 are workable.",
    ],
  },
  {
    slug: "top-10-private-engineering-colleges-india-2026",
    title: "Top 10 Private Engineering Colleges in India 2026",
    excerpt:
      "From BITS Pilani to Manipal, we rank India's best private B.Tech destinations based on placements, infrastructure, and research output.",
    category: "engineering-colleges",
    subtopic: "Rankings",
    college: "BITS Pilani",
    state: "Rajasthan",
    author: "Rohan Mehta",
    date: "May 12, 2026",
    readTime: "10 min read",
    image: collegeImg,
    featured: true,
    trending: true,
    content: [
      "Choosing the right private engineering college shapes the next four years and your career trajectory. We've ranked the top 10 based on placement data, faculty quality, research output, and student reviews from over 8,000 alumni.",
      "1. BITS Pilani - Elite academics, flexible dual-degree, and an alumni network spanning Fortune 500 leaders. Average package: Rs 21 LPA.",
      "2. VIT Vellore - 400+ recruiters annually, NAAC A++, and one of the strongest international exchange programs. Average package: Rs 9.5 LPA.",
      "3. Manipal Institute of Technology - Research-driven curriculum, global partnerships in 25+ countries. Average package: Rs 10.2 LPA.",
      "4. SRM Chennai - 50+ B.Tech specializations, deep industry ties with Microsoft, Amazon, Cognizant. Average package: Rs 7.8 LPA.",
      "Other strong contenders include Thapar, LPU, Amity Noida, SSN Chennai, KIIT, and PES Bangalore - each excelling in specific branches.",
    ],
  },
  {
    slug: "how-to-use-rank-predictor-effectively",
    title: "How to Use a Rank Predictor Effectively in 2026",
    excerpt:
      "Rank predictors can be powerful - if you know how to interpret them. Here's how to turn predictions into a winning counselling plan.",
    category: "entrance-exams",
    subtopic: "Counselling",
    author: "Ananya Sharma",
    date: "May 8, 2026",
    readTime: "6 min read",
    image: counsellingImg,
    content: [
      "A rank predictor uses your raw exam score, normalised difficulty, and previous year trends to estimate where you'll land in the overall ranking.",
      "Step 1: Enter your accurate score - don't round up. Even five marks can shift your predicted rank by thousands in competitive exams.",
      "Step 2: Cross-check against three years of cut-off data, not just the most recent year. Cut-offs fluctuate with paper difficulty.",
      "Step 3: Use the predicted rank to build three lists - Safe (90%+ chance), Moderate (50-80%), and Reach (under 50%). Apply to all three buckets during counselling.",
      "Step 4: Don't fixate on the prediction. Treat it as a planning tool, then prepare a backup of 8-10 colleges across rank tiers.",
    ],
  },
  {
    slug: "btech-cse-vs-ai-which-branch-to-choose",
    title: "B.Tech CSE vs AI: Which Branch Should You Choose?",
    excerpt:
      "Computer Science is the obvious pick - but is the new AI/ML stream a smarter bet for 2026 admits? We break down placements, curriculum, and ROI.",
    category: "courses-branches",
    subtopic: "CSE vs AI",
    author: "Arjun Verma",
    date: "May 3, 2026",
    readTime: "7 min read",
    image: studentsImg,
    featured: true,
    trending: true,
    content: [
      "AI/ML as a dedicated B.Tech stream has exploded in the last three years. But is it actually better than vanilla CSE?",
      "Curriculum: Core CSE covers fundamentals - OS, DBMS, networks, compilers. AI/ML programs cover most of these but compress them, adding deep learning, NLP, and computer vision in later semesters.",
      "Placements: Top recruiters still hire heavily from CSE pools. AI/ML grads command 10-15% higher average packages in early career, but the gap narrows by year three.",
      "Our take: Pick CSE if the college's CSE program is older and more established. Pick AI/ML only at colleges where the dedicated stream has run for 3+ years with proven placement data.",
    ],
  },
  {
    slug: "manipal-met-2026-exam-pattern-changes",
    title: "Manipal MET 2026: Exam Pattern Changes Explained",
    excerpt:
      "Manipal has revamped MET for 2026. Here are the new sections, weightage, and what aspirants need to adjust in their preparation.",
    category: "entrance-exams",
    subtopic: "MET",
    college: "Manipal Institute of Technology",
    state: "Karnataka",
    author: "Priya Kumari",
    date: "April 28, 2026",
    readTime: "5 min read",
    image: examImg,
    content: [
      "Manipal Academy of Higher Education has updated MET 2026 with significant structural changes worth noting.",
      "New Pattern: 200 questions across Physics (50), Chemistry (50), Mathematics (70), English (10), and General Aptitude (20). Duration is 150 minutes.",
      "Negative Marking: Newly introduced at -1 per wrong answer. This changes the optimal attempt strategy - aim for 85% accuracy minimum.",
      "Mode: Fully online, conducted in two slots. Score normalisation will apply across slots.",
      "Preparation Tip: Increase mock test frequency in the final month, and practice section-wise time allocation. Most students lose marks not from lack of knowledge but from poor time management.",
    ],
  },
  {
    slug: "life-at-bits-pilani-honest-review",
    title: "Life at BITS Pilani: An Honest First-Year Review",
    excerpt:
      "A current second-year student shares the unfiltered truth about academics, campus culture, fests, and what BITS expects of you.",
    category: "engineering-colleges",
    subtopic: "Campus Life",
    college: "BITS Pilani",
    state: "Rajasthan",
    author: "Ishaan Gupta",
    date: "April 20, 2026",
    readTime: "9 min read",
    image: studentsImg,
    trending: true,
    content: [
      "I joined BITS Pilani in 2024 for CSE. After two years, here's the real picture - beyond the brochures.",
      "Academics: Brutally fast-paced. The semester system means you have 4 months to master 6-7 courses. Comprehensive exams (40% weightage) make or break your CGPA.",
      "Campus Life: APOGEE and Oasis are world-class fests. The student-run culture means you'll lead or organise something every semester - it's expected, not optional.",
      "Faculty: A mixed bag. Some professors are brilliant researchers; others lean on slides. Self-study is non-negotiable here.",
      "Worth it? Absolutely - for the network, the freedom, and the brand. But come prepared to work harder than you did for JEE.",
    ],
  },
  {
    slug: "srm-chennai-placements-2026-inside-story",
    title: "SRM Chennai Placements 2026: The Inside Story",
    excerpt:
      "Branch-wise packages, top recruiters, internship pipeline, and the honest truth about the CSE vs non-CSE placement gap at SRM.",
    category: "career-placements",
    subtopic: "Placements",
    college: "SRM Chennai",
    state: "Tamil Nadu",
    author: "Neha Iyer",
    date: "April 15, 2026",
    readTime: "7 min read",
    image: collegeImg,
    featured: true,
    content: [
      "SRM's 2026 placement drive wrapped up with 900+ companies visiting the Kattankulathur campus. Here's the honest branch-wise breakdown.",
      "CSE and IT saw 92% placement with an average of Rs 8.4 LPA. Top offers crossed Rs 52 LPA from product-based companies.",
      "Core branches (Mechanical, Civil) settled around Rs 4.5 LPA average - lower than 2024, reflecting the broader hiring slowdown in core.",
      "Internship pipeline is the underrated advantage: 70% of pre-final year students landed paid internships through the campus portal.",
    ],
  },
  {
    slug: "vit-vellore-hostel-life-what-nobody-tells-you",
    title: "VIT Vellore Hostel Life: What Nobody Tells You",
    excerpt:
      "Mess food, roommate lottery, laundry woes, and the survival hacks every VITian learns by the end of first semester.",
    category: "engineering-colleges",
    subtopic: "Hostel Life",
    college: "VIT Vellore",
    state: "Tamil Nadu",
    author: "Karthik Reddy",
    date: "April 10, 2026",
    readTime: "6 min read",
    image: studentsImg,
    content: [
      "VIT hostel life is a rite of passage. Brochures show marble lobbies; reality is 3-in-a-room with a temperamental fan.",
      "Mess food gets old fast. The pro-move is a mixed strategy - mess breakfast, canteen lunch, food street dinner.",
      "Wi-Fi is decent in blocks A, B, C. Blocks G onwards - carry a mobile hotspot.",
      "Best hack: befriend the second-years in your block. They know which warden bends rules and which laundry never loses socks.",
    ],
  },
  {
    slug: "lpu-punjab-honest-review-2026",
    title: "LPU Punjab Honest Review 2026: Worth the Hype?",
    excerpt:
      "Massive campus, huge intake, mixed reputation. A final-year LPU student breaks down what's genuinely great and what's overrated.",
    category: "engineering-colleges",
    subtopic: "Review",
    college: "Lovely Professional University",
    state: "Punjab",
    author: "Simran Kaur",
    date: "April 3, 2026",
    readTime: "8 min read",
    image: collegeImg,
    content: [
      "LPU polarises opinion. Some call it India's best private university; others dismiss it as a degree factory. The truth sits in the middle.",
      "Infrastructure is genuinely world-class - 600 acres, dedicated Google, Microsoft, and Bosch labs, and a startup incubator that has produced real exits.",
      "The catch: at 30,000+ students, quality varies wildly by section. CSE at LPU can be excellent or forgettable depending on your batch and professors.",
      "Placements: The headline numbers are inflated by dream-offer stats. Median CSE placement sits at Rs 6 LPA - respectable, not spectacular.",
    ],
  },
  {
    slug: "kiit-bhubaneswar-review-placements-culture",
    title: "KIIT Bhubaneswar: Placements, Culture & Campus Deep-Dive",
    excerpt:
      "KIIT quietly became a top-tier private engineering choice. Here's what the placement reports don't say about culture, faculty, and student life.",
    category: "engineering-colleges",
    subtopic: "Review",
    college: "KIIT Bhubaneswar",
    state: "Odisha",
    author: "Anirudh Panda",
    date: "March 28, 2026",
    readTime: "9 min read",
    image: collegeImg,
    content: [
      "KIIT has crept up the private-college rankings in the last five years. The 2026 CSE branch saw 96% placement with a Rs 9.1 LPA average.",
      "Culture: KIIT has one of the best fest cultures in eastern India - KIIT Fest draws students from 200+ colleges.",
      "Faculty is a mixed bag - the CSE and ECE departments have strong PhDs; some other branches lean on newer teaching staff.",
      "Best fit for: students who want a big-campus experience with strong CSE placements but away from the noise of metro cities.",
    ],
  },
  {
    slug: "thapar-university-2026-complete-review",
    title: "Thapar University 2026: Complete B.Tech Review",
    excerpt:
      "Academics, placements, fees, and campus vibes - a thorough breakdown of one of North India's most respected private engineering colleges.",
    category: "engineering-colleges",
    subtopic: "Review",
    college: "Thapar University",
    state: "Punjab",
    author: "Vikram Singh",
    date: "March 22, 2026",
    readTime: "8 min read",
    image: collegeImg,
    content: [
      "Thapar has quietly maintained a rock-solid reputation for four decades. Its 2026 batch saw 94% placement across branches.",
      "CSE average: Rs 12.4 LPA - one of the highest among non-BITS private colleges.",
      "Academics are rigorous. Expect a heavy load, but the payoff is a genuinely respected degree.",
      "Fees are on the higher side (Rs 4.3L/year), so weigh ROI carefully against BITS and top-NIT options if you have them.",
    ],
  },
  {
    slug: "amity-noida-btech-2026-honest-review",
    title: "Amity Noida B.Tech 2026: An Honest Review",
    excerpt:
      "Massive campus, corporate polish, but is the education worth the fees? A recent graduate reviews Amity Noida with zero filters.",
    category: "engineering-colleges",
    subtopic: "Review",
    college: "Amity Noida",
    state: "Uttar Pradesh",
    author: "Ridhima Chopra",
    date: "March 15, 2026",
    readTime: "7 min read",
    image: collegeImg,
    content: [
      "Amity Noida polarises opinions - the brand is huge, the campus is glossy, but the substance behind it varies by program.",
      "CSE and IT programs are the strongest. Average package Rs 7.8 LPA in 2026.",
      "Non-CSE branches struggle to match the placement quality - management assumes students self-drive their internships.",
      "The Delhi NCR advantage is real: internship access, alumni network, and industry visits are far better than most tier-2 city colleges.",
    ],
  },
  {
    slug: "data-science-vs-cse-2026-which-pays-more",
    title: "Data Science vs CSE 2026: Which Branch Actually Pays More?",
    excerpt:
      "Data Science is the new hot branch - but the numbers tell a more nuanced story. We compare placements, roles, and long-term ROI.",
    category: "courses-branches",
    subtopic: "Data Science",
    author: "Meera Nair",
    date: "May 22, 2026",
    readTime: "6 min read",
    image: studentsImg,
    trending: true,
    content: [
      "Data Science B.Tech programs have exploded across private colleges. The pitch is compelling: higher packages, sexier roles, fewer competitors.",
      "The reality is more nuanced. Median CSE package in 2026 was Rs 8.2 LPA across top private colleges. Data Science median: Rs 8.9 LPA. Not the 30-40% premium the brochures promise.",
      "Where Data Science wins: dedicated analytics, ML engineer and product analyst roles. Where CSE still wins: SDE roles at product companies which still form the bulk of top offers.",
      "Our take: pick Data Science only if the college has a dedicated department with PhD faculty. Otherwise CSE with self-taught ML electives is the safer bet.",
    ],
  },
  {
    slug: "ece-in-2026-still-worth-it",
    title: "Is ECE Still Worth It in 2026? A Working Engineer Weighs In",
    excerpt:
      "Electronics has been called dying for a decade. A 5-year-experienced ECE grad breaks down where the branch still wins and where it loses.",
    category: "courses-branches",
    subtopic: "ECE",
    author: "Rahul Menon",
    date: "May 6, 2026",
    readTime: "7 min read",
    image: studentsImg,
    content: [
      "ECE placements at most private colleges hover 25-30% below CSE. That gap has been consistent for a decade and shows no signs of closing.",
      "But ECE grads who upskill into embedded systems, VLSI, or semiconductor roles command Rs 15-25 LPA in year 3-4 - matching or beating CSE trajectories.",
      "The catch: the top ECE roles need M.Tech or MS specialisations. Pure B.Tech ECE without upskilling drifts into non-core IT roles.",
      "Verdict: pick ECE only if you're genuinely excited by hardware, VLSI or communications. Otherwise CSE is the safer path.",
    ],
  },
  {
    slug: "product-vs-service-companies-first-job-guide",
    title: "Product vs Service Companies: Choosing Your First Job Right",
    excerpt:
      "Higher package or better learning? Product or service? Here's how to think about the first job trade-off from working alumni.",
    category: "career-placements",
    subtopic: "First Job",
    author: "Sneha Bhat",
    date: "May 26, 2026",
    readTime: "8 min read",
    image: counsellingImg,
    trending: true,
    content: [
      "The product vs service company debate defines the first career decision for most B.Tech grads. The right answer depends on where you want to be in five years.",
      "Product companies (Google, Microsoft, Amazon, Adobe, product startups) offer Rs 20-50 LPA at entry, but hire only 5-10% of any campus.",
      "Service companies (TCS, Infosys, Wipro, Accenture, Cognizant) offer Rs 4-9 LPA at entry, hire in bulk, and provide structured training.",
      "The underrated middle path: mid-tier product companies and well-funded startups. Rs 12-20 LPA at entry, faster growth, real ownership - and much better learning than a tier-1 service company.",
    ],
  },
  {
    slug: "how-to-land-summer-internship-2026",
    title: "How to Land a Summer Internship in 2026: A Realistic Playbook",
    excerpt:
      "Cold outreach templates, resume tricks, timing hacks - the exact playbook that got 60% of last year's aspirants their first paid internship.",
    category: "career-placements",
    subtopic: "Internships",
    author: "Kabir Anand",
    date: "May 14, 2026",
    readTime: "9 min read",
    image: studentsImg,
    content: [
      "Summer internship hunting has become a full second-year skill. Campus placement cells only cover 20-30% of intern roles - the rest come from cold outreach.",
      "Timing: start applying in September for May-June internships. By January most product companies have closed their intern hiring.",
      "Resume: keep it one page. Lead with 2-3 real projects (GitHub link required). Skip generic skills sections - hiring managers scan for projects, not lists.",
      "Cold outreach: identify 20 companies weekly, find engineering managers on LinkedIn, send a specific 4-line message referencing their team's work. A 5% response rate compounds fast.",
    ],
  },
];
