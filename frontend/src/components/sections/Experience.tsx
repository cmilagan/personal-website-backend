'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

const experiences = [
  {
    company: 'Dynatrace',
    value: 'dynatrace',
    role: 'Site Reliability Engineer',
    duration: '2024 - Present',
    description: [
      'Focus on enhancing system reliability and performance through proactive monitoring, alerting, automation, and incident response.',
      'Develop and maintain observability tooling using Dynatrace.',
      'Work with development teams to establish SLOs/SLIs and promote a culture of reliability across the organization.',
      'Performed root cause analysis of production issues and contributed to improving overall system stability.',
    ],
  },
  {
    company: 'Tyro Payments',
    value: 'tyro-payments',
    role: 'Software Development Engineer in Test',
    duration: '2023 - 2024',
    description: [
      'Designed and implemented automated testing frameworks for payment processing systems, web & mobile applications to ensure high quality and reliability.',
      'Collaborated with developers to integrate automated tests into the CI/CD pipeline, improving release velocity.',
      'Enabled external teams to create and maintain their own automated test cases, encouraging a shift left culture',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center whitespace-nowrap">
        <span className="font-mono text-accent text-xl md:text-2xl mr-3">02.</span>
        Where I’ve Worked
        <span className="block w-full h-px bg-border ml-4"></span>
      </h2>
      <div className="mt-8 max-w-4xl mx-auto">
        <Tabs defaultValue={experiences[0].value} className="flex flex-col md:flex-row gap-6 md:gap-10">
          <TabsList className="grid grid-flow-col auto-cols-max md:flex md:flex-col h-auto bg-transparent p-0 border-b-2 md:border-b-0 md:border-l-2 border-border/30">
            {experiences.map((exp) => (
              <TabsTrigger
                key={exp.value}
                value={exp.value}
                className="justify-start text-left h-12 px-4 py-2 whitespace-nowrap font-mono text-sm rounded-none data-[state=active]:bg-accent/10 data-[state=active]:text-accent border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-ml-px border-transparent data-[state=active]:border-accent transition-all duration-300"
              >
                {exp.company}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="md:min-h-[300px]">
            {experiences.map((exp) => (
              <TabsContent key={exp.value} value={exp.value} className="mt-0">
                <h3 className="text-xl font-bold text-foreground">
                  {exp.role}{' '}
                  <span className="text-accent">@ {exp.company}</span>
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-1 mb-4">{exp.duration}</p>
                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-accent mr-3 mt-1 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Experience;
