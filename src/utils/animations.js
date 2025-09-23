// Animation utilities for enhanced user experience

// Fade in animation variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// Slide in from left animation
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Slide in from right animation
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Scale in animation
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// Stagger animation for lists
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Card hover animation
export const cardHoverVariants = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

// Button press animation
export const buttonPressVariants = {
  rest: { scale: 1 },
  press: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Loading spinner animation
export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Pulse animation for loading states
export const pulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Slide up animation for modals/dropdowns
export const slideUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// Page transition animation
export const pageTransitionVariants = {
  initial: { 
    opacity: 0, 
    x: 20 
  },
  in: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  out: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

// Bounce animation for success states
export const bounceVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
}

// Shake animation for error states
export const shakeVariants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}
