import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface TerminalLine {
  type: 'command' | 'response';
  text: string;
}

interface IntroLine {
  text: string;
  className: string;
}

const INITIAL_COMMAND = 'whoami';

const INTRO_LINES: IntroLine[] = [
  { text: "Hi, I'm Eemeli", className: "text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent" },
  { text: "Software Developer", className: "text-2xl md:text-3xl text-muted-foreground font-light tracking-wider" },
  { text: "Welcome to my page", className: "text-lg md:text-xl text-muted-foreground/70" },
  { text: "scroll down or type help", className: "text-sm text-primary/60 font-mono mt-4" },
];

const HELP_RESPONSE = [
  'Available commands:',
  '  whoami   - Show intro',
  '  about    - Learn more about me',
  '  skills   - View my tech stack',
  '  contact  - Get in touch',
  '  clear    - Clear terminal',
  '  More Commands Coming Soon!',
];

interface TerminalProps {
  scrollProgress?: number;
}

function Terminal({ scrollProgress = 0 }: TerminalProps) {
  const navigate = useNavigate();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [visibleIntroLines, setVisibleIntroLines] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCleared, setIsCleared] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate transform based on scroll
  const scale = 1 - (scrollProgress * 0.3);
  const translateY = scrollProgress * -100;
  const borderRadius = 8 + (scrollProgress * 16);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation for initial command
  useEffect(() => {
    if (typingIndex < INITIAL_COMMAND.length) {
      const timeout = setTimeout(() => {
        setCurrentCommand(INITIAL_COMMAND.slice(0, typingIndex + 1));
        setTypingIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else if (!showIntro) {
      const timeout = setTimeout(() => {
        setShowIntro(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, showIntro]);

  // Staggered intro line animation
  useEffect(() => {
    if (showIntro && visibleIntroLines < INTRO_LINES.length) {
      const timeout = setTimeout(() => {
        setVisibleIntroLines(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else if (showIntro && visibleIntroLines === INTRO_LINES.length && !isTypingComplete) {
      const timeout = setTimeout(() => {
        setIsTypingComplete(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showIntro, visibleIntroLines, isTypingComplete]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      const command = userInput.trim().toLowerCase();
      
      let response: string[] = [];
      
      switch (command) {
        case 'help':
          response = HELP_RESPONSE;
          break;
        case 'whoami':
          setLines([]);
          setIsCleared(false);
          setUserInput('');
          return;
        case 'about':
          response = ['Navigating to About page...'];
          setTimeout(() => navigate('/about'), 500);
          break;
        case 'contact':
          response = ['Navigating to Contact page...'];
          setTimeout(() => navigate('/contact'), 500);
          break;
        case 'skills':
          response = [
            'Tech Stack:',
            '  Languages: C, C++, TypeScript, JavaScript, Python',
            '  Frontend:  React, Vue, Nuxt, Tailwind CSS, Vite',
            '  Backend:   Node.js, Supabase',
            '  Tools:     Git, Docker, Linux',
          ];
          break;
        case 'clear':
          setLines([]);
          setIsCleared(true);
          setUserInput('');
          return;
        default:
          response = [`Command not found: ${command}`, 'Type "help" for available commands'];
      }

      setLines(prev => [
        ...prev,
        { type: 'command' as const, text: userInput },
        ...response.map(text => ({ type: 'response' as const, text })),
      ]);
      setUserInput('');
      
      setTimeout(() => {
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
      }, 10);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-card/95 backdrop-blur-md border border-border shadow-2xl overflow-auto transition-all duration-100"
      style={{
        transform: `scale(${scale}) translateY(${translateY}px)`,
        borderRadius: `${borderRadius}px`,
      }}
      onClick={handleTerminalClick}
    >
      {/* Terminal header */}
      <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3 bg-secondary/80 backdrop-blur-sm border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-sm text-muted-foreground font-mono">terminal — eemeli</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-6 md:p-10 font-mono text-sm md:text-lg min-h-[calc(100%-48px)] overflow-y-auto flex flex-col">
        {/* Initial typing animation */}
        {!isCleared && (
          <div className="flex items-center">
            <span className="text-primary mr-2">❯</span>
            <span>{showIntro ? INITIAL_COMMAND : currentCommand}</span>
            {!showIntro && <span className={`ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>}
          </div>
        )}
        
        {/* Impressive intro section */}
        {showIntro && !isCleared && (
          <div className="flex flex-col items-center justify-center flex-1 py-12 md:py-20 space-y-3">
            {INTRO_LINES.map((line, index) => (
              <div
                key={index}
                className={`${line.className} transition-all duration-500 ${
                  index < visibleIntroLines 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>
        )}
        
        {/* Rendered lines (after intro, for user commands) */}
        {lines.map((line, index) => (
          <div key={index} className={line.type === 'command' ? 'flex items-center' : 'ml-4 text-muted-foreground'}>
            {line.type === 'command' && <span className="text-primary mr-2">❯</span>}
            <span>{line.text}</span>
          </div>
        ))}
        
        {/* User input line */}
        {isTypingComplete && (
          <div className="flex items-center mt-2">
            <span className="text-primary mr-2">❯</span>
            <span>{userInput}</span>
            <span className={`ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute opacity-0 pointer-events-auto"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
