'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const Hero = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increment visitor count when component mounts
    const trackVisit = async () => {
      // Use Lambda API Gateway endpoint if provided, otherwise fall back to local API
      const apiEndpoint = process.env.NEXT_PUBLIC_VISITOR_API_URL || '/api/visitor-count';

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
        });
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error tracking visit:', error);
        // Fallback: try to get count without incrementing
        try {
          const response = await fetch(apiEndpoint);
          const data = await response.json();
          setVisitorCount(data.count);
        } catch (fallbackError) {
          console.error('Error fetching visitor count:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center">
      <div>
        <p className="text-accent font-mono mb-4 text-base md:text-lg">
          Hi, my name is
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
          Christian Ilagan.
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mt-2">
          I build and maintain reliable systems.
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          I'm a Site Reliability Engineer (SRE) specializing in automation and observability. I have a passion for creating resilient, scalable infrastructure and ensuring services are always running at their best.
        </p>

        {/* Visitor Counter */}
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Eye className="w-4 h-4" />
          <span>
            {isLoading ? (
              'Loading visitors...'
            ) : visitorCount !== null ? (
              <>Site visitors: <span className="text-accent font-semibold">{visitorCount.toLocaleString()}</span></>
            ) : (
              'Unable to load visitor count'
            )}
          </span>
        </div>

        <div className="mt-12">
          <a href="#projects">
            <Button size="lg">Check out my projects!</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
