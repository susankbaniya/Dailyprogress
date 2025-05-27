export const handleKeyPress = (e, fetch) => {
  if (e.key === 'Enter' && typeof fetch === 'function') {
    fetch()
  }
}