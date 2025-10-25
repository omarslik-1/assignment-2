import React, { useRef, useState } from 'react'

export default function ProfileEditor({ username, setUsername, avatar, setAvatar, onClose, onReset }){
  const fileRef = useRef(null)
  const [tempName, setTempName] = useState(username || '')
  const [tempAvatar, setTempAvatar] = useState(avatar || '')

  function onPick(){ fileRef.current?.click() }
  function onFile(e){
    const f = e.target.files?.[0]; if(!f) return
    const ok = ['image/png','image/jpeg','image/jpg','image/webp'].includes(f.type)
    if(!ok){ alert('Please choose a PNG/JPG/WEBP image'); return }
    const reader = new FileReader()
    reader.onload = () => setTempAvatar(reader.result)
    reader.readAsDataURL(f)
  }
  function save(){ setUsername(tempName.trim()); setAvatar(tempAvatar); onClose() }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit profile">
      <div className="modal">
        <h3 style={{marginTop:0}}>Edit Profile</h3>
        <label>
          Name
          <input className="input" value={tempName} onChange={e=>setTempName(e.target.value)} placeholder="Your name"/>
        </label>
        <div style={{marginTop:12}}>
          <div className="helper">Profile image</div>
          {tempAvatar ? <img src={tempAvatar} className="avatar" alt="Preview" /> : <div className="avatar" aria-label="No avatar"></div>}
          <div className="actions" style={{marginTop:10}}>
            <button className="btn" onClick={onPick}>Choose Image</button>
            <button className="btn" onClick={()=>setTempAvatar('')}>Remove</button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile}/>
        </div>
        <div className="actions" style={{justifyContent:'flex-end', marginTop:16}}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={onReset}>Reset All</button>
          <button className="btn primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
