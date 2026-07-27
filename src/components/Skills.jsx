import { motion } from 'framer-motion'

const skills = [
  {
    name: 'Business Analysis',
    detail: 'Requirements, processes, and value',
    icon: (
      <>
        <path d="M6 7h12M6 12h7M6 17h9" />
        <circle cx="18" cy="17" r="2" />
      </>
    ),
  },
  {
    name: 'Systems Analysis',
    detail: 'Understanding connected systems',
    icon: (
      <>
        <circle cx="6" cy="7" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="15" cy="18" r="2" />
        <path d="m8 7 8-1M7 9l7 7M17 8l-2 8" />
      </>
    ),
  },
  {
    name: 'Agile Methodologies',
    detail: 'Iterative and collaborative delivery',
    icon: (
      <>
        <path d="M19 8a7 7 0 0 0-12-2L5 8" />
        <path d="M5 4v4h4M5 16a7 7 0 0 0 12 2l2-2" />
        <path d="M19 20v-4h-4" />
      </>
    ),
  },
  {
    name: 'Software Development',
    detail: 'Building structured solutions',
    icon: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13 5l-2 14" />
      </>
    ),
  },
  {
    name: 'Java',
    detail: 'Object-oriented application development',
    icon: (
      <>
        <path d="M9 18h7a3 3 0 0 0 3-3v-4H7v4a3 3 0 0 0 2 3Z" />
        <path d="M19 12h1a2 2 0 0 1 0 4h-1M9 21h8M11 8c-2-2 3-2 1-5M15 8c-2-2 3-2 1-5" />
      </>
    ),
  },
  {
    name: 'SQL',
    detail: 'Relational data querying and management',
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </>
    ),
  },
  {
    name: 'Information Systems',
    detail: 'Aligning people, data, and technology',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 9h16M9 9v11M13 13h4M13 16h4" />
      </>
    ),
  },
  {
    name: 'Problem Solving',
    detail: 'Turning complexity into clear action',
    icon: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M8.5 15.5A7 7 0 1 1 15.5 15.5c-1 .7-1.5 1.4-1.5 2.5h-4c0-1.1-.5-1.8-1.5-2.5Z" />
      </>
    ),
  },
]

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="section-inner">
        <motion.div
          className="skills-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Skills I&apos;m building with purpose.</h2>
          <p className="section-text">
            A growing toolkit for connecting business goals with practical,
            well-designed technology solutions.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.article
              className="skill-card"
              key={skill.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="skill-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  {skill.icon}
                </svg>
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
