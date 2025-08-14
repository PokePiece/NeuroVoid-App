export const navLinks = [
  {
    id: 1,
    name: 'Direction',
    href: '#home',
  },
  {
    id: 2,
    name: 'Profile',
    href: '#about'
  },
  {
    id: 3,
    name: 'Accomplishments',
    href: '#accomplishments',
  },
  {
    id: 4,
    name: 'Masterpiece',
    href: '#masterpiece',
  },
  {
    id: 5,
    name: 'Skills',
    href: '#skills'
  },
  {
    id: 6,
    name: 'Reach',
    href: '#reach',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Chozen',
    position: 'Wireless Neural BCI',
    img: 'assets/client1.jpg',
    review:
      "My overarching expertise is rooted in Cybernetics, a field where I architect and implement advanced automatic control systems for complex environments. This discipline enables me to seamlessly integrate communication and feedback loops across diverse systems, whether virtual in software and AI, or physical in robotics and mechatronic applications. Through Cybernetics, I ensure optimal functionality and adaptive behavior in sophisticated, self-regulating machines.",
      stars: 5
  },
  {
    id: 2,
    name: 'Bambi',
    position: 'Human AGI Architecture',
    img: 'assets/client3.jpeg',
    review:
      "As an Intelligence Developer, I possess profound skill in Artificial Intelligence, focusing on the design and implementation of advanced AI algorithms and models. My work encompasses developing sophisticated reasoning capabilities, learning architectures, and intelligent decision-making processes that drive autonomous systems and enhance human-level capabilities. I specialize in pushing the boundaries of AI to create highly intelligent and adaptive solutions.",
      stars: 5,
  },
  {
    id: 3,
    name: 'Breeze',
    position: 'The Nerves',
    img: 'assets/client2.jpg',
    review:
      "I actively engage in Robotics to develop and refine the underlying components crucial for building highly sophisticated autonomous systems. My focus includes designing and integrating mechanical structures, sensor systems, and actuation mechanisms, ensuring robust physical interaction within dynamic environments. This practical understanding is vital for engineering next-generation robotic capabilities and advanced machine intelligence.",
      stars: 5,
  },
  {
    id: 4,
    name: 'Cloud',
    position: 'Autonomous Supercomputer Operating System',
    img: 'assets/client4.jpg',
    review:
      "My proficiency in Mechatronics provides a comprehensive understanding of the foundational hardware and intricate electrical configurations upon which all my advanced software and AI systems are built. This interdisciplinary skill allows me to seamlessly bridge mechanical and electronic engineering principles with control systems and computer science, ensuring optimal performance, reliability, and integrated design in complex electro-mechanical systems.",
      stars: 4,
  },
];

export const myProjects = [
  {
    title: 'Autonomous Supercomputer Operating System',
    desc: 'Architected and developed a groundbreaking AI-native Operating System: Meticulously designed this core system to power an advanced autonomous supercomputer. Engineered its robust architecture with deterministic schedulers, secure inter-process communication, and modular inference routing, all optimized for unparalleled agentic autonomy. This design achieved extreme modality, enabling seamless integration and operation across the supercomputer\'s diverse, high-performance systems.',
    subdesc:
      'This OS underpins the supercomputer\'s powerful AI and autonomous functionality, enabling seamless remote connection to a global cloud supercomputing network. Crucially, the system effectively manages the supercomputer\'s dynamic and evolving performance, solidifying its role as an unparalleled autonomous platform, engineered for self-sustainability even in the most intrepid environments.',
    href: 'https://sconomous.dilloncarey.com',
    texture: '/textures/project/cynasius_os_video.mp4',
    logo: '/assets/robot_face.png',
    logoStyle: {
      backgroundColor: '#313434',
      border: '0.2px solidrgb(173, 64, 50)',
      boxShadow: '0px 0px 60px 0pxrgba(15, 42, 77, 0.3)',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'AI',
        path: '/assets/ai-platform.svg',
      },
      /*
      {
        id: 2,
        name: 'Cloud Computing',
        path: '/assets/cloud.svg',
      },
      {
        id: 3,
        name: 'System Architecture',
        path: '/assets/architecture.svg',
      },
      {
        id: 4,
        name: 'Agile',
        path: '/assets/agile.svg',
      },
      */
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.035 : isMobile ? 0.035 : 0.065,
    //deskScale: isSmall ? 0.035 : isMobile ? 0.035 : 0.055,
    deskPosition: isMobile ? [0.0, -0.45, 0] : [0.25, -2, 0],
    //deskPosition: isMobile ? [0.0, -0.45, 0] : [0.25, 1.35, 0],
    cubePosition: isSmall ? [3.5, -5, 0] : isMobile ? [3.5, -5, 0] : isTablet ? [3.5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [9, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-20, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -12, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Human AGI Architecture',
    pos: 'AI Engineer',
    duration: '2025',
    title: "Designed a comprehensive architecture for a human-level AGI system that boasts high performance through adaptability. Engineered in C++ and using QT for application development, the program consists of three main modules: the brain software, the robotics control systems, and the mechatronic components software. The platform uses multi-threaded reasoning and emergent AI conversations to generate quality insight, integrating tools to achieve complex tasks. It is designed to interface with a high-level cloud intelligence structure written in Python I designed for robust co-optimization. This complements the integrity of these systems for massive engineering efficiency.",
    icon: '/assets/ai-brain.svg',
    animation: 'idle',
    link: 'https://human.dilloncarey.com/',
  },
  /*
  {
    id: 2,
    name: 'Robot Control System',
    pos: 'Robotics Software Engineer',
    duration: '2025',
    title: 'Develop a real-time interactive wheeled robot app: Engineered the foundational software and control systems within Unity, enabling dynamic locomotion and precise user-driven navigation. This app, scripted in C#, integrates robust physics for realistic environmental interactions, establishing a core software platform for exploring advanced robotic behaviors and control algorithms.',
    icon: '/assets/robot.svg',
    animation: 'idle',
    link: 'https://robot.dilloncarey.com',
  },
  {
    id: 3,
    name: "Micro-Level Mechatronic Pen Software & Simulation",
    pos: "Mechatronics Software Engineer",
    duration: "2025",
    title: "Architected the foundational control software and simulation environment for a micro-level mechatronic pen: Initiated development of the pen's core software in Rust, constructing a modular, high-performance core. Engineered a robust 2D forward kinematics solver with ROS for precise leg movement, integrated with a basic gait control system to simulate dynamic locomotion. Established a powerful Rust-based sandbox, enabling rapid iteration and rigorous testing of complex algorithms independent of hardware constraints. This foundational work is preparing for advanced AI integration and future visualization within RViz and Gazebo.",
    icon: "/assets/pen.svg",
    animation: "idle",
    link: 'https://mechapen.dilloncarey.com',
}
    */
  
];
