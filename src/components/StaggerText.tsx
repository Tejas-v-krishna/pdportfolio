interface StaggerTextProps {
  text: string;
  className?: string;
  staggerStep?: number;
}

export default function StaggerText({ text, className = '', staggerStep = 25 }: StaggerTextProps) {
  const chars = text.split('');

  return (
    <span className={`relative inline-flex overflow-hidden select-none py-[0.3em] -my-[0.3em] px-[0.12em] -mx-[0.12em] leading-normal ${className}`}>
      {/* Primary Row (Slides UP out of view) */}
      <span className="inline-flex">
        {chars.map((char, i) => (
          <span
            key={`p-${i}`}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[135%]"
            style={{ transitionDelay: `${i * staggerStep}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Secondary Row (Slides UP into view from below) */}
      <span className="absolute top-[0.3em] left-[0.12em] inline-flex">
        {chars.map((char, i) => (
          <span
            key={`s-${i}`}
            className="inline-block translate-y-[135%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${i * staggerStep}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
