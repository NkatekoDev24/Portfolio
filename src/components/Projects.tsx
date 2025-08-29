import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Lebitso Mobile App",
      type: "Mobile Application",
      description:
        "An Android mobile application developed to support South African Sign Language (SASL) research. The app enables users to easily access, record, and store SASL name entries for study and reference.",
      technologies: ["Android Studio", "Java"],
      features: [
        "Intuitive native user interface",
        "Streamlined data entry for researchers",
        "Offline accessibility for field use"
      ],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Job Interview Management System",
      type: "Mobile Application",
      description:
        "A smart HR-focused mobile app designed to streamline recruitment by generating custom interview questions based on job roles and required competencies. The platform also supports job postings, candidate applications, and automated reporting.",
      technologies: ["Kotlin", "Android Studio", "Firebase"],
      features: [
        "Automated interview question generation",
        "Employer dashboard to manage job postings",
        "Candidate application functionality",
        "Integrated reporting system"
      ],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Good Money Habits",
      type: "Mobile Application",
      description:
        "An educational mobile application designed to help small businesses and individuals build strong financial habits. The app includes interactive video lessons, progress tracking, and gamified achievements.",
      technologies: ["Java", "Android Studio", "Firebase"],
      features: [
        "15 structured video tutorials",
        "Feedback feature after each lesson",
        "Badge system to reward progress",
        "Full offline functionality"
      ],
      icon: <Smartphone className="w-6 h-6" />
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-gradient rounded-2xl p-8 shadow-card hover:shadow-elegant transition-smooth"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">{project.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                      <p className="text-accent font-medium">{project.type}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-foreground">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="default" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4" />
                      Source Code
                    </Button>
                  </div>
                </div>

                <div className="lg:w-80">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">
                    Key Features:
                  </h4>
                  <ul className="space-y-3">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
