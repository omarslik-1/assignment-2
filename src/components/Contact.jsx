import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  function validate(){
    const e = {}
    if(!name.trim()) e.name = 'Name is required'
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required'
    if(msg.trim().length < 10) e.msg = 'Please write at least 10 characters'
    setErrors(e); return Object.keys(e).length === 0
  }
  function handleSubmit(ev){
    ev.preventDefault(); if(!validate()) return
    setTimeout(() => { setSent(true) }, 600)
  }

  if(sent){
    return (
      <section id="contact" className="section reveal">
        <h2>Contact</h2>
        <div className="card" role="status">
          <strong>✅ Message sent successfully!</strong>
          <p className="helper">Thanks {name.split(' ')[0] || 'friend'} — I’ll get back to you soon.</p>
          <button className="btn" onClick={()=>{ setSent(false); setName(''); setEmail(''); setMsg(''); }}>Send another</button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section reveal" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <form className="card" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input className="input" value={name} onChange={e=>setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="name-err"/>
          {errors.name && <div id="name-err" className="helper" style={{color:'#b91c1c'}}>{errors.name}</div>}
        </label>
        <label style={{marginTop:10}}>
          Email
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby="email-err" />
          {errors.email && <div id="email-err" className="helper" style={{color:'#b91c1c'}}>{errors.email}</div>}
        </label>
        <label style={{marginTop:10}}>
          Message
          <textarea className="input" rows="5" value={msg} onChange={e=>setMsg(e.target.value)} aria-invalid={!!errors.msg} aria-describedby="msg-err"></textarea>
          {errors.msg && <div id="msg-err" className="helper" style={{color:'#b91c1c'}}>{errors.msg}</div>}
        </label>
        <div className="actions" style={{marginTop:14}}>
          <button className="btn primary" type="submit">Send</button>
          <button className="btn" type="reset" onClick={()=>{ setName(''); setEmail(''); setMsg(''); setErrors({}) }}>Reset</button>
        </div>
        <p className="helper" style={{marginTop:10}}>This demo validates inputs and shows feedback; it doesn't send emails.</p>
      </form>
    </section>
  )
}
