import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section className="section education" id="education">
      <div className="section-inner education-inner">
        <motion.div
          className="section-copy"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic foundation</h2>
          <p className="section-text">
            I am currently pursuing a{' '}
            <strong>
              Bachelor of Science Honours in Information Technology
              Specializing in Information Systems Engineering
            </strong>{' '}
            at <strong>SLIIT</strong>.
          </p>
          <p className="section-text">
            My studies are helping me build a strong foundation in systems
            analysis, software development, Agile methodologies, and the
            connection between business requirements and effective technical
            solutions.
          </p>
        </motion.div>
        <motion.div
          className="education-icon"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <svg viewBox="0 0 64 64" fill="none">
            <path d="m7 24 25-12 25 12-25 12L7 24Z" />
            <path d="M17 29v15c8 7 22 7 30 0V29" />
            <path d="M57 24v18" />
            <circle cx="57" cy="46" r="3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
