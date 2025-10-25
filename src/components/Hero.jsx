import React from 'react'

export default function Hero({ greeting, username, avatar }){
  return (
    <section id="about" className="hero reveal" aria-labelledby="intro-title">
      <div>
        <p className="helper" aria-live="polite">{greeting.toUpperCase()}</p>
        <h1 id="intro-title">I'm <span className="accent">{username || 'Guest'}</span></h1>
        <p className="helper">Front-end learner • Problem solver • Curious mind</p>
        <p className="lead">Building clean, responsive user interfaces and learning modern web development one project at a time.</p>
        <div className="cta">
          <a className="btn primary" href="#projects">See Projects</a>
          <a className="btn" href="#contact">Contact Me</a>
        </div>
      </div>
      <aside className="card profile" aria-label="Profile card">
        {avatar ? (
          <img className="avatar" src={avatar} alt="Profile avatar"/>
        ) : (
          <div className="avatar" role="img" aria-label="Default avatar"></div>
        )}
        <div className="card" style={{background:'#fff', borderColor:'var(--border)'}}>
          <strong>{username || 'Guest'}</strong>
          <div className="helper">Interactive Profile</div>
        </div>
      </aside>
    </section>
  )
}
