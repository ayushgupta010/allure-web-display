
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ExperienceSection = () => {
      const sectionRef = useRef<HTMLElement>(null);
      const isVisible = useIntersectionObserver(sectionRef);
      const [activeTab, setActiveTab] = useState(0);

      const experiences = [
            {
                  role: "B.Tech in Computer Science",
                  company: "AKGEC",
                  period: "Present",
                  description: [
                        "Pursuing Bachelor of Technology in Computer Science and Engineering.",
                        "Focusing on Data Structures, Algorithms, and Web Technologies.",
                        "Active member of technical societies and coding clubs."
                  ],
                  url: "#"
            },
            {
                  role: "Frontend Developer",
                  company: "Freelance",
                  period: "2023 - Present",
                  description: [
                        "Developed and maintained modern, responsive websites for various clients.",
                        "Implemented best practices for web performance and accessibility.",
                        "Collaborated with designers to translate UI/UX designs into functional code."
                  ],
                  url: "#"
            },
            {
                  role: "Web Development Intern",
                  company: "Startup Inc.",
                  period: "2023",
                  description: [
                        "Assisted in the development of core features for the company's main product.",
                        "Fixed bugs and improved code quality through code reviews.",
                        "Gained hands-on experience with React and state management libraries."
                  ],
                  url: "#"
            }
      ];

      return (
            <section
                  id="experience"
                  ref={sectionRef}
                  className="py-24 px-6"
            >
                  <div className="container max-w-4xl mx-auto">
                        <h2 className={cn(
                              "section-heading",
                              isVisible ? "animate-fade-in" : "opacity-0"
                        )}>
                              Where I've Worked
                        </h2>

                        <div className={cn(
                              "flex flex-col md:flex-row gap-8 mt-12",
                              isVisible ? "animate-fade-in" : "opacity-0"
                        )} style={{ animationDelay: '200ms' }}>

                              {/* Tabs */}
                              <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible">
                                    <div
                                          className="absolute bg-blue transition-all duration-300 rounded-sm"
                                          style={{
                                                width: '2px',
                                                height: '42px',
                                                left: 0,
                                                top: `${activeTab * 42}px`,
                                                display: window.innerWidth >= 768 ? 'block' : 'none'
                                          }}
                                    />
                                    <div
                                          className="absolute bg-blue transition-all duration-300 rounded-sm"
                                          style={{
                                                height: '2px',
                                                width: '100%',
                                                maxWidth: '120px',
                                                bottom: 0,
                                                left: `${activeTab * 120}px`,
                                                display: window.innerWidth < 768 ? 'block' : 'none'
                                          }}
                                    />

                                    {experiences.map((exp, i) => (
                                          <button
                                                key={i}
                                                onClick={() => setActiveTab(i)}
                                                className={cn(
                                                      "px-6 py-3 text-sm font-mono text-left whitespace-nowrap transition-colors duration-300 hover:bg-navy-light hover:text-blue min-w-[120px]",
                                                      activeTab === i ? "text-blue bg-navy-light/50" : "text-slate"
                                                )}
                                          >
                                                {exp.company}
                                          </button>
                                    ))}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-h-[300px]">
                                    {experiences.map((exp, i) => (
                                          <div
                                                key={i}
                                                className={cn(
                                                      "space-y-4",
                                                      activeTab === i ? "block animate-fade-in" : "hidden"
                                                )}
                                          >
                                                <div>
                                                      <h3 className="text-xl font-bold text-slate-lightest">
                                                            {exp.role} <span className="text-blue">@ <a href={exp.url} className="hover:underline">{exp.company}</a></span>
                                                      </h3>
                                                      <p className="font-mono text-sm text-slate md:float-left mb-2 md:mb-0">
                                                            {exp.period}
                                                      </p>
                                                </div>

                                                <ul className="space-y-4 pt-4">
                                                      {exp.description.map((item, j) => (
                                                            <li key={j} className="flex gap-3 text-slate relative">
                                                                  <span className="text-blue mt-1.5 flex-shrink-0 text-xs">▹</span>
                                                                  <span className="leading-relaxed">{item}</span>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    ))}
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

export default ExperienceSection;
