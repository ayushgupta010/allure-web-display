import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiBase}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      
      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 bg-navy text-white"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className={cn(
          "section-heading text-white after:bg-navy-light",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div 
            className={cn(
              "space-y-8",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: '200ms' }}
          >
            <p className="text-white/80 text-lg">
              I'm currently looking for new opportunities. Whether you have a question
              or just want to say hi, I'll do my best to get back to you!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-teal mr-3" size={20} />
                <span>ayushgupta83681@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-teal mr-3" size={20} />
                <span>+91 9310227752</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-teal mr-3" size={20} />
                <span>Ghaziabad, India</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://github.com/ayushgupta010" className="p-3 bg-navy-light rounded-full text-white hover:text-teal transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/ayush-guptaa0001/" className="p-3 bg-navy-light rounded-full text-white hover:text-teal transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/home?utm_source=homescreen&utm_medium=shortcut" className="p-3 bg-navy-light rounded-full text-white hover:text-teal transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className={cn(
              "space-y-6 bg-navy-light p-6 rounded-lg",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: '400ms' }}
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-navy-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal hover:bg-teal-dark text-navy font-medium py-3 rounded-md transition-colors flex items-center justify-center"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send Message <Send size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Import missing icons
const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

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

export default ContactSection;
