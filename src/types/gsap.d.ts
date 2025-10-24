declare global {
  interface Window {
    ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger
  }
}

export {}
