const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">Professional Objective</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              As a dedicated software developer, I strive to leverage my technical expertise in 
              full-stack development, mobile applications, and emerging technologies to create 
              innovative solutions that address real-world challenges.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am passionate about continuous learning, collaborative development, and building 
              scalable applications that make a meaningful impact. My goal is to contribute to 
              cutting-edge projects while growing as a developer.
            </p>
          </div>
          
          <div className="card-gradient rounded-2xl p-8 shadow-card">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Core Values</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Innovation</h4>
                  <p className="text-muted-foreground">Constantly exploring new technologies and methodologies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Quality</h4>
                  <p className="text-muted-foreground">Committed to writing clean, maintainable, and efficient code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Collaboration</h4>
                  <p className="text-muted-foreground">Thriving in team environments and knowledge sharing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;