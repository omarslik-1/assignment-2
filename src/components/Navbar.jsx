import React from 'react'

export default function Navbar({ theme, setTheme, reading, setReading, onEdit }){
  return (
    <nav>
      <div className="inner container">
        <div className="brand" aria-label="Brand">
          <span className="accent">Omar</span>&nbsp;Slik <span aria-hidden="true">🌿</span>
        </div>
        <div>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button className="btn" onClick={onEdit} aria-label="Edit profile">⚙️ Edit Profile</button>
          <button className="btn" onClick={() => setReading(!reading)} aria-pressed={reading}>
            {reading ? 'Exit Reading' : 'Reading Mode'}
          </button>
          <button className="btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>
    </nav>
  )
}
