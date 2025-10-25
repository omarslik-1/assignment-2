import React, { useEffect, useMemo, useState } from 'react'

function uid(){ return 'u-' + Math.random().toString(36).slice(2,9) }

export default function Projects(){
  const [seed, setSeed] = useState([])         // from projects.json
  const [userItems, setUserItems] = useState([]) // from localStorage
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('recent')
  const [showForm, setShowForm] = useState(false)

  // load seed
  useEffect(() => {
    let cancelled = false
    async function load(){
      try{
        setLoading(true); setError(null)
        const res = await fetch('/projects.json')
        if(!res.ok) throw new Error('Failed to load projects')
        const data = await res.json()
        if(!cancelled) setSeed(data)
      }catch(err){
        if(!cancelled) setError(err.message)
      }finally{
        if(!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // load user items
  useEffect(() => {
    try{
      const raw = localStorage.getItem('userProjects')
      setUserItems(raw ? JSON.parse(raw) : [])
    }catch{ setUserItems([]) }
  }, [])

  // save user items
  useEffect(() => {
    try{ localStorage.setItem('userProjects', JSON.stringify(userItems)) }catch{}
  }, [userItems])

  const items = useMemo(() => [...userItems, ...seed], [userItems, seed])

  const filtered = useMemo(() => {
    let arr = items
    if(type !== 'all') arr = arr.filter(p => p.type === type)
    if(q) arr = arr.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()))
    if(sort === 'recent') arr = [...arr].sort((a,b) => (b.year||0) - (a.year||0))
    if(sort === 'title') arr = [...arr].sort((a,b) => a.title.localeCompare(b.title))
    return arr
  }, [items, q, type, sort])

  function addProject(e){
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const title = (f.get('title')+'').trim()
    const year = Number(f.get('year'))
    const desc = (f.get('desc')+'').trim()
    const ptype = f.get('type') || 'web'
    const tags = (f.get('tags')+'').split(',').map(s=>s.trim()).filter(Boolean)

    if(!title || !desc || !year){ alert('Please fill title, year and description.'); return }
    const project = { id: uid(), title, year, desc, type: ptype, tags }
    setUserItems(prev => [project, ...prev])
    setShowForm(false)
    e.currentTarget.reset()
  }

  function removeProject(id){
    if(!confirm('Delete this project?')) return
    setUserItems(prev => prev.filter(p => p.id !== id))
  }

  return (
    <section id="projects" className="section reveal" aria-labelledby="projects-title">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap'}}>
        <h2 id="projects-title">Projects</h2>
        <div className="actions">
          <button className="btn icon" onClick={()=>setShowForm(v=>!v)}>{showForm ? 'Close' : '➕ Add Project'}</button>
        </div>
      </div>

      {showForm && (
        <form className="card" onSubmit={addProject} style={{marginTop:10}}>
          <div className="row">
            <label style={{flex:'1 1 280px'}}>
              Title
              <input className="input" name="title" placeholder="My Awesome Project" required />
            </label>
            <label style={{width:140}}>
              Year
              <input className="input" name="year" type="number" min="1990" max="2100" placeholder="2025" required />
            </label>
            <label style={{width:180}}>
              Type
              <select className="input" name="type">
                <option value="web">Web</option>
                <option value="data">Data</option>
                <option value="design">Design</option>
                <option value="finance">Finance</option>
              </select>
            </label>
          </div>
          <label style={{marginTop:10}}>
            Description
            <input className="input" name="desc" placeholder="Short project description" required />
          </label>
          <label style={{marginTop:10}}>
            Tags (comma separated)
            <input className="input" name="tags" placeholder="react, vite, ui" />
          </label>
          <div className="actions" style={{marginTop:12}}>
            <button className="btn primary" type="submit">Save Project</button>
            <button className="btn" type="button" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="searchbar">
        <input className="input" placeholder="Search projects..." value={q} onChange={e=>setQ(e.target.value)} aria-label="Search projects"/>
        <select className="input" value={type} onChange={e=>setType(e.target.value)} aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="web">Web</option>
          <option value="data">Data</option>
          <option value="design">Design</option>
          <option value="finance">Finance</option>
        </select>
        <select className="input" value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort">
          <option value="recent">Most recent</option>
          <option value="title">Title</option>
        </select>
      </div>

      {loading && <p className="helper">Loading projects…</p>}
      {error && (
        <div className="card" role="alert" style={{borderColor:'crimson'}}>
          <strong>Couldn’t load seed projects.</strong>
          <div className="helper">{error}</div>
          <button className="btn" onClick={()=>location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && <p className="helper">No projects found.</p>}

      <div className="grid">
        {!loading && !error && filtered.map(p => (
          <article key={p.id} className="card project" aria-labelledby={`p-${p.id}-t`}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
              <h3 id={`p-${p.id}-t`}>{p.title}</h3>
              <span className="badge">{p.year}</span>
            </div>
            <p className="helper" style={{marginBottom:8}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{(p.tags||[]).map(t => <span key={t} className="badge">{t}</span>)}</div>
            {String(p.id).startsWith('u-') && (
              <div className="actions" style={{marginTop:10}}>
                <button className="btn delete" onClick={()=>removeProject(p.id)}>🗑️ Delete</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
