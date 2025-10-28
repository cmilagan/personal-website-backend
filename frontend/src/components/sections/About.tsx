import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const skills = [
  'Dynatrace',
  'Go',
  'Kubernetes',
  'Terraform',
  'CI/CD',
  'Automation',
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center whitespace-nowrap">
        <span className="font-mono text-accent text-xl md:text-2xl mr-3">01.</span>
        About Me
        <span className="block w-full h-px bg-border ml-4"></span>
      </h2>
      <div className="grid md:grid-cols-5 gap-12 mt-8">
        <div className="md:col-span-3 space-y-4 text-muted-foreground">
          <p>
            Hello! I'm Christian, a passionate Site Reliability Engineer with a knack for building robust and scalable systems. My journey into tech started with a curiosity for how things work, which naturally led me to the world of automation and observability.
          </p>
          <p>
            I enjoy the challenge of ensuring services run smoothly, are highly available, and performant. My main focus these days is on automating infrastructure, improving monitoring and alerting, and building tools that empower development teams.
          </p>
          <p>Here are a few technologies I've been working with recently:</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-sm">
            {skills.map((skill) => (
              <li key={skill} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-accent mr-2" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 relative h-64 md:h-auto group">
          <div className="absolute inset-0 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
            <Image
              src="/files/dev.png"
              alt="Christian Ilagan Profile Picture"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg filter grayscale hover:filter-none transition-all duration-300 mix-blend-luminosity group-hover:mix-blend-normal"
              data-ai-hint="man portrait"
            />
          </div>
          <div className="absolute inset-0 border-2 border-accent rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
