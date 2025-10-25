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

export default function App(){
  const [theme, setTheme] = useLocalStorage('theme','light')
  const [reading, setReading] = useLocalStorage('reading', false)
  const [username, setUsername] = useLocalStorage('username','Omar')
  const [avatar, setAvatar] = useLocalStorage('avatarDataUrl','')
  const [openEditor, setOpenEditor] = useState(false)

  useEffect(() => {
    const r = document.documentElement
    r.classList.toggle('dark', theme === 'dark')
    r.classList.toggle('reading', !!reading)
    r.style.colorScheme = theme
  }, [theme, reading])

  const [greeting, setGreeting] = useState('Hello')
  useEffect(() => {
    const h = new Date().getHours()
    const base = h<12?'Good morning':'Good afternoon'
    const alt = h>=18?'Good evening':base
    setGreeting(alt + (username?`, ${username}!`:'!'))
  }, [username])

  useReveal()

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} reading={reading} setReading={setReading} onEdit={()=>setOpenEditor(true)} />
      <div className="container">
        <Hero greeting={greeting} username={username} avatar={avatar} />
        <Projects />
        <Contact />
      </div>
      <Footer />
      <BackToTop />

      {openEditor && (
        <ProfileEditor
          username={username} setUsername={setUsername}
          avatar={avatar} setAvatar={setAvatar}
          onClose={()=>setOpenEditor(false)}
          onReset={()=>{ setUsername(''); setAvatar(''); localStorage.removeItem('userProjects'); location.reload() }}
        />
      )}
    </>
  )
}
