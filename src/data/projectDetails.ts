import Project2 from './../assets/project2.jpg';
import Project3 from './../assets/project3.jpeg';
import Project4 from './../assets/project4.jpeg';
import MangroveRestoration from './../assets/MangroveRestoration.png';

export function getProjectsData() {
  return [
    {
      id: 1,
      name: "Coastal Cleanup Initiative",
      subtitle: "Our commitment to a cleaner, healthier coastline.",
      location: "Mormugao, Goa",
      pincode: "403001",
      date: "2024-06-15",
      time: "10:00 AM - 11:00 AM",
      images: [Project2, Project3, Project4, MangroveRestoration],
      videos: [],
      details1: `The Coastal Cleanup Initiative is a large-scale project aimed at restoring the natural beauty of our beaches. Volunteers from all walks of life gather to remove plastic, glass, and other waste materials from the coastline. The event is organized in collaboration with local schools, NGOs, and government bodies. Participants are provided with eco-friendly disposal bags and gloves to ensure safety and sustainability. Educational sessions are held to raise awareness about the impact of marine pollution on wildlife and human health. The project also includes a post-cleanup discussion on sustainable practices and waste management. Refreshments are served to all volunteers, and certificates of participation are awarded. The event is covered by local media to inspire others to join the cause. Join us to make a tangible difference and help restore our beaches for future generations. Your participation matters!`,
      
    },
    {
      id: 2,
      name: "Mangrove Restoration",
      subtitle: "Reviving vital coastal ecosystems.",
      location: "Mormugao, Goa",
      pincode: "403001",
      date: "2024-07-20",
      time: "09:00 AM - 12:00 PM",
      images: [MangroveRestoration, Project2, Project3, Project4],
      videos: [],
      details1: `The Mangrove Restoration project focuses on planting and nurturing mangrove saplings along the coastline. Mangroves are crucial for maintaining the health of coastal ecosystems as they provide habitat for various species, protect shorelines from erosion, and sequester carbon dioxide. The project involves local communities, schools, and environmental organizations in planting activities and educational workshops. Participants will learn about the ecological importance of mangroves, how to plant and care for saplings, and the role of mangroves in climate change mitigation. The event also includes a guided nature walk to explore the mangrove ecosystem. Join us in our mission to restore mangrove cover and protect our coastlines.`,
      
    },
    {
      id: 3,
      name: "Community Education Program",
      subtitle: "Empowering youth through education.",
      location: "Mormugao, Goa",
      pincode: "403001",
      date: "2024-08-10",
      time: "11:00 AM - 02:00 PM",
      images: [Project4, Project2, Project3, MangroveRestoration],
      videos: [],
      details1: `The Community Education Program is designed to empower the youth of our community through knowledge and skills development. The program includes free workshops on various topics, distribution of educational materials, and interactive learning sessions. We invite educators, professionals, and community leaders to share their knowledge and inspire the next generation. The event also features career guidance sessions, art and craft activities, and a prize distribution ceremony for competition winners. Our goal is to promote education and literacy as tools for personal and community development. Join us in our effort to build a brighter future through education.`,
      
    },
    {
      id: 4,
      name: "Green Energy Initiative",
      subtitle: "Promoting sustainable energy solutions.",
      location: "Mormugao, Goa",
      pincode: "403001",
      date: "2024-09-05",
      time: "10:00 AM - 01:00 PM",
      images: [Project3, Project2, Project4, MangroveRestoration],
      videos: [],
      details1: `The Green Energy Initiative aims to promote the use of sustainable energy sources and conservation practices. The program includes demonstrations of solar panel installations, energy conservation workshops, and distribution of energy-efficient LED bulbs. Participants will learn about the benefits of renewable energy, how to reduce energy consumption, and the importance of sustainable living. The initiative also features talks by energy experts, hands-on activities to create DIY solar kits, and a poster-making competition to raise awareness. Join us in our effort to promote green energy solutions and create a sustainable future.`,
      
    },
    {
      id: 5,
      name: "Marine Conservation Project",
      subtitle: "Protecting marine life and habitats.",
      location: "Mormugao, Goa",
      pincode: "403001",
      date: "2024-10-12",
      time: "08:00 AM - 11:00 AM",
      images: [Project2, Project3, Project4, MangroveRestoration],
      videos: [],
      details1: `The Marine Conservation Project is dedicated to protecting and preserving marine life and habitats. The project includes activities such as underwater cleanups, marine life awareness sessions, and coral reef monitoring. We collaborate with local divers, marine biologists, and conservation organizations to provide a comprehensive learning and volunteering experience. Participants will gain hands-on experience in marine conservation, learn about the challenges facing marine ecosystems, and contribute to the protection of our oceans. Join us in our mission to conserve marine biodiversity and ensure the health of our oceans for future generations.`,
    },
  ];
}