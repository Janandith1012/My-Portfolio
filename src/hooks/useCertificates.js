import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'janandith-portfolio-certificates'
const DATABASE_NAME = 'hansaja-portfolio'
const STORE_NAME = 'certificates'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

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

async function runTransaction(mode, operation) {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode)
    const store = transaction.objectStore(STORE_NAME)
    const request = operation(store)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
    transaction.onerror = () => reject(transaction.error)
  })
}

const loadFromDatabase = () =>
  runTransaction('readonly', (store) => store.getAll())

const saveToDatabase = (certificate) =>
  runTransaction('readwrite', (store) => store.put(certificate))

const deleteFromDatabase = (id) =>
  runTransaction('readwrite', (store) => store.delete(id))

export function useCertificates() {
  const [certificates, setCertificates] = useState(() => readStored())

  useEffect(() => {
    let active = true

    async function initialiseDatabase() {
      try {
        const storedCertificates = readStored()
        const databaseCertificates = await loadFromDatabase()

        if (!active) return

        if (databaseCertificates.length > 0) {
          setCertificates(databaseCertificates)
        } else if (storedCertificates.length > 0) {
          await Promise.all(storedCertificates.map(saveToDatabase))
        }

        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Keep the in-memory/localStorage fallback if IndexedDB is unavailable.
      }
    }

    initialiseDatabase()
    return () => {
      active = false
    }
  }, [])

  const addCertificate = useCallback((entry) => {
    const next = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...entry,
    }
    setCertificates((prev) => [next, ...prev])
    saveToDatabase(next).catch(() => {})
    return next
  }, [])

  const removeCertificate = useCallback((id) => {
    setCertificates((prev) => prev.filter((item) => item.id !== id))
    deleteFromDatabase(id).catch(() => {})
  }, [])

  return { certificates, addCertificate, removeCertificate }
}
