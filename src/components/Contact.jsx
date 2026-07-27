import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="section-inner contact-layout">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let&apos;s connect</h2>
          <p className="section-text">
            Open to opportunities, collaborations, and conversations about
            information systems and technology.
          </p>
        </motion.div>

        <motion.div
          className="contact-links"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <a className="contact-link" href="mailto:janandith1012@gmail.com">
            <span className="contact-link-label">Email</span>
            <span className="contact-link-value">janandith1012@gmail.com</span>
          </a>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/hansaja-janandith-15a712413/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-link-label">LinkedIn</span>
            <span className="contact-link-value">hansaja-janandith</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
