
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center animated-bg pt-20">
      <div className="container max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <p 
            ref={el => itemsRef.current[0] = el} 
            className="font-mono text-teal"
          >
            Hello, my name is
          </p>
          
          <h1 
            ref={el => itemsRef.current[1] = el}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            John Doe.
          </h1>
          
          <h2 
            ref={el => itemsRef.current[2] = el}
            className="text-3xl md:text-5xl font-bold text-white/70"
          >
            I build things for the web.
          </h2>
          
          <p 
            ref={el => itemsRef.current[3] = el}
            className="max-w-lg text-lg text-white/70"
          >
            I'm a web developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on building accessible, human-centered products.
          </p>
          
          <div ref={el => itemsRef.current[4] = el}>
            <Button 
              asChild
              className="bg-transparent hover:bg-teal/10 text-teal border border-teal rounded-md mt-8 px-8 py-6"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <a href="#about" aria-label="Scroll down">
          <ChevronDown size={32} className="text-teal" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
