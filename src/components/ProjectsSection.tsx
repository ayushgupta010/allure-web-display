
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with shopping cart, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=2000",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity application with drag-and-drop task management, reminders, and team collaboration.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000",
      technologies: ["TypeScript", "Redux", "Firebase", "Material UI"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Real Estate Website",
      description: "A property listing platform with search filters, virtual tours, and appointment scheduling.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000",
      technologies: ["Next.js", "TailwindCSS", "PostgreSQL", "Google Maps API"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Weather Application",
      description: "A responsive weather app providing forecasts, radar maps, and severe weather alerts.",
      image: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&q=80&w=2000",
      technologies: ["React", "OpenWeather API", "Chart.js", "Styled Components"],
      liveLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="container max-w-6xl mx-auto">
        <h2 className={cn(
          "section-heading",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          Featured Projects
          <a href="#" className="ml-auto text-sm font-normal text-blue hover:underline hidden md:block">View All Projects →</a>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, idx) => (
            <div 
              key={project.title}
              className={cn(
                "group bg-[#112240] rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden bg-navy-lighter">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] font-bold tracking-wider uppercase bg-blue/10 text-blue px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-lightest mb-2 group-hover:text-blue transition-colors">{project.title}</h3>
                
                <p className="text-slate text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                
                <div className="mt-auto pt-4 flex items-center gap-6">
                    <a href={project.liveLink} className="flex items-center gap-2 text-slate-lightest hover:text-blue transition-colors text-sm font-medium">
                        <ExternalLink size={16} />
                        Live Demo
                    </a>
                    <a href={project.githubLink} className="flex items-center gap-2 text-slate-lightest hover:text-blue transition-colors text-sm font-medium">
                        <Github size={16} />
                        GitHub
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="text-blue hover:underline font-medium">View All Projects →</a>
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

export default ProjectsSection;
