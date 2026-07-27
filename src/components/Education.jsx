import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section className="section education" id="education">
      <div className="section-inner education-layout">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic foundation</h2>
        </motion.div>

        <motion.article
          className="education-block"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <p className="education-degree">
            Bachelor of Science Honours in Information Technology
          </p>
          <p className="education-focus">
            Specialized in Information Systems Engineering
          </p>
          <p className="education-school">SLIIT</p>
        </motion.article>
      </div>
    </section>
  )
}
