import { useCallback, useEffect, useState } from 'react'

const PROFILE_KEY = 'hansaja-portfolio-profile-photo'
const PROJECTS_KEY = 'hansaja-portfolio-projects'

function readValue(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function usePortfolioContent() {
  const [profilePhoto, setProfilePhoto] = useState(() =>
    readValue(PROFILE_KEY, ''),
  )
  const [projects, setProjects] = useState(() => readValue(PROJECTS_KEY, []))

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profilePhoto))
  }, [profilePhoto])

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = useCallback((project) => {
    setProjects((current) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...project,
      },
      ...current,
    ])
  }, [])

  const removeProject = useCallback((id) => {
    setProjects((current) => current.filter((project) => project.id !== id))
  }, [])

  return {
    profilePhoto,
    setProfilePhoto,
    projects,
    addProject,
    removeProject,
  }
}
