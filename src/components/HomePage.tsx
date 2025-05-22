import { useState, useEffect } from "react";
import { Search, User, ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import mainImage from '../assets/main2.png';

// Animations
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Homepage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile and handle scroll effect
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        // Initial checks
        checkScreenSize();
        handleScroll();

        // Set up event listeners
        window.addEventListener("resize", checkScreenSize);
        window.addEventListener("scroll", handleScroll);

        // Clean up
        return () => {
            window.removeEventListener("resize", checkScreenSize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle menu close on navigation
    const handleMenuItemClick = () => {
        if (isMobile) {
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Google Fonts Import - Added in the head of the document */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
      `}</style>

            {/* Navigation */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-dark-green"
                    }`}
            >
                <div className="w-full max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.a
                            href="/"
                            className="text-black font-bold text-xl font-merriweather"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ACTNOW<span className="text-green-300">.com</span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <motion.div
                            className="hidden md:flex items-center space-x-8 font-raleway"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <a href="#SDGPage" className="text-black hover:text-[#124632] hover:font-bold transition-colors">About SDGs</a>
                            <a href="#Project" className="text-black hover:text-[#124632] hover:font-bold transition-colors">
                                Our Projects
                            </a>
                            <a href="/take-action" className="text-black hover:text-[#124632] hover:font-bold transition-colors">
                                Take Action
                            </a>

                            {/* Right Icons - moved inside Desktop Navigation */}
                            <div className="flex items-center space-x-4 ml-4">
                                <button aria-label="Search" className="text-black hover:text-green-300 transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button aria-label="User profile" className="text-black hover:text-green-300 transition-colors">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Mobile Menu Button - Fixed position */}
                        <div className="block md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-black p-2"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Fixed position and z-index */}
                {isMenuOpen && (
                    <motion.div
                        className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 font-raleway z-50"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 py-4 space-y-4">
                            <a
                                href="#SDGPage"
                                className="block text-black hover:text-[#124632] hover:font-bold py-2 transition-colors"
                                onClick={handleMenuItemClick}
                            >
                                About SDGs
                            </a>
                            <a
                                href="#Project"
                                className="block text-black hover:text-[#124632] hover:font-bold py-2 transition-colors"
                                onClick={handleMenuItemClick}
                            >
                                Our Projects
                            </a>
                            <a
                                href="/take-action"
                                className="block text-black hover:text-[#124632] hover:font-bold py-2 transition-colors"
                                onClick={handleMenuItemClick}
                            >
                                Take Action
                            </a>
                            <div className="flex space-x-4 pt-2">
                                <button aria-label="Search" className="text-black hover:text-green-300 transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button aria-label="User profile" className="text-black hover:text-green-300 transition-colors">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-16 md:pt-32 md:pb-24 bg-stone-50">
                <div className="w-full max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left Content */}
                        <motion.div
                            className="w-full md:w-1/2 text-left mb-12 md:mb-0 md:pr-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h1
                                className="font-merriweather text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#124632] leading-tight mb-6 mt-14"
                                variants={slideUp}
                            >
                                Together, We Can Create a Better Tomorrow
                            </motion.h1>

                            <motion.p
                                className="font-raleway text-black text-base sm:text-lg mb-8"
                                variants={slideUp}
                            >
                                Join us in building a greener, fairer world by taking action on the Sustainable Development Goals (SDGs). Every choice we make today shapes the world of tomorrow. Let's work together to protect our planet, promote social equity, and create a thriving future for all.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                variants={fadeIn}
                            >
                                <a
                                    href="/get-involved"
                                    className="font-raleway bg-white text-black border-2 border-black hover:bg-stone-100 transition-colors duration-300 font-medium py-3 px-6 rounded-md text-base sm:text-lg"
                                >
                                    Get Involved
                                </a>
                                <a
                                    href="/learn-more"
                                    className="font-raleway bg-green-50 text-dark-green hover:bg-green-100 transition-colors duration-300 font-medium py-3 px-6 rounded-md text-base sm:text-lg flex items-center group border-2 border-black"
                                >
                                    Learn More
                                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Illustration - Hidden on mobile */}
                        {!isMobile && (
                            <motion.div
                                className="w-full md:w-1/2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative">
                                    {/* Earth background */}
                                    <div className="absolute inset-0 bg-green-400/30 rounded-full blur-3xl w-4/5 h-4/5 mx-auto my-auto" />

                                    {/* Main illustration */}
                                    <div className="relative">
                                        <img src={mainImage} alt="Main illustration" className="w-full h-auto" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Mobile-only buttons - shown when image is hidden */}
                    </div>
                </div>
            </div>

            {/* What Are the SDGs Section *

      {/* CSS for font families */}
            <style>{`
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

            {/* More content sections would go here */}
        </div>
    );
};

export default Homepage;