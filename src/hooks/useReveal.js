import { useEffect } from 'react'
export default function useReveal(){
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target) } })
    }, {threshold:.1})
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}
