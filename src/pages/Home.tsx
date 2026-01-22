import { useState, useEffect } from 'react';
import Terminal from '../components/Terminal';
import { ChevronDown } from 'lucide-react';

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Progress from 0 to 1 over the first viewport height
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[200vh]">
      {/* Sticky container for terminal */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Terminal wrapper - shrinks and moves up */}
        <div
          className="w-full transition-all duration-100 ease-out"
          style={{
            padding: `0 ${scrollProgress * 10}%`,
            height: `${100 - scrollProgress * 40}%`,
          }}
        >
          <Terminal scrollProgress={scrollProgress} />
        </div>

        {/* Content Section - appears below terminal */}
        <div
          className="text-center max-w-2xl px-4 mt-8 transition-all duration-300"
          style={{
            opacity: Math.max(0, (scrollProgress - 0.5) * 2),
            transform: `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)`,
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Type help to get started</h2>
          <p className="text-muted-foreground"> 
          </p>
          <p className="text-muted-foreground">
            or check out the <a href="/about" className="text-primary hover:underline">About</a> page
            or <a href="/build" className="text-primary hover:underline">build</a>.
          </p>
        </div>

        {/* Scroll indicator - fades out as you scroll */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 animate-bounce text-muted-foreground hover:text-primary transition-all"
          style={{ opacity: 1 - scrollProgress * 2 }}
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
}

export default Home;