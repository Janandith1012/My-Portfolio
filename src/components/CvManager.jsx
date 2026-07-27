import { useRef, useState } from 'react'

export default function CvManager({ cv, uploadCv, renameCv, removeCv }) {
  const inputRef = useRef(null)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const downloadName = cv?.name
    ? cv.name.toLowerCase().endsWith('.pdf')
      ? cv.name
      : `${cv.name}.pdf`
    : 'Hansaja-Janandith-CV.pdf'

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await uploadCv(file)
      setName(file.name)
      setEditing(false)
      setError('')
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      event.target.value = ''
    }
  }

  function openEditor() {
    setName(cv?.name || '')
    setEditing(true)
    setError('')
  }

  async function saveName(event) {
    event.preventDefault()
    await renameCv(name)
    setEditing(false)
  }

  async function remove() {
    await removeCv()
    setEditing(false)
    setError('')
  }

  return (
    <div className="cv-manager">
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFile}
      />

      {cv ? (
        <>
          <a
            className="btn btn-cv"
            href={cv.url}
            download={downloadName}
          >
            Download CV
          </a>
          <button className="cv-edit-button" type="button" onClick={openEditor}>
            Edit CV
          </button>
        </>
      ) : (
        <button
          className="btn btn-cv"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Upload CV
        </button>
      )}

      {editing ? (
        <form className="cv-editor" onSubmit={saveName}>
          <label htmlFor="cv-name">Download filename</label>
          <input
            id="cv-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className="cv-editor-actions">
            <button type="submit">Save name</button>
            <button type="button" onClick={() => inputRef.current?.click()}>
              Replace PDF
            </button>
            <button className="cv-remove" type="button" onClick={remove}>
              Remove
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {error ? <p className="cv-error">{error}</p> : null}
    </div>
  )
}
