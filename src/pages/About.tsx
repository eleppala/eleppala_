import { motion } from "framer-motion";
import TimelineCard from "../components/TimeLineCard";
import { timelineData } from "../content/timeline/timeLineData";

function About() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Coding Journey
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of my coding journey - more content will be added soon.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {/* Timeline cards */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TimelineCard
                  {...item}
                  isLeft={index % 2 === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;