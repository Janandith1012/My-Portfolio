import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ProfilePhoto({ photo, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    if (file.size > 3 * 1024 * 1024) {
      setError('Please choose an image under 3MB.')
      return
    }

    try {
      onChange(await fileToDataUrl(file))
      setError('')
    } catch {
      setError('The image could not be loaded.')
    }
  }

  return (
    <motion.aside
      className="profile-photo-wrap"
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
        <button
          type="button"
          className="profile-edit"
          onClick={() => inputRef.current?.click()}
          aria-label={photo ? 'Change profile photo' : 'Add profile photo'}
        >
          {photo ? 'Change' : 'Add photo'}
        </button>
      </div>
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
      {error ? <p className="profile-error">{error}</p> : null}
    </motion.aside>
  )
}
