function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl animate-float delay-2000" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl animate-float delay-4000" />
    </div>
  );
}

export default AnimatedBackground;