import { useEffect, useRef, useState } from 'react'

export default function PdfCertificatePreview({ source, title }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let loadingTask
    let renderTask

    async function renderPreview() {
      try {
        setStatus('loading')
        const [pdfjs, worker] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ])
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        const response = await fetch(source)
        const data = await response.arrayBuffer()
        loadingTask = pdfjs.getDocument({ data })
        const document = await loadingTask.promise
        const page = await document.getPage(1)
        const baseViewport = page.getViewport({ scale: 1 })
        const viewport = page.getViewport({ scale: 900 / baseViewport.width })
        const canvas = canvasRef.current

        if (!canvas || cancelled) return

        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        renderTask = page.render({
          canvas,
          canvasContext: canvas.getContext('2d'),
          viewport,
        })
        await renderTask.promise

        if (!cancelled) {
          setPageCount(document.numPages)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    renderPreview()

    return () => {
      cancelled = true
      renderTask?.cancel()
      loadingTask?.destroy()
    }
  }, [source])

  return (
    <div className="pdf-canvas-preview" aria-label={`${title} PDF preview`}>
      <canvas ref={canvasRef} />
      {status === 'loading' ? <span className="pdf-status">Rendering PDF…</span> : null}
      {status === 'error' ? (
        <span className="pdf-status pdf-status-error">Unable to render this PDF</span>
      ) : null}
      {status === 'ready' ? (
        <span className="pdf-page-count">
          PDF · {pageCount === 1 ? '1 page' : `${pageCount} pages`}
        </span>
      ) : null}
    </div>
  )
}
