import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook that determines if the current device is mobile based on the window's inner width.
 *
 * @returns {boolean} - A boolean indicating whether the device is considered mobile.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    /**
     * A function that updates the state of whether the screen is mobile based on the current window width.
     *
     * @function
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
