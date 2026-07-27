import { useCallback, useEffect, useState } from 'react'

const DATABASE_NAME = 'hansaja-portfolio-cv'
const STORE_NAME = 'documents'
const CV_ID = 'current-cv'

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function accessStore(mode, operation) {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode)
    const request = operation(transaction.objectStore(STORE_NAME))
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
  })
}

const getSavedCv = () =>
  accessStore('readonly', (store) => store.get(CV_ID))

const saveCv = (document) =>
  accessStore('readwrite', (store) => store.put(document))

const deleteCv = () =>
  accessStore('readwrite', (store) => store.delete(CV_ID))

function withObjectUrl(document) {
  if (!document) return null
  return { ...document, url: URL.createObjectURL(document.file) }
}

export function useCvDocument() {
  const [cv, setCv] = useState(null)

  useEffect(() => {
    let active = true
    let objectUrl = ''

    getSavedCv()
      .then((document) => {
        if (!active || !document) return
        const next = withObjectUrl(document)
        objectUrl = next.url
        setCv(next)
      })
      .catch(() => {})

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  const uploadCv = useCallback(async (file, displayName) => {
    if (file.type !== 'application/pdf') {
      throw new Error('Please choose a PDF document.')
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('The CV must be under 10MB.')
    }

    const document = {
      id: CV_ID,
      name: displayName?.trim() || file.name,
      file,
      updatedAt: new Date().toISOString(),
    }

    await saveCv(document)
    setCv((current) => {
      if (current?.url) URL.revokeObjectURL(current.url)
      return withObjectUrl(document)
    })
  }, [])

  const renameCv = useCallback(async (name) => {
    setCv((current) => {
      if (!current) return current
      const next = { ...current, name: name.trim() || current.name }
      const { url: _url, ...storedDocument } = next
      saveCv(storedDocument).catch(() => {})
      return next
    })
  }, [])

  const removeCv = useCallback(async () => {
    await deleteCv()
    setCv((current) => {
      if (current?.url) URL.revokeObjectURL(current.url)
      return null
    })
  }, [])

  return { cv, uploadCv, renameCv, removeCv }
}
