import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectsData } from '../data/projectDetails'; // <-- Import here
import { div } from 'framer-motion/client';

const projectsData = getProjectsData();

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
          <div className="relative rounded-none overflow-hidden shadow-md bg-white border border-gray-200 mx-auto w-full h-[400px]">
            {/* Single image display */}
            <div className="w-full h-full">
              <img
                src={images[currentSlide]}
                alt={`Project image ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-green-100 rounded-full p-2 shadow transition z-10"
              onClick={goToPrevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="text-green-900 w-7 h-7" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-green-100 rounded-full p-2 shadow transition z-10"
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
        </div>
        
        {/* Description */}
        
        {/* Project Details Box */}
        <div className="px-8 pb-12 max-w-4xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-2 shadow-sm">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Project Details</h3>
            <div className="mb-4">
              <p className="text-gray-800 text-base whitespace-pre-line">{project.details1}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}