import { useEffect } from 'react'

const defaultOptions = { threshold: 0.2 }

const useRevealOnView = (
  ref,
  { threshold = defaultOptions.threshold, enabled = true } = defaultOptions,
) => {
  useEffect(() => {
    if (!enabled) return
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold })

    observer.observe(target)

    return () => observer.disconnect()
  }, [ref, threshold, enabled])
}

export default useRevealOnView

