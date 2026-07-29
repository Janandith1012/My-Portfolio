import { motion } from 'framer-motion'

export default function ProfilePhoto({ photo }) {
  function moveGlow(event) {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 44
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 38

    element.style.setProperty('--profile-glow-x', `${x}px`)
    element.style.setProperty('--profile-glow-y', `${y}px`)
  }

  function resetGlow(event) {
    event.currentTarget.style.setProperty('--profile-glow-x', '0px')
    event.currentTarget.style.setProperty('--profile-glow-y', '0px')
  }

  return (
    <motion.aside
      className="profile-photo-wrap"
      onPointerMove={moveGlow}
      onPointerLeave={resetGlow}
      initial={{ opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.45, duration: 0.8 }}
    >
      <div className="profile-photo">
        {photo ? (
          <img src={photo} alt="Hansaja Janandith" />
        ) : (
          <div className="profile-placeholder" aria-label="Hansaja Janandith">
            <span>HJ</span>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
