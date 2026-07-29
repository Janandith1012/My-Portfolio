import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-inner about-inner">
        <motion.div
          className="about-icon"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="5" y="23" width="18" height="22" rx="2" />
            <path d="M10 23v-4h8v4M9 29h10M9 35h10M9 41h6" />
            <rect x="41" y="21" width="17" height="26" rx="2" />
            <path d="M46 27h7M46 32h7M46 37h7M46 42h4" />
            <path d="M23 30c6-7 12-7 18 0M23 38c6-7 12-7 18 0" />
            <circle cx="32" cy="27" r="2" />
            <circle cx="32" cy="35" r="2" />
          </svg>
        </motion.div>
        <motion.div
          className="section-copy"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">About</p>
          <h2 className="section-title">Bridging business needs and technology.</h2>
          <p className="section-text">
            I am an Information Systems Engineering undergraduate at SLIIT
            with a strong interest in business analysis and technology-driven
            problem solving. I am building a solid foundation in systems
            analysis, Agile methodologies, and software development while
            developing the skills to bridge business needs with effective
            technical solutions.
          </p>
          <p className="section-text">
            I aspire to build a career as a Business Analyst, helping
            organizations improve processes, drive innovation, and create
            value through technology. I am eager to continuously learn,
            collaborate with diverse teams, and contribute to delivering
            impactful business solutions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
