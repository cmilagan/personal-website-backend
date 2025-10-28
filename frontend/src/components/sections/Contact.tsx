import React from 'react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 text-center flex flex-col items-center">
      <h2 className="font-mono text-accent">04. What's Next?</h2>
      <h3 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">Get In Touch</h3>
      <p className="max-w-xl mx-auto mt-6 text-muted-foreground">
        My inbox is always open. Whether you have a question, a project proposal, or just want to say hi, I'll do my best to get back to you!
      </p>
      <div className="mt-10">
        <a href="mailto:cmilagan7@gmail.com">
          <Button size="lg" variant="outline">
            Say Hello
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Contact;
