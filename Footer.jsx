const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div>
        <p className="footer-title">Blue Horizon Escape</p>
        <p>Mirage Bay, Maldives · +1 (702) 555-0148 · concierge@auroraluxe.com</p>
      </div>
      <div className="footer-links">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          Pinterest
        </a>
        <a href="https://tripadvisor.com" target="_blank" rel="noreferrer">
          Reviews
        </a>
      </div>
      <p className="footer-copy">© {year} Crafted for immersive stays.</p>
    </footer>
  )
}

export default Footer

