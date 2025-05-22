// import { useState, useRef, useEffect } from 'react';
// import {
//     Calendar,
//     ChevronDown,
//     Filter,
//     MapPin,
//     Tag
// } from 'lucide-react';
// import Project2 from './../assets/project2.jpg'
// import Project3 from './../assets/project3.jpeg'
// import Project4 from './../assets/project4.jpeg'
// import MangroveRestoration from './../assets/MangroveRestoration.png'
// // Project interface and sample data
// interface Project {
//     id: number;
//     name: string;
//     location: string;
//     category: string;
//     image: string;
//     date: string; // Added date field
// }

// const projectsData: Project[] = [
//     {
//         id: 1,
//         name: "Coastal Cleanup Initiative",
//         location: "Mormugao, Goa",
//         category: "Environmental",
//         image: Project2,
//         date: "2024-06-15"
//     },
//     {
//         id: 2,
//         name: "Mangrove Restoration",
//         location: "Mormugao, Goa",
//         category: "Environmental",
//         image: MangroveRestoration,
//         date: "2024-07-20"
//     },
//     {
//         id: 3,
//         name: "Community Education Program",
//         location: "Mormugao, Goa",
//         category: "Education",
//         image: Project4,
//         date: "2024-08-10"
//     },
//     {
//         id: 4,
//         name: "Green Energy Initiative",
//         location: "Mormugao, Goa",
//         category: "Energy",
//         image: Project3,
//         date: "2024-09-05"
//     },
//     {
//         id: 5,
//         name: "Marine Conservation Project",
//         location: "Mormugao, Goa",
//         category: "Environmental",
//         image: Project2,
//         date: "2024-10-12"
//     },
// ];

// const categories = ["All", "Environmental", "Education", "Energy", "Healthcare", "Community Development"];

// export default function ProjectsPage() {
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [selectedDate, setSelectedDate] = useState<string | null>(null);
//     const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//     const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//     const categoryDropdownRef = useRef<HTMLDivElement>(null);
//     const calendarRef = useRef<HTMLDivElement>(null);

//     // Close dropdowns when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 categoryDropdownRef.current &&
//                 !categoryDropdownRef.current.contains(event.target as Node)
//             ) {
//                 setIsCategoryDropdownOpen(false);
//             }

//             if (
//                 calendarRef.current &&
//                 !calendarRef.current.contains(event.target as Node)
//             ) {
//                 setIsCalendarOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Filter projects based on category and date
//     const filteredProjects = projectsData.filter(project =>
//         (selectedCategory === "All" || project.category === selectedCategory) &&
//         (!selectedDate || project.date === selectedDate)
//     );

//     return (
//         <div id="ViewProject" className="bg-gray-50 min-h-screen p-6">
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
//             `}</style>
//             <div className="container mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-5xl font-bold text-green-800 mb-4 font-merriweather mt-5">Our Projects</h1>
//                     <p className="text-gray-600 mb-6 text-2xl font-raleway w-250">
//                         Explore our past and ongoing projects, categorized by focus areas and timeline,
//                         and see how we are making a difference!
//                     </p>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex space-x-4 mb-6 justify-between">
//                     {/* Category Dropdown */}
//                     <div className="relative" ref={categoryDropdownRef}>
//                         <button
//                             onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
//                             className="flex items-center justify-between w-64 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
//                         >
//                             <div className="flex items-center">
//                                 <Filter className="w-4 h-4 mr-2 text-green-600" />
//                                 {selectedCategory}
//                             </div>
//                             <ChevronDown className="w-4 h-4 text-gray-500" />
//                         </button>

//                         {isCategoryDropdownOpen && (
//                             <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                 {categories.map((category) => (
//                                     <div
//                                         key={category}
//                                         onClick={() => {
//                                             setSelectedCategory(category);
//                                             setIsCategoryDropdownOpen(false);
//                                         }}
//                                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                                     >
//                                         {category}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Calendar Dropdown */}
//                     <div className="relative" ref={calendarRef}>
//                         <button
//                             onClick={() => setIsCalendarOpen(!isCalendarOpen)}
//                             className="flex items-center justify-center w-12 h-10 bg-white border border-gray-300 rounded-md"
//                         >
//                             <Calendar className="w-5 h-5 text-green-600" />
//                         </button>

//                         {isCalendarOpen && (
//                             <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-64">
//                                 <input
//                                     type="date"
//                                     value={selectedDate || ''}
//                                     onChange={(e) => {
//                                         setSelectedDate(e.target.value);
//                                         setIsCalendarOpen(false);
//                                     }}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                                 />
//                                 {selectedDate && (
//                                     <button
//                                         onClick={() => setSelectedDate(null)}
//                                         className="mt-2 w-full bg-red-50 text-red-600 py-1 rounded-md text-sm"
//                                     >
//                                         Clear Date Filter
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Projects Grid */}
//                 <div className="grid grid-cols-2 gap-6">
//                     {filteredProjects.map((project) => (
//                         <div
//                             key={project.id}
//                             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
//                         >
//                             {/* Project Image */}
//                             <div className="relative h-100 w-full">
//                                 <img
//                                     src={project.image}
//                                     alt={project.name}
//                                     className="absolute inset-0 w-full h-full object-cover"
//                                 />
//                             </div>

//                             {/* Project Details */}
//                             <div className="p-2">
//                                 <h3 className="text-lg font-semibold text-green-800 mb-2">
//                                     {project.name}
//                                 </h3>
//                                 <div className="space-y-2 flex justify-between">
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <MapPin className="w-4 h-4 mr-2 text-green-600" />
//                                         {project.location}
//                                     </div>
//                                     {/* <div className="flex items-center text-sm text-gray-600">
//                                         <Tag className="w-4 h-4 mr-2 text-green-600" />
//                                         {project.category}
//                                     </div> */}
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <Calendar className="w-4 h-4 mr-2 text-green-600" />
//                                         {new Date(project.date).toLocaleDateString('en-US', {
//                                             year: 'numeric',
//                                             month: 'long',
//                                             day: 'numeric'
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* No Projects Found */}
//                 {filteredProjects.length === 0 && (
//                     <div className="text-center py-12 bg-white rounded-lg">
//                         <p className="text-gray-500">No projects found matching your filters.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ChevronDown,
    Filter,
    MapPin,
    Tag
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Project2 from './../assets/project2.jpg'
import Project3 from './../assets/project3.jpeg'
import Project4 from './../assets/project4.jpeg'
import MangroveRestoration from './../assets/MangroveRestoration.png'

// Project interface and sample data
interface Project {
    id: number;
    name: string;
    location: string;
    category: string;
    image: string;
    date: string;
}

const projectsData: Project[] = [
    {
        id: 1,
        name: "Coastal Cleanup Initiative",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: Project2,
        date: "2024-06-15"
    },
    {
        id: 2,
        name: "Mangrove Restoration",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: MangroveRestoration,
        date: "2024-07-20"
    },
    {
        id: 3,
        name: "Community Education Program",
        location: "Mormugao, Goa",
        category: "Education",
        image: Project4,
        date: "2024-08-10"
    },
    {
        id: 4,
        name: "Green Energy Initiative",
        location: "Mormugao, Goa",
        category: "Energy",
        image: Project3,
        date: "2024-09-05"
    },
    {
        id: 5,
        name: "Marine Conservation Project",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: Project2,
        date: "2024-10-12"
    },
];

const categories = ["All", "Environmental", "Education", "Energy", "Healthcare", "Community Development"];

// Animated Section Component for Reveal Effects
const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    );
};

// Lazy Image Component with Intersection Observer
const LazyImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.img
            ref={ref}
            src={src}
            alt={alt}
            className={className}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
        />
    );
};

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [visibleProjects, setVisibleProjects] = useState(4);

    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target as Node)
            ) {
                setIsCategoryDropdownOpen(false);
            }

            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter projects based on category and date
    const filteredProjects = projectsData.filter(project =>
        (selectedCategory === "All" || project.category === selectedCategory) &&
        (!selectedDate || project.date === selectedDate)
    );

    // Load more projects
    const loadMoreProjects = () => {
        setVisibleProjects(prev => Math.min(prev + 4, filteredProjects.length));
    };

    return (
        <div id="ViewProject" className="bg-gray-50 min-h-screen p-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
                
                /* Responsive Grid */
                @media (max-width: 640px) {
                    .projects-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
            <div className="container mx-auto">
                {/* Header */}
                <AnimatedSection>
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold text-green-800 mb-4 font-merriweather mt-5">
                            Our Projects
                        </h1>
                        <p className="text-gray-600 mb-6 text-2xl font-raleway w-250">
                            Explore our past and ongoing projects, categorized by focus areas and timeline,
                            and see how we are making a difference!
                        </p>
                    </div>
                </AnimatedSection>

                {/* Filters */}
                <AnimatedSection>
                    <div className="flex space-x-4 mb-6 justify-between">
                        {/* Category Dropdown */}
                        <div className="relative w-64" ref={categoryDropdownRef}>
                            <button
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                            >
                                <div className="flex items-center">
                                    <Filter className="w-4 h-4 mr-2 text-green-600" />
                                    {selectedCategory}
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            <AnimatePresence>
                                {isCategoryDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                                    >
                                        {categories.map((category) => (
                                            <motion.div
                                                key={category}
                                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setIsCategoryDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                            >
                                                {category}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Calendar Dropdown */}
                        <div className="relative" ref={calendarRef}>
                            <button
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="flex items-center justify-center w-12 h-10 bg-white border border-gray-300 rounded-md"
                            >
                                <Calendar className="w-5 h-5 text-green-600" />
                            </button>

                            <AnimatePresence>
                                {isCalendarOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-64"
                                    >
                                        <input
                                            type="date"
                                            value={selectedDate || ''}
                                            onChange={(e) => {
                                                setSelectedDate(e.target.value);
                                                setIsCalendarOpen(false);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        />
                                        {selectedDate && (
                                            <button
                                                onClick={() => setSelectedDate(null)}
                                                className="mt-2 w-full bg-red-50 text-red-600 py-1 rounded-md text-sm"
                                            >
                                                Clear Date Filter
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Projects Grid */}
                <AnimatedSection>
                    <div className="grid grid-cols-2 gap-6 projects-grid">
                        <AnimatePresence>
                            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: index * 0.1 
                                    }}
                                    onClick={() => navigate(`/project/${project.id}`)}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                >
                                    {/* Project Image */}
                                    <div className="relative h-100 w-full">
                                        <LazyImage 
                                            src={project.image}
                                            alt={project.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Project Details */}
                                    <div className="p-2">
                                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                                            {project.name}
                                        </h3>
                                        <div className="space-y-2 flex justify-between">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                                                {project.location}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                                                {new Date(project.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </AnimatedSection>

                {/* Load More Button */}
                {filteredProjects.length > visibleProjects && (
                    <div className="flex justify-center mt-6">
                        <motion.button
                            onClick={loadMoreProjects}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                        >
                            Load More Projects
                        </motion.button>
                    </div>
                )}

                {/* No Projects Found */}
                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-lg"
                    >
                        <p className="text-gray-500">No projects found matching your filters.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}