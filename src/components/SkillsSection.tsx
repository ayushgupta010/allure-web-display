
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, Layout, Globe, Database, Server, Brain } from 'lucide-react';

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="w-10 h-10 text-teal" />,
      skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-10 h-10 text-teal" />,
      skills: ["Node.js", "Express", "Django", "Laravel", "Ruby on Rails", "REST APIs"]
    },
    {
      title: "Programming Languages",
      icon: <Code className="w-10 h-10 text-teal" />,
      skills: ["JavaScript", "TypeScript", "Python", "PHP", "Ruby", "Java"]
    },
    {
      title: "Database",
      icon: <Database className="w-10 h-10 text-teal" />,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase"]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-10 h-10 text-teal" />,
      skills: ["REST", "GraphQL", "WebSockets", "PWA", "SEO", "Web Performance"]
    },
    {
      title: "Other Skills",
      icon: <Brain className="w-10 h-10 text-teal" />,
      skills: ["Git", "Docker", "CI/CD", "Agile", "Jest", "Figma"]
    }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 bg-secondary/50"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className={cn(
          "section-heading",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category, idx) => (
            <div 
              key={category.title}
              className={cn(
                "bg-white p-6 rounded-lg shadow-md border border-border transition-all hover:shadow-lg",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="w-2 h-2 bg-teal rounded-full mr-2"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

  React.useEffect(() => {
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

export default SkillsSection;
