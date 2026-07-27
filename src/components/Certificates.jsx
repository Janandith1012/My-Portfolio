import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import PdfCertificatePreview from './PdfCertificatePreview'

const emptyForm = {
  title: '',
  issuer: '',
  date: '',
  credentialUrl: '',
  imageData: '',
  imageName: '',
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Certificates({
  certificates,
  addCertificate,
  removeCertificate,
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  async function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError('Please upload an image or PDF of your certificate.')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('File must be under 4MB.')
      return
    }

    try {
      const imageData = await fileToDataUrl(file)
      setForm((prev) => ({
        ...prev,
        imageData,
        imageName: file.name,
      }))
      setError('')
    } catch {
      setError('Could not read that file. Try another one.')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.issuer.trim()) {
      setError('Title and issuer are required.')
      return
    }

    addCertificate({
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      date: form.date,
      credentialUrl: form.credentialUrl.trim(),
      imageData: form.imageData,
      imageName: form.imageName,
    })

    setForm(emptyForm)
    setError('')
    setOpen(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  function closeForm() {
    setOpen(false)
    setError('')
    setForm(emptyForm)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <section className="section certificates" id="certificates">
      <div className="section-inner">
        <div className="certificates-header">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <p className="section-label">Certificates</p>
            <h2 className="section-title">Credentials &amp; learning</h2>
            <p className="section-text certificates-intro">
              Showcase certifications and course completions. Add new ones any
              time — they stay saved in this browser.
            </p>
          </motion.div>

          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Post certificate
          </motion.button>
        </div>

        {certificates.length === 0 ? (
          <motion.div
            className="certificates-empty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>No certificates posted yet.</p>
            <button type="button" className="text-link" onClick={() => setOpen(true)}>
              Add your first certificate
            </button>
          </motion.div>
        ) : (
          <>
            <p className="certificates-scroll-hint">
              Scroll sideways to explore <span aria-hidden="true">→</span>
            </p>
            <ul className="certificates-grid">
              {certificates.map((cert, index) => (
              <motion.li
                key={cert.id}
                className="certificate-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
              >
                <div
                  className={`certificate-media${
                    cert.imageData?.startsWith('data:application/pdf')
                      ? ' certificate-media-pdf'
                      : cert.imageData
                        ? ' certificate-media-image'
                        : ' certificate-media-empty'
                  }`}
                >
                  {cert.imageData ? (
                    cert.imageData.startsWith('data:application/pdf') ? (
                      <PdfCertificatePreview
                        source={cert.imageData}
                        title={cert.title}
                      />
                    ) : (
                      <img
                        src={cert.imageData}
                        alt={`${cert.title} certificate issued by ${cert.issuer}`}
                      />
                    )
                  ) : (
                    <div className="certificate-placeholder">
                      <span>{cert.title.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div className="certificate-body">
                  <h3>{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  {cert.date ? (
                    <p className="certificate-date">
                      {new Date(cert.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  ) : null}
                  <div className="certificate-actions">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
                        Credential
                      </a>
                    ) : null}
                    <button
                      type="button"
                      className="text-link text-link-danger"
                      onClick={() => removeCertificate(cert.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.li>
              ))}
            </ul>
          </>
        )}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-form-title"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <h3 id="cert-form-title">Post a certificate</h3>
                <button type="button" className="icon-btn" onClick={closeForm} aria-label="Close">
                  ×
                </button>
              </div>

              <form className="cert-form" onSubmit={handleSubmit}>
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. AWS Cloud Practitioner"
                    required
                  />
                </label>

                <label>
                  <span>Issuer</span>
                  <input
                    type="text"
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                    placeholder="e.g. Amazon Web Services"
                    required
                  />
                </label>

                <label>
                  <span>Date earned</span>
                  <input
                    type="month"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </label>

                <label>
                  <span>Credential URL (optional)</span>
                  <input
                    type="url"
                    value={form.credentialUrl}
                    onChange={(e) =>
                      setForm({ ...form, credentialUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </label>

                <label className="file-label">
                  <span>Certificate image or PDF</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                  />
                  {form.imageName ? (
                    <small className="file-name">{form.imageName}</small>
                  ) : (
                    <small className="file-hint">PNG, JPG, WebP, or PDF up to 4MB</small>
                  )}
                </label>

                {form.imageData && !form.imageData.startsWith('data:application/pdf') ? (
                  <div className="form-preview">
                    <img src={form.imageData} alt="Certificate preview" />
                  </div>
                ) : null}

                {error ? <p className="form-error">{error}</p> : null}

                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={closeForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    </section>
  )
}
