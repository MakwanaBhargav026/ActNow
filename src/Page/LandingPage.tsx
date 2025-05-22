import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./../components/Reusable/Navbar";
import MainImage from "./../assets/main2.png"; // Adjust the path as necessary
gsap.registerPlugin(ScrollTrigger);

const FirstPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    // Navbar Fade-in
    tl.from("nav", { opacity: 0, y: -20 });

    // Left Content Animation
    if (leftRef.current) {
      tl.from(leftRef.current, { x: -100, opacity: 0 }, "-=0.5");
    }

    // Image Scale-in
    if (rightRef.current) {
      tl.from(rightRef.current, { scale: 0.8, opacity: 0 }, "-=0.5");
    }

    // Buttons Staggered Fade-in
    if (buttonsRef.current && buttonsRef.current.children.length > 0) {
      tl.from(buttonsRef.current.children, { opacity: 0, y: 20, stagger: 0.2 });
    }

    // Smooth Scroll Effect with ScrollTrigger
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 1 },
        {
          opacity: 1, // No change to opacity, just scroll-triggered smoothness
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    }
  }, []);
  
  return (
    <div ref={containerRef} className="h-screen w-screen bg-white flex flex-col opacity-0">
      <Navbar />
  
      {/* Responsive Layout */}
      <div className="flex-grow flex flex-col lg:flex-row items-center px-6 pt-2 md:px-12 lg:px-16">
        
        {/* Left Section (Text) */}
        <div ref={leftRef} className="w-full lg:w-1/2 text-center lg:text-left lg:ml-10 lg:pl-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-merriweather" style={{ fontFamily: "Merriweather, serif" }}>
            Together, We Can Create a Better Tomorrow
          </h1>
          <p className="hidden lg:block mt-10 text-2xl font-raleway">
            Join us in building a greener, fairer world by taking action on the Sustainable Development Goals (SDGs). 
            Every choice we make today shapes the world of tomorrow. Let&apos;s work together to protect our planet, 
            promote social equity, and create a thriving future for all.
          </p>
          <div ref={buttonsRef} className="hidden lg:flex mt-10 font-raleway text-xl gap-4">
            <button className="w-44 bg-[#124632] px-6 py-3 text-white rounded-sm cursor-pointer hover:border-[#7ABDA3] border-2">
              Get Involved
            </button>
            <button className="w-44 bg-gray-300 opacity-80 px-6 py-3 text-[#124632] rounded-sm cursor-pointer border-[#7ABDA3] hover:border-[#124632] border-2">
              Learn More
            </button>
          </div>
        </div>
  
        {/* Right Section (Image) */}
        <div ref={rightRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0 lg:mr-10">
          <img 
            src={MainImage}
            alt="Main Image"
            width={400}
            height={400}
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full h-auto rounded-lg"
          />
        </div>
      </div>
  
      {/* Mobile/Tablet Layout: Paragraph & Buttons below Image */}
      <div className="lg:hidden px-6 md:px-12 text-center">
        <p className="mt-6 text-lg sm:text-xl md:text-2xl font-raleway">
          Join us in building a greener, fairer world by taking action on the Sustainable Development Goals (SDGs). 
          Every choice we make today shapes the world of tomorrow. Let&apos;s work together to protect our planet, 
          promote social equity, and create a thriving future for all.
        </p>
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="w-44 bg-[#124632] px-6 py-3 text-white rounded-sm cursor-pointer hover:border-[#7ABDA3] border-2">
            Get Involved
          </button>
          <button className="w-44 bg-gray-300 opacity-80 px-6 py-3 text-[#124632] rounded-sm cursor-pointer border-[#7ABDA3] hover:border-[#124632] border-2">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default FirstPage;

