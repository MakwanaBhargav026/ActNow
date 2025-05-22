import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

// Import images
import Poverty from '../assets/poverty.png';
import Hunger from '../assets/hunger.png';
import Education from '../assets/education.png';

// Define TypeScript interface for SDG data
interface SDG {
  id: number;
  title: string;
  color: string;
  description: string;
  imageUrl?: string;
  isTextOnly?: boolean;
}

// SDG data
const sdgData: SDG[] = [
  {
    id: 1,
    title: 'NO POVERTY',
    color: 'bg-red-500',
    description: 'End poverty in all its forms everywhere by ensuring social protection, increasing access to basic services, and supporting people affected by extreme weather events and economic shocks.',
    imageUrl: Poverty
  },
  {
    id: 2,
    title: 'ZERO HUNGER',
    color: 'bg-amber-500',
    description: 'End hunger and all forms of malnutrition by ensuring access to safe, nutritious, and sufficient food for all people, especially the poor and vulnerable, including infants.',
    imageUrl: Hunger
  },
  {
    id: 4,
    title: 'QUALITY EDUCATION',
    color: 'bg-red-400',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
    imageUrl: Education
  },
  // More SDGs would be added here
];

// Animated section component
const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      {children}
    </motion.div>
  );
};

// SDG Card component
const SDGCard = ({ sdg, index }: { sdg: SDG; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Handle card flip differently for mobile
  const handleCardInteraction = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  // Text-only card (special case)
  if (sdg.isTextOnly) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className={`${sdg.color} rounded-lg shadow-lg overflow-hidden h-full`}
      >
        <div className="p-6">
          <div className="text-white text-sm p-4">
            <p className="text-lg">{sdg.description}</p>
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" className="text-sm text-white bg-opacity-20 hover:bg-opacity-30 bg-black rounded-full px-4 py-1">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // For mobile: toggle flip on click
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className="h-auto sm:h-96 w-full"
        onClick={handleCardInteraction}
      >
        <div className={`rounded-lg shadow-lg overflow-hidden ${sdg.color}`}>
          <AnimatePresence initial={false}>
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 flex flex-col"
              >
                <div className="flex justify-center mb-4">
                  {sdg.imageUrl && (
                    <img
                      src={sdg.imageUrl}
                      alt={`SDG ${sdg.id} - ${sdg.title}`}
                      className="w-80 h-80 sm:h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-lg text-white">Tap to learn more</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 font-raleway"
              >
                <div className="flex items-center mb-4">
                  <span className="text-8xl font-bold text-white mr-4">{sdg.id}</span>
                  <h3 className="text-4xl font-bold text-white">{sdg.title}</h3>
                </div>

                <div className="flex-grow">
                  <p className="text-white text-lg">{sdg.description}</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button variant="ghost" className="text-sm text-black bg-opacity-20 hover:bg-opacity-30 bg-white rounded-full px-4 py-1">
                    Learn More
                  </Button>
                </div>
                <p className="text-xs text-white text-center mt-2">Tap to go back</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Desktop: hover flip effect
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="flip-card h-96 w-full perspective"
    >
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
        {/* Front of card */}
        <div className={`flip-card-front absolute w-full h-full ${sdg.color} rounded-lg shadow-lg overflow-hidden backface-hidden`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center">
              {sdg.imageUrl && (
                <div className="flex justify-center">
                  <img
                    src={sdg.imageUrl}
                    alt={`SDG ${sdg.id} - ${sdg.title}`}
                    className="w-auto h-80 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className={`flip-card-back absolute w-full h-full ${sdg.color} rounded-lg shadow-lg overflow-hidden backface-hidden rotate-y-180 font-raleway`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center mb-4">
              <span className="text-5xl md:text-9xl font-bold text-white mr-4">{sdg.id}</span>
              <h3 className="text-2xl md:text-5xl font-bold text-white">{sdg.title}</h3>
            </div>

            <div className="flex-grow overflow-auto">
              <p className="text-white text-base md:text-lg">{sdg.description}</p>
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="ghost" className="text-sm text-black bg-opacity-20 hover:bg-opacity-30 bg-white rounded-full px-4 py-1">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main SDG Page component
const SDGPage = () => {
  const [showAllSDGs] = useState(false);

  const displayedSDGs = showAllSDGs ? sdgData : sdgData.slice(0, 3);

  return (
    <div id="SDGPage" className=" bg-[#F2F0E4] min-h-screen overflow-x-hidden">
      <style >{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
      `}</style>
      {/* Add CSS for 3D flip effect */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
        .font-raleway {
          font-family: 'Raleway', sans-serif;
        }
        html, body {
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4 sm:mb-6 font-merriweather"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              What Are the Sustainable Development Goals (SDGs)?
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-800 max-w-4xl mx-auto font-raleway"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              The Sustainable Development Goals (SDGs) are a universal call to action by the
              United Nations to end poverty, protect the planet, and ensure peace and prosperity
              for all by 2030. These 17 interconnected goals serve as a blueprint for a better future,
              focusing on social, environmental, and economic progress.
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {displayedSDGs.map((sdg, index) => (
              <SDGCard key={sdg.id} sdg={sdg} index={index} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer">
            <motion.button
              className="bg-stone-300 hover:bg-stone-400 text-green-900 font-semibold py-2 px-4 rounded-full flex items-center transition-all duration-300 hover:shadow-lg font-raleway md:ml-280 ml-55"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + 14 More <ChevronRight className="ml-1 h-4 w-4" />
            </motion.button>
          </a>
          <div className="flex flex-col sm:flex-row justify-between items-center my-6 sm:my-8 px-2">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 font-merriweather mb-4 sm:mb-0 md:ml-120 ">Why SDGs Matter?</h2>

          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center">
            <motion.p
              className="text-base sm:text-lg text-gray-800 max-w-4xl mx-auto font-raleway"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              On a global level, SDGs drive policies that protect the environment and uphold
              human rights, while locally, they encourage sustainable solutions, eco-friendly
              policies, and community-driven initiatives. By aligning efforts worldwide, SDGs create
              a pathway for a greener, fairer, and more prosperous future for present and future
              generations.
            </motion.p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SDGPage;