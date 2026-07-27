import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-inner">
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
