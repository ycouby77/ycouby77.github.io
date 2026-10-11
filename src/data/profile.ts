// Single source of truth for everything on the site that isn't a project.
// Mirrors the resume; update here and every page picks it up.

export const profile = {
  name: 'Yacoub Derradji',
  headline: 'I design, build, and program robotic systems.',
  program: 'Mechatronic Systems Engineering · AI Systems Engineering · Western University',
  // Hero subline. Keep it under ~20 words; the longer intro is used for meta descriptions.
  tagline:
    'Third-year mechatronics and AI systems engineering student. Mechanism design, embedded control, and software, from first principles to working prototypes.',
  intro:
    'Third-year engineering student who designs, builds, and programs robotic systems: actuators for a multi-finger robotic hand, a neck mechanism for a humanoid robot, a vehicle platform built from scratch, and the simulation and software tools around them. I work from first principles through CAD, prototyping, code, and integration.',
  location: 'London, ON',
  email: 'yderradj@uwo.ca',
  linkedin: 'https://www.linkedin.com/in/yacoubderradji',
  github: 'https://github.com/ycouby77',
  resumePdf: '/Yacoub_Derradji_Resume.pdf',
  // Longer, more detailed version (2 pages), offered under the resume.
  cvPdf: '/Yacoub_Derradji_CV.pdf',
  // Shown as a status tag; set to null to hide.
  availability: null as string | null,
};

// Quick facts for the strip under the hero. Keep these short and plain.
export const facts = [
  { label: 'Program', value: 'Mechatronics + AI', note: 'BESc, Western University' },
  { label: 'Year', value: '3rd year', note: 'Graduating Apr. 2029' },
  { label: 'GPA', value: '3.8', note: "Dean's Honour List" },
  { label: 'Based in', value: 'London, ON', note: 'Ontario, Canada' },
];

// 3D models the hero cycles through: project folder + a lighter model file
// (keeps the landing page fast). Rotation/finish come from the project's own viewer.
export const heroModels = [
  { project: 'offroad-rc-vehicle', src: '/models/offroad-rc-vehicle/assembly-lite.glb' },
  { project: 'humanoid-neck', src: '/models/humanoid-neck/neck-assembly-lite.glb' },
];

export const education = [
  {
    school: 'Western University',
    degree: 'BESc, Mechatronic Systems Engineering, Dual in AI Systems Engineering',
    period: 'Sept. 2024 - Apr. 2029 (expected)',
    location: 'London, ON',
    details: [
      "Cumulative GPA 3.8 (Dean's Honour List)",
      'Coursework: Dynamics, Mechanics of Materials, Manufacturing Processes, Fluid Mechanics, Heat Transfer, Computational Methods, Algorithms & Data Structures, Software System Design',
      'In progress: Introduction to Machine Learning (DS 3000)',
    ],
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  points: string[];
  // Slug of a related project case study, if any.
  project?: string;
};

export const experience: Role[] = [
  {
    title: 'Undergraduate Researcher',
    org: 'Advanced Robotics & Mechatronics (ARM) Lab, Western University',
    period: 'May 2026 - Present',
    location: 'London, ON',
    project: 'mr-clutch-actuator',
    points: [
      'Redesigned a miniaturized planetary-gear MR clutch used as a per-joint actuator in a fully actuated multi-finger robotic hand',
      'Traced a torsional shaft fracture and an unmanufacturable keyway to a shared root cause; fixed both by upsizing the shaft to 2 mm and implementing a D-profile shaft/bore coupling',
      'Produced the 7-drawing SolidWorks manufacturing set under ISO 2768-m and sourced all 7 parts across five manufacturing platforms',
    ],
  },
  {
    title: 'Planning and Controls Developer',
    org: 'Western Engineering Autopilot (WEAP)',
    period: 'Oct. 2025 - Dec. 2025',
    location: 'London, ON',
    points: [
      'Cut full-system ROS 2/Gazebo simulation startup by ~85-90% (3 min → 30 s) with a structured launch architecture',
      'Integrated planning and control packages through coordinated topic publishing and deterministic startup sequencing',
      'Extended a Python control console with live velocity control and safe shutdown',
    ],
  },
  {
    title: 'Electrical Team Member',
    org: 'Western Formula Racing (FSAE)',
    period: 'Sept. 2024 - Mar. 2025',
    location: 'London, ON',
    points: ["Created the tractive system schematic and connector pinouts for the team's electric race car"],
  },
];

export const leadership: Role[] = [
  {
    title: 'Mechanical Lead, BotBrawl Combat Robot Team',
    org: 'WE First Club, Western University',
    period: 'Aug. 2026 - Present',
    location: 'London, ON',
    points: ["Lead mechanical design and build of the club's combat robot for the 2026-27 BotBrawl season, organizing the mechanical sub-team"],
  },
  {
    title: 'General Member',
    org: 'WE First Club, Western University',
    period: 'Sept. 2025 - Apr. 2026',
    location: 'London, ON',
    project: 'humanoid-neck',
    points: ["Developed the neck-tilt mechanism for Baker Bot, the club's humanoid robot; took part in the Ri3D build"],
  },
];

export const skills = [
  {
    group: 'Mechanical design',
    items: ['SolidWorks (CSWA)', 'Onshape', 'GD&T', 'ISO 2768 drawings', 'DFM', 'Shaft/coupling & bearing design', 'Gear trains', '3D printing'],
  },
  {
    group: 'Actuation & mechanisms',
    items: ['MR-fluid clutch actuators', 'Magnetic-circuit reasoning', 'Linkage design', 'Tendon actuation', 'Servo control'],
  },
  {
    group: 'Electrical & embedded',
    items: ['Arduino', 'ESP32', 'Motor drivers', 'PWM control', 'Schematics & pinouts', 'Soldering'],
  },
  { group: 'Robotics & simulation', items: ['ROS 2', 'Gazebo', 'MATLAB', 'Simulink'] },
  { group: 'Programming', items: ['Python', 'C/C++', 'Java', 'SQLite', 'Git/GitHub'] },
];

export const awards = [
  { title: 'Certified SolidWorks Associate (CSWA)' },
  { title: "Dean's Honour List", detail: 'Western University' },
  { title: '3rd Place', detail: 'Western Engineering Competition, Junior Division (Nov. 2025)' },
  { title: 'Top 3 of 72 teams', detail: 'Ivey Case Competition (Mar. 2025)' },
];
