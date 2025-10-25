import React, { useEffect, useState } from 'react'
export default function BackToTop(){
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button className={'btn backtop ' + (show ? 'show' : '')} onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">
      ↑ Top
    </button>
  )
}
