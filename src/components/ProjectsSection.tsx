
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
      <div className="container max-w-5xl mx-auto">
        <h2 className={cn(
          "section-heading",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, idx) => (
            <div 
              key={project.title}
              className={cn(
                "project-card group",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex space-x-4">
                    <a href={project.githubLink} className="p-3 bg-navy-light rounded-full text-white hover:text-teal transition-colors" aria-label="View Github Repository">
                      <Github size={20} />
                    </a>
                    <a href={project.liveLink} className="p-3 bg-navy-light rounded-full text-white hover:text-teal transition-colors" aria-label="View Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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

export default ProjectsSection;
