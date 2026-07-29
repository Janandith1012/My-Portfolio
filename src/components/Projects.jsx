import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  projectUrl: '',
  repositoryUrl: '',
}

export default function Projects({ projects, addProject, removeProject }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function close() {
    setOpen(false)
    setForm(emptyForm)
  }

  function submit(event) {
    event.preventDefault()
    addProject({
      ...form,
      technologies: form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })
    close()
  }

  return (
    <section className="section projects" id="projects">
      <div className="section-inner">
        <div className="projects-header">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="section-label">Selected work</p>
            <h2 className="section-title">Projects &amp; explorations</h2>
            <p className="section-text">
              A growing collection of systems, applications, and ideas built
              through study and practice.
            </p>
          </motion.div>
          <button className="btn btn-primary" type="button" onClick={() => setOpen(true)}>
            Add project
          </button>
        </div>

        {projects.length ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.24) }}
              >
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="project-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 14l3-2v4l-3-2ZM14 13h4M14 16h3" />
                  </svg>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.technologies.length ? (
                  <ul className="project-tags" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="project-actions">
                  {project.projectUrl ? (
                    <a className="text-link" href={project.projectUrl} target="_blank" rel="noreferrer">
                      Live project ↗
                    </a>
                  ) : null}
                  {project.repositoryUrl ? (
                    <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      Source ↗
                    </a>
                  ) : null}
                  <button
                    className="text-link text-link-danger"
                    type="button"
                    onClick={() => removeProject(project.id)}
                  >
                    Remove
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <span className="projects-empty-mark">01</span>
            <div>
              <h3>Your work belongs here.</h3>
              <p>Add your first project with its technologies and links.</p>
            </div>
            <button className="text-link" type="button" onClick={() => setOpen(true)}>
              Create a project entry
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-form-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <h3 id="project-form-title">Add a project</h3>
                <button className="icon-btn" type="button" onClick={close} aria-label="Close">
                  ×
                </button>
              </div>
              <form className="cert-form" onSubmit={submit}>
                <label>
                  <span>Project title</span>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    placeholder="e.g. Inventory Management System"
                  />
                </label>
                <label>
                  <span>Description</span>
                  <textarea
                    required
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    placeholder="What does the project solve?"
                  />
                </label>
                <label>
                  <span>Technologies</span>
                  <input
                    type="text"
                    value={form.technologies}
                    onChange={(event) => setForm({ ...form, technologies: event.target.value })}
                    placeholder="React, Node.js, MySQL"
                  />
                </label>
                <label>
                  <span>Live URL (optional)</span>
                  <input
                    type="url"
                    value={form.projectUrl}
                    onChange={(event) => setForm({ ...form, projectUrl: event.target.value })}
                    placeholder="https://..."
                  />
                </label>
                <label>
                  <span>Repository URL (optional)</span>
                  <input
                    type="url"
                    value={form.repositoryUrl}
                    onChange={(event) => setForm({ ...form, repositoryUrl: event.target.value })}
                    placeholder="https://github.com/..."
                  />
                </label>
                <div className="form-actions">
                  <button className="btn btn-ghost" type="button" onClick={close}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Publish project
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
