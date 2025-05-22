import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Project2 from './../assets/project2.jpg';
import Project3 from './../assets/project3.jpeg';
import Project4 from './../assets/project4.jpeg';
import MangroveRestoration from './../assets/MangroveRestoration.png';

// Project data (should match OverviewProject.tsx)
const projectsData = [
  {
    id: 1,
    name: "Coastal Cleanup Initiative",
    subtitle: "Our commitment to a cleaner, healthier coastline.",
    location: "Mormugao, Goa",
    pincode: "403001",
    date: "June-2024",
    time: "10:00 AM - 11:00 AM",
    images: [Project2, Project3, Project4, MangroveRestoration],
    description: `At ACTNOW, our Coastal Cleanup Initiative is dedicated to restoring and preserving the beauty of our beaches and coastal areas. This project brings together volunteers to remove litter, raise awareness about marine pollution, and protect local ecosystems.

Our goal is to foster a sense of community responsibility and environmental stewardship, ensuring cleaner shores for future generations.`,
  },
  {
    id: 2,
    name: "Mangrove Restoration",
    subtitle: "Reviving vital coastal ecosystems.",
    location: "Mormugao, Goa",
    pincode: "403001",
    date: "July-2024",
    time: "09:00 AM - 12:00 PM",
    images: [MangroveRestoration, Project2, Project3, Project4],
    description: `The Mangrove Restoration project focuses on planting and nurturing mangroves to protect coastlines, enhance biodiversity, and combat climate change.

By involving local communities, we aim to restore these vital habitats and promote sustainable environmental practices.`,
  },
  {
    id: 3,
    name: "Community Education Program",
    subtitle: "Empowering through knowledge.",
    location: "Mormugao, Goa",
    pincode: "403001",
    date: "August-2024",
    time: "11:00 AM - 01:00 PM",
    images: [Project4, Project2, Project3, MangroveRestoration],
    description: `Our Community Education Program delivers workshops and resources to raise awareness about environmental issues and sustainable living.

We believe education is key to inspiring positive change and building resilient communities.`,
  },
  {
    id: 4,
    name: "Green Energy Initiative",
    subtitle: "Promoting sustainable power solutions.",
    location: "Mormugao, Goa",
    pincode: "403001",
    date: "September-2024",
    time: "02:00 PM - 04:00 PM",
    images: [Project3, Project2, Project4, MangroveRestoration],
    description: `The Green Energy Initiative introduces renewable energy solutions to local communities, reducing reliance on fossil fuels and lowering carbon footprints.

Join us in making clean energy accessible and affordable for all.`,
  },
  {
    id: 5,
    name: "Marine Conservation Project",
    subtitle: "Protecting our ocean's future.",
    location: "Mormugao, Goa",
    pincode: "403001",
    date: "October-2024",
    time: "08:00 AM - 10:00 AM",
    images: [Project2, Project3, Project4, MangroveRestoration],
    description: `Our Marine Conservation Project works to safeguard marine life through habitat restoration, research, and advocacy.

Together, we can ensure healthy oceans for generations to come.`,
  },
];

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === Number(id));
  const images = project ? project.images : [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentSlide(0);
  }, [id]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle manual navigation
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-2xl text-gray-500">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center z-50 overflow-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="w-full min-h-full bg-white rounded-none shadow-none p-0 relative flex flex-col">
        {/* Header */}
        <div className="flex items-center px-8 py-6 border-b border-gray-100 bg-green-900">
          <button
            className="mr-3 p-2 rounded-full hover:bg-green-100 transition bg-white"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="text-green-900 w-7 h-7" />
          </button>
          <span className="text-2xl font-bold text-white font-merriweather tracking-wide">
            ACTNOW.com
          </span>
        </div>
        {/* Project Title & Info */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 mt-8 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-merriweather mb-1">{project.name}</h2>
            <p className="text-lg text-gray-600">{project.subtitle}</p>
          </div>
          <div className="flex flex-row gap-12 mt-4 md:mt-0">
            <div>
              <div className="text-gray-700 font-semibold">Where</div>
              <div className="text-green-900">{project.location}</div>
              <div className="text-gray-500">{project.pincode}</div>
            </div>
            <div>
              <div className="text-gray-700 font-semibold">Date</div>
              <div className="text-green-900">{project.date}</div>
              <div className="text-gray-500">{project.time}</div>
            </div>
          </div>
        </div>
        {/* Carousel */}
        <div className="flex flex-col items-center w-full justify-center px-0 py-0">
          <div className="relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 mx-auto" style={{ width: '90%', maxWidth: 900, height: 340 }}>
            <img
              src={images[currentSlide]}
              alt={`Project image ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-green-100 rounded-full p-2 shadow transition"
              onClick={goToPrevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="text-green-900 w-7 h-7" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-green-100 rounded-full p-2 shadow transition"
              onClick={goToNextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight className="text-green-900 w-7 h-7" />
            </button>
          </div>
          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-4 w-4 rounded-full border-2 border-green-900 transition ${
                  currentSlide === index ? 'bg-green-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        
        {/* Description */}
        <div className="px-8 pb-8 pt-2 max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg whitespace-pre-line">{project.description}</p>
        </div>
        {/* Hardcoded AI-generated Project Details */}
        <div className="px-8 pb-12 max-w-4xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-2 shadow-sm">
            <h3 className="text-2xl font-bold text-green-900 mb-2">Project Details</h3>
            <ul className="list-disc pl-6 text-gray-800 text-base space-y-2">
              <li>
                <span className="font-semibold">Impact:</span> This project is designed to create a measurable positive impact on the local environment and community by addressing key ecological challenges.
              </li>
              <li>
                <span className="font-semibold">Community Involvement:</span> Local volunteers and organizations are actively engaged, fostering a sense of ownership and responsibility.
              </li>
              <li>
                <span className="font-semibold">Sustainability:</span> The initiative promotes long-term sustainability through education, resource management, and ongoing support.
              </li>
              <li>
                <span className="font-semibold">Awareness:</span> Workshops and outreach programs are conducted to raise awareness and encourage broader participation.
              </li>
              <li>
                <span className="font-semibold">Monitoring:</span> Progress is tracked and reported to ensure transparency and continuous improvement.
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}