import { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiSharp,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiGit,
  SiFigma,
  SiPostgresql,
  SiMongodb, SiD, SiDotnet,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  tags: string[];
  languages: string[];
  frameworks: string[];
  tools: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'other';
  icon: IconType;
  experience: number;
  usage: number;
  enjoyment: number;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Silicon',
    description: 'A full-stack ASP.NET Core application with user authentication, SQL Server integration, and a separate REST API layer.',
    longDescription: `
      WebApp Silicon is a full-stack ASP.NET Core application built with Razor Pages and Entity Framework Core. 
      The solution is structured into separate web, infrastructure, and API projects to separate concerns between presentation, data access, and external endpoints. 
      User authentication and account management are implemented using ASP.NET Identity, including registration, login, profile management, and file uploads. 
      Data persistence is handled through SQL Server with EF Core migrations. 
      A companion REST API exposes course and subscription data, which is consumed by the web application through HTTP requests.
      `,
    images: [
      "/images/silicon/silicon1.png",
      "/images/silicon/silicon2.png",
      "/images/silicon/silicon3.png",
      "/images/silicon/silicon4.png",
      "/images/silicon/silicon5.png",
      "/images/silicon/silicon6.png",
      "/images/silicon/silicon7.png",],
    tags: ['Web Application', 'Full-Stack', 'Academic Project'],
    languages: ['C#', 'JavaScript', 'SQL'],
    frameworks: [
      'ASP.NET Core',
      'Razor Pages',
      'Entity Framework Core'
    ],
    tools: [
      'SQL Server',
      'ASP.NET Identity',
      'Swagger',
      'Bootstrap'
    ],
    repoUrl: 'https://github.com/addee1/WebApp_Silicon',
  },
  {
    id: '2',
    title: 'Crito',
    description: "A React-based refactor of the Crito Task project built with modular components and SCSS.",
    longDescription: `
      React Crito is a front-end refactor of the original Crito Task project, rebuilt using React and SCSS. 
      The application is structured around modular and reusable components to create a clean and maintainable codebase. 
      It features a responsive landing page layout that adapts across different screen sizes and devices. 
      Styling is handled with SCSS modules to maintain consistent design and organized styling architecture.
      `,
    images: [
      "/images/crito/crito1.png",
      "/images/crito/crito2.png",
      "/images/crito/crito3.png",
      "/images/crito/crito4.png",
      "/images/crito/crito5.png",
      "/images/crito/crito6.png",],
    tags: ['Landing Page', 'Front-End', 'Academic Project'],
    languages: ['JavaScript', 'SCSS'],
    frameworks: ['React'],
    tools: ['React Router'],
    repoUrl: 'https://github.com/addee1/react-crito',
  },
  {
    id: '3',
    title: 'CS2Inv',
    description: 'A full-stack React and Express application for analyzing Counter-Strike 2 inventories in real time.',
    longDescription: `
      CS2INV is a full-stack web application for analyzing Counter-Strike 2 inventories in real time. 
      The frontend is built with React and Vite, while an Express server handles API requests and data aggregation. 
      The application integrates multiple external APIs, including the Steam Web API and third-party inventory services, to retrieve inventory data, float values, market information, and item metadata. 
      Users can search for Steam profiles using vanity URLs or SteamIDs, inspect individual items, filter and sort inventory data, and generate item screenshots through a custom API endpoint. 
      Interactive charts are rendered using Chart.js to visualize pricing and item-related statistics.
      `,
    images: [
      "/images/cs2inv/cs2inv1.png",
      "/images/cs2inv/cs2inv2.png",
      "/images/cs2inv/cs2inv3.png",
      "/images/cs2inv/cs2inv4.png",
      "/images/cs2inv/cs2inv5.png",
      "/images/cs2inv/cs2inv6.png",],
    tags: ['Web Application', 'Full-Stack', 'Real-Time'],
    languages: ['JavaScript'],
    frameworks: [
      'React',
      'Express'
    ],
    tools: [
      'Vite',
      'Chart.js',
      'Axios',
      'Steam Web API'
    ],
    repoUrl: 'https://github.com/addee1/cs2inv',
  },
  {
    id: '4',
    title: 'Personal CS2 webshop',
    description: 'A full-stack Steam inventory marketplace built with Next.js and Supabase.\n' +
        'Features real-time inventory import, structured relational data storage, cart & checkout flow, admin order management, and secure cookie-based authentication.',
    longDescription:
        'A full-stack private marketplace platform for managing and brokering high-value Counter-Strike 2 skin trades.\n\n' +
        'The application integrates directly with the Steam Web API to import real-time inventory data, normalize complex nested JSON structures, and store the data in a structured PostgreSQL database via Supabase.\n\n' +
        'The system includes a dynamic cart and checkout workflow where users can submit structured buy or sell requests. Instead of automated payments, the platform acts as a trading intermediary — users select preferred contact methods (Discord, Steam, X, Telegram) and payment preferences (Crypto, Swish, Bank Transfer), and the trade is settled manually.\n\n' +
        'An admin dashboard provides secure cookie-based authentication, order management, filtering, status updates, and inventory re-import functionality. The architecture demonstrates server-side API orchestration, relational schema design, secure environment variable handling, and real-world marketplace workflow implementation.',
    images: [
      "/images/skin-webshop/1.png",
      "/images/skin-webshop/2.png",
      "/images/skin-webshop/3.png",
      "/images/skin-webshop/4.png",
      "/images/skin-webshop/5.png",
      "/images/skin-webshop/6.png",
      "/images/skin-webshop/7.png",
      "/images/skin-webshop/8.png",
      "/images/skin-webshop/9.png",],
    tags: [
      'Full-Stack',
      'Marketplace',
      'API Integration',
      'Admin Dashboard',
      'Relational Database',
    ],
    languages: [
      'TypeScript',
      'JavaScript',
      'SQL'
    ],
    frameworks: [
      'Next.js',
      'React'
    ],
    tools: [
      'Supabase',
      'PostgreSQL',
      'Steam Web API',
      'Git'
    ],
    repoUrl: 'https://github.com/addee1/cs-portfolio',
  },
  {
    id: '5',
    title: 'PlantPal - Raspberry Pi',
    description:
        'An IoT-based plant monitoring system built with Raspberry Pi, .NET 9, Blazor, and PostgreSQL.\n' +
        'Collects real-time environmental data from physical sensors and visualizes it through a secure web dashboard.',
    longDescription:
        'PlantPal is a full-stack IoT system designed to monitor plant health using a Raspberry Pi equipped with multiple environmental sensors.\n\n' +
        'The Raspberry Pi runs a .NET 9 console application that continuously reads data from hardware sensors via I2C and GPIO (BME280 for temperature, humidity, and pressure; BH1750 for light intensity; and ADS1115 for soil moisture). Sensor readings are processed in background tasks and transmitted to a cloud-based core API.\n\n' +
        'A separate ASP.NET Core Web API handles authentication via Keycloak (OpenID Connect), stores incoming device data in PostgreSQL using Entity Framework Core, and exposes secure endpoints for device management and historical plant metrics.\n\n' +
        'The frontend is built with Blazor and provides authenticated users with a dashboard to register devices, monitor live sensor data, and view historical flower and device statistics. The system supports multi-user device ownership and secure per-user data isolation.\n\n' +
        'The solution architecture is split into three projects:\n' +
        '- Raspberry Pi device application (hardware integration & data reporting)\n' +
        '- Core API (authentication, database, and device management)\n' +
        '- Blazor frontend (dashboard & visualization)\n\n' +
        'PlantPal demonstrates real-world IoT integration, hardware communication over I2C/GPIO, background task orchestration, cloud API design, authentication with OpenID Connect, and full-stack .NET architecture.',

    images: [
      "/images/plantpal/1.png",
      "/images/plantpal/2.png",
      "/images/plantpal/3.png",
      "/images/plantpal/4.png",
      "/images/plantpal/plantpal-löda.png",
      "/images/plantpal/raspberrypi1.png",
      "/images/plantpal/raspberrypi2.png",
      "/images/plantpal/raspberrypi3.png",
      "/images/plantpal/plantpal-blomma.jpg",],
    tags: [
      'IoT',
      'Raspberry Pi',
      'Full-Stack',
      'Sensor Integration',
      'Cloud API',
      'Authentication',
      'Real-Time Data',
      'Hardware Integration'
    ],
    languages: ['C#'],
    frameworks: [
      '.NET 9',
      'ASP.NET Core',
      'Blazor',
      'Entity Framework Core'
    ],
    tools: [
      'Raspberry Pi',
      'PostgreSQL',
      'Keycloak',
      'Sensors',
    ],
    repoUrl: 'https://github.com/orgs/plantpal-team/repositories',
  },
  {
    id: '6',
    title: 'RetroPie Gaming Console - Raspberry Pi',
    description:
        'A custom-built retro gaming console using Raspberry Pi and RetroPie.\n' +
        'Supports emulation of multiple classic systems including Nintendo 64, PlayStation, and Game Boy.',
    longDescription:
        'A custom-built retro gaming console using a Raspberry Pi running RetroPie.\n\n' +
        'The project involved assembling the Raspberry Pi into a case, installing a cooling fan, flashing RetroPie onto an SD card, and configuring the system for emulation. I set up multiple classic console emulators and added game ROMs from systems such as Nintendo 64, PlayStation, and Game Boy.\n\n' +
        'The console is connected to a PlayStation 4 controller and configured for smooth gameplay through proper controller mapping and system setup.\n\n' +
        'This project demonstrates hands-on hardware assembly, Linux-based system configuration, and emulator setup on an embedded device.',
    images: [
      "/images/retrokonsol/1.jpg",
      "/images/retrokonsol/2.jpg",
      "/images/retrokonsol/3.jpg",
      "/images/retrokonsol/4.jpg",
      "/images/retrokonsol/5.jpg",
      "/images/retrokonsol/6.jpg",
      "/images/retrokonsol/7.jpg",
      "/images/retrokonsol/8.jpg",
      "/images/retrokonsol/9.jpg",],
    tags: [
      'Raspberry Pi',
      'Embedded Systems',
      'Linux',
      'Hardware Build'
    ],
    languages: [
        '-'
    ],
    frameworks: [
      'RetroPie OS'
    ],
    tools: [
      'Raspberry Pi',
      'Linux',
      'EmulationStation',
    ],
  },
  {
    id: '7',
    title: 'Smart Mirror (MagicMirror)',
    description:
        'A Raspberry Pi powered smart mirror built with a touchscreen and two-way mirror glass.',
    longDescription:
        'A custom-built smart mirror using a Raspberry Pi, a touchscreen display, and two-way mirror glass mounted in a frame. ' +
        'When powered off, it functions as a regular mirror. When powered on, it becomes an interactive smart display running MagicMirror². ' +
        'The system displays real-time modules such as electricity prices, date & time, weather, news, football league tables, store opening hours, and more. ' +
        'Additional modules were configured and customized to create a clean, dashboard-style interface.',
    images: [
      "/images/magicmirror/1.jpg",
      "/images/magicmirror/2.jpg",
      "/images/magicmirror/3.jpg",
      "/images/magicmirror/4.jpg",
      "/images/magicmirror/5.jpg",
      "/images/magicmirror/6.png",],
    tags: ['Raspberry Pi', 'Embedded Systems', 'Smart Home', 'Dashboard'],
    languages: ['JavaScript'],
    frameworks: ['MagicMirror²'],
    tools: [
      'Raspberry Pi',
      'Linux',
      'Two-way Mirror Glass',
      'Touchscreen Display',
    ],
  },
  {
    id: '8',
    title: 'MemeToken Landing Page',
    description:
        'A visually engaging landing page concept for a crypto meme token.',
    longDescription:
        'A simple landing page created to practice and showcase frontend design skills. ' +
        'Built using plain HTML and CSS, focusing on layout, typography, color choices, and overall visual structure. ' +
        'The goal was to create a clean and visually appealing front page without using any frameworks or advanced tooling.',
    images: [
      "/images/memetoken/memetoken.png",],
    tags: ['Frontend', 'UI Design', 'Landing Page', 'Concept Project'],
    languages: ['HTML', 'CSS'],
    frameworks: [],
    tools: ['Figma (concept)'],
    repoUrl: "https://github.com/addee1/MemeToken",
  },
  {
    id: '9',
    title: 'MovieDB Desktop App – Java, JPA & JavaFX',
    description:
        'A JavaFX desktop application that integrates with the TMDB API and persists movie data locally using JPA/Hibernate and MySQL (Docker).',
    longDescription:
        'A desktop application built with JavaFX that integrates with the TMDB REST API to fetch movie data and store it in a relational database using JPA and Hibernate. ' +
        'On first startup, the application automatically imports top-rated and now-playing movies if the database is empty. ' +
        'All subsequent searches and filtering operations are performed against the local database. ' +
        'The project demonstrates REST API integration, DTO mapping, entity relationships, transaction handling, and repository-based data access. ' +
        'The database runs in Docker using MySQL, and the application includes unit tests written with JUnit and Mockito.',
    images: [
      "/images/movieapp/1.png",
      "/images/movieapp/1.1.png",
      "/images/movieapp/2.png",
      "/images/movieapp/3.png",
      "/images/movieapp/4.png",
      "/images/movieapp/5.png",
      "/images/movieapp/6.png",
      "/images/movieapp/7.png",
      "/images/movieapp/8.png",
    ],
    tags: [
      'Backend',
      'Desktop Application',
      'REST API Integration',
      'Database',
      'ORM',
    ],
    languages: ['Java', 'SQL'],
    frameworks: [
      'JavaFX',
      'Hibernate',
      'Jakarta Persistence (JPA)',
      'JUnit',
      'Mockito'
    ],
    tools: [
      'Maven',
      'Docker',
      'MySQL',
      'TMDB API',
      'Git'
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/ithsjava25/project-jpa-project-jpa-grupp-2-d',
  },
  {
    id: '10',
    title: 'Elpriserkollen – Swedish Electricity Price Analyzer',
    description:
        'A real-time electricity price analyzer for Swedish price areas with savings calculations and historical data insights.',
    longDescription:
        'Elpriserkollen is a web application that allows users to analyze Swedish electricity spot prices per hour and per day. ' +
        'The app helps users identify the cheapest hours to use electricity and estimate potential monthly savings by shifting consumption. ' +
        'It includes a historical overview (7 and 30 days), dynamic charts, unit conversion (öre/kWh and kr/kWh), and a savings calculator. ' +
        'A server-side API proxy with caching is implemented to efficiently fetch and store historical price data. ' +
        'The project focuses on performance, clean UI/UX, and practical real-world data usage.',
    images: [
      "/images/elpriserkollen/1.png",
      "/images/elpriserkollen/1.1.png",
      "/images/elpriserkollen/2.png",
      "/images/elpriserkollen/3.png",
      "/images/elpriserkollen/4.png",
      "/images/elpriserkollen/5.png",
      "/images/elpriserkollen/6.png",
      "/images/elpriserkollen/7.png",
    ],
    tags: [
      'Fullstack',
      'Real-time Data',
      'Data Visualization',
    ],
    languages: [
      'TypeScript',
      'JavaScript'
    ],
    frameworks: [
      'React',
      'Recharts'
    ],
    tools: [
      'Vercel',
      'Git',
      'REST API',
      'SCSS'
    ],
    liveUrl: 'https://elpriserkollen.vercel.app/',
  }
];

export const skills: Skill[] = [
  // Languages
  { name: 'C#', category: 'language', icon: SiSharp, experience: 60, usage: 50, enjoyment: 80 },
  { name: 'Java', category: 'language', icon: FaJava, experience: 50, usage: 50, enjoyment: 80 },
  { name: 'JavaScript', category: 'language', icon: SiJavascript, experience: 25, usage: 50, enjoyment: 70 },
  { name: 'TypeScript', category: 'language', icon: SiTypescript, experience: 15, usage: 15, enjoyment: 70 },
  { name: 'HTML', category: 'language', icon: SiHtml5, experience: 90, usage: 90, enjoyment: 50 },
  { name: 'CSS / SCSS', category: 'language', icon: SiCss3, experience: 90, usage: 90, enjoyment: 50 },
    
  // Frameworks
  { name: 'ASP.NET', category: 'framework', icon: SiDotnet, experience: 50, usage: 50, enjoyment: 70 },
  { name: 'React', category: 'framework', icon: SiReact, experience: 35, usage: 60, enjoyment: 90 },
  { name: 'Next.js', category: 'framework', icon: SiNextdotjs, experience: 15, usage: 15, enjoyment: 60 },
  { name: 'JavaFX', category: 'framework', icon: FaJava,experience: 20, usage: 20, enjoyment: 80 },
  { name: 'Node.js', category: 'framework', icon: SiNodedotjs, experience: 15, usage: 15, enjoyment: 50 },
  { name: 'Express', category: 'framework', icon: SiExpress, experience: 15, usage: 15, enjoyment: 20 },
  { name: 'Vue.js', category: 'framework', icon: SiVuedotjs, experience: 20, usage: 20, enjoyment: 60 },

  // Tools
  { name: 'Docker', category: 'tool', icon: SiDocker, experience: 15, usage: 15, enjoyment: 60 },
  { name: 'Git', category: 'tool', icon: SiGit, experience: 80, usage: 80, enjoyment: 50 },
  { name: 'Figma', category: 'tool', icon: SiFigma, experience: 40, usage: 40, enjoyment: 80 },

  // Databases
  { name: 'PostgreSQL', category: 'database', icon: SiPostgresql, experience: 50, usage: 50, enjoyment: 70 },
  { name: 'MongoDB', category: 'database', icon: SiMongodb, experience: 10, usage: 10, enjoyment: 50 },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/addee1', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/adam-ottosson-09bb742b5/', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://x.com/addeeffs1', icon: 'twitter' },
  { name: 'Email', url: 'mailto:ottosson.adam99@gmail.com', icon: 'email' },
];
