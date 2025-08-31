import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import DemoAgent from "@/components/DemoAgent";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <DemoAgent />
      <section id="analytics" className="py-20">
        <div className="container mx-auto px-6">
          <AnalyticsDashboard />
        </div>
      </section>
    </div>
  );
};

export default Index;
