import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Linkedin, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Nkateko Nkuna</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-4">
            Software Developer
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-lg text-foreground/80 mb-8">
            <MapPin className="w-5 h-5" />
            <span>Universitas, Bloemfontein</span>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate software developer with expertise in full-stack development, mobile applications, 
            and modern web technologies. Dedicated to creating innovative solutions that drive business success 
            and deliver exceptional user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="mailto:nkunans98@gmail.com">
              <Button variant="hero" size="lg">
                <Mail className="w-5 h-5" />
                Contact Me
              </Button>
            </a>
            <a
              href="https://nkateko-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="glass" size="lg">
                <ExternalLink className="w-5 h-5" />
                View Portfolio
              </Button>
            </a>
          </div>

          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-6 text-foreground/80">
            <a href="mailto:nkunans98@gmail.com" className="flex items-center gap-2 hover:text-primary transition-smooth">
              <Mail className="w-4 h-4" />
              <span>nkunans98@gmail.com</span>
            </a>
            <a href="tel:+27846951479" className="flex items-center gap-2 hover:text-primary transition-smooth">
              <Phone className="w-4 h-4" />
              <span>+27 84 695 1479</span>
            </a>
            <a href="https://linkedin.com/in/nkateko-nkuna" className="flex items-center gap-2 hover:text-primary transition-smooth">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;