import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Project2 from './../assets/project2.jpg'
import Project3 from './../assets/project3.jpeg'
import Project4 from './../assets/project4.jpeg'
import MangroveRestoration from './../assets/MangroveRestoration.png'
import Project from './../components/OverviewProject'

// Create select component if you don't have shadcn UI set up
const Select: React.FC<{
    onValueChange: (value: string) => void;
    defaultValue: string;
    children: React.ReactNode;
}> = ({ onValueChange, defaultValue, children }) => {
    return (
        <div className="relative w-full">
            <select
                className="w-full appearance-none bg-green-900/80 text-white border-none rounded-md px-3 py-2"
                onChange={(e) => onValueChange(e.target.value)}
                defaultValue={defaultValue}
            >
                {React.Children.map(children, child => {
                    if (React.isValidElement(child) && child.type === SelectContent) {
                        return React.Children.map(child.props.children, (item) => {
                            if (React.isValidElement(item) && item.type === SelectItem) {
                                return <option value={item.props.value}>{item.props.children}</option>;
                            }
                            return null;
                        });
                    }
                    return null;
                })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    );
};

const SelectTrigger: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
    return <div className={className}>{children}</div>;
};

const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    return <span>{placeholder}</span>;
};

const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
    return <option value={value}>{children}</option>;
};

// Simple button component
const Button: React.FC<{
    variant?: 'default' | 'outline';
    size?: 'default' | 'icon';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({ variant = 'default', size = 'default', className = '', onClick, disabled, children }) => {
    const baseClass = "font-medium focus:outline-none transition-colors";
    const variantClass = variant === 'outline'
        ? "bg-transparent border border-current"
        : "bg-green-900 text-white hover:bg-green-800";
    const sizeClass = size === 'icon'
        ? "p-2"
        : "px-4 py-2";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Types
interface Project {
    id: number;
    name: string;
    location: string;
    category: string;
    image: string;
}

// Sample data
const projectsData: Project[] = [
    {
        id: 1,
        name: "Coastal Cleanup Initiative",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: Project2
    },
    {
        id: 2,
        name: "Mangrove Restoration",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: MangroveRestoration
    },
    {
        id: 3,
        name: "Community Education Program",
        location: "Mormugao, Goa",
        category: "Education",
        image: Project4
    },
    {
        id: 4,
        name: "Green Energy Initiative",
        location: "Mormugao, Goa",
        category: "Energy",
        image: Project3
    },
    {
        id: 5,
        name: "Marine Conservation Project",
        location: "Mormugao, Goa",
        category: "Environmental",
        image: Project2
    },
];

// Available categories
const categories = ["All", "Environmental", "Education", "Energy", "Healthcare", "Community Development"];

const MissionInAction: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 3;

    // Enhanced Animation Variants
    const containerVariants: Variants = {
        hidden: { 
            opacity: 0,
            transition: {
                when: "afterChildren"
            }
        },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { 
            y: 50, 
            opacity: 0,
            scale: 0.9
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                mass: 0.5
            }
        },
        hover: {
            scale: 1.05,
            rotate: 1,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    const headerVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: -50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    // Filter projects when category changes
    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredProjects(projectsData);
        } else {
            setFilteredProjects(projectsData.filter(project => project.category === selectedCategory));
        }
        setCurrentPage(0);
    }, [selectedCategory]);

    // Get current page projects
    const getCurrentProjects = () => {
        const startIndex = currentPage * projectsPerPage;
        return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
    };

    // Navigate to previous page
    const prevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    // Navigate to next page
    const nextPage = () => {
        setCurrentPage(prev => Math.min(Math.ceil(filteredProjects.length / projectsPerPage) - 1, prev + 1));
    };

    return (
        <div id="Project" className="bg-gradient-to-b from-green-400/70 to-green-100/70 min-h-screen p-4 md:p-6 lg:p-12">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap');
            `}</style>
            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <motion.header 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={headerVariants}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-green-900 mb-6 md:mb-0 font-merriweather">
                        Our Mission in Action
                    </h1>
                </motion.header>

                {/* Featured project */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={headerVariants}
                >
                    <div className="text-green-950">
                        <h3 className="text-xl md:text-xl font-medium mb-4 font-merriweather">At <span className='text-3xl text-white'>ActNow</span>, we are committed to creating awareness and inspiring action toward the United Nations Sustainable Development Goals (SDGs). Through our platform, we aim to connect passionate individuals with impactful projects, enabling real change in communities that need it most.
                        </h3>

                       <a href="#ViewProject"><Button variant="outline" className="text-green-900 hover:bg-green-900 hover:text-white border-2  px-4 py-3 text-lg font-raleway">
                            Read More
                        </Button></a>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={headerVariants}
                    className="md:w-[20%] w-[45%] ml-auto mb-10"
                >
                    <Select onValueChange={setSelectedCategory} defaultValue="All">
                        <SelectTrigger className="w-40 md:w-52 bg-green-900/80 text-white border-none font-raleway">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Project grid */}
                <motion.div
                    className="mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {getCurrentProjects().map((project) => (
                            <motion.div
                                key={project.id}
                                className="relative overflow-hidden rounded-md group"
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <div
                                    className="h-100 bg-gradient-to-b from-green-800 to-green-400 rounded-md"
                                    style={{
                                        backgroundImage: project.image ? `url(${project.image})` : undefined,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                                    <p className="text-sm text-gray-600">{project.location}</p>
                                    <h3 className="text-xl font-medium text-green-900">{project.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Pagination */}
                <motion.div 
                    className="flex justify-center space-x-4 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={headerVariants}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-green-900 text-green-900"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-green-900 text-green-900"
                        onClick={nextPage}
                        disabled={currentPage >= Math.ceil(filteredProjects.length / projectsPerPage) - 1}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </motion.div>

                {/* Tagline */}
                <motion.div
                    className="text-center text-green-900"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={headerVariants}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light ">
                        Catalyze Change.
                    </h2>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
                        Transform Tomorrow.
                    </h2>
                </motion.div>
            </div>
        </div>
    );
};

export default MissionInAction;