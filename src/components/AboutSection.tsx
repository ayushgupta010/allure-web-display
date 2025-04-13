
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
            <p className="text-lg">
              Hello! I'm John, a passionate web developer based in San Francisco, CA. I enjoy creating beautiful,
              functional websites and applications that deliver exceptional user experiences.
            </p>
            
            <p>
              I graduated from the University of California with a degree in Computer Science in 2020. 
              Since then, I've been working with a diverse range of clients from startups to large corporations.
            </p>
            
            <p>
              My goal is to build products that are not only visually appealing but also accessible and performant.
              I believe in clean code, user-centered design, and continuous learning.
            </p>
            
            <p>
              When I'm not coding, you can find me hiking, reading science fiction, or exploring new coffee shops.
            </p>
          </div>
          
          <div className={cn(
            "relative",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
          style={{ animationDelay: '400ms' }}
          >
            <div className="relative rounded-md overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-teal/20 z-10 rounded-md"></div>
              <div className="absolute inset-0 border-2 border-teal rounded-md translate-x-4 translate-y-4 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&q=80"
                alt="John Doe" 
                className="object-cover w-full h-full rounded-md z-0 grayscale hover:grayscale-0 transition-all duration-300"
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
