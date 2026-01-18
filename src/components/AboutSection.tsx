
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className={cn(
          "section-heading",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className={cn(
            "space-y-6",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
          style={{ animationDelay: '200ms' }}
          >
            <p className="text-lg text-black">
              Hello! I'm Ayush Gupta, a passionate web developer. I enjoy creating beautiful,
              functional websites and applications that deliver exceptional user experiences.
            </p>
            
            <p>
              I am currently pursuing my Bachelor's degree in Computer Science and Engineering from Ajay Kumar Garg Engineering College, Ghaziabad.
              In addition to my studies, I have a keen interest in web development and design.
              I have experience with various technologies including HTML, CSS, JavaScript, React, and Node.js.
            </p>
            
            <p>
              My goal is to build products that are not only visually appealing but also accessible and performant.
              I believe in clean code, user-centered design, and continuous learning.
            </p>

          </div>
          
          <div className={cn(
            "relative",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
          style={{ animationDelay: '400ms' }}
          >
            <div className="relative rounded-md overflow-hidden aspect-square">
              <img 
                src="/20250317_101456.jpg"
                alt="Ayush Gupta" 
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom hook to detect when an element is visible in the viewport
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options = { threshold: 0.1 }
) {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return isVisible;
}

export default AboutSection;
