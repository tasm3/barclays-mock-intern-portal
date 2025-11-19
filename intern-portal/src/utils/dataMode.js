// Data mode utility - controls whether to show mock data or blank dashboard
// Mock data persists in localStorage regardless of this setting

const DATA_MODE_KEY = 'useMockData'

/**
 * Get the current data mode preference
 * @returns {boolean} true if mock data should be displayed, false for blank mode
 */
export function getUseMockData() {
  const stored = localStorage.getItem(DATA_MODE_KEY)
  // Default to true (show mock data) if not set
  return stored === null ? true : stored === 'true'
}

/**
 * Set the data mode preference
 * @param {boolean} useMockData - true to show mock data, false for blank mode
 */
export function setUseMockData(useMockData) {
  localStorage.setItem(DATA_MODE_KEY, String(useMockData))
  // Dispatch custom event to notify components of change
  window.dispatchEvent(new CustomEvent('dataModeChanged', { detail: { useMockData } }))
}

/**
 * Check if mock data should be used (for component data loading)
 * @returns {boolean} true if components should read from localStorage, false to show empty states
 */
export function shouldUseMockData() {
  return getUseMockData()
}

