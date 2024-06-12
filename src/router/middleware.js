const defaultAuthenticationRedirect = { name: 'sign-in' }

export const beforeEach = async (to, from, next) => {
  
  const authentication = JSON.parse(localStorage.getItem('user'))
  if (authentication) return next()
  const redirect = () => {
    const fromRoute = from.name ? from : null
    return fromRoute || defaultAuthenticationRedirect
  }
  if (!authentication && (to.name === 'sign-in')) return next()
  if (!authentication) {
    const route = redirect()
    return next(route)
  }
  next()
}