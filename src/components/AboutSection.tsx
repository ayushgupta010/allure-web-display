
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-navy-light/30"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className={cn(
          "section-heading",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">

          <div className={cn(
            "relative group order-2 md:order-1",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute inset-0 border-2 border-blue translate-x-4 translate-y-4 rounded-md transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative rounded-md overflow-hidden bg-blue/20">
                <img
                  src="/20250317_101456.jpg"
                  alt="Ayush Gupta"
                  className="object-cover w-full h-full rounded-md grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-blue/20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className={cn(
            "space-y-6 order-1 md:order-2",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
            style={{ animationDelay: '200ms' }}
          >
            <h3 className="text-2xl font-bold text-slate-lightest">
              Mastering the <span className="text-blue">Modern Web</span>
            </h3>

            <p className="text-lg text-slate leading-relaxed">
              Hello! I'm Ayush Gupta, a passionate web developer. I enjoy creating beautiful,
              functional websites and applications that deliver exceptional user experiences.
            </p>

            <p className="text-slate leading-relaxed">
              I am currently pursuing my Bachelor's degree in Computer Science and Engineering from Ajay Kumar Garg Engineering College, Ghaziabad.
              In addition to my studies, I have a keen interest in web development and design.
              I have experience with various technologies including HTML, CSS, JavaScript, React, and Node.js.
            </p>

            <p className="text-slate leading-relaxed">
              My goal is to build products that are not only visually appealing but also accessible and performant.
              I believe in clean code, user-centered design, and continuous learning.
            </p>

            <div className="pt-4">
              <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-light">
                {['React', 'Node.js', 'Express', 'MongoDB'].map(tech => (
                  <div key={tech} className="flex items-center gap-2">
                    <span className="text-blue">▹</span> {tech}
                  </div>
                ))}
              </div>
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
