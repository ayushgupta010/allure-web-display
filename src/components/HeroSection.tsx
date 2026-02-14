import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    // Staggered animation for hero elements
    itemsRef.current.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animation = 'none';
        
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 300 + i * 200);
      }
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center animated-bg overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container max-w-6xl mx-auto px-6 py-20 pt-32">
        <div className="flex flex-col items-center text-center z-10">
          
          <div 
            ref={el => itemsRef.current[0] = el}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20 text-blue mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
            </span>
            <span className="text-sm font-medium tracking-wide">AVAILABLE FOR NEW OPPORTUNITIES</span>
          </div>

          <h1 
            ref={el => itemsRef.current[1] = el}
            className="text-5xl md:text-7xl font-bold text-slate-lightest mb-6 tracking-tight"
          >
            Hi, I'm <span className="text-blue">Ayush</span> — <br className="hidden md:block" />
            Full Stack Developer
          </h1>
          
          <p 
            ref={el => itemsRef.current[2] = el}
            className="max-w-2xl text-lg md:text-xl text-slate mb-10 leading-relaxed"
          >
            Building high-performance, scalable web applications with modern technologies. 
            Specialized in React, Node.js, and cloud architecture.
          </p>
          
          <div 
            ref={el => itemsRef.current[3] = el}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button 
              asChild
              className="bg-blue hover:bg-blue-hover text-white px-8 py-6 text-lg rounded-md shadow-lg shadow-blue/25 transition-all hover:scale-105"
            >
              <a href="#projects">View Projects</a>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="px-8 py-6 text-lg rounded-md border-slate-dark text-slate-light hover:bg-blue/10 hover:text-blue hover:border-blue/50 transition-all"
            >
              <a href="/resume.pdf" download>Download Resume</a>
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
