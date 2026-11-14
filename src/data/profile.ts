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
  availability: 'Open to a 4-month co-op for Summer 2027.' as string | null,
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
  { project: 'humanoid-neck', src: '/models/humanoid-neck/neck-assembly-lite.glb' },
  { project: 'offroad-rc-vehicle', src: '/models/offroad-rc-vehicle/assembly-lite.glb' },
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
  // Anchor on the resume page (/resume#id); role cards without a project link there.
  id: string;
  title: string;
  org: string;
  // Short org name for cards, e.g. "ARM Lab".
  orgShort: string;
  // Chip on the role's card, e.g. "Current" or "Completed".
  status: string;
  period: string;
  location: string;
  points: string[];
  // Slug of a related project case study, if any.
  project?: string;
};

export const experience: Role[] = [
  {
    id: 'arm-lab',
    title: 'Undergraduate Researcher',
    org: 'Advanced Robotics & Mechatronics (ARM) Lab, Western University',
    orgShort: 'ARM Lab, Western',
    status: 'Current',
    period: 'May 2026 - Present',
    location: 'London, ON',
    project: 'mr-clutch-actuator',
    points: [
      'Led the mechanical redesign of a miniature MR clutch that drives the finger joints of a fully actuated robotic hand, taking a stalled design to an approved order',
      'Fixed a shaft that fractured in torsion and a keyway too small to machine by upsizing the shaft from 1 mm to 2 mm, backed by a hand calculation, and switching to a D-profile shaft and bore',
      'Redesigned 7 machined parts and produced their SolidWorks drawings under ISO 2768-m; worked through about 8 suppliers and compared four formal quotes to find a shop for watch-scale parts',
    ],
  },
  {
    id: 'weap',
    title: 'Planning and Controls Developer',
    org: 'Western Engineering Autopilot (WEAP)',
    orgShort: 'Western Engineering Autopilot',
    status: 'Completed',
    period: 'Oct. 2025 - Dec. 2025',
    location: 'London, ON',
    points: [
      'Cut full-system ROS 2/Gazebo simulation startup by ~85-90% (3 min → 30 s) with a structured launch architecture',
      'Integrated planning and control packages through coordinated topic publishing and deterministic startup sequencing',
      'Extended a Python control console with live velocity control and safe shutdown',
    ],
  },
  {
    id: 'formula',
    title: 'Electrical Team Member',
    org: 'Western Formula Racing (FSAE)',
    orgShort: 'Western Formula Racing',
    status: 'Completed',
    period: 'Sept. 2024 - Mar. 2025',
    location: 'London, ON',
    points: ["Created the tractive system schematic and connector pinouts for the team's electric race car"],
  },
];

export const leadership: Role[] = [
  {
    id: 'botbrawl',
    title: 'Mechanical Lead, BotBrawl Combat Robot Team',
    org: 'WE First Club, Western University',
    orgShort: 'WE First Club',
    status: 'Current',
    period: 'Aug. 2026 - Present',
    location: 'London, ON',
    project: 'botbrawl',
    points: [
      'Mechanical lead and chassis and drivetrain lead for a 3 lb beetleweight combat robot, on a team of about 12, building toward a competition in May 2027',
      "Designed the robot's cast polyurethane wheels; hand out research and CAD tasks, coordinate between subsystems and advise members on what is feasible",
      'Team design so far: a horizontal spinner mounted mid-robot, sloped armor on the sides and back, and an invertible drive that keeps working if the robot is flipped',
    ],
  },
  {
    id: 'we-first',
    title: 'General Member',
    org: 'WE First Club, Western University',
    orgShort: 'WE First Club',
    status: 'Completed',
    period: 'Sept. 2025 - Aug. 2026',
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
    items: ['MR-fluid clutch actuators', 'Magnetic-circuit reasoning', 'Linkage design', 'Servo control'],
  },
  {
    group: 'Electrical & embedded',
    items: ['Arduino', 'Motor drivers', 'PWM control', 'Schematics & pinouts', 'Soldering'],
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
