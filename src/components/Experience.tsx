import { Calendar, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Junior Researcher & App Developer",
      company: "University of the Free State",
      period: "Jan 2024 – Present",
      description:
        "Involved in academic research projects and mobile application development focused on enhancing communication accessibility and business tools.",
      achievements: [
        "Developed the Lebitso mobile app using Android Studio for SASL (South African Sign Language) research",
        "Co-authored research reports supporting SASL integration with 4IR technologies",
        "Created a financial management app for small businesses using Android Studio",
        "Improved user experience and performance on research-driven applications"
      ]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Developmenthub",
      period: "Jul 2022 – Dec 2022",
      description:
        "Worked on both frontend and backend solutions using modern web frameworks to deliver scalable client applications.",
      achievements: [
        "Built dynamic web interfaces with Angular and ASP.NET Boilerplate (ABP)",
        "Designed backend services and RESTful APIs using Node.js",
        "Optimized client apps for responsiveness and cross-platform use",
        "Delivered real-time features that improved client satisfaction"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Work Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card-gradient rounded-2xl p-8 shadow-card hover:shadow-elegant transition-smooth"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Building className="w-5 h-5" />
                    <span className="text-lg font-medium">{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{exp.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {exp.description}
              </p>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Key Achievements:</h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
