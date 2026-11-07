// Everything the page says, from the 2026 resume.
export const EMAIL = 'mailto:irsyadfakhrip@gmail.com?subject=Hello%20Putranto';

export const roles = ['React developer', 'Frontend developer', 'AI trainer'];

export const work = [
  {
    title: 'This portfolio',
    body: 'A comic-style site with a 3D sticker avatar whose eyes follow your cursor. Drag it, pop the bubble.',
    tags: ['Next.js', 'Three.js', 'Tailwind CSS'],
    note: "You're on it!",
    color: 'bg-blue text-paper',
  },
  {
    title: 'Indomaret Poinku back-office',
    body: 'Promotions, points and push notification blasts for a loyalty app with 10M+ downloads.',
    tags: ['React', 'Next.js', 'WordPress'],
    note: '10M+ downloads',
    color: 'bg-red text-paper',
  },
  {
    title: 'Tavern Squad & JPG Store',
    body: 'Browser game mechanics for the Tavern Squad NFT game, and Next.js pages for the JPG Store marketplace, rebuilt for phones and made faster.',
    tags: ['Next.js', 'JavaScript', 'Web game'],
    note: 'Web3 freelance',
    color: 'bg-yellow',
  },
  {
    title: 'RAG knowledge base',
    body: 'A prototype that answers from company documents, presented to stakeholders.',
    tags: ['LangChain', 'Vercel AI SDK'],
    note: 'AI prototype',
    color: 'bg-cyan',
  },
];

export const experience = [
  {
    role: 'Senior frontend engineer',
    company: 'SG-EDTS',
    logo: '/company/edts.png',
    dates: 'Jan 2026 – now',
    body: 'Leads frontend on an enterprise web platform. Sets up CI quality checks, reviews code and mentors a frontend developer.',
  },
  {
    role: 'Front-end developer',
    company: 'SG-EDTS',
    logo: '/company/edts.png',
    dates: 'Apr 2022 – Dec 2025',
    body: 'Built sg-edts.com, the Indomaret Poinku back-office and modules of enterprise web apps.',
  },
  {
    role: 'Web developer',
    company: 'Tavern Squad',
    logo: '/company/tavernsquad.jpg',
    dates: 'Mar 2022 – Jan 2023',
    body: 'Worked on the browser game mechanics of tavernsquad.io and moderated its Discord server.',
  },
  {
    role: 'Freelance developer',
    company: 'JPG Store',
    logo: '/company/jpgstore.jpg',
    dates: 'Nov 2021 – Mar 2022',
    body: 'Rebuilt pages in Next.js for phones and fixed bugs and slow pages.',
  },
  {
    role: 'Technology management trainee',
    company: 'SG-EDTS',
    logo: '/company/edts.png',
    dates: 'Apr 2021 – Apr 2022',
    body: 'Rotated through frontend, backend, QA and mobile engineering.',
  },
];

export const stack = [
  ['html-5', 'HTML'], ['css', 'CSS'], ['javascript', 'JavaScript'], ['typescript', 'TypeScript'],
  ['react', 'React'], ['nextjs', 'Next.js'], ['tailwindcss', 'Tailwind CSS'], ['bootstrap', 'Bootstrap'],
  ['gsap', 'GSAP'], ['threejs', 'Three.js'], ['playwright', 'Playwright'], ['cypress', 'Cypress'],
  ['jest', 'Jest'], ['langchain', 'LangChain'], ['vercel', 'Vercel AI SDK'], ['git', 'Git'],
] as const;

export const socials = [
  ['GitHub', 'https://github.com/irsyadfptr'],
  ['LinkedIn', 'https://www.linkedin.com/in/irsyad-fakhri-putranto/'],
  ['X', 'https://x.com/insinyuroffun'],
] as const;
