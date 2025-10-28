import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/cmilagan', 'aria-label': 'GitHub profile' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/cmilagan/', 'aria-label': 'LinkedIn profile' },
];

const SocialLinks = () => {
  return (
    <>
      {/* Left Social Links */}
      <div className="hidden md:flex fixed bottom-0 left-10 z-10">
        <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-muted-foreground after:mt-6">
          {socialLinks.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
              <social.icon className="w-5 h-5 text-muted-foreground hover:text-accent hover:-translate-y-1 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* Right Email Link */}
      <div className="hidden md:flex fixed bottom-0 right-10 z-10">
        <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-muted-foreground after:mt-6">
          <a
            href="mailto:cmilagan7@gmail.com"
            className="font-mono text-sm tracking-widest text-muted-foreground hover:text-accent hover:-translate-y-1 transition-all"
            style={{ writingMode: 'vertical-rl' }}
          >
            cmilagan7@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialLinks;
