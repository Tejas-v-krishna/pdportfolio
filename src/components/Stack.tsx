const STACK = [
  {
    category: 'Design',
    items: [
      { name: 'Figma', note: 'Primary tool — design systems, prototyping, components' },
      { name: 'Pen & Paper', note: 'Thinking tool — structure before pixels' },
    ],
  },
  {
    category: 'Development',
    items: [
      { name: 'Next.js / React', note: 'Frontend framework' },
      { name: 'TypeScript', note: 'Type-safe development' },
      { name: 'Tailwind CSS', note: 'Utility-first styling' },
      { name: 'Node.js / Express', note: 'Backend APIs' },
      { name: 'MongoDB / Supabase', note: 'Data layer' },
    ],
  },
  {
    category: 'AI & Workflow',
    items: [
      { name: 'Claude', note: 'Research, copy, ideation' },
      { name: 'Cursor', note: 'AI-assisted development' },
      { name: 'GSAP / Framer Motion', note: 'Animation layer' },
      { name: 'Lenis', note: 'Smooth scroll' },
    ],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
      data-animate="stack"
      className="section"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-wide">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
          <div className="accent-line" />
          <span className="tag">Tools & Stack</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          {STACK.map(group => (
            <div key={group.category}>
              <p
                className="tag"
                style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}
              >
                {group.category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {group.items.map(item => (
                  <div
                    key={item.name}
                    className="tool-item"
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                  >
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text)' }}>
                      {item.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-subtle)', letterSpacing: '0.06em' }}>
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
