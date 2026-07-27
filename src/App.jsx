import About from './components/About'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { useCertificates } from './hooks/useCertificates'
import { useCvDocument } from './hooks/useCvDocument'
import { usePortfolioContent } from './hooks/usePortfolioContent'
import './App.css'

function App() {
  const { certificates, addCertificate, removeCertificate } = useCertificates()
  const { cv, uploadCv, renameCv, removeCv } = useCvDocument()
  const {
    profilePhoto,
    setProfilePhoto,
    projects,
    addProject,
    removeProject,
  } = usePortfolioContent()

  return (
    <div className="app">
      <Nav />
      <main>
        <Hero
          profilePhoto={profilePhoto}
          onProfilePhotoChange={setProfilePhoto}
          cv={cv}
          uploadCv={uploadCv}
          renameCv={renameCv}
          removeCv={removeCv}
        />
        <About />
        <Education />
        <Skills />
        <Projects
          projects={projects}
          addProject={addProject}
          removeProject={removeProject}
        />
        <Certificates
          certificates={certificates}
          addCertificate={addCertificate}
          removeCertificate={removeCertificate}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
