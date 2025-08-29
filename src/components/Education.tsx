import { GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "BSc Honours in Computer Science",
      institution: "University of the Free State",
      period: "Feb 2023 – Dec 2024",
      description:
        "Majors: Web Development, Data Warehousing, Mobile Development, Advanced Databases.",
      subjects: [
        "Web Development",
        "Data Warehousing",
        "Mobile Development",
        "Advanced Databases"
      ],
      projects: [
        "Job Interview Management System using Kotlin and Android Studio"
      ]
    },
    {
      degree: "BSc in Computer Science",
      institution: "University of the Free State",
      period: "Feb 2017 – Dec 2021",
      description:
        "Focus Areas: Software Engineering, Database Management, Computer Networks, Internet Programming.",
      subjects: [
        "Software Engineering",
        "Database Management",
        "Computer Networks",
        "Internet Programming"
      ],
      projects: []
    }
  ];

  const certificates = [
    {
      title: "Software Engineer Intern",
      platform: "HackerRank",
      year: "2025"
    },
    {
      title: "Ultimate C# Masterclass for 2024",
      platform: "Udemy",
      year: "2024"
    },
    {
      title: "Python Practice: Object-Oriented Programming",
      platform: "Udemy",
      year: "2024"
    },
    {
      title: "Build an App with ASP.NET Core & Angular from Scratch",
      platform: "Udemy",
      year: "2023"
    }
  ];

  return (
    <section id="education" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Education & Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-primary">Education</h3>
            </div>

            <div className="space-y-10">
              {education.map((edu, index) => (
                <div key={index} className="card-gradient rounded-2xl p-6 shadow-card">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h4>
                    <p className="text-accent font-medium text-lg mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.subjects.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-semibold mb-3 text-foreground">Major Subjects:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {edu.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.projects.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-3 text-foreground">Key Academic Projects:</h5>
                      <ul className="space-y-2">
                        {edu.projects.map((project, projIndex) => (
                          <li key={projIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-primary">Certifications</h3>
            </div>

            <div className="space-y-10">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="card-gradient rounded-xl p-6 shadow-card hover:shadow-elegant transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-2">{cert.title}</h4>
                      <p className="text-accent font-medium">{cert.platform}</p>
                    </div>
                    <span className="text-muted-foreground font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
