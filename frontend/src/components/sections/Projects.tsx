import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'StimPact Neural Stimulator',
    description: 'A cost-effective neural stimulator for researchers with real-time control.',
    tags: ['Firmware', 'Hardware', 'Backend', 'Frontend'],
    github: '#',
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'A responsive task management application that helps users organize their to-do lists with a clean, intuitive interface.',
    tags: ['React', 'Javascript', 'Node.js'],
    github: 'https://github.com/cmilagan/MotifY'
  },
  {
    title: 'Personal Portfolio V1',
    description: 'My first portfolio website, built from scratch to learn the fundamentals of web development and responsive design.',
    tags: ['React', 'Typescript', 'Styled Components'],
    github: 'https://github.com/cmilagan/webv2',
    link: 'https://cmilagan.github.io/webv2/',
  },
  {
    title: 'Personal Portfolio V2',
    description: 'The website you are currently viewing, showcasing my skills and projects with a modern design and smooth animations and ability to leverage AWS services.',
    tags: ['Next.js', 'Terraform', 'CI/CD', 'AWS'],
    github: 'https://github.com/cmilagan/cloud-resume-christian',
    link: null,
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center whitespace-nowrap">
        <span className="font-mono text-accent text-xl md:text-2xl mr-3">03.</span>
        Some Things I’ve Built
        <span className="block w-full h-px bg-border ml-4"></span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-card/80 hover:bg-card border-2 border-transparent hover:border-accent/50 transition-all duration-300 flex flex-col group"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <Folder className="h-10 w-10 text-accent" />
                <div className="flex items-center space-x-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                      <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                  {project.link && (
                     <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live project link">
                      <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-lg text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                {project.description}
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-mono text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
