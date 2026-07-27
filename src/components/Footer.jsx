export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {year} Hansaja Janandith</p>
      <p className="footer-note">Information Systems Engineering · SLIIT</p>
    </footer>
  )
}
