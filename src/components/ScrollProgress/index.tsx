import React, { useEffect, useState } from 'react'
import { WrapperScroll } from './styles'

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.body.clientHeight
      const progress = (scrollY / (fullHeight - windowHeight)) * 100
      setScrollPercentage(progress)
    }

    window.addEventListener('scroll', calculateScrollPercentage)
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage)
    }
  }, [])

  return (
    <WrapperScroll
      className="scroll-progress"
      style={{ width: `${scrollPercentage}%` }}
    />
  )
}

export default ScrollProgress
