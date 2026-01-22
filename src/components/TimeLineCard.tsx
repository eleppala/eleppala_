import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TimelineCardProps {
  title: string;
  image: string;
  preview: string;
  content: string;
  year: string;
  isLeft?: boolean;
  links?: { url: string; label: string; icon: React.ReactNode }[];
}

const TimelineCard = ({ title, image, preview, content, year, isLeft = false, links }: TimelineCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row-reverse" : ""}`}>
      {/* Timeline line */}
      <div className="hidden md:flex flex-col items-center">
      </div>

      {/* Card */}
      <motion.div
        layout
        className={`flex-1 max-w-xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Year badge */}
        <div className="px-4 pt-4">
          <span className="inline-block px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full">
            {year}
          </span>
        </div>

        {/* Image */}
        <div className=" relative h-56 mx-4 mt-3 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
          
          <p className="mt-2 text-muted-foreground text-sm">{preview}</p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border/50 mt-4">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{content}</p>
                  {links && links.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4">
                      {links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineCard;