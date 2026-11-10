// Content for /about and the About preview on the home page.
//
// Photos: put image files in src/assets/about/, import them here, and set `src`.
// Any entry without `src` shows as an empty "photo" slot, so the layout can be
// previewed before the photos exist.
import type { ImageMetadata } from 'astro';
import headshotImg from '../assets/about/headshot.jpg';
import previewDay from '../assets/about/western-preview-day.jpg';
import lake from '../assets/about/lake.jpg';
import river from '../assets/about/river.jpg';
import friends from '../assets/about/friends.jpg';
import friendsGame from '../assets/about/friends-game.jpg';
import ri3dTeam from '../assets/about/ri3d-team.webp';
import ri3dWiring from '../assets/about/ri3d-wiring.webp';
import ri3dBuilding from '../assets/about/ri3d-building.webp';
import bernRooftops from '../assets/about/bern-rooftops.jpg';
import citySunset from '../assets/about/city-sunset.jpg';
import countryside from '../assets/about/countryside.jpg';
import coast from '../assets/about/coast.jpg';

// `position` is the CSS object-position used when the photo is cropped to fit its box
// (e.g. 'center 20%' keeps a face near the top in frame).
export type AboutPhoto = { src?: ImageMetadata; alt: string; caption: string; position?: string };

// Small round headshot next to "Hi, I'm Yacoub."
export const headshot: AboutPhoto = { src: headshotImg, alt: 'Yacoub Derradji', caption: 'Headshot' };

export const bio = [
  "I'm a third-year engineering student at Western University, studying Mechatronic Systems Engineering and AI Systems Engineering together. I like projects where the mechanism, the electronics and the code all have to work at the same time.",
  'Right now that means redesigning a tiny MR clutch for a robotic hand at the ARM Lab, and leading mechanical design for the WE First combat robot. Before that I built the neck for Baker Bot, a humanoid lecture robot, and an off-road RC car with no kit or instructions.',
  "I'm Algerian Canadian, and I lived half my life in Saudi Arabia.",
];

// Short version for the home page.
export const teaser =
  'Third-year mechatronics and AI systems engineering student at Western. I like building things where the mechanism, the electronics and the code all have to work together.';

// Two portrait photos beside the About preview on the home page.
export const teaserPhotos: AboutPhoto[] = [
  { src: ri3dBuilding, alt: 'Yacoub in a workshop fitting a polycarbonate sheet onto a robot chassis', caption: 'Robot in 3 Days', position: 'center 30%' },
  { src: river, alt: 'Yacoub standing by a railing in front of a fast turquoise river', caption: 'Switzerland' },
];

// Photo column beside the bio on /about. 3 to 6 photos works well.
export const sidePhotos: AboutPhoto[] = [
  { src: ri3dWiring, alt: 'Yacoub and a teammate working on robot parts at a workshop bench', caption: 'Robot in 3 Days', position: 'center 38%' },
  { src: previewDay, alt: 'Yacoub standing in front of a red two-armed robot at a Western Engineering booth, holding its arms like his own', caption: 'Western Engineering preview day', position: 'center 28%' },
  { src: lake, alt: 'Yacoub standing in front of a lake with hills on the far shore', caption: 'Switzerland' },
  { src: friends, alt: 'Yacoub and a group of friends sitting together in a living room', caption: 'With friends' },
];

// Outside engineering: one or two sentences above the photo grid.
export const lifeIntro =
  "When I'm not working on a project, I'm usually reading, playing pickleball, working out or hanging out with friends. I also love travelling with my family.";

// "Outside engineering" grid. Captions show under each photo.
export const lifePhotos: AboutPhoto[] = [
  { src: friendsGame, alt: 'Yacoub and seven friends posing for a team photo', caption: 'Out with friends' },
  { src: ri3dTeam, alt: 'The Robot in 3 Days team gathered behind their finished robot', caption: 'Robot in 3 Days team' },
  { src: citySunset, alt: 'Looking out over the rooftops of Lyon at sunset', caption: 'Lyon, France' },
  { src: countryside, alt: 'Fields and distant hills at dusk, seen from a rooftop on the family farm', caption: "My family's farm in El Madher, Batna, Algeria" },
  { src: coast, alt: 'A turquoise bay seen through trees from a cliff path', caption: 'Tipaza, Algeria' },
  { src: bernRooftops, alt: 'Red-roofed old-town houses on a river bend under a blue sky', caption: 'Bern, Switzerland' },
];

// "How I got here": dated steps, oldest first. All taken from profile and projects.
export const timeline = [
  { when: 'Sept. 2024', title: 'Started engineering at Western', text: 'Mechatronic Systems Engineering with a dual degree in AI Systems Engineering.' },
  { when: 'Sept. 2024', title: 'Western Formula Racing', text: "Electrical team: drew the tractive system schematic and connector pinouts for the team's electric car." },
  { when: 'Winter 2025', title: 'TTC flood rerouting simulation', text: 'First-year design project: rerouting Toronto transit around flooded streets.', href: '/projects/ttc-flood-sim' },
  { when: 'Oct. 2025', title: 'Western Engineering Autopilot', text: 'Planning and controls: cut simulation startup from about 3 minutes to 30 seconds.' },
  { when: 'Nov. 2025', title: '3rd place, Western Engineering Competition', text: 'Junior Division.' },
  { when: 'Dec. 2025', title: 'Off-road RC vehicle', text: 'Designed and built from scratch: chassis, drivetrain, steering, suspension and control.', href: '/projects/offroad-rc-vehicle' },
  { when: 'May 2026', title: 'Undergraduate researcher, ARM Lab', text: 'Redesigning an MR clutch actuator for a multi-finger robotic hand.', href: '/projects/mr-clutch-actuator' },
  { when: 'May 2026', title: 'Baker Bot neck', text: "Neck-tilt mechanism for WE First's humanoid lecture robot.", href: '/projects/humanoid-neck' },
  { when: 'Aug. 2026', title: 'Mechanical lead, BotBrawl', text: "Leading mechanical design for the club's combat robot." },
];
