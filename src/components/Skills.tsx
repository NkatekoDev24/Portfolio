import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C#", "Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React Native", "AngularJS", "React", "Node.js", ".NET", "Express.js", "Tailwind CSS"]
    },
    {
      title: "Databases",
      skills: ["SQL Server", "MongoDB", "Firebase", "PostgreSQL", "SQLite", "MySQL"]
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Android Studio", "Visual Studio", "Docker", "AWS", "Azure", "Figma", "Postman"]
    },
    {
      title: "Core Competencies",
      skills: ["Full-Stack Development", "Mobile App Development", "API Design", "Database Design", "System Architecture"]
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Team Collaboration", "Project Management", "Communication", "Agile Development"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Skills & Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card-gradient rounded-2xl p-6 shadow-card hover:shadow-elegant transition-smooth">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex} 
                    variant="secondary" 
                    className="bg-accent/20 text-accent hover:bg-accent/30 transition-smooth"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;