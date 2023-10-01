import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  tripguide,
  edts,
  tavernsquad,
  discosolaris,
  jpgstore,
} from "../assets";

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Front-End Developer",
    company_name: "SG-EDTS",
    icon: edts,
    iconBg: "#383E56",
    date: "April 2021 - Current",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including back-ends, mobiles, quality assurance, designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
    ],
  },
  {
    title: "Discord Mod & Web Developer",
    company_name: "Tavern Squad NFT",
    icon: tavernsquad,
    iconBg: "#383E56",
    date: "March 2022 - January 2023",
    points: [
      "Contribute to the development of web-based game mechanisms of tavernsquad.io.",
      "Enforce server rules and guidelines to maintain a friendly and respectful community atmosphere.",
      "Assist community members with questions, issues, and concerns related to the server, providing helpful and timely responses.",
    ],
  },
  {
    title: "Discord Mod",
    company_name: "Disco Solaris",
    icon: discosolaris,
    iconBg: "#E6DEDD",
    date: "December 2021 - June 2022",
    points: [
      "Assist in promoting Disco Solaris within the community..",
      "Enforce server rules and guidelines to maintain a friendly and respectful community atmosphere.",
      "Collaborate with the community to organize NFT-related events, such as auctions, art drops, and discussions with prominent figures in the NFT space.",
      "Foster a sense of camaraderie and inclusivity within the NFT community, encouraging positive interactions and discussions.",
    ],
  },
  {
    title: "Freelance Developer",
    company_name: "JPG.store",
    icon: jpgstore,
    iconBg: "#E6DEDD",
    date: "November 2021 - March 2022",
    points: [
      "Developing and maintaining web applications using Next.js and related technologies.",
      "Revamping and implementing responsive designs to enhance mobile user experience.",
      "Identifying and resolving bugs, glitches, and performance issues promptly.",
      "Collaborating with designers to create visually appealing and intuitive interfaces.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { technologies, experiences, testimonials, projects };
