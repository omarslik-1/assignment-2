import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ProfileEditor from './components/ProfileEditor'
import useLocalStorage from './hooks/useLocalStorage'
import useReveal from './hooks/useReveal'

export default function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [reading, setReading] = useLocalStorage('reading', false)
  const [username, setUsername] = useLocalStorage('username', 'Omar')
  const [avatar, setAvatar] = useLocalStorage('avatarDataUrl', '')
  const [openEditor, setOpenEditor] = useState(false)
  const [greeting, setGreeting] = useState('Hello')

  useEffect(() => {
    const r = document.documentElement
    r.classList.toggle('dark', theme === 'dark')
    r.classList.toggle('reading', !!reading)
    r.style.colorScheme = theme
  }, [theme, reading])

  useEffect(() => {
    const h = new Date().getHours()
    const base = h < 12 ? 'Good morning' : 'Good afternoon'
    const alt = h >= 18 ? 'Good evening' : base
    setGreeting(alt + (username ? `, ${username}!` : '!'))
  }, [username])

  useReveal()

  useEffect(() => {
    const quoteEl = document.getElementById("quote")
    const button = document.getElementById("new-quote")

    async function fetchQuote() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    const quote = data[0].q;
    const author = data[0].a;
    document.getElementById("quote").textContent = `"${quote}" — ${author}`;
  } catch (error) {
    document.getElementById("quote").textContent = "⚠️ Failed to load quote.";
    console.error("API Error:", error);
  }
}



    const timer = setTimeout(() => {
      fetchQuote()
      button?.addEventListener("click", fetchQuote)
    }, 300)

    return () => {
      clearTimeout(timer)
      button?.removeEventListener("click", fetchQuote)
    }
  }, [])

  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        reading={reading}
        setReading={setReading}
        onEdit={() => setOpenEditor(true)}
      />
      <div className="container">
        <Hero greeting={greeting} username={username} avatar={avatar} />
        <Projects />
        <Contact />

        <section id="quote-section" className="quote-container">
          <h2>💬 Quote of the Day</h2>
          <p id="quote">Loading quote...</p>
          <button id="new-quote">Get New Quote</button>
        </section>
      </div>

      <Footer />
      <BackToTop />

      {openEditor && (
        <ProfileEditor
          username={username}
          setUsername={setUsername}
          avatar={avatar}
          setAvatar={setAvatar}
          onClose={() => setOpenEditor(false)}
          onReset={() => {
            setUsername('')
            setAvatar('')
            localStorage.removeItem('userProjects')
            location.reload()
          }}
        />
      )}
    </>
  )
}
