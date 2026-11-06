
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  overwrite: 'auto', 
})


export const scrollTriggerConfig = {
  start: 'top 85%',    
  end: 'bottom 20%',     // When trigger element bottom reaches 20% down the viewport
  toggleActions: 'play none none reverse', // play on enter, reverse on leave
  invalidateOnRefresh: true, // Recalculate on window resize
  scrub: 1, 
  pin: true, 
  
}


export const fadeInOnScroll = (selector, container) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        invalidateOnRefresh: true,
      },
    }
  )
}

export const parallaxEffect = (element, speed = 0.5) => {
  gsap.fromTo(
    element,
    { yPercent: speed * 30 },
    {
      yPercent: speed * -30,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    }
  )
}


export const staggerAnimation = (elements, duration = 0.5, stagger = 0.1) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0]?.parentElement,
        start: 'top 85%',
        invalidateOnRefresh: true,
      },
    }
  )
}


export const enableScrollTriggerDebug = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    gsap.utils.toArray('.scroll-debug').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 50%',
            markers: true,
          },
        }
      )
    })
  }
}


export const logScrollTriggers = () => {
  const triggers = ScrollTrigger.getAll()
  console.log(`Active ScrollTriggers: ${triggers.length}`)
  triggers.forEach((trigger, i) => {
    console.log(`[${i}]`, trigger)
  })
}


export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}