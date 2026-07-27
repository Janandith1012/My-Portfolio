import { motion } from 'framer-motion'
import CvManager from './CvManager'
import ProfilePhoto from './ProfilePhoto'

export default function Hero({
  profilePhoto,
  onProfilePhotoChange,
  cv,
  uploadCv,
  renameCv,
  removeCv,
}) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-rings">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-coordinates hero-coordinates-left">
          06.9271° N&nbsp;&nbsp;79.8612° E
        </div>
        <div className="hero-coordinates hero-coordinates-right">
          SYSTEMS / DATA / PEOPLE
        </div>
        <div className="hero-data-card hero-data-card-a">
          <span>01</span>
          <strong>Analyse</strong>
          <small>Requirements</small>
        </div>
        <div className="hero-data-card hero-data-card-b">
          <span>02</span>
          <strong>Design</strong>
          <small>Solutions</small>
        </div>
        <svg className="hero-circuit" viewBox="0 0 1200 700" fill="none">
          <path d="M0 160H180L230 210H420" />
          <path d="M1200 540H1040L980 480H820L760 420H610" />
          <path d="M105 700V580L165 520V390" />
          <circle cx="230" cy="210" r="5" />
          <circle cx="980" cy="480" r="5" />
          <circle cx="760" cy="420" r="5" />
          <circle cx="165" cy="520" r="5" />
        </svg>
        <svg className="hero-diagram" viewBox="0 0 800 600" fill="none">
          <path
            d="M80 420 L220 280 L360 340 L520 180 L680 260"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="220" cy="280" r="8" fill="currentColor" />
          <circle cx="360" cy="340" r="8" fill="currentColor" />
          <circle cx="520" cy="180" r="8" fill="currentColor" />
          <circle cx="680" cy="260" r="8" fill="currentColor" />
          <rect
            x="470"
            y="320"
            width="180"
            height="120"
            rx="4"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.45"
          />
          <path
            d="M490 360 H630 M490 390 H580 M490 420 H610"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="hero-layout">
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Information Systems Engineering
          </motion.p>

          <motion.h1
            id="hero-brand"
            className="hero-brand"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Hansaja</span>
            <span>Janandith</span>
          </motion.h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Designing reliable information systems with clarity, structure, and
            purpose.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <a className="btn btn-primary" href="#projects">
              Explore projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </motion.div>
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.6 }}
            aria-label="Social media profiles"
          >
            <a
              href="https://www.instagram.com/hansa.vintage?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" className="social-dot" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/share/14rydtmZq47/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .3-1.5 1.7-1.5H18V4.2c-.7-.1-1.6-.2-2.6-.2C12.7 4 11 5.6 11 8.6V10H8v3h3v8" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://www.linkedin.com/in/hansaja-janandith-15a712413/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="9" width="3" height="11" />
                <circle cx="5.5" cy="5.5" r="1.5" />
                <path d="M11 20V9h3v1.7c.8-1.3 2-2 3.5-2 2.5 0 3.5 1.7 3.5 4.8V20h-3v-6c0-1.7-.6-2.5-1.8-2.5-1.4 0-2.2 1-2.2 3V20h-3Z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>
        <div className="hero-profile-column">
          <CvManager
            cv={cv}
            uploadCv={uploadCv}
            renameCv={renameCv}
            removeCv={removeCv}
          />
          <ProfilePhoto photo={profilePhoto} onChange={onProfilePhotoChange} />
        </div>
      </div>
    </section>
  )
}
