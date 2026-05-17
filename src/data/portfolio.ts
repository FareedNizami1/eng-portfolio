export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  detail: string;
  logoSrc: string;
  subjects?: string;
  achievements?: string[];
  gpa?: string;
};

export type ExperienceEntry = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
  logoSrc: string;
};

/** Rich content blocks rendered inside the project dialog */
export type ProjectDialogBlock =
  | { type: "paragraphs"; items: string[] }
  | {
      type: "twoColumnList";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    }
  | { type: "bullets"; title: string; items: string[] }
  | { type: "stats"; title?: string; items: { value: string; label: string }[] }
  | { type: "highlightCards"; title?: string; items: { title: string; body: string }[] }
  | { type: "numberedCards"; items: { title: string; body: string }[] };

export type ProjectEntry = {
  id: string;
  name: string;
  /** Card subtitle */
  shortDescription: string;
  /** Single line on card (comma-separated display) */
  tech: string;
  technologies: string[];
  /** Tailwind gradient for dialog header, e.g. from-cyan-600 to-blue-800 */
  color: string;
  /** Gallery images under /public (from engineering-portfolio project1 assets) */
  images: string[];
  /** Optional demo video under /public */
  video?: string;
  dialog: ProjectDialogBlock[];
};

export const site = {
  navName: "Fareed",
  name: "Syed Fareed Nizami Alam",
  role: "Mechatronics Engineer",
  tagline: "Designing intelligent mechanical systems from concept to reality.",
  location: "United States · U.S. Permanent Resident (no visa sponsorship required)",
  email: "fareedalam64@gmail.com",
};

export const education: EducationEntry[] = [
  {
    school: "Stevens Institute of Technology",
    degree: "Master in Mechanical Engineering",
    period: "2026 — 2027",
    detail: "Product Design concentration.",
    logoSrc: "/stevens-logo.png",
  },
  {
    school: "Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST)",
    degree: "Bachelor of Engineering — Mechatronics",
    period: "2020 — 2024",
    detail: "Mechatronics engineering fundamentals, systems integration, and design projects.",
    achievements: ["Chancellor Honor Roll", "Merit Scholarship"],
    gpa: "3.51 / 4.0",
    logoSrc: "/szabist-logo.png",
  },
  {
    school: "Alpha College",
    degree: "Pre-Engineering",
    period: "2017 — 2019",
    subjects: "Mathematics · Physics · Chemistry",
    detail: "Foundation for university-level engineering.",
    achievements: ["Basketball team", "STEM Society"],
    logoSrc: "/alpha-logo.png",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "NYC Department of Education",
    title: "Substitute Paraprofessional",
    period: "Sept 2025 — Present",
    logoSrc: "/DOE-logo.png",
    bullets: [
      "Support students in grades 3–5, including those with special learning needs, under teacher supervision.",
      "Assist in classroom instruction with one-on-one academic and behavioral support.",
      "Collaborate with teachers and staff to implement individualized education strategies.",
    ],
  },
  {
    company: "JCPenney",
    title: "Floor Associate",
    period: "Aug 2025 — Present",
    logoSrc: "/jcpenney-logo.png",
    bullets: [
      "Maintained an organized sales floor (shoes by size and style) to improve customer experience.",
      "Recovered misplaced inventory and kept shelves stocked; unpacked and organized shipments.",
      "Worked with the team to keep stockroom and floor inventory accurate and accessible.",
    ],
  },
  {
    company: "Changan Pakistan",
    title: "Trainee Production Engineer",
    period: "Nov 2024 — Mar 2025",
    logoSrc: "/changan-Logo.png",
    bullets: [
      "Resolved CS-Line water leakage via 5 Whys root cause analysis, reducing shower test failures by ~22%.",
      "Designed a 3-bed trolley in SolidWorks, improving intra-line part delivery speed by ~15%.",
      "Supervised 28 technicians during chassis installation with a focus on accuracy and safety.",
      "Reduced Defects Per Unit (DPU) by ~12% through defect data analysis and real-time process improvements.",
    ],
  },
  {
    company: "Atlas Honda",
    title: "Engineering Intern",
    period: "Sept 2024 — Oct 2024",
    logoSrc: "/honda-logo.png",
    bullets: [
      "Improved motorcycle frame conveyor routing efficiency by ~18% using SolidWorks.",
      "Designed and fabricated four ergonomic jigs and fixtures, improving technician productivity by ~25% and reducing injury risk.",
      "Exposure across assembly, welding, paint, maintenance, and QA teams.",
    ],
  },
  {
    company: "Sui Southern Gas Company",
    title: "Manufacturing Intern",
    period: "Jun 2023 — Sept 2023",
    logoSrc: "/sui-logo.png",
    bullets: [
      "Analyzed G4 and G16 meter production lines; identified two critical bottlenecks and proposed solutions.",
      "Authored a 12-page process improvement report adopted by leadership to reduce waste.",
      "Supported troubleshooting while adhering to industrial safety and operating standards.",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: "robotic-arm",
    name: "Desktop robotic arm with computer vision",
    shortDescription: "4-DOF arm with YOLOv8 for pick-and-place in small-batch settings.",
    tech: "Arduino Mega · Python · YOLOv8 · SolidWorks · OpenCV",
    technologies: ["Arduino Mega", "Python", "YOLOv8", "SolidWorks", "OpenCV", "RAMPS 1.4", "DRV8825"],
    color: "from-cyan-600 to-blue-900",
    video: "/project1/videos/project1.mp4",
    images: [
      "/project1/robots-1.jpg",
      "/project1/robots-2.jpg",
      "/project1/robots-3.jpg",
      "/project1/robot-9.jpg",
      "/project1/robot-12.jpg",
      "/project1/robot-13.jpg",
      "/project1/robot-14.jpg",
      "/project1/robot-8.jpg",
      "/project1/robot-10.jpg",
    ],
    dialog: [
      {
        type: "paragraphs",
        items: [
          "This project develops a desktop-size robotic arm with computer vision for pick-and-place on small manufacturing lines and in startups. It combines kinematic control with YOLOv8 object detection for a cost-effective automation path.",
          "Large industrial robots are often impractical for small, lightweight parts. This arm stays compact and budget-friendly while supporting customizable sorting parameters with solid precision.",
        ],
      },
      {
        type: "twoColumnList",
        left: {
          title: "Hardware",
          items: [
            "4 DOF",
            "NEMA 17 stepper motors",
            "Arduino Mega 2560",
            "RAMPS 1.4 shield",
            "DRV8825 drivers",
            "Vacuum suction end effector",
          ],
        },
        right: {
          title: "Key dimensions",
          items: [
            "Lower shank: 140 mm",
            "Upper shank: 140 mm",
            "End effector offset: 54 mm",
            "Desktop footprint",
          ],
        },
      },
      {
        type: "bullets",
        title: "Highlights",
        items: [
          "YOLOv8 for real-time detection and classification",
          "Forward / inverse kinematics (Denavit–Hartenberg) for positioning",
          "5V vacuum pump, 3-way solenoid, 86 mm suction cup",
          "3D-printed PLA structure; project kept cost-effective",
        ],
      },
    ],
  },
  {
    id: "ball-robot",
    name: "Autonomous ball-shooting robot",
    shortDescription: "Line follower that shoots table tennis balls at multi-height targets.",
    tech: "Arduino Mega · IR & ultrasonic sensors · DC motors · servos",
    technologies: ["Arduino Mega", "IR sensors", "Ultrasonic sensors", "DC gear motors", "Servos"],
    color: "from-violet-600 to-fuchsia-800",
    video: "/project1/videos/project2.mp4",
    images: [
      "/project1/Picture6.png",
      "/project1/robot-16.png",
      "/project1/Picture3.png",
      "/project1/Picture4.png",
      "/project1/Picture5.png",
      "/project1/robot-16.jpg",
      "/project1/robot-11.jpg",
    ],
    dialog: [
      {
        type: "paragraphs",
        items: [
          "A line-following robot that navigates a path and shoots table tennis balls at targets at different heights—mechanical design, electronics, and control in one mechatronics prototype.",
          "Arduino Mega, IR and ultrasonic sensing, DC motors for drive, and servos for the launcher demonstrate integrated hardware and control.",
        ],
      },
      {
        type: "stats",
        title: "At a glance",
        items: [
          { value: "3", label: "IR sensors" },
          { value: "4", label: "DC gear motors" },
          { value: "2", label: "Servo mechanisms" },
          { value: "8×9.5″", label: "Footprint (approx.)" },
        ],
      },
      {
        type: "highlightCards",
        title: "Core features",
        items: [
          {
            title: "Line following",
            body: "Three-sensor IR array for tracking with real-time correction on dark line paths.",
          },
          {
            title: "Shooting mechanism",
            body: "Servo-controlled launcher aimed at baskets at two different heights.",
          },
          {
            title: "Obstacle sensing",
            body: "Ultrasonic input for environment awareness alongside line tracking.",
          },
        ],
      },
    ],
  },
  {
    id: "cocktail-mixer",
    name: "Open-loop cocktail mixing machine",
    shortDescription: "Keypad-driven recipes with pumps and stepper-driven dispensing.",
    tech: "Arduino Mega · CNC shield · DRV8825 · SolidWorks · 3D printing",
    technologies: ["Arduino Mega", "CNC shield", "DRV8825", "SolidWorks", "3D printing", "12V pumps", "Keypad"],
    color: "from-emerald-600 to-teal-900",
    video: "/project1/videos/project3.mp4",
    images: [
      "/project1/Colddrink/Picture5.jpg",
      "/project1/Colddrink/picture-1.png",
      "/project1/Colddrink/picture-2.png",
      "/project1/Colddrink/picture-3.png",
      "/project1/Colddrink/picture4.jpg",
      "/project1/Colddrink/picture3.jpg",
      "/project1/Colddrink/picture1.jpg",
    ],
    dialog: [
      {
        type: "paragraphs",
        items: [
          "Automated mixer: users pick drinks and volumes on a keypad; pumps and steppers dispense syrups and water in proportion.",
          "Built around Arduino Mega, CNC shield, DRV8825, and three 12V pumps for repeatable, hygienic batches.",
        ],
      },
      {
        type: "numberedCards",
        items: [
          {
            title: "Single glass mode",
            body: "Two syrups plus water into one glass—good for calibration or single servings.",
          },
          {
            title: "Dual glass mode",
            body: "Two stations run together with synchronized pump control.",
          },
          {
            title: "Triple glass mode",
            body: "All three glasses filled with consistent ratios.",
          },
          {
            title: "Custom recipe mode",
            body: "Keypad entry for glass count, syrups, and volume (e.g. up to 150 ml) with safeguards against overflow.",
          },
        ],
      },
      {
        type: "paragraphs",
        items: [
          "Mechanical base uses a 3D-printed rotating plate and NEMA 17 for glass positioning. SolidWorks, laser-cut and printed parts, and open-loop control keep the system simple and repeatable.",
        ],
      },
    ],
  },
];

export const background = {
  paragraphs: [
    `Hi, I’m Fareed — officially ${site.name} on paper, but Fareed is what everyone calls me. I grew up in Karachi, Pakistan, a city that naturally teaches you how to adapt, solve problems fast, and think on your feet. That mindset pushed me toward Mechatronics Engineering, where mechanical systems, electronics, and software all come together to build something real.`,

    "In 2025, my family and I moved to the United States to start a new chapter and build our future here. Before relocating, I was already working in engineering roles in Pakistan, gaining hands-on experience in manufacturing, process improvement, CAD design, and system-level problem solving. Relocating was a major life move, but it also sharpened my adaptability and made me even more driven to grow as an engineer in high-impact product and mechanical design roles.",

    "What excites me most is the full engineering journey — taking an idea from a rough concept, designing it in CAD, prototyping it, testing it, finding what breaks, improving it, and repeating until it performs beautifully. I enjoy the interactive side of engineering: collaborating with teams, solving practical problems, and creating products that not only work well but feel thoughtfully designed. If you're building something ambitious, that’s exactly the kind of challenge I want to be part of.",
  ],
};

export const connect = {
  /** Display line (each segment is also linked where applicable) */
  display:
    "fareedalam64@gmail.com | salam5@stevens.edu | LinkedIn: syed-fareed-alam-nizami",
  personalEmail: "fareedalam64@gmail.com",
  schoolEmail: "salam5@stevens.edu",
  linkedinSlug: "syed-fareed-alam-nizami",
  linkedinUrl: "https://www.linkedin.com/in/syed-fareed-alam-nizami/",
};

export const resume = {
  href: "/resume.pdf",
  fileName: "Fareed_Nizami_Resume.pdf",
};

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#background", label: "Background" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#cad", label: "CAD" },
  { href: "#social", label: "Connect" },
] as const;
